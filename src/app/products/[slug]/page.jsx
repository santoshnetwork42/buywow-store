import Benefits from "@/components/partials/Product/Benefits";
import ProductDetails from "@/components/partials/Product/ProductDetails";
import ProductEffectivenessImageSection from "@/components/partials/Product/ProductEffectivenessImageSection";
import Reviews from "@/components/partials/Product/Reviews";
import WatchUs from "@/components/partials/Product/WatchUs";
import { productEffectivenessData, watchUsData } from "@/data/productData";
import React from "react";

const ProductPage = () => {
  return (
    <>
      {/* Main Content Section */}
      <div className="mb-8 mt-3 flex w-full flex-col items-center gap-8 sm:gap-10 md:mt-4 lg:gap-12">
        {/* Product Details Section */}
        <ProductDetails className="container-main" />

        {/* Watch Us Section */}
        <WatchUs data={watchUsData} />

        {/* Product Effectiveness Image Section */}
        <ProductEffectivenessImageSection data={productEffectivenessData} />

        {/* Benefits Section */}
        <Benefits />

        <Reviews />
      </div>
    </>
  );
};

export default ProductPage;
