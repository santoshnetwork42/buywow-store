import { Heading, Img, Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import Link from "next/link";
import React, { useMemo } from "react";

const StatusBadge = React.memo(({ status }) => {
  const statusColorMap = {
    DISPATCHED: "bg-gray-600",
    CANCELLED: "bg-red-600",
    COURIER_RETURN: "bg-red-600",
    DELIVERED: "bg-green-600",
  };

  const bgColor = statusColorMap[status] || "bg-gray-600";

  return (
    <Text
      as="span"
      size="sm"
      className={`ml-2 rounded-md px-2 py-0.5 text-white-a700 ${bgColor}`}
      responsive
    >
      {status}
    </Text>
  );
});

StatusBadge.displayName = "StatusBadge";

const ProductImage = React.memo(({ thumbImage, title }) => (
  <div className="aspect-[65/77] h-fit w-20 overflow-hidden rounded-md bg-lime-50 sm:w-24 md:aspect-square lg:w-28">
    <Img
      src={thumbImage}
      alt={title || "Product Image"}
      className="aspect-[65/77] h-auto w-full object-contain mix-blend-darken md:aspect-square"
      width={80}
      height={80}
      addPrefix
    />
  </div>
));

ProductImage.displayName = "ProductImage";

const ProductDetails = React.memo(
  ({ product, variant, status, quantity, price, allStatus }) => (
    <div className="flex flex-1 justify-between gap-2">
      <div className="flex flex-col gap-1">
        <Text as="p" size="base" className="text-sm" responsive>
          {product?.title || "Untitled Product"}
          {allStatus.includes(status) && <StatusBadge status={status} />}
        </Text>
        {variant?.title && (
          <Text
            as="span"
            size="base"
            className="text-sm font-light text-gray-600"
            responsive
          >
            {variant.title}
          </Text>
        )}
      </div>
      <Text as="p" size="lg" className="text-base" responsive>
        ₹{toDecimal(quantity * price)}
      </Text>
    </div>
  ),
);

ProductDetails.displayName = "ProductDetails";

const DispatchInfo = React.memo(({ status, trackingId, shippingCourier }) => {
  if (status !== "DISPATCHED") return null;

  return (
    <>
      <Text
        as="p"
        size="base"
        className="text-sm font-light text-gray-600"
        responsive
      >
        Tracking Id: {trackingId || "-"}
      </Text>
      <Text
        as="p"
        size="base"
        className="text-sm font-light text-gray-600"
        responsive
      >
        Delivery Partner: {shippingCourier || "-"}
      </Text>
    </>
  );
});

DispatchInfo.displayName = "DispatchInfo";

const ProductItem = React.memo(({ item, allStatus }) => {
  const {
    product,
    variant,
    status,
    quantity,
    price,
    cancelledQuantity,
    trackingId,
    shippingCourier,
  } = item || {};

  const thumbImage = useMemo(() => {
    return (
      variant?.images?.items?.[0]?.imageKey ||
      product?.images?.items?.[0]?.imageKey ||
      ""
    );
  }, [variant, product]);

  if (!product) return null;

  return (
    <Link
      prefetch={false}
      className="flex w-full gap-2 rounded-md border p-2 shadow-xs sm:gap-3 sm:p-3 lg:gap-4 lg:p-4"
      href={`/products/${product.slug || ""}`}
    >
      <ProductImage thumbImage={thumbImage} title={product.title} />
      <div className="flex flex-1 flex-col gap-2">
        <ProductDetails
          product={product}
          variant={variant}
          status={status}
          quantity={quantity}
          price={price}
          allStatus={allStatus}
        />
        <div className="mb-1 flex flex-col gap-1">
          <Text
            as="p"
            size="base"
            className="text-sm font-light text-gray-600"
            responsive
          >
            Qty: {quantity || cancelledQuantity || 0}
          </Text>
          <DispatchInfo
            status={status}
            trackingId={trackingId}
            shippingCourier={shippingCourier}
          />
        </div>
      </div>
    </Link>
  );
});

ProductItem.displayName = "ProductItem";

const ProductList = React.memo(({ productItems, allStatus }) => {
  if (!productItems || productItems.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
      <div className="flex items-center justify-between">
        <Heading as="h3" size="xl" className="text-lg font-medium" responsive>
          PRODUCT DETAILS
        </Heading>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        {productItems.map((item) => (
          <ProductItem
            key={`order-${item.id || item.product?.id || Math.random().toString(36).substr(2, 9)}`}
            item={item}
            allStatus={allStatus}
          />
        ))}
      </div>
    </div>
  );
});

ProductList.displayName = "ProductList";

export default ProductList;
