import { BagIconV2, CloseIcon } from "@/assets/svg/icons";
import { Text } from "@/components/elements";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { SOCIAL_PROOF_INCLUDE_PATHS } from "@/utils/data/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProductThumbnail from "../Product/ProductThumbnail";

const Toast = ({
  image,
  timeAgo = 2,
  title = "",
  slug = "",
  purchasedFrom = "",
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false); // Start as not visible
  const [isExiting, setIsExiting] = useState(false); // Track exit animation
  const [stickyBarExist, setStickyBarExist] = useState(false);
  const { customEvent } = useEventsDispatch();

  const timerRef = useRef(null);
  const exitTimerRef = useRef(null);
  const showTimerRef = useRef(null);

  useEffect(() => {
    // Start entrance animation right after mounting
    showTimerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    timerRef.current = setTimeout(() => {
      // Start exit animation
      setIsExiting(true);
      // Wait for animation to complete before unmounting
      exitTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 300); // Match the duration in the CSS transition
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
    };
  }, [onClose]);

  useEffect(() => {
    const checkStickyBar = () => {
      const stickyBar = document.getElementById("add-to-cart-sticky-bar");
      setStickyBarExist(!!stickyBar);
    };

    window.addEventListener("scroll", checkStickyBar);
    window.addEventListener("resize", checkStickyBar);
    checkStickyBar();

    return () => {
      window.removeEventListener("scroll", checkStickyBar);
      window.removeEventListener("resize", checkStickyBar);
    };
  }, []);

  if (!isVisible && isExiting) return null;

  return (
    <div
      className={`fixed left-1/2 z-[9999] w-[calc(100vw-2rem)] max-w-[500px] -translate-x-1/2 transform rounded-lg bg-[#f7f2ed] px-4 py-3 shadow-lg transition-all duration-300 ease-in-out sm:left-8 sm:-translate-x-0 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      } ${stickyBarExist ? "bottom-20 sm:bottom-16" : "bottom-4 sm:bottom-16"}`}
    >
      <div className="flex w-full items-center space-x-3 overflow-clip rounded-lg">
        <div
          className={`flex-shrink-0 bg-white-a700 ${!!image ? "rounded-xl p-1" : "rounded-full p-2"}`}
        >
          {!!image ? (
            <div
              className={`flex aspect-[74/80] w-14 items-center overflow-hidden sm:w-20`}
            >
              <ProductThumbnail
                height={80}
                width={80}
                imageKey={image}
                className="scale-110"
              />
            </div>
          ) : (
            <BagIconV2 size={24} stroke="#DD8434" />
          )}
        </div>
        <div className="flex max-h-28 grow flex-col gap-y-0.5 sm:gap-y-1">
          <div className="flex">
            <Text size="sm" className="grow text-gray-700 sm:text-base">
              Someone in <b className="capitalize">{`${purchasedFrom}`}</b>{" "}
              Purchased
            </Text>
            <div
              className="hover:scale-125 hover:cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsVisible(false);
                onClose();
              }}
            >
              <CloseIcon size={28} />
            </div>
          </div>
          <Link
            href={slug ? `/products/${slug}` : "#"}
            className="hover:underline"
          >
            <Text
              size="base"
              className="line-clamp-2 sm:text-lg"
              onClick={(e) => {
                if (!slug) {
                  e.preventDefault(); // Prevents navigation if slug is not present
                  return;
                }
                customEvent({
                  event: "social_proof_section_clicked",
                  source: "social_proof_section_toaster",
                  slug: slug,
                });
              }}
            >
              {title}
            </Text>
          </Link>
          <Text size="xs" className="pt-2 text-gray-700 sm:text-sm">
            {(timeAgo || Math.floor(Math.random() * 5) + 1) + " minutes ago"}
          </Text>
        </div>
      </div>
    </div>
  );
};

const FomoToaster = ({
  livePurchaseFeedProducts: products,
  interval = 15000,
  isFomoDisabled,
}) => {
  const pathname = usePathname();

  const isSocialProofToShow = SOCIAL_PROOF_INCLUDE_PATHS.some(
    (allowedPath) =>
      pathname === allowedPath ||
      (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
  );

  const [toasts, setToasts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products.length === 0) return;

    const addToast = () => {
      if (!isSocialProofToShow) {
        return;
      }
      const product = products[currentIndex];
      const newToast = {
        ...product,
        id: Date.now(),
      };
      setToasts([newToast]);
      setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const toastInterval = setInterval(addToast, interval);

    return () => {
      clearInterval(toastInterval);
    };
  }, [products, currentIndex, interval, isSocialProofToShow]);

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  if (!isSocialProofToShow || !products?.length || isFomoDisabled) {
    return <></>;
  }

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...(toast || {})}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

export default FomoToaster;
