"use client";

import { showToast } from "@/components/common/ToastComponent";
import OrderDetails from "@/components/partials/Order/OrderContent/OrderDetails";
import OrderSummary from "@/components/partials/Order/OrderContent/OrderSummary";
import ProductList from "@/components/partials/Order/OrderContent/ProductList";
import ProgressSteps from "@/components/partials/Others/ProgressSteps";
import { getOrderByIdAPI, validateTransactionAPI } from "@/lib/appSyncAPIs";
import States from "@/utils/data/states.json";
import { errorHandler } from "@/utils/errorHandler";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Cashback from "../../CartDrawer/Cashback";

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
  }, [order, paymentId]);

  useEffect(() => {
    if (user?.id && order?.userId && user.id === order.userId) {
      fetchUpdatedOrder();
    }
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

  const getOrderStatusType = (status) => {
    const statusMap = {
      DISPATCHED: "info",
      CANCELLED: "cancel",
      COURIER_RETURN: "cancel",
      DELIVERED: "success",
    };
    return statusMap[status] || "";
  };

  if (!order) return null;

  return (
    <>
      <ProgressSteps activeStep={3} className="mb-5 mt-4" />
      <OrderDetails
        code={order.code || order.id}
        status={order.status}
        paymentType={order.paymentType}
        createdAt={order.createdAt}
        shippingAddress={{ ...order.shippingAddress, formattedState, country }}
        statusType={getOrderStatusType(order.status)}
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
        href="/account"
        className="rounded-full bg-yellow-900 px-4 py-2 text-sm uppercase text-white-a700_01 md:px-6 md:py-3 md:text-base"
      >
        Your Orders
      </Link>
      <Link
        href="/contact-us"
        className="rounded-full bg-gray-200 px-4 py-2 text-sm uppercase md:px-6 md:py-3 md:text-base"
      >
        CONTACT US
      </Link>
    </div>
    <Link
      href="/collections/all"
      className="rounded-full bg-yellow-900 px-4 py-2 text-sm uppercase text-white-a700_01 md:px-6 md:py-3 md:text-base"
    >
      RETURN TO SHOP
    </Link>
  </div>
));

ActionButtons.displayName = "ActionButtons";

export default OrderContent;
