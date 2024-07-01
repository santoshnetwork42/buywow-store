// components/MyCart/ProductTable.jsx
import React from "react";
import { Heading, Text, Img, Button } from "@/components/common";

export default function ProductTable({ cartItems, totalItems, subtotal }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-t">
          <th className="px-5 py-2 text-left md:px-6">
            <Text size="sm" as="p" className="text-blue_gray-400" responsive>
              PRODUCT
            </Text>
          </th>
          <th />
          <th className="px-4 py-2 text-left font-normal text-blue_gray-400">
            <Text size="sm" as="p" className="text-blue_gray-400" responsive>
              PRICE
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="px-4 py-4">
              <div className="flex items-center">
                <Img
                  src={item.image}
                  alt={item.name}
                  width={124}
                  height={124}
                  className="mr-4 aspect-[65/77] h-24 w-24 rounded-lg object-cover md:aspect-square"
                />
                <div>
                  <Text size="text3xl" as="p" className="!font-medium">
                    {item.name}
                  </Text>
                  <Text as="p">Size: {item.size}</Text>
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center rounded-md border">
                      <Button className="bg-lime-50 px-3 py-1">-</Button>
                      <Text as="span" className="px-3 py-1">
                        {item.quantity || 1}
                      </Text>
                      <Button className="bg-lime-50 px-3 py-1">+</Button>
                    </div>
                    <Button className="ml-2 rounded-md border p-1">
                      <Img src="img_thumbs_up.svg" width={10} height={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 text-right">
              <div>
                <Heading as="h2" className="inline">
                  ₹{item.price}
                </Heading>
                <Text as="span" className="ml-2 line-through">
                  ₹{item.originalPrice}
                </Text>
              </div>
              <Text
                size="textlg"
                as="p"
                className="mt-1 inline-block rounded-md bg-lime-50 px-2 py-1"
              >
                {item.discount} Off
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="px-4 py-4">
            <Heading as="h3">{totalItems} Items</Heading>
          </td>
          <td className="px-4 py-4 text-right">
            <Heading as="h4">₹{subtotal}</Heading>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
