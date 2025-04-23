import { useEffect, useMemo, useState } from "react";

import CopyIcon from "@/assets/svg/copyIcon";
import { SparklesIcon } from "@/assets/svg/quiz";
import AddToCart from "@/components/common/AddToCart";
import { Button, Img, Text } from "@/components/elements";
import { fetchProductDetailsBySlugAPI } from "@/lib/appSyncAPIs";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { copyText } from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import { getFirstVariantPriority } from "@/utils/helpers/products";
import { useProduct, useProductVariantGroups } from "@wow-star/utils-cms";
import Link from "next/link";

export const QuizResults = ({
  recommendedProduct,
  setIsOpen,
  onResetQuiz,
  couponCode,
}) => {
  const { handleCartVisibility } = useModalDispatch();
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [selectedVariant] = useProductVariantGroups(fetchedProduct, variant);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const slug =
        recommendedProduct?.productSlug?.data?.attributes?.slug || "";
      if (!slug) {
        return null;
      }
      const fetchedProduct = await fetchProductDetailsBySlugAPI(slug);
      if (!!fetchedProduct?.variants?.items?.length) {
        const { firstVariant: variant } =
          getFirstVariantPriority(fetchedProduct);
        setVariant(variant);
      }
      setFetchedProduct(fetchedProduct);
    };
    fetchProductDetails();
  }, []);

  const thumbImage = useMemo(() => {
    const images =
      (variant ? variant?.images?.items : fetchedProduct?.images?.items) || [];
    const thumbImage =
      images?.find((i) => i.isThumb)?.imageKey || images?.[0]?.imageKey;

    return getPublicImageURL({ key: thumbImage, addPrefix: true });
  }, [fetchedProduct, variant]);

  const { marketPlaceLinks } = recommendedProduct || {};

  const ShimmerCard = () => {
    return (
      <div className="bg-white overflow-hidden rounded-xl shadow-lg">
        <div className="relative h-[300px] animate-pulse bg-gray-200" />
        <div className="space-y-4 p-6">
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="mt-6 flex items-center justify-between">
            <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-9 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
        <div className="mb-4 flex items-center justify-center text-center sm:gap-x-6">
          <SparklesIcon className="mr-2 h-6 w-6 text-yellow-900" />
          <Text as="h2" className="text-2xl font-bold text-yellow-900">
            {`Your Personalized Solutions`}
          </Text>
          <SparklesIcon className="ml-2 h-6 w-6 text-yellow-900" />
        </div>
        <Text className="mb-4 text-center text-gray-600" as="p">
          {`Based on your answers, we've selected the best products for your hair
          fall concerns.`}
        </Text>

        {!!couponCode && (
          <div className="mx-auto mb-8 max-w-md rounded-lg border-2 border-yellow-900/50 bg-yellow-900/10 p-4">
            <p className="mb-1 text-center text-sm text-yellow-900">
              Your Special Code:
            </p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-wow-dark text-lg font-bold">
                {couponCode}
              </code>

              <Text
                as="span"
                size="sm"
                onClick={() =>
                  copyText(
                    couponCode?.trim(),
                    `Coupon code copied: ${couponCode}`,
                  )
                }
                className="inline cursor-pointer p-1 pl-0 underline"
                responsive
              >
                <CopyIcon size={20} />
              </Text>
            </div>
          </div>
        )}

        {!fetchedProduct ? (
          <ShimmerCard />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div
              key={""}
              className="bg-white overflow-hidden rounded-xl shadow-lg"
            >
              <div className="relative h-[300px] bg-gray-50">
                <Img
                  src={thumbImage}
                  width={400}
                  height={400}
                  alt={`Product image`}
                  // priority
                  className="m-auto aspect-square h-full w-full cursor-zoom-in transition-transform duration-300 ease-in-out"
                />
                {/* <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-contain p-4"
              /> */}
                {/* {product.size === "combo" && (
                <div className="text-white absolute right-4 top-4 rounded-full bg-yellow-900 px-3 py-1 text-sm font-medium">
                  Combo Pack
                </div>
              )} */}
              </div>
              <div className="p-6">
                <Text
                  className="text-wow-dark mb-2 line-clamp-2 text-lg font-semibold"
                  as="h3"
                >
                  {fetchedProduct?.title}
                </Text>
                {fetchedProduct?.benefits && (
                  <Text as="p" className="line-clamp-3" size="sm" responsive>
                    {fetchedProduct?.benefits.join(" | ")}
                  </Text>
                )}
                {/* <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                {product.description}
              </p>*/}
                <div className="my-6 flex items-center justify-between">
                  <span className="text-xl font-bold text-yellow-900">
                    {`₹` + (fetchedProduct?.price || 0)}
                  </span>
                  <AddToCart
                    product={packageProduct}
                    buttonText={"Add"}
                    buttonClassName="rounded-lg h-9 px-6"
                    quantityClassName="h-9 grid-cols-[repeat(3,24px)] sm:grid-cols-[repeat(3,26px)] md:grid-cols-[repeat(3,28px)] lg:grid-cols-[repeat(3,30px)] xl:grid-cols-[repeat(3,32px)]"
                    section={{
                      name: "personalizer_product_recommendation",
                      tabValue: "personalizer_product_recommendation",
                    }}
                  />
                  {/* {isProductInCart(product) ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateCartQuantity(product, "decrease")}
                      className="bg-wow-secondary rounded-lg p-2 transition-colors hover:bg-yellow-900/20"
                    >
                      <MinusIcon className="h-4 w-4 text-yellow-900" />
                    </button>
                    <span className="text-wow-dark font-medium">
                      {getCartItemQuantity(product)}
                    </span>
                    <button
                      onClick={() => onUpdateCartQuantity(product, "increase")}
                      className="bg-wow-secondary rounded-lg p-2 transition-colors hover:bg-yellow-900/20"
                    >
                      <PlusIcon className="h-4 w-4 text-yellow-900" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddToCart(product)}
                    className="text-white inline-flex items-center rounded-lg bg-yellow-900 px-4 py-2 transition-colors hover:bg-yellow-900/90"
                  >
                    <ShoppingBagIcon className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                )} */}
                </div>

                {!!marketPlaceLinks?.length && (
                  <div className="border-t pt-4">
                    <Text
                      className="mb-4 text-center text-sm text-gray-700"
                      as="p"
                      responsive
                    >
                      Also available on:
                    </Text>
                    <div className="grid grid-cols-3 gap-4">
                      {marketPlaceLinks.map(({ link, image }) => (
                        <Link
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center rounded-lg bg-yellow-50 p-2 transition-transform hover:scale-105`}
                        >
                          <div className="relative h-10 w-full">
                            <Img
                              src={image?.data?.attributes?.url}
                              alt={link}
                              quality={55}
                              width={120}
                              height={120}
                              className={`h-full w-full object-contain transition-all duration-300 hover:scale-110`}
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={onResetQuiz}
          className="rounded-lg bg-yellow-900/10 px-6 py-3 text-yellow-900 transition-colors hover:bg-yellow-900/10"
        >
          Take Quiz Again
        </Button>
        <Button
          onClick={() => {
            onResetQuiz();
            setIsOpen(false);
            handleCartVisibility(true);
          }}
          className="group inline-flex items-center rounded-lg bg-yellow-900 px-6 py-3 text-white-a700 transition-colors hover:bg-yellow-900/90"
        >
          Go To Cart
        </Button>
      </div>
    </div>
  );
};
