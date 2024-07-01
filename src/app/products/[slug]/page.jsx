import Benefits from "@/components/partials/Product/Benefits";
import ProductDetail from "@/components/partials/Product/ProductDetail";
import React from "react";

const ProductPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProductDetail />
      <Benefits />
    </div>
  );
};

export default ProductPage;
