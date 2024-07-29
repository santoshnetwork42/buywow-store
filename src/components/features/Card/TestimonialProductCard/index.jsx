"use client";

import { Button, Heading, Text } from "@/components/common";
import ProductThumbnail from "@/components/common/ProductThumbnail";
import Quantity from "@/components/common/Quantity";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getRecordKey } from "@/utils/helpers";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const TestimonialProductCard = ({ fetchedProduct }) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.cart?.data || []);

  const { price, listingPrice, title, slug } = fetchedProduct;
  const showStrikedPrice = listingPrice && price < listingPrice;

  const addToCartHandler = useCallback(
    (e) => {
      dispatch({
        type: cartSagaActions.ADD_TO_CART,
        payload: {
          product: {
            ...fetchedProduct,
            cartQuantity: fetchedProduct.minimumOrderQuantity || 1,
          },
        },
      });
    },
    [dispatch, fetchedProduct],
  );

  const cartItem = useMemo(() => {
    const recordKey = getRecordKey(fetchedProduct);
    return cartData.find((item) => item.recordKey === recordKey);
  }, [cartData, fetchedProduct]);

  return (
    <div>
      <Link
        href={`/products/${slug}`}
        className="flex items-center justify-center gap-2 rounded bg-lime-100_01 p-2"
      >
        <div className="flex aspect-square w-12 shrink-0 items-center justify-center overflow-hidden rounded bg-white-a700_01 md:aspect-[48/56]">
          <ProductThumbnail
            width={200}
            fetchedProduct={fetchedProduct}
            height={56}
            isStatic
            alt={"Product Image"}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Heading as="h5" size="sm" className="line-clamp-1">
            {title}
          </Heading>
          <div className="flex items-center justify-between gap-4 md:gap-5 lg:gap-6">
            <div className="flex items-center gap-1">
              <Text
                size="base"
                as="p"
                className="text-sm font-semibold capitalize"
                responsive
              >
                ₹{price}
              </Text>
              {!!showStrikedPrice && (
                <Text
                  size="sm"
                  as="p"
                  className="capitalize line-through"
                  responsive
                >
                  ₹{listingPrice}
                </Text>
              )}
            </div>
            {!!cartItem && (
              <Quantity quantity={cartItem.cartQuantity} cartItem={cartItem} />
            )}

            {!cartItem && (
              <Button
                variant="primary"
                size="small"
                className="text-xs capitalize md:text-sm"
                onClick={addToCartHandler}
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TestimonialProductCard;
