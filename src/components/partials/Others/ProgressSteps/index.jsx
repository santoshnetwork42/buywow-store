import { ArrowIconSVG } from "@/assets/svg/icons";
import { Text } from "@/components/elements";
import React from "react";

const ProgressSteps = React.memo(({ activeStep, className }) => {
  const steps = [
    { label: "Shopping Cart" },
    { label: "Checkout" },
    { label: "Order Complete" },
  ];

  return (
    <div
      className={`hidden flex-wrap items-center justify-center gap-2 md:flex ${className}`}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          {index > 0 && (
            <ArrowIconSVG
              size={18}
              strokeColor={index === activeStep ? "#000" : "#666666bb"}
            />
          )}
          <Text
            as="h3"
            size="xl"
            className={`uppercase ${index === activeStep - 1 ? "font-medium" : "text-gray-600/90"}`}
          >
            {`${index + 1}. ${step.label}`}
          </Text>
        </React.Fragment>
      ))}
    </div>
  );
});

ProgressSteps.displayName = "ProgressSteps";

export default ProgressSteps;
