import React from "react";
import Link from "next/link";
import { Img, Text } from "@/components/elements";

const ProductList = ({ productItems }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <Text size="lg">PRODUCT DETAILS</Text>
    </div>
    <div className="flex flex-col gap-4 rounded-md border p-5">
      <div className="mb-5 flex flex-col gap-5">
        {productItems?.map((item) => (
          <ProductItem key={`order-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  </div>
);

const ProductItem = ({ item }) => {
  const productLink =
    item.product.slug === "pure-himalayan-shilajit-resin-for-men" ||
    item.product.slug === "pure-himalayan-shilajit-resin"
      ? `/offers/${item.product.slug}`
      : `/products/${item.product.slug}`;

  return (
    <Link className="order-image mr-2" href={productLink}>
      <div className="flex justify-between gap-1 rounded-md p-2 shadow-xs">
        <div className="flex w-full items-center gap-2">
          <div className="min-h-20 min-w-20">
            <Img
              src={item.thumbImage}
              alt={item.product?.images.items[0]?.alt || "Product Image"}
              width={80}
              height={88}
              addPrefix
              isStatic
            />
          </div>
          <div className="flex h-full w-full flex-col justify-between">
            <div className="mb-2 flex w-full justify-between gap-2">
              <Text className="font-light">
                <span>Qty: </span>
                {`${item.quantity || item.cancelledQuantity}`}
              </Text>
              <Text>₹{(item.quantity * item.price).toFixed(2)}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="sm">{item.product?.title}</Text>
              <Text size="sm" className="font-light">
                {item.variant?.title}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
