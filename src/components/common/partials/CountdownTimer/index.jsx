import { Img, Text, Heading } from "@/components/common";
import React from "react";

const CountdownTimer = ({ days, hours, minutes, seconds, centerText }) => {
  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center rounded-[2px] bg-white-a700_01 px-1 py-0.5">
      <Heading
        size="sm"
        as="p"
        className="font-bold text-blue_gray-300"
        responsive
      >
        {value.toString().padStart(2, "0")}
      </Heading>
      <Text size="xxs" as="p" responsive>
        {label}
      </Text>
    </div>
  );

  const Separator = () => (
    <Heading
      size="sm"
      as="p"
      className="mb-1 self-center text-white-a700_01"
      responsive
    >
      :
    </Heading>
  );

  const timeUnits = [
    { value: days, label: "DYS" },
    { value: hours, label: "HRS" },
    { value: minutes, label: "MIN" },
    { value: seconds, label: "SEC" },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Img
          src="img_image_2038.png"
          width={16}
          height={16}
          alt="sale image"
          className="aspect-square w-4 object-contain"
        />
        <Text as="p" className="text-white-a700_01" size="sm" responsive>
          {centerText}
        </Text>
      </div>
      <div className="flex items-center gap-[3px]">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <TimeUnit value={unit.value} label={unit.label} />
            {index < timeUnits.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
