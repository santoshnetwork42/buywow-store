// import Benefits from "@/components/partials/Product/Benefits";
// import ProductDetails from "@/components/partials/Product/ProductDetails";
// import ProductEffectiveness from "@/components/blocks/ProductEffectivenessImages";
// import ProductHighlights from "@/components/partials/Product/ProductHighlights";
// import ProductKeyIngredients from "@/components/partials/Product/ProductKeyIngredients";
// import Reviews from "@/components/partials/Product/Reviews";
import WatchUs from "@/components/partials/Product/WatchUs";
import {
  // productEffectivenessData,
  // productHighlightsData,
  // productKeyIngredientsData,
  watchUsData,
} from "@/utils/data/productData";
import React from "react";

const ProductPage = () => {
  return (
    <>
      {/* Main Content Section */}
      <div className="mb-8 mt-3 flex w-full flex-col items-center gap-8 sm:gap-10 md:mt-4 lg:gap-12">
        {/* Product Details Section */}
        {/* <ProductDetails /> */}

        {/* Watch Us Section */}
        <WatchUs data={watchUsData} />

        {/* Product Effectiveness Image Section */}
        {/* <ProductEffectiveness data={productEffectivenessData} /> */}

        {/* Benefits Section */}
        {/* <Benefits /> */}

        {/* Product Highlights Section */}
        {/* <ProductHighlights data={productHighlightsData} /> */}

        {/* Product Key Ingredients Section */}
        {/* <ProductKeyIngredients data={productKeyIngredientsData} /> */}

        {/* Reviews Section */}
        {/* <Reviews /> */}
      </div>
    </>
  );
};

export default ProductPage;
