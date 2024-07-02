// components/MyCart/OfferSidebar.jsx
import React from "react";
import { Button, Heading } from "@/components/common";
import SubOfferItem from "../SubOfferItem";
import Sidebar from "@/components/common/Sidebar";

export default function OfferSidebar({ isOpen, onClose, offer }) {
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} position="right" width="400px">
      <div className="flex h-full flex-col p-6">
        <div className="mb-6 flex items-center justify-between">
          <Heading size="xl" as="h3" className="font-bold">
            {offer.heading}
          </Heading>
          <Button onClick={onClose} className="text-gray-500">
            &times;
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {offer.subOffers &&
            offer.subOffers.map((subOffer, index) => (
              <SubOfferItem key={index} subOffer={subOffer} />
            ))}
        </div>
      </div>
    </Sidebar>
  );
}
