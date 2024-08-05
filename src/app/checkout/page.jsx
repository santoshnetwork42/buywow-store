// Checkout page component
import Address from "@/components/common/Address";
import OrderSection from "@/components/partials/Checkout/OrderSection";

export default function Checkout() {
  return (
    <>
      {/* Main container for the Checkout page */}
      <div className="container-main mb-8 flex w-full flex-col justify-center gap-8 py-4 sm:gap-10 md:flex-row lg:gap-12">
        <Address />
        <OrderSection />
      </div>
    </>
  );
}
