// components/MyCart/CartItem.jsx
import { Img, Text, Heading, Button } from "@/components/common";

export default function CartItem({ product }) {
  return (
    <div className="flex flex-col items-start gap-[15px] self-stretch">
      <div className="ml-[22px] flex w-[83%] items-start justify-between gap-5 sm:flex-col md:ml-0 md:w-full">
        <div className="flex w-[53%] justify-between gap-5 sm:w-full">
          <Img
            src={product.image}
            width={124}
            height={124}
            alt="product thumbnail"
            className="h-[124px] w-[124px] object-cover"
          />
          <div className="flex w-[51%] flex-col gap-[55px] sm:gap-[27px]">
            <div className="flex flex-col items-start gap-[3px]">
              <Text size="text3xl" as="p" className="!font-medium">
                {product.name}
              </Text>
              <Text as="p">Size: {product.size}</Text>
            </div>
            <div className="flex w-[71%] gap-[9px] md:w-full">
              <div className="flex flex-1 flex-wrap items-center gap-[13px] rounded border border-solid border-gray-400_02">
                <Text
                  size="text3xl"
                  as="p"
                  className="flex w-[28px] items-center justify-center bg-lime-50"
                >
                  -
                </Text>
                <Text as="p">1</Text>
                <Text
                  size="text3xl"
                  as="p"
                  className="flex h-[26px] w-[27px] items-center justify-center bg-lime-50"
                >
                  +
                </Text>
              </div>
              <Button className="flex h-[27px] w-[27px] items-center justify-center rounded border border-solid border-gray-400_02 px-1.5">
                <Img src="img_thumbs_up.svg" width={10} height={14} />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-[11%] flex-col items-start gap-[3px] sm:w-full">
          <div className="flex flex-wrap items-center gap-1 self-stretch">
            <Heading as="h2">₹{product.price}</Heading>
            <Text as="p" className="line-through">
              ₹{product.originalPrice}
            </Text>
          </div>
          <Text
            size="textlg"
            as="p"
            className="flex items-center justify-center rounded-[9px] bg-lime-50 px-2 py-px"
          >
            {product.discount} Off
          </Text>
        </div>
      </div>
      <div className="h-px w-full self-stretch bg-black-900_7f" />
    </div>
  );
}
