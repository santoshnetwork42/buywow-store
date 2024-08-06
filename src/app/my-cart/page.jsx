"use client";

import CartHeader from "@/components/partials/MyCart/CartHeader";
import CartSidebar from "@/components/partials/MyCart/CartSidebar";
import MainCartSection from "@/components/partials/MyCart/MainCartSection";
import DeliveryInfoSection from "@/components/partials/Others/DeliveryInfoSection";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { useNavBarState } from "@/utils/context/navbar";
import { deliveryInfoData } from "@/utils/data/homeData";
import { myCartData } from "@/utils/data/myCartData";
import { useCartItems, useCartTotal, useInventory } from "@wow-star/utils";
import { useDispatch } from "react-redux";

export default function MyCart() {
  const dispatch = useDispatch();

  const cartData = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const validateCart = (payload) => {
    dispatch({
      type: cartSagaActions.VALIDATE_CART,
      payload,
    });
  };

  const inventory = useInventory({ validateCart });
  const { inventoryMapping } = inventory;

  const { isRewardApplied } = useNavBarState();

  const {
    totalListingPrice,
    totalPrice,
    shippingTotal,
    totalAmountSaved: totalSaved,
    couponTotal,
    grandTotal,
    prepaidDiscount,
    codCharges,
    prepaidDiscountPercent,
    usableRewards,
    totalItems = 0,
  } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied,
  });

  return (
    <>
      {/* Main container for the cart page */}
      <div className="container-main mb-8 flex w-full flex-col items-center gap-8 sm:gap-10 lg:gap-12">
        {/* Main cart section and sidebar */}
        <div className="mt-3 grid w-full grid-cols-1 gap-3 md:mt-4 md:grid-cols-[55%_auto] md:gap-4 md:gap-x-10 lg:grid-cols-[60%_auto] lg:gap-x-14 xl:gap-x-20">
          {/* Displays cart header and cart items count */}
          <CartHeader
            itemCount={totalItems}
            className="max-md:ml-1 md:col-span-2"
          />
          {/* Displays cart items, shipping progress, and cart summary */}
          <MainCartSection
            cartData={cartData}
            totalCartItems={totalItems}
            subTotal={totalPrice}
            inventoryMapping={inventoryMapping}
          />

          {/* Displays offers and payment summary */}
          <CartSidebar
            offers={myCartData.offers}
            cashback={myCartData.cashback}
            totalPrice={totalPrice}
            totalListingPrice={totalListingPrice}
            couponTotal={couponTotal}
            prepaidDiscount={prepaidDiscount}
            prepaidDiscountPercent={prepaidDiscountPercent}
            shippingTotal={shippingTotal}
            usableRewards={usableRewards}
            grandTotal={grandTotal}
            totalSaved={totalSaved - codCharges}
          />
        </div>

        {/* Delivery information section */}
        <DeliveryInfoSection data={deliveryInfoData} />
      </div>
    </>
  );
}
