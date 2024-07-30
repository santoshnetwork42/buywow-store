import React, { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, Heading, Img, Text } from "@/components/common";
import ProductThumbnail from "@/components/common/ProductThumbnail";
import Quantity from "@/components/common/Quantity";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getOfferValueWithPercentage } from "@/utils/helpers";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";

const ProductItem = React.memo(({ item }) => {
  const dispatch = useDispatch();

  const [selectedVariant] = useProductVariantGroups(item);
  const packageProduct = useProduct(item, selectedVariant?.id);

  const { title = "", price = 0, listingPrice = 0 } = packageProduct ?? {};
  const showStrikePrice = listingPrice && price < listingPrice;

  const discountPercentage = useMemo(() => {
    if (price && listingPrice && price < listingPrice) {
      return getOfferValueWithPercentage(price, listingPrice);
    }
    return 0;
  }, [price, listingPrice]);

  const handleRemoveFromCart = useCallback(() => {
    if (item) {
      dispatch({
        type: cartSagaActions.REMOVE_FROM_CART,
        payload: { product: item },
      });
    }
  }, [dispatch, item]);

  if (!item) return null;

  return (
    <div className="grid grid-cols-[1fr,25%] gap-5 border-b py-4">
      <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
        <div className="flex aspect-[65/77] w-16 shrink-0 overflow-hidden rounded-lg bg-lime-50 sm:w-20 sm:p-1 md:aspect-square md:w-24 md:p-1.5 lg:w-28 lg:p-2 xl:w-32">
          <ProductThumbnail
            width={300}
            height={300}
            fetchedProduct={item}
            className="aspect-[65/77] h-auto w-full object-contain md:aspect-square"
            isStatic
            alt="Product Image"
          />
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-col">
            <Heading size="base" as="h4" className="line-clamp-3" responsive>
              {title}
            </Heading>
            <Text size="sm" as="p" className="line-clamp-2" responsive>
              Size: {item.size}
            </Text>
          </div>
          <div className="flex items-center">
            <Quantity quantity={item.cartQuantity} cartItem={item} />
            <Button
              className="ml-2 h-full rounded-md border bg-transparent px-2 md:px-2.5"
              onClick={handleRemoveFromCart}
            >
              <div className="aspect-[10/14] w-2.5 md:w-3">
                <Img
                  src="img_thumbs_up.svg"
                  width={10}
                  height={14}
                  className="aspect-[10/14] h-auto w-full object-contain"
                />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Heading as="h4" size="base" className="text-sm" responsive>
            ₹{price}
          </Heading>
          {showStrikePrice && (
            <Text as="span" size="sm" className="line-through" responsive>
              ₹{listingPrice}
            </Text>
          )}
        </div>
        {!!discountPercentage && (
          <Text
            size="sm"
            as="p"
            className="w-fit rounded-md bg-lime-50 px-2 py-0.5"
            responsive
          >
            {discountPercentage}% Off
          </Text>
        )}
      </div>
    </div>
  );
});

ProductItem.displayName = "ProductItem";

const CartProductList = ({ cartItems, totalItems, subtotal }) => {
  if (!cartItems || !Array.isArray(cartItems)) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr,25%] items-center gap-5 border-b border-t py-2">
        <Text
          size="sm"
          as="p"
          className="pl-5 uppercase text-blue_gray-400 md:pl-6"
          responsive
        >
          PRODUCT
        </Text>
        <Text
          size="sm"
          as="p"
          className="uppercase text-blue_gray-400"
          responsive
        >
          PRICE
        </Text>
      </div>
      {cartItems.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
      <div className="grid grid-cols-[1fr,25%] items-center gap-5 py-2 sm:py-3 lg:py-4">
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
          <div className="w-16 sm:w-20 md:w-24 md:p-1.5 lg:w-28 xl:w-32"></div>
          <Heading
            size="base"
            as="h4"
            className="text-sm font-semibold"
            responsive
          >
            {totalItems} Items
          </Heading>
        </div>
        <Heading
          size="base"
          as="h4"
          className="text-sm font-semibold"
          responsive
        >
          ₹{subtotal}
        </Heading>
      </div>
    </div>
  );
};

export default CartProductList;
