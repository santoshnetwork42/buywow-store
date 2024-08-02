// app/order/[orderId]/page.jsx
import { Img, Text } from "@/components/elements";
import { getOrderByIdAPI } from "@/lib/appSyncAPIs";
import { formateDate } from "@/utils/helpers";
import Link from "next/link";
import { STORE_ID } from "../../../../config";

async function getOrderData(orderId, paymentId) {
  try {
    const { getOrder: response } = await getOrderByIdAPI({ id: orderId });

    const products = response?.products?.items.map((item) => ({
      ...item,
      thumbImage:
        item.variant?.images?.items[0]?.imageKey ||
        item.product.images?.items[0]?.imageKey,
    }));

    if (
      response?.storeId === STORE_ID &&
      ((response?.status !== "PENDING" && response?.status !== "TIMEDOUT") ||
        paymentId ||
        response?.source === "GOKWIK")
    ) {
      return {
        order: {
          ...response,
          products: { ...response.products, items: products },
        },
        paymentId,
        orderId,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    order: null,
    paymentId: null,
    orderId,
  };
}

export default async function OrderPage({ params, searchParams }) {
  const { orderId } = params;

  const { paymentId = null } = searchParams;

  const allStatus = ["CANCELLED", "DISPATCHED", "COURIER_RETURN", "DELIVERED"];
  const orderData = await getOrderData(orderId, paymentId);
  const { order = {} } = orderData || {};
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

  const { items: productItems = [] } = products || {};

  const { activeItemsTotalPrice, itemsTotalPrice } = products?.items?.reduce(
    (acc, { quantity, price, cancelledQuantity = 0 }) => {
      const activeTotal = quantity * price;
      const totalWithCancelled = (quantity + cancelledQuantity) * price;
      return {
        activeItemsTotalPrice: acc.activeItemsTotalPrice + activeTotal,
        itemsTotalPrice: acc.itemsTotalPrice + totalWithCancelled,
      };
    },
    { activeItemsTotalPrice: 0, itemsTotalPrice: 0 },
  ) || { activeItemsTotalPrice: 0, itemsTotalPrice: 0 };

  return (
    <div className="container-main mb-main flex flex-col gap-4 py-6">
      {/* ORDER DETAILS */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Text size="lg">ORDER DETAILS</Text>
          <Text size="md" className="text-end text-green-600">
            Thank you. Your order is confirmed.
          </Text>
        </div>
        <div className="flex flex-col gap-4 rounded-md border p-5">
          <div className="flex justify-between">
            <Text>Order number:</Text>
            <Text>#{code}</Text>
          </div>
          <div className="border-b"></div>
          <div className="flex justify-between">
            <Text>Status:</Text>
            <Text className="text-green-600">{status}</Text>
          </div>
          <div className="border-b"></div>
          <div className="flex justify-between">
            <Text>Payment method:</Text>
            <Text>
              {paymentType === "PREPAID" ? "Online" : "Cash on delivery"}
            </Text>
          </div>
          <div className="border-b"></div>
          <div className="flex justify-between">
            <Text>Date:</Text>
            <Text>{formateDate(createdAt)}</Text>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Text size="lg">PRODUCT DETAILS</Text>
        </div>
        <div className="flex flex-col gap-4 rounded-md border p-5">
          <div className="mb-5 flex flex-col gap-5">
            {productItems?.map((item) => (
              <Link
                className="order-image mr-2"
                key={"order-" + item.id}
                href={
                  (item.product.slug ===
                    "pure-himalayan-shilajit-resin-for-men" ||
                  item.product.slug === "pure-himalayan-shilajit-resin"
                    ? "/offers/"
                    : "/products/") + item.product.slug
                }
              >
                <div className="flex justify-between rounded-md p-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Img
                      src={
                        item.thumbImage ||
                        (item.variant?.images?.items[0]?.imageKey
                          ? item.variant?.images?.items[0]?.imageKey
                          : item.product?.images.items[0]?.imageKey)
                      }
                      alt={item.product?.images.items[0]?.alt}
                      width={80}
                      height={88}
                      addPrefix
                      isStatic
                    />

                    <div className="flex flex-col gap-1">
                      <Text>{item.product?.title}</Text>
                      <Text className="font-light">{item.variant?.title}</Text>
                      <Text className="font-light">
                        <span>Qty: </span>
                        {`${item.quantity || item.cancelledQuantity}`}
                      </Text>
                    </div>
                  </div>
                  <div className="product-price">
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-between">
            <Text>Subtotal:</Text>
            <div className="flex gap-2">
              <Text className="font-light line-through">
                ₹{itemsTotalPrice.toFixed(2)}
              </Text>
              <Text>₹{activeItemsTotalPrice.toFixed(2)}</Text>
            </div>
          </div>
          <div className="border-b"></div>

          {!!prepaidDiscount && (
            <div className="flex justify-between">
              <Text>Prepaid Discount:</Text>
              <Text className="text-green-600">
                ₹
                {(
                  (prepaidDiscount * activeItemsTotalPrice) /
                  itemsTotalPrice
                ).toFixed(2)}
              </Text>
            </div>
          )}
          {!!prepaidDiscount && <div className="border-b"></div>}

          {!!totalDiscount && (
            <div className="flex justify-between">
              <Text>Discount:</Text>
              <Text>-₹{totalDiscount.toFixed(2)}</Text>
            </div>
          )}
          {!!totalDiscount && <div className="border-b"></div>}

          <div className="flex justify-between">
            <Text>Shipping:</Text>
            <Text>
              {totalShippingCharges
                ? `₹${totalShippingCharges.toFixed(2)}`
                : "Free shipping"}
            </Text>
          </div>
          <div className="border-b"></div>

          {!!totalCashOnDeliveryCharges && (
            <div className="flex justify-between">
              <Text>Cod Charges:</Text>
              <Text>₹{totalCashOnDeliveryCharges.toFixed(2)}</Text>
            </div>
          )}
          {!!totalCashOnDeliveryCharges && <div className="border-b"></div>}

          <div className="flex justify-between">
            <Text>Total:</Text>
            <Text size="xl">
              ₹
              {(
                totalAmount -
                appliedRewardPoints +
                totalCashbackRefunded
              ).toFixed(2)}
            </Text>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Link
          href={"/"}
          className="rounded-full bg-yellow-900 p-3 px-6 text-white-a700_01"
        >
          CONTACT US
        </Link>
        <Link
          href={"/"}
          className="rounded-full bg-yellow-900 p-3 px-6 text-white-a700_01"
        >
          RETURN TO SHOP
        </Link>
      </div>
    </div>
  );
}
