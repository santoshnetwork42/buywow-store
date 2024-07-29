// components/MyCart/ProductTable.jsx
import { Button, Heading, Img, Text } from "@/components/common";
import ProductThumbnail from "@/components/common/ProductThumbnail";
import Quantity from "@/components/common/Quantity";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getOfferValueWithPercentage } from "@/utils/helpers";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

const ProductItem = React.memo(({ item }) => {
  const dispatch = useDispatch();

  const [selectedVariant] = useProductVariantGroups(item);
  const packageProduct = useProduct(item, selectedVariant?.id);

  const { title = "", price = 0, listingPrice = 0 } = packageProduct;
  const showStrikedPrice = listingPrice && price < listingPrice;

  const discountPercentage = useMemo(() => {
    if (price && listingPrice && price < listingPrice) {
      return getOfferValueWithPercentage(price, listingPrice);
    }
    return 0;
  }, [price, listingPrice]);

  const removeFromCart = () => {
    dispatch({
      type: cartSagaActions.REMOVE_FROM_CART,
      payload: {
        product: item,
      },
    });
  };

  return (
    <tr key={item.id} className="border-b">
      <td className="py-2.5 text-left sm:py-3 md:py-4 lg:pl-4 xl:pl-6">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
          {/* <ProductThumbnail
            width={500}
            height={250}
            fetchedProduct={item}
            className="aspect-[792/229] w-full object-contain lg:aspect-[792/229]"
            isStatic
            alt="Product Image"
          /> */}
          {/* <Img
            src={item.image}
            alt={item.title}
            width={124}
            height={124}
            className="aspect-[65/77] w-16 rounded-lg object-contain md:aspect-square md:w-24"
          /> */}
          <div className="flex h-16 flex-1 flex-col justify-between md:h-24">
            <div>
              <Heading size="base" as="h4" responsive>
                {title}
              </Heading>
              <Text size="sm" as="p" responsive>
                Size: {item.size}
              </Text>
            </div>
            <div className="flex items-center">
              <Quantity quantity={item.cartQuantity} cartItem={item} />
              <Button
                className="ml-2 rounded-md border bg-transparent px-2 py-[7px]"
                onClick={removeFromCart}
              >
                <Img
                  src="img_thumbs_up.svg"
                  width={10}
                  height={14}
                  className="aspect-[10/14] w-[10px] object-contain"
                />
              </Button>
            </div>
          </div>
        </div>
      </td>
      <td className="py-2.5 text-left sm:py-3 md:py-4">
        <div className="flex h-16 flex-col gap-1 md:h-24">
          <div className="flex items-center gap-2">
            <Heading as="h4" size="base" className="text-sm" responsive>
              ₹{price}
            </Heading>
            {showStrikedPrice && (
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
              {discountPercentage} % Off
            </Text>
          )}
        </div>
      </td>
    </tr>
  );
});

ProductItem.displayName = "ProductItem";

export default function ProductTable({ cartItems, totalItems, subtotal }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-t">
          <th className="py-2 pl-5 text-left md:pl-6">
            <Text size="sm" as="p" className="text-blue_gray-400" responsive>
              PRODUCT
            </Text>
          </th>
          <th className="w-[30%] py-2 text-left font-normal text-blue_gray-400">
            <Text size="sm" as="p" className="text-blue_gray-400" responsive>
              PRICE
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="px-4 py-2 text-left sm:py-3 lg:py-4">
            <Heading
              size="lg"
              as="h3"
              className="ml-14 font-semibold sm:ml-16 md:ml-[102px] lg:ml-32 xl:ml-36"
              responsive
            >
              {totalItems} Items
            </Heading>
          </td>
          <td className="py-2 text-left sm:py-3 lg:py-4">
            <Heading size="lg" as="h4" className="font-semibold" responsive>
              ₹{subtotal}
            </Heading>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
