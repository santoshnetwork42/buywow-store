import { Text } from "@/components/elements";
import FlipClock from "@/components/partials/Others/FlipClock";

const AnnouncementBar = ({ leftText, centerContent, rightText }) => {
  return (
    <div className="container-main flex justify-center bg-blue_gray-400_01 py-1 md:py-2">
      <div className="flex flex-1 items-center justify-between gap-5">
        <Text
          as="p"
          className="shrink-0 text-white-a700_01 max-lg:hidden lg:w-[28%]"
          size="sm"
        >
          {leftText}
        </Text>
        <div className="m-auto flex w-auto shrink-0 items-center justify-center">
          {centerContent.isTimer === true ? (
            <FlipClock
              targetDate={centerContent.targetDate}
              centerText={centerContent.centerText}
            />
          ) : (
            <Text as="p" className="py-0.5 text-white-a700_01" size="sm">
              {centerContent.centerText}
            </Text>
          )}
        </div>
        <Text
          as="p"
          className="text-end text-white-a700_01 max-lg:hidden lg:w-[28%]"
          size="sm"
        >
          {rightText}
        </Text>
      </div>
    </div>
  );
};

export default AnnouncementBar;
