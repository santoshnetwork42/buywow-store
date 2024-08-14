"use client";

import React, { useRef, useState, useEffect } from "react";
import { Heading } from "@/components/elements";
import { CloseIcon } from "@/assets/svg/icons";
import { twMerge } from "tailwind-merge";
import Confetti from "./Confetti";

const Modal = ({
  title = "",
  description = "",
  isOpen,
  onClose = () => {},
  children,
  mobileViewHeight,
  showConfetti,
  showCloseButtonOutOfBox = false,
  showMobileView = true,
  enableOutsideClick = true,
  enableCloseButton = true,
  modalContainerClassName,
}) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        enableOutsideClick &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, enableOutsideClick, onClose]);

  const onCloseClick = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[999] transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      {isVisible && (
        <>
          {showConfetti && <Confetti />}
          <div
            className={twMerge(
              "fixed inset-0 z-20 flex justify-center bg-black-900 bg-opacity-20 transition-opacity duration-300",
              showMobileView ? "items-end" : "items-center",
              "md:items-center",
              isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              ref={modalRef}
              className={twMerge(
                "relative rounded-lg bg-white-a700 p-4 transition-transform duration-300 md:w-auto",
                showMobileView
                  ? twMerge(
                      mobileViewHeight,
                      "w-full rounded-bl-none rounded-br-none md:h-auto md:w-auto md:rounded-lg",
                    )
                  : "",
                modalContainerClassName,
                isOpen
                  ? "translate-y-0"
                  : "translate-y-full md:translate-y-0 md:scale-95",
              )}
              onClick={(e) => e.stopPropagation()}
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
        </>
      )}
    </div>
  );
};

export default Modal;
