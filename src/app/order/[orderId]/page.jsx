import { getOrderByIdAPI } from "@/lib/appSyncAPIs";
import { calculateTotals } from "@/utils/helpers";
import Link from "next/link";
import { STORE_ID } from "@/config";
import OrderDetails from "@/components/partials/Order/OrderDetails";
import ProductList from "@/components/partials/Order/ProductList";
import OrderSummary from "@/components/partials/Order/OrderSummary";

async function getOrderData(orderId, paymentId) {
  try {
    const { getOrder: response } = await getOrderByIdAPI({ id: orderId });

    if (!response || response.storeId !== STORE_ID) {
      return { order: null, paymentId: null, orderId };
    }

    const isValidOrder =
      (response.status !== "PENDING" && response.status !== "TIMEDOUT") ||
      paymentId ||
      response.source === "GOKWIK";

    if (!isValidOrder) {
      return { order: null, paymentId: null, orderId };
    }

    const products = response.products?.items.map((item) => ({
      ...item,
      thumbImage:
        item.variant?.images?.items[0]?.imageKey ||
        item.product.images?.items[0]?.imageKey,
    }));

    return {
      order: {
        ...response,
        products: { ...response.products, items: products },
      },
      paymentId,
      orderId,
    };
  } catch (error) {
    console.error("Error fetching order data:", error);
    return { order: null, paymentId: null, orderId };
  }
}

export default async function OrderPage({ params, searchParams }) {
  const { orderId } = params;
  const { paymentId = null } = searchParams;

  const { order } = await getOrderData(orderId, paymentId);

  if (!order) {
    return <div>Order not found or unauthorized access.</div>;
  }

  const {
    code,
    status,
    paymentType,
    createdAt,
    prepaidDiscount,
    totalDiscount,
    totalAmount,
    appliedRewardPoints,
    totalCashbackRefunded,
    totalShippingCharges,
    products,
    totalCashOnDeliveryCharges,
  } = order || {};

  const productItems = products?.items || [];
  const { activeItemsTotalPrice, itemsTotalPrice } =
    calculateTotals(productItems);

  return (
    <div className="container-main mb-main flex flex-col gap-4 py-6">
      <OrderDetails
        code={code}
        status={status}
        paymentType={paymentType}
        createdAt={createdAt}
      />

      <ProductList productItems={productItems} />

      <OrderSummary
        activeItemsTotalPrice={activeItemsTotalPrice}
        itemsTotalPrice={itemsTotalPrice}
        prepaidDiscount={prepaidDiscount}
        totalDiscount={totalDiscount}
        totalShippingCharges={totalShippingCharges}
        totalCashOnDeliveryCharges={totalCashOnDeliveryCharges}
        totalAmount={totalAmount}
        appliedRewardPoints={appliedRewardPoints}
        totalCashbackRefunded={totalCashbackRefunded}
      />

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
    </div>
  );
}
