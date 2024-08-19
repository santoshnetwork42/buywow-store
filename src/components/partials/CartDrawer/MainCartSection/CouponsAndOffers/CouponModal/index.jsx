import { Button, Heading, Img, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import React from "react";

const CouponModal = ({ isOpen, onClose, appliedCoupon }) => (
  <Modal
    isOpen={isOpen}
    showMobileView={false}
    onClose={onClose}
    showConfetti={true}
    modalContainerClassName="max-w-[min(400px,88vw)] w-full p-0 rounded overflow-hidden md:w-full"
  >
    <div className="flex items-center justify-between px-5 py-1">
      <div className="flex flex-col gap-1">
        <Heading as="h5" size="base" className="text-sm" responsive>
          Coupon applied
        </Heading>
        <Heading
          as="h3"
          size="xl"
          className="text-lg font-bold text-yellow-900"
          responsive
        >
          {appliedCoupon?.code}
        </Heading>
      </div>
      <div className="aspect-square size-[68px]">
        <Img
          src="img_coupon_modal.png"
          width={68}
          height={68}
          alt="Coupon"
          className="aspect-square h-auto w-full"
        />
      </div>
    </div>
    <div className="flex flex-col items-center gap-4 bg-deep_orange-50_03 px-5 py-4">
      <div className="flex w-full flex-col gap-1">
        <Heading
          as="h4"
          size="base"
          className="line-clamp-2 text-sm"
          responsive
        >
          {appliedCoupon?.couponTitle}
        </Heading>
        <Text as="span" size="sm" className="line-clamp-3" responsive>
          Applicable on hair, skin, body and kids products.
        </Text>
      </div>
      <Button variant="primary" size="small" onClick={onClose}>
        Okay
      </Button>
    </div>
  </Modal>
);

export default React.memo(CouponModal);
