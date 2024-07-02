import Benefits from "@/components/partials/Product/Benefits";
import ProductDetails from "@/components/partials/Product/ProductDetails";
import React from "react";

const ProductPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProductDetails />
      <Benefits />
    </div>
  );
};

export default ProductPage;
