// components/MyCart/SubOfferItem.jsx
import React from "react";
import { Text } from "@/components/common";

export default function SubOfferItem({ subOffer }) {
  return (
    <div className="mb-4 rounded border p-4">
      <Text size="lg" className="mb-2 font-semibold">
        {subOffer.code}
      </Text>
      <Text size="base">{subOffer.description}</Text>
    </div>
  );
}
