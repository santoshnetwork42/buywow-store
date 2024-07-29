// components/MyCart/MainCartSection.jsx
import React from "react";
import ShippingProgress from "@/components/partials/MyCart/ShippingProgress";
import ProductTable from "@/components/partials/MyCart/ProductTable";

export default function MainCartSection({
  cartData,
  realCartData,
  totalCartItemsCount,
  subTotal,
}) {
  const cartValue = cartData.paymentSummary.subtotal;
  const freeShippingThreshold = cartData.freeShippingThreshold;

  return (
    <div className="flex w-full flex-col gap-5">
      <ShippingProgress
        freeShippingThreshold={freeShippingThreshold}
        cartValue={cartValue}
      />
      <ProductTable
        cartItems={realCartData.data}
        totalItems={totalCartItemsCount}
        subtotal={subTotal}
      />
    </div>
  );
}

{
  /* <tr>
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
</tr> */
}
