// components/MyCart/ShippingProgress.jsx
import { Text, Img } from "@/components/common";

export default function ShippingProgress({ amountAwayFromFreeShipping }) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-lg bg-lime-50 p-3 shadow-sm">
      <Text size="base" as="p" className="text-sm" responsive>
        You are
        <span className="font-bold"> ₹{amountAwayFromFreeShipping} </span>
        away from FREE shipping.
      </Text>
      <Img
        src="img_group_1400002432.png"
        width={352}
        height={20}
        alt="shipping icon"
        className="mr-[5%] mt-1 h-5 w-1/2 rounded-full object-cover object-[25%]"
      />
    </div>
  );
}
