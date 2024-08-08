import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { Button, Heading, Img, Input, Text } from "@/components/elements";
import Drawer from "@/components/features/Drawer";
import Modal from "@/components/features/Modal";
import { ArrowIconSVG } from "@/assets/svg/icons";
import {
  getCouponDiscount,
  useBestCoupon,
  useFeaturedCoupons,
} from "@wow-star/utils";
import { applyCouponAPI } from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";

const CouponItem = React.memo(
  ({
    title,
    coupon,
    appliedCouponCode,
    allowed,
    applyCoupon,
    removeCoupon,
    exclusions,
  }) => {
    if (!coupon) return null;

    const isApplied = appliedCouponCode === coupon.code;
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
          {coupon.couponNote && (
            <Text
              as="p"
              size="sm"
              dangerouslySetInnerHTML={{ __html: coupon.couponNote }}
              className="inline-html-content"
            />
          )}
          {exclusions && (
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
            {coupon.code}
          </Heading>
          <Button
            variant={isApplied ? "secondary" : "primary"}
            size="small"
            onClick={isApplied ? removeCoupon : () => applyCoupon(coupon.code)}
            disabled={!allowed}
          >
            {isApplied ? "REMOVE" : "Apply"}
          </Button>
        </div>
        <Text as="p" size="xs">
          *Other T&C May Apply
        </Text>
      </div>
    );
  },
);

CouponItem.displayName = "CouponItem";

const CouponHeader = ({ openSidebar }) => (
  <div className="relative flex shrink items-center justify-between gap-2 rounded-lg bg-blue_gray-300_01 py-2 pl-2 pr-5 shadow-xs md:pl-2.5">
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
          className="line-clamp-1 text-base text-white-a700_01"
          responsive
        >
          Coupons & Offers
        </Heading>
        <Text
          size="base"
          as="p"
          className="line-clamp-2 text-sm text-white-a700_01"
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
);

const CouponModal = ({ isOpen, onClose, appliedCoupon }) => (
  <Modal
    isOpen={isOpen}
    showMobileView={false}
    onClose={onClose}
    modalContainerClassName="max-w-[min(400px,88vw)] w-full p-0 rounded overflow-hidden md:w-full"
  >
    <div className="flex items-center justify-between px-5 py-1">
      <div className="flex flex-col gap-1">
        <Heading as="h5" size="base" className="text-sm" responsive>
          Coupon applied
        </Heading>
        <Heading
          as="h3"
          size="xl"
          className="text-lg font-bold text-yellow-900"
          responsive
        >
          {appliedCoupon?.code}
        </Heading>
      </div>
      <div className="aspect-square size-[68px]">
        <Img
          src="img_coupon_modal.png"
          width={68}
          height={68}
          alt="Coupon"
          className="aspect-square h-auto w-full"
        />
      </div>
    </div>
    <div className="flex flex-col items-center gap-4 bg-deep_orange-50_03 px-5 py-4">
      <div className="flex w-full flex-col gap-1">
        <Heading
          as="h4"
          size="base"
          className="line-clamp-2 text-sm"
          responsive
        >
          Enjoy 30% OFF on buying any 2 products.
        </Heading>
        <Text as="span" size="sm" className="line-clamp-3" responsive>
          Applicable on hair, skin, body and kids products.
        </Text>
      </div>
      <Button variant="primary" size="small" onClick={onClose}>
        Okay
      </Button>
    </div>
  </Modal>
);

const CouponDrawer = ({
  isOpen,
  onClose,
  couponCode,
  setCouponCode,
  loading,
  error,
  applyCouponCode,
  featuredCoupons,
  appliedCoupon,
  handleCouponRemove,
}) => (
  <Drawer isOpen={isOpen} onClose={onClose} position="right" width="500px">
    <div className="flex flex-1 flex-col gap-4 px-3 py-4 md:px-4">
      <div className="flex items-center gap-3 border-b-[0.25px] border-black-900 pb-2 md:gap-4 md:pb-2.5">
        <Button
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-full bg-deep_orange-50_03 md:size-9"
        >
          <ArrowIconSVG side="left" strokeWidth={1.8} />
        </Button>
        <Heading size="xl" as="h2" className="text-lg" responsive>
          Coupons & Offers{" "}
          {featuredCoupons?.length > 0 && `(${featuredCoupons.length})`}
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
              onClick={() => couponCode && applyCouponCode(couponCode)}
              variant="primary"
              size="small"
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
            .filter((c) => c.coupon)
            .map(({ allowed, coupon, message }) => (
              <CouponItem
                key={coupon.id}
                coupon={coupon}
                appliedCouponCode={appliedCoupon?.code}
                allowed={allowed}
                exclusions={message}
                applyCoupon={applyCouponCode}
                removeCoupon={handleCouponRemove}
              />
            ))}
        </div>
      )}

      <Text as="p" size="sm">
        *Applicable on certain products
      </Text>
    </div>
  </Drawer>
);

const CouponsAndOffers = () => {
  const { applyCoupon, removeCoupon, removeFromCart } = useCartDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const cartList = useSelector((state) => state.cart.data || []);
  const appliedCoupon = useSelector((state) => state.cart.coupon);
  const storedCouponCode = useSelector((state) => state.cart.storedCouponCode);

  const { filteredFeaturedCoupons: featuredCoupons = [] } =
    useFeaturedCoupons();
  const bestCouponCode = useBestCoupon();

  const couponTotal = useMemo(() => {
    const { discount } = getCouponDiscount(appliedCoupon, cartList);
    return discount;
  }, [appliedCoupon, cartList]);

  const previousCartList = useRef(cartList);

  const applyCouponCode = useCallback(
    async (code, autoApplied = false) => {
      if (!code) return;

      setLoading(true);
      try {
        const response = await applyCouponAPI(code);
        if (!response?.data?.applyCoupon) {
          throw new Error("Invalid response");
        }

        const {
          allowed,
          message,
          coupon: couponResponse,
        } = getCouponDiscount(response.data.applyCoupon, cartList);

        if (allowed) {
          applyCoupon({ ...couponResponse, autoApplied: !!autoApplied });
          setTimeout(() => {
            setIsCouponModalOpen(true);
          }, 300);
          setIsSidebarOpen(false);
        } else {
          setError(message);
        }
      } catch (error) {
        console.error("Failed to apply coupon:", error);
        setError("Coupon not found");
      } finally {
        setCouponCode("");
        setLoading(false);
      }
    },
    [applyCoupon, cartList],
  );

  useEffect(() => {
    if (cartList !== previousCartList.current) {
      previousCartList.current = cartList;

      if (
        storedCouponCode &&
        (!appliedCoupon || appliedCoupon?.autoApplied) &&
        appliedCoupon?.code !== storedCouponCode
      ) {
        applyCouponCode(storedCouponCode, true);
      } else if (
        bestCouponCode &&
        (!appliedCoupon || appliedCoupon?.autoApplied) &&
        appliedCoupon?.code !== bestCouponCode
      ) {
        applyCouponCode(bestCouponCode, true);
      } else if (appliedCoupon?.autoApplied) {
        removeCoupon();
      }
    }
  }, [
    bestCouponCode,
    cartList,
    storedCouponCode,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
  ]);

  const handleCouponRemove = useCallback(() => {
    cartList.forEach((item) => {
      if (item.cartItemSource === "COUPON") {
        removeFromCart(item);
      }
    });
    removeCoupon();
  }, [cartList, removeFromCart, removeCoupon]);

  useEffect(() => {
    if (couponCode) {
      setError(null);
    }
  }, [couponCode]);

  return (
    <>
      <CouponHeader openSidebar={() => setIsSidebarOpen(true)} />

      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        appliedCoupon={appliedCoupon}
      />

      <CouponDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        loading={loading}
        error={error}
        applyCouponCode={applyCouponCode}
        featuredCoupons={featuredCoupons}
        appliedCoupon={appliedCoupon}
        handleCouponRemove={handleCouponRemove}
      />
    </>
  );
};

export default CouponsAndOffers;
