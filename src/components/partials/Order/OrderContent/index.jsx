"use client";

import { showToast } from "@/components/common/ToastComponent";
import { Img } from "@/components/elements";
import Cashback from "@/components/partials/CartDrawer/Cashback";
import OrderDetails from "@/components/partials/Order/OrderContent/OrderDetails";
import OrderSummary from "@/components/partials/Order/OrderContent/OrderSummary";
import ProductList from "@/components/partials/Order/OrderContent/ProductList";
import ProgressSteps from "@/components/partials/Others/ProgressSteps";
import { SWOP_STORE_BANNER_URL } from "@/config";
import { getOrderByIdAPI, validateTransactionAPI } from "@/lib/appSyncAPIs";
import States from "@/utils/data/states.json";
import { errorHandler } from "@/utils/errorHandler";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const OrderContent = ({ initialOrderData, orderId, paymentId }) => {
  const [order, setOrder] = useState(initialOrderData);
  const user = useSelector((state) => state.user?.user);
  const [fetchAttempts, setFetchAttempts] = useState(0);
  const allStatus = ["CANCELLED", "DISPATCHED", "COURIER_RETURN", "DELIVERED"];

  const fetchUpdatedOrder = useCallback(async () => {
    try {
      const getOrder = await getOrderByIdAPI({
        id: orderId,
        userId: user?.id,
      });

      if (getOrder) {
        setOrder(getOrder);
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [orderId, user?.id]);

  const checkPaymentStatus = useCallback(async () => {
    if (orderId && paymentId) {
      try {
        const { success } = await validateTransactionAPI({
          orderId,
          paymentId,
        });
        if (success) {
          fetchUpdatedOrder();
          showToast.custom("Thank you! Your order has been confirmed.");
        }
      } catch (error) {
        errorHandler(error);
      }
    }
  }, [orderId, paymentId, fetchUpdatedOrder]);

  const isPaymentProcessing = useMemo(
    () =>
      (order?.status === "PENDING" || order?.status === "TIMEDOUT") &&
      order?.paymentType === "PREPAID" &&
      paymentId,
    [order, paymentId],
  );

  const isStatusProcessing = useMemo(
    () =>
      (order?.status === "PENDING" || order?.status === "TIMEDOUT") &&
      order?.checkoutChannel === "GOKWIK",
    [order],
  );

  useEffect(() => {
    if ((isStatusProcessing || isPaymentProcessing) && fetchAttempts < 3) {
      const timerId = setTimeout(() => {
        if (isPaymentProcessing) {
          showToast.custom("Hold On! We're updating your payment status...");
          checkPaymentStatus();
        } else {
          fetchUpdatedOrder();
        }
        setFetchAttempts((prev) => prev + 1);
      }, FETCH_INTERVAL);

      return () => clearTimeout(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, paymentId]);

  useEffect(() => {
    if (user?.id && order?.userId && user.id === order.userId) {
      fetchUpdatedOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const { formattedState, country } = useMemo(() => {
    if (order?.shippingAddress?.state) {
      return {
        formattedState:
          States.find((state) => state.value === order.shippingAddress.state)
            ?.name || "",
        country: "India",
      };
    }
    return { formattedState: "", country: "" };
  }, [order?.shippingAddress]);

  if (!order) return null;

  const bannerOnThankYouPage = {
    mWebImage: "/swopstore/swopstore-mweb.jpg",
    webImage: "/swopstore/swopstore-web.jpg",
    link: SWOP_STORE_BANNER_URL,
  };
  return (
    <>
      <ProgressSteps activeStep={3} className="mb-5 mt-4" />
      {
        <Link prefetch={false} className="" href={bannerOnThankYouPage.link}>
          <Img
            src={bannerOnThankYouPage?.mWebImage}
            alt={'Thank you for your order!"'}
            width={400}
            height={200}
            className="rounded-md sm:hidden"
          />
        </Link>
      }
      {
        <Link prefetch={false} className="" href={bannerOnThankYouPage.link}>
          <Img
            src={bannerOnThankYouPage?.webImage}
            alt={"Thank you for your order!"}
            width={1400}
            height={400}
            className="hidden rounded-md sm:block"
          />
        </Link>
      }
      <OrderDetails
        code={order.code || order.id}
        status={order.status}
        paymentType={order.paymentType}
        createdAt={order.createdAt}
        shippingAddress={{ ...order.shippingAddress, formattedState, country }}
      />
      <ProductList
        productItems={order.products?.items || []}
        allStatus={allStatus}
      />
      <OrderSummary order={order} />
      <Cashback
        cashbackAmount={order.cashbackEarned}
        className="shadow-none sm:w-full sm:translate-x-0 sm:rounded-md"
      />
      <ActionButtons />
    </>
  );
};

const ActionButtons = React.memo(() => (
  <div className="flex flex-wrap justify-center gap-2 sm:justify-between">
    <div className="flex gap-2">
      <Link
        prefetch={false}
        href="/pages/account"
        className="rounded-full bg-yellow-900 px-4 py-2 text-sm uppercase text-white-a700_01 md:px-6 md:py-3 md:text-base"
      >
        Your Orders
      </Link>
      <Link
        prefetch={false}
        href="/contact-us"
        className="rounded-full bg-gray-200 px-4 py-2 text-sm uppercase md:px-6 md:py-3 md:text-base"
      >
        CONTACT US
      </Link>
    </div>
    <Link
      prefetch={false}
      href="/collections/all"
      className="rounded-full bg-yellow-900 px-4 py-2 text-sm uppercase text-white-a700_01 md:px-6 md:py-3 md:text-base"
    >
      RETURN TO SHOP
    </Link>
  </div>
));

ActionButtons.displayName = "ActionButtons";

export default OrderContent;
