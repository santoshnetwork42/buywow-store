// Checkout page component
import OrderSection from "@/components/partials/Checkout/OrderSection";

export default function Checkout() {
  return (
    <>
      {/* Main container for the Checkout page */}
      <div className="container-main mb-8 flex w-full flex-col items-center gap-8 sm:gap-10 lg:gap-12">
        <OrderSection />
      </div>
    </>
  );
}
