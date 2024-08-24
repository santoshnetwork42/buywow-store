"use client";

import { showToast } from "@/components/common/ToastComponent";
import OrderDetails from "@/components/partials/Order/OrderDetails";
import OrderSummary from "@/components/partials/Order/OrderSummary";
import ProductList from "@/components/partials/Order/ProductList";
import ProgressSteps from "@/components/partials/Others/ProgressSteps";
import { getOrderByIdAPI, validateTransactionAPI } from "@/lib/appSyncAPIs";
import States from "@/utils/data/states.json";
import { errorHandler } from "@/utils/errorHandler";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const OrderContent = ({ initialOrderData, orderId, paymentId }) => {
  const [order, setOrder] = useState(initialOrderData);
  const user = useSelector((state) => state.user?.user);
  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(0);

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
      (currentOrder?.status === "PENDING" ||
        currentOrder?.status === "TIMEDOUT") &&
      currentOrder?.paymentType === "PREPAID" &&
      paymentId,
    [currentOrder, paymentId],
  );

  const isStatusProcessing = useMemo(
    () =>
      (currentOrder?.status === "PENDING" ||
        currentOrder?.status === "TIMEDOUT") &&
      currentOrder?.checkoutChannel === "GOKWIK",
    [currentOrder],
  );

  useEffect(() => {
    if (
      (isStatusProcessing || isPaymentProcessing) &&
      fetchAttempts < MAX_FETCH_ATTEMPTS
    ) {
      const timerId = setTimeout(() => {
        if (isPaymentProcessing) {
          showToast("Hold On! We're updating your payment status...", "info");
          checkPaymentStatus();
        } else {
          fetchUpdatedOrder();
        }
        setFetchAttempts((prev) => prev + 1);
      }, FETCH_INTERVAL);

      return () => clearTimeout(timerId);
    }
  }, [
    isStatusProcessing,
    isPaymentProcessing,
    fetchAttempts,
    checkPaymentStatus,
    fetchUpdatedOrder,
  ]);

  useEffect(() => {
    if (
      currentUser?.id &&
      currentOrder?.userId &&
      currentUser.id === currentOrder.userId
    ) {
      fetchUpdatedOrder();
    }
  }, [currentUser, currentOrder, fetchUpdatedOrder]);

  const { formattedState, country } = useMemo(() => {
    if (currentOrder?.shippingAddress?.state) {
      return {
        formattedState:
          States.find((s) => s.value === currentOrder.shippingAddress.state)
            ?.name || "",
        country: "India",
      };
    }
    return { formattedState: "", country: "" };
  }, [currentOrder?.shippingAddress]);

  const getOrderStatusType = (status) => {
    const statusMap = {
      DISPATCHED: "info",
      CANCELLED: "cancel",
      COURIER_RETURN: "cancel",
      DELIVERED: "success",
    };
    return statusMap[status] || "";
  };

  const calculateOrderTotals = useMemo(() => {
    const orderItems = currentOrder?.products?.items || [];
    return {
      activeItemsTotalPrice: orderItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      ),
      itemsTotalPrice: orderItems.reduce(
        (total, item) =>
          total + (item.quantity + (item.cancelledQuantity || 0)) * item.price,
        0,
      ),
    };
  }, [currentOrder?.products?.items]);

  if (!order) return null;

  return (
    <>
      <ProgressSteps activeStep={3} className="mb-5 mt-4" />
      <OrderDetails
        code={order.code || order.id}
        status={order.status}
        paymentType={order.paymentType}
        createdAt={order.createdAt}
        shippingAddress={{ ...order.shippingAddress, state, country }}
        statusType={getStatusType(order.status)}
      />
      <ProductList productItems={order.products?.items || []} />
      <OrderSummary
        activeItemsTotalPrice={activeItemsTotalPrice}
        itemsTotalPrice={itemsTotalPrice}
        prepaidDiscount={order.prepaidDiscount}
        totalDiscount={order.totalDiscount}
        totalShippingCharges={order.totalShippingCharges}
        totalCashOnDeliveryCharges={order.totalCashOnDeliveryCharges}
        totalAmount={order.totalAmount}
        appliedRewardPoints={order.appliedRewardPoints}
        totalCashbackRefunded={order.totalCashbackRefunded}
      />
      <ActionButtons />
    </>
  );
};

const ActionButtons = React.memo(() => (
  <div className="flex justify-between">
    <Link
      href="/"
      className="rounded-full bg-yellow-900 p-3 px-6 text-white-a700_01"
    >
      CONTACT US
    </Link>
    <Link
      href="/"
      className="rounded-full bg-yellow-900 p-3 px-6 text-white-a700_01"
    >
      RETURN TO SHOP
    </Link>
  </div>
));

export default OrderContent;
