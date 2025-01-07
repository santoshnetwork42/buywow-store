"use client";

import LinkClickTracker from "@/components/common/LinkClickTracker";
import SectionHeading from "@/components/common/SectionHeading";
import { Img, Text } from "@/components/elements";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";
import { useEffect, useState } from "react";
import CategoryFlipClock from "./FlipClock";

const CustomCountdown = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const [startHours = "", startMinutes = ""] = startTime
        ?.split(":")
        .map(Number);

      const targetTime = new Date(now);
      targetTime.setHours(startHours, startMinutes, 0);

      // If target time is in the past for today, no countdown needed
      if (targetTime <= now) return { hours: 0, minutes: 0, seconds: 0 };

      const difference = targetTime - now;

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-1 p-1 sm:gap-2">
      <div className="flex flex-col items-center">
        <Text responsive className="rounded bg-white-a700_01 p-1 sm:p-2">
          {formatNumber(timeLeft.hours)}
        </Text>
        <Text responsive className="mt-1 text-white-a700_01">
          HRS
        </Text>
      </div>
      <Text responsive className="mt-[-1rem] text-white-a700_01">
        :
      </Text>
      <div className="flex flex-col items-center">
        <Text responsive className="rounded bg-white-a700_01 p-1 sm:p-2">
          {formatNumber(timeLeft.minutes)}
        </Text>
        <Text responsive className="mt-1 text-white-a700_01">
          MIN
        </Text>
      </div>
      <Text responsive className="mt-[-1rem] font-bold text-white-a700_01">
        :
      </Text>
      <div className="flex flex-col items-center">
        <Text responsive className="rounded bg-white-a700_01 p-1 sm:p-2">
          {formatNumber(timeLeft.seconds)}
        </Text>
        <Text responsive className="mt-1 text-white-a700_01">
          SEC
        </Text>
      </div>
    </div>
  );
};

const CategoryItem = ({ category, size, parentCategoryTitle, priority }) => {
  const {
    image,
    slug,
    title,
    endTime,
    startDate,
    endDate,
    startTime,
    saleMessage,
  } = category;
  const { url, alternativeText } = extractAttributes(image);
  const [showClock, setShowClock] = useState(true);
  const [saleStatus, setSaleStatus] = useState("");

  const imageSize = size === "SMALL" ? 260 : 396;
  const imageHeight = size === "SMALL" ? 260 : 470;
  const aspectRatio = size === "SMALL" ? "aspect-square" : "aspect-[396/470]";

  const linkClassName =
    size === "SMALL"
      ? "w-[calc(33vw-20px)] min-w-[100px] max-w-[260px] sm:w-[26vw] md:w-[24vw] lg:w-[22vw] xl:w-[20vw]"
      : "w-[calc(33vw-12px)] min-w-[112px] sm:w-[28vw] sm:max-w-[396px] md:w-[26vw] lg:w-[24vw] xl:w-[22vw]";

  const getCurrentDateTime = () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-US", { hour12: false });
    const currentDate = now.toISOString().split("T")[0];
    return { currentTime, currentDate };
  };

  const isWithinThreeHoursOfStart = () => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];

    // Check if current date is within the valid date range
    if (!(currentDate >= startDate && currentDate <= endDate)) {
      return false;
    }

    // Parse start time
    const [startHours = "", startMinutes = ""] = startTime
      ?.split(":")
      .map(Number);

    // Create date objects for comparison
    const startTimeDate = new Date(now);
    startTimeDate.setHours(startHours, startMinutes, 0);

    const threeHoursBefore = new Date(startTimeDate);
    threeHoursBefore.setHours(startTimeDate.getHours() - 3);

    // Check if current time is within 3 hours before start time
    return now >= threeHoursBefore && now < startTimeDate;
  };

  const getSaleStatus = () => {
    const { currentTime, currentDate } = getCurrentDateTime();

    if (currentDate > endDate) {
      return "ENDED";
    }

    if (
      currentTime >= startTime &&
      currentTime <= endTime &&
      currentDate >= startDate &&
      currentDate <= endDate
    ) {
      return "LIVE";
    }

    if (
      currentDate >= startDate &&
      currentDate <= endDate &&
      isWithinThreeHoursOfStart()
    ) {
      return "UPCOMING";
    }

    return "NORMAL";
  };

  useEffect(() => {
    // Initial status check
    setSaleStatus(getSaleStatus());

    // Check status every minute
    const statusCheckInterval = setInterval(() => {
      const newStatus = getSaleStatus();
      if (newStatus !== saleStatus) {
        setSaleStatus(newStatus);
        // Force a re-render when status changes
        window.location.reload();
      }
    }, 60000); // Check every minute

    return () => clearInterval(statusCheckInterval);
  }, [startTime, endTime, startDate, endDate]);

  useEffect(() => {
    if (getSaleStatus() === "LIVE") {
      const interval = setInterval(
        () => {
          setShowClock((current) => !current);
          if (!showClock) {
            setTimeout(() => {
              setShowClock(true);
            }, 3000);
          }
        },
        showClock ? 4000 : 3000,
      );

      return () => clearInterval(interval);
    }
  }, [showClock]);

  const LiveIndicator = () => (
    <div className="flex w-full items-center justify-center gap-1 self-end px-2">
      <Text size="xs" className="py-0.5 font-medium text-white-a700_01">
        LIVE
      </Text>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white-a700_01 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white-a700_01"></span>
      </span>
    </div>
  );

  const renderContent = () => {
    const status = saleStatus || getSaleStatus();

    switch (status) {
      case "LIVE":
        return (
          <div className="relative">
            <div
              className={`overflow-hidden rounded sm:rounded-md lg:rounded-lg ${aspectRatio}`}
            >
              <Img
                src={url}
                width={imageSize}
                height={imageHeight}
                alt={alternativeText || `${slug} Image`}
                className="h-auto w-full object-contain"
                priority={priority}
              />
            </div>
            <div className="absolute right-0 top-0.5 mr-0.5 self-end rounded-r-md rounded-bl-md rounded-br-none bg-yellow-900 backdrop-blur-sm backdrop-filter sm:right-1 sm:top-1 sm:mr-0 sm:rounded-r-lg sm:rounded-br-none">
              <div className="relative">
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${showClock ? "visible opacity-100" : "invisible opacity-0"}`}
                >
                  <CategoryFlipClock
                    timer={{
                      type: "DAILY",
                      startTime,
                      endTime,
                      startDate,
                      endDate,
                    }}
                  />
                </div>
                <div
                  className={`absolute inset-0 flex h-full flex-col items-center justify-center transition-all duration-500 ease-in-out ${showClock ? "invisible opacity-0" : "visible opacity-100"}`}
                >
                  <LiveIndicator />
                </div>
                <div className="invisible">
                  <CategoryFlipClock
                    timer={{
                      type: "DAILY",
                      startTime,
                      endTime,
                      startDate,
                      endDate,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "UPCOMING":
        return (
          <div
            className="pointer-events-none relative cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            <div
              className={`overflow-hidden rounded sm:rounded-md lg:rounded-lg ${aspectRatio}`}
            >
              <Img
                src={url}
                width={imageSize}
                height={imageHeight}
                alt={alternativeText || `${slug} Image`}
                className="h-auto w-full object-contain"
                priority={priority}
              />
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-md backdrop-blur-sm">
              <div className="w-full bg-yellow-50 p-1 text-center">
                <Text className="line-clamp-1">{saleMessage || ""}</Text>
              </div>
              <CustomCountdown startTime={startTime} />
            </div>
          </div>
        );

      case "ENDED":
      case "NORMAL":
        return (
          <div
            className={`overflow-hidden rounded sm:rounded-md lg:rounded-lg ${aspectRatio}`}
          >
            <Img
              src={url}
              width={imageSize}
              height={imageHeight}
              alt={alternativeText || `${slug} Image`}
              className="h-auto w-full object-contain"
              priority={priority}
            />
          </div>
        );
    }
  };

  return (
    <LinkClickTracker
      href={saleStatus === "UPCOMING" ? "#" : `/collections/${slug}` || "#"}
      className={`${linkClassName} ${saleStatus === "UPCOMING" ? "pointer-events-none cursor-not-allowed" : ""}`}
      trackingType="SHOP_BY_CLICK"
      onClick={(e) => {
        if (getSaleStatus() === "UPCOMING") {
          e.preventDefault();
        }
      }}
      trackingEventPayload={{
        slug,
        name: title,
        parentCategory: parentCategoryTitle,
        type: parentCategoryTitle,
      }}
    >
      {renderContent()}
      <Text
        size="xl"
        as="p"
        className="m-auto mt-1 line-clamp-1 w-fit break-all border-b border-b-black-900 pb-1 font-medium sm:mt-2 lg:mt-3"
        responsive
      >
        {title}
      </Text>
    </LinkClickTracker>
  );
};

CategoryItem.displayName = "CategoryItem";

const FeaturedCategories = ({
  title,
  featuredCategoryItems: categories,
  featuredItemSize: itemSize = "SMALL",
  lazyBlock,
}) => {
  const sliderClassName = `gap-2 ${
    itemSize === "SMALL" ? "md:gap-2.5" : "sm:gap-3 md:gap-4 lg:gap-5"
  }`;

  if (!categories?.length) return null;

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />
      <Slider className="sm:hidden" sliderClassName={sliderClassName}>
        {categories.reduce((acc, category, index, arr) => {
          if (index % 2 === 0) {
            acc.push(
              <div
                key={`group-${index}`}
                className="flex flex-col max-sm:gap-y-6"
              >
                <CategoryItem
                  category={category}
                  size={itemSize}
                  parentCategoryTitle={title}
                  priority={!lazyBlock}
                />
                {!!arr[index + 1] && (
                  <CategoryItem
                    category={arr[index + 1]}
                    size={itemSize}
                    parentCategoryTitle={title}
                    priority={!lazyBlock}
                  />
                )}
              </div>,
            );
          }
          return acc;
        }, [])}
      </Slider>
      <Slider className="hidden sm:block" sliderClassName={sliderClassName}>
        {categories.map((category, index) => (
          <CategoryItem
            key={`category-${index}`}
            category={category}
            size={itemSize}
            parentCategoryTitle={title}
            priority={!lazyBlock}
          />
        ))}
      </Slider>
    </div>
  );
};

FeaturedCategories.displayName = "FeaturedCategories";

export default FeaturedCategories;
