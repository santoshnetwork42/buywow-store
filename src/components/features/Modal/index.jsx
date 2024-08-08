"use client";

import React, { useRef } from "react";
import { Heading } from "@/components/elements";
import { CloseIcon } from "@/assets/svg/icons";
import { twMerge } from "tailwind-merge";

const Modal = ({
  title = "",
  description = "",
  isOpen,
  onClose = () => {},
  children,
  mobileViewHeight,
  showCloseButtonOutOfBox = false,
  showMobileView = true,
  enableOutsideClick = false,
  enableCloseButton = true,
  modalContainerClassName,
}) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      enableOutsideClick &&
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {
      onCloseClick();
    }
  };

  const onCloseClick = (args) => {
    onClose(args);
  };

  return (
    <div className={`fixed z-[999] ${isOpen ? "fade-in" : "fade-out"}`}>
      {!!isOpen && (
        <div
          onClick={handleClickOutside}
          className={twMerge(
            "fixed inset-0 flex justify-center bg-black-900 bg-opacity-20",
            showMobileView ? "items-end" : "items-center",
            "md:items-center",
          )}
        >
          <div
            ref={modalRef}
            className={twMerge(
              "relative rounded-lg bg-white-a700 p-4 md:w-auto",
              showMobileView
                ? twMerge(
                    mobileViewHeight,
                    "w-full rounded-bl-none rounded-br-none md:h-auto md:w-auto md:rounded-lg",
                  )
                : "",
              modalContainerClassName,
            )}
          >
            {!!enableCloseButton && !!showCloseButtonOutOfBox && (
              <div
                className="absolute -right-1 -top-7 cursor-pointer"
                onClick={onCloseClick}
              >
                <CloseIcon color="white" size={30} />
              </div>
            )}
            {!!title && (
              <div className="flex items-center justify-between">
                <Heading as="h5" size="xl" className="">
                  {title}
                </Heading>
                {!!enableCloseButton && !showCloseButtonOutOfBox && (
                  <div className="cursor-pointer" onClick={onCloseClick}>
                    <CloseIcon color="black" size={28} />
                  </div>
                )}
              </div>
            )}
            {!!description && <div>{description}</div>}
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
