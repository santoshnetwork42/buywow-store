import OrderContent from "@/components/partials/Order/OrderContent";
import { STORE_ID } from "@/config";
import { getOrderByIdAPI } from "@/lib/appSyncAPIs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const getOrderData = async (orderId, paymentId) => {
  try {
    const response = await getOrderByIdAPI({ id: orderId });

    if (!response || response.storeId !== STORE_ID) {
      return null;
    }

    const isValidOrder =
      (response.status !== "PENDING" && response.status !== "TIMEDOUT") ||
      paymentId ||
      response.source === "GOKWIK";

    if (!isValidOrder) {
      return null;
    }

    return response;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return null;
  }
};

const OrderSkeleton = () => (
  <div className="animate-pulse">
    <div className="mb-4 h-10 rounded bg-gray-200"></div>
    <div className="mb-4 h-40 rounded bg-gray-200"></div>
    <div className="mb-4 h-60 rounded bg-gray-200"></div>
    <div className="flex justify-between">
      <div className="h-10 w-32 rounded bg-gray-200"></div>
      <div className="h-10 w-32 rounded bg-gray-200"></div>
    </div>
  </div>
);

export default async function OrderPage({ params, searchParams }) {
  const { orderId } = params;
  const { paymentId = null } = searchParams;

  const initialOrderData = await getOrderData(orderId, paymentId);

  if (!initialOrderData) {
    redirect("/404");
  }

  return (
    <div className="container-main mb-main flex max-w-4xl flex-col gap-5 py-5 md:gap-6">
      <Suspense fallback={<OrderSkeleton />}>
        <OrderContent
          initialOrderData={initialOrderData}
          orderId={orderId}
          paymentId={paymentId}
        />
      </Suspense>
    </div>
  );
}
