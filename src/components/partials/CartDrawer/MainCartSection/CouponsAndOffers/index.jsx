import { Button, Heading, Img, Input, Text } from "@/components/elements";
import Drawer from "@/components/features/Drawer";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CartHeader from "../../CartHeader";
import { applyCoupon as applyCouponMutation } from "@/graphql/appSync/api";
import { ArrowIconSVG } from "@/assets/svg/icons";
import {
  getCouponDiscount,
  useBestCoupon,
  useFeaturedCoupons,
} from "@wow-star/utils";
import { useDispatch, useSelector } from "react-redux";
import { generateClient } from "aws-amplify/api";
import { STORE_ID } from "@/config";
import { applyCouponAPI } from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import Modal from "@/components/features/Modal";

const CouponComponent = ({
  title,
  coupon,
  appliedCouponCode,
  allowed,
  applyCoupon,
  removeCoupon,
  exclusions,
}) => {
  const isApplied = appliedCouponCode === coupon?.code;
  const showAsterisk = !!(
    coupon.applicableProducts?.length || coupon.applicableCollections?.length
  );

  return (
    <div
      className={`flex flex-col gap-3 rounded-lg px-4 py-3 ${
        isApplied ? "border-2 border-green-500 bg-green-100" : "bg-pink-200"
      }`}
    >
      <div className="flex flex-col gap-1">
        {title && (
          <Heading as="h3" size="lg">
            {title}
          </Heading>
        )}
        {!!coupon?.couponNote && (
          <Text
            as="p"
            size="sm"
            dangerouslySetInnerHTML={{ __html: coupon?.couponNote }}
            className="inline-html-content"
          />
        )}
        {!!exclusions && (
          <Text as="p" size="sm" className={`${!allowed && "text-red-600"}`}>
            {exclusions}
            {showAsterisk && "*"}
          </Text>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Heading
          as="h5"
          size="sm"
          className={`rounded-full border-[1.5px] border-dashed ${
            isApplied
              ? "border-green-700 bg-green-50"
              : "border-yellow-900 bg-white-a700"
          } px-2.5 py-1`}
        >
          {coupon?.code}
        </Heading>
        <Button
          variant={isApplied ? "secondary" : "primary"}
          size="small"
          onClick={
            isApplied ? () => removeCoupon() : () => applyCoupon(coupon?.code)
          }
          disabled={!allowed}
        >
          {isApplied ? "REMOVE" : "Apply"}
        </Button>
      </div>
      <div className="mt-1 flex flex-col gap-1 md:mt-2">
        <Text as="p" size="xs">
          *Other T&C May Apply
        </Text>
      </div>
    </div>
  );
};

const CouponsAndOffers = () => {
  const dispatch = useDispatch();
  const { applyCoupon, removeCoupon, removeFromCart } = useCartDispatch();

  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const cartList = useSelector((state) => state.cart.data || []);
  const appliedCoupon = useSelector((state) => state.cart.coupon);
  const user = useSelector((state) => state.user.user);
  const storedCouponCode = useSelector((state) => state.cart.storedCouponCode);

  const closeModal = () => setIsCouponModalOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openModal = () => {
    setTimeout(() => {
      setIsCouponModalOpen(true);
    }, 500);
  };

  const { filteredFeaturedCoupons: featuredCoupons = [] } =
    useFeaturedCoupons();

  const { discount: couponTotal } = useMemo(
    () => getCouponDiscount(appliedCoupon, cartList),
    [appliedCoupon, cartList],
  );
  const previousCartList = useRef(cartList);
  const bestCouponCode = useBestCoupon();

  const applyCouponCode = useCallback(
    async (couponCode, autoApplied = false) => {
      setLoading(true);
      const response = await applyCouponAPI(couponCode)
        .then((data) => data.data.applyCoupon)
        .catch((error) => {
          console.log(error);
          return null;
        });

      setCouponCode("");
      setLoading(false);

      if (response) {
        const {
          allowed,
          message,
          coupon: couponResponse,
        } = getCouponDiscount(response, cartList);

        if (allowed) {
          applyCoupon({ ...couponResponse, autoApplied: !!autoApplied });
          openModal();
          closeSidebar();
          // logger.info("Applied coupon:", response);
        } else {
          setError(message);
          // logger.error("Failed to apply coupon:", message);
        }
      } else {
        setError("Coupon not found");
        // logger.error("Coupon not found");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, cartList],
  );

  useEffect(() => {
    if (cartList || previousCartList.current !== cartList) {
      previousCartList.current = cartList;

      if (storedCouponCode) {
        if (
          (!appliedCoupon || appliedCoupon?.autoApplied) &&
          appliedCoupon?.code !== storedCouponCode
        ) {
          applyCouponCode(storedCouponCode, true);
        }
      } else if (bestCouponCode) {
        if (
          (!appliedCoupon || appliedCoupon?.autoApplied) &&
          appliedCoupon?.code !== bestCouponCode
        ) {
          applyCouponCode(bestCouponCode, true);
        }
      } else {
        if (appliedCoupon?.autoApplied) {
          removeCoupon();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestCouponCode, cartList]);

  const onCouponRemove = () => {
    cartList.forEach((item) => {
      if (item.cartItemSource === "COUPON") {
        removeFromCart(item);
      }
    });

    removeCoupon();
    // logger.info("Removed coupon");
  };

  useEffect(() => {
    if (couponCode) {
      setError(null);
    }
  }, [couponCode]);

  return (
    <>
      <div
        className={`relative flex shrink items-center justify-between gap-2 rounded-lg bg-blue_gray-300_01 py-2 pl-2 pr-5 shadow-xs md:pl-2.5`}
      >
        <div className="flex items-center justify-center gap-2">
          <Img
            src="img_image_2021.png"
            width={32}
            height={32}
            alt="promo image"
            className="aspect-square w-[32px] object-contain"
          />
          <div className="flex flex-col justify-center">
            <Heading
              size="lg"
              as="h4"
              className={`line-clamp-1 text-base text-white-a700_01`}
              responsive
            >
              coupons & offers
            </Heading>
            <Text
              size="base"
              as="p"
              className={`line-clamp-2 text-sm text-white-a700_01`}
              responsive
            >
              Apply now and save extra!
            </Text>
          </div>
        </div>
        <Button
          className="relative flex h-9 w-9 shrink-0 rounded-full bg-white-a700_01 p-0"
          onClick={openSidebar}
        >
          <Img src="img_group_1400002487.svg" width={7} height={20} />
        </Button>
      </div>

      <Modal isOpen={isCouponModalOpen} onClose={closeModal}></Modal>

      <Drawer
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        position="right"
        width="500px"
      >
        <div className="flex flex-1 flex-col gap-4 px-3 py-4 md:px-4">
          <div className="flex items-center gap-3 border-b-[0.25px] border-black-900 pb-2 md:gap-4 md:pb-2.5">
            <Button
              onClick={closeSidebar}
              className="flex size-8 items-center justify-center rounded-full bg-deep_orange-50_03 md:size-9"
            >
              <ArrowIconSVG side="left" strokeWidth={1.8} />
            </Button>
            <Heading size="xl" as="h2" className="text-lg" responsive>
              coupons & offers{" "}
              {featuredCoupons?.length > 0 && `(${featuredCoupons?.length})`}
            </Heading>
          </div>

          <div className="flex flex-col gap-2">
            <Input
              placeholder="Enter coupon code here"
              name="coupon_code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex flex-grow rounded-lg border px-3 py-2.5 shadow-[0_4px_4px_#0000000D]"
              suffix={
                <Button
                  onClick={() => {
                    !!couponCode && applyCouponCode(couponCode);
                  }}
                  variant="primary"
                  size="small"
                  className=""
                  disabled={loading}
                >
                  Apply
                </Button>
              }
            />
            {error && (
              <Text as="p" size="sm" className="text-red-600" responsive>
                {error}
              </Text>
            )}
          </div>

          {featuredCoupons?.length > 0 && (
            <div className="mt-3 flex flex-col gap-3">
              {featuredCoupons
                .filter((c) => !!c.coupon)
                .map(({ allowed, coupon, message }) => (
                  <CouponComponent
                    key={coupon.id}
                    coupon={coupon}
                    appliedCouponCode={appliedCoupon?.code}
                    allowed={allowed}
                    exclusions={message}
                    applyCoupon={applyCouponCode}
                    removeCoupon={onCouponRemove}
                  />
                ))}
            </div>
          )}

          <Text as="p" size="sm">
            *Applicable on certain products
          </Text>
        </div>
      </Drawer>
    </>
  );
};

export default CouponsAndOffers;
