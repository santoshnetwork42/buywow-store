import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Heading, Img, Text } from "@/components/elements";
import {
  getCouponDiscount,
  useBestCoupon,
  useFeaturedCoupons,
} from "@wow-star/utils";
import { applyCouponAPI } from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import CouponModal from "./CouponModal";
import CouponDrawer from "./CouponDrawer";

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
  const user = useSelector((state) => state.user.user);

  const { filteredFeaturedCoupons: featuredCoupons = [] } =
    useFeaturedCoupons();
  const bestCouponCode = useBestCoupon();

  const previousCartList = useRef(cartList);

  const applyCouponCode = useCallback(
    async (code, autoApplied = false) => {
      if (!code) return;

      setLoading(true);
      try {
        const response = await applyCouponAPI(code);
        if (!response?.data?.applyCoupon) {
          throw new Error("Coupon not found");
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
        console.log("Coupon not found", error);
        setError("Coupon not found");
      } finally {
        setCouponCode("");
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartList, user],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestCouponCode, cartList]);

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
