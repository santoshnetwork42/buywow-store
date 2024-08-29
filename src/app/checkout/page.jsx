import CheckoutClient from "@/components/partials/Checkout";

export const metadata = {
  title: "Checkout",
  description:
    "Complete your purchase with WOW Star. Please enter your shipping address and payment method to proceed with checkout.",
};

const Checkout = () => {
  return <CheckoutClient />;
};

export default Checkout;
