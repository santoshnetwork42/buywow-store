"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { Button, Heading } from "@/components/elements";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { getBgColor, getRecordKey, toDecimal } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const ProductCard = dynamic(
  () => import("@/components/partials/Card/ProductCard"),
  { ssr: false },
);

const Slider = dynamic(() => import("@/components/features/Slider"), {
  ssr: false,
});

const UpsellProducts = ({
  title,
  upsellProductsBgColor: bgColor,
  upsellProductItems,
}) => {
  const bgColorClass = getBgColor(bgColor);
  const isPaddedColor = bgColor === "LIME" || bgColor === "BLUE";

  const { addToCart } = useCartDispatch();
  const cartList = useSelector((state) => state?.cart?.data || []);
  const [packageProducts, setPackageProducts] = useState([]);
  const [productPrices, setProductPrices] = useState([]);

  const updateProducts = useCallback((productDetail, index) => {
    setPackageProducts((prev) => {
      const newArray = [...prev];
      newArray[index] = productDetail;
      return newArray;
    });

    setProductPrices((prevPrices) => {
      const newPrices = [...prevPrices];
      if (productDetail.packageProduct) {
        const { minimumOrderQuantity, price } = productDetail.packageProduct;
        const qty =
          typeof minimumOrderQuantity === "number" ? minimumOrderQuantity : 1;
        newPrices[index] = qty * (price || 0);
      } else {
        newPrices[index] = 0;
      }
      return newPrices;
    });
  }, []);

  const bundleAddToCart = useCallback(() => {
    packageProducts.forEach((productDetail) => {
      if (productDetail.packageProduct) {
        const { packageProduct, selectedVariantId } = productDetail || {};
        const { hasInventory, minimumOrderQuantity } = packageProduct || {};

        if (hasInventory) {
          addToCart({
            ...packageProduct,
            qty: packageProduct.minimumOrderQuantity || 1,
            variantId: selectedVariantId,
            section: {
              id: "frequently_bought_together_pdp_page",
              name: "frequently_bought_together_pdp_page",
            },
          });
        }
      }
    });
  }, [addToCart, packageProducts]);

  const calculateTotalPrice = useMemo(() => {
    return productPrices.reduce((sum, price) => sum + price, 0);
  }, [productPrices]);

  const isBundleAddedToCart = useMemo(() => {
    return packageProducts.every((productDetail) => {
      const { packageProduct, selectedVariantId } = productDetail || {};
      if (!packageProduct) return false;
      if (cartList.length && packageProduct) {
        const recordKey = getRecordKey(packageProduct, selectedVariantId);
        const isExist = cartList.some((cl) => cl.recordKey === recordKey);
        return isExist;
      }
      return false;
    });
  }, [cartList, packageProducts]);

  if (!Array.isArray(upsellProductItems) || upsellProductItems.length === 0)
    return null;

  const renderProductItem = (item, index) => {
    const { product, image, text } = item;
    const isMiddleItem = (index - 1) % 3 === 1;

    return (
      <div
        key={`product-${index}`}
        className={`col-span-2 flex h-full flex-col items-center gap-1 sm:gap-1.5 lg:gap-2 ${
          isMiddleItem ? "col-start-2" : ""
        }`}
      >
        <Heading size="xl" as="h3" className="line-clamp-1 text-lg" responsive>
          <span className="font-light">Step {index + 1}:</span> {text}
        </Heading>
        <ProductCard
          className="w-[calc(50vw-16px)] max-w-[356px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
          showBenefitTags={false}
          image={image}
          sendProductDataToParent={(productDetail) =>
            updateProducts(productDetail, index)
          }
          {...product?.data?.attributes}
        />
      </div>
    );
  };

  return (
    <div
      className={`container-main mb-main flex flex-col items-center justify-center gap-2 ${bgColorClass} ${isPaddedColor ? "py-5" : ""}`}
    >
      <SectionHeading title={title} />
      <Slider
        controlsContainerClassName="mb-2 md:mb-3"
        sliderClassName="gap-[5px] sm:gap-2 lg:gap-3"
        className="max-md:hidden"
        isContainShadow
      >
        {upsellProductItems.map((item, index) =>
          renderProductItem(item, index),
        )}
      </Slider>
      <div className="mb-3 grid w-full grid-cols-4 gap-x-[5px] gap-y-5 sm:mb-4 sm:gap-x-2 sm:gap-y-6 md:hidden">
        {upsellProductItems.map((item, index) =>
          renderProductItem(item, index),
        )}
      </div>
      <Button
        variant="primary"
        size="large"
        className="mt-1"
        onClick={bundleAddToCart}
      >
        {isBundleAddedToCart
          ? `₹${toDecimal(calculateTotalPrice)} | Bundle Added to Cart`
          : `₹${toDecimal(calculateTotalPrice)} | Add ${
              upsellProductItems.length
            } Products to Cart`}
      </Button>
    </div>
  );
};

UpsellProducts.displayName = "UpsellProducts";

export default UpsellProducts;
