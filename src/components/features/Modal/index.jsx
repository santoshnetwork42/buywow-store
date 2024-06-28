import React, { useRef } from "react";
import styles from "@/components/features/Modal/Modal.module.scss";
import { Heading } from "@/components/common";
import { CloseIcon } from "@/assets/svg/icons";

const Modal = ({
  title = "",
  description = "",
  isOpen,
  onClose,
  children,
  mobileViewHeight,
  showCloseButtonOutOfBox = false,
  showMobileView = true,
  enableOutsideClick = false,
  enableCloseButton = true,
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
    <div className={`${isOpen ? styles.fadeIn : styles.fadeOut} z-[999]`}>
      {isOpen && (
        <div
          onClick={handleClickOutside}
          className={`${styles.customModalWrapper} ${showMobileView ? "items-end" : "items-center"} bottom-0 left-0 right-0 top-0 sm:rounded-bl-none sm:rounded-br-none md:items-center lg:items-center`}
        >
          <div
            ref={modalRef}
            className={`${styles.innerModal} ${showMobileView ? `${mobileViewHeight} w-full rounded-bl-none rounded-br-none sm:w-full md:h-auto md:rounded-lg lg:h-auto lg:rounded-lg` : ""} rounded-lg md:w-auto lg:w-auto`}
          >
            {enableCloseButton && showCloseButtonOutOfBox && (
              <div
                className={`${styles.closeIcon} cursor-pointer`}
                onClick={onCloseClick}
              >
                <CloseIcon color="white" size={30} />
              </div>
            )}
            <div className={styles.modalHeader}>
              <Heading as="h5" size="heading2xl" className="">
                {title}
              </Heading>
              {enableCloseButton && !showCloseButtonOutOfBox && (
                <div className={`cursor-pointer`}>
                  <CloseIcon color="black" size={28} />
                </div>
              )}
            </div>
            <div>{description}</div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
