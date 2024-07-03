import Benefits from "@/components/partials/Product/Benefits";
import ProductDetails from "@/components/partials/Product/ProductDetails";
import Reviews from "@/components/partials/Product/Reviews";
import React from "react";

const ProductPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProductDetails />
      <Benefits />
      <Reviews />
    </div>
  );
};

export default ProductPage;
