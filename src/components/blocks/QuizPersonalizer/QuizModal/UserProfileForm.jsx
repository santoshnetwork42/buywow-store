import React, { useEffect, useRef, useState } from "react";
import { Button, Img, Text } from "@/components/elements";
import { twMerge } from "tailwind-merge";
import { SparklesIcon } from "@/assets/svg/quiz";

const ageRanges = [
  { label: "18-24", value: "21" },
  { label: "25-34", value: "30" },
  { label: "35-44", value: "40" },
  { label: "45-54", value: "50" },
  { label: "55+", value: "55" },
];

const GenderIcon = ({ gender, isSelected }) => (
  <div
    className={`mx-auto h-12 w-12 transition-transform duration-300 ${
      isSelected ? "animate-float" : "hover:scale-110"
    }`}
  >
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <defs>
        <linearGradient
          id={`${gender}Gradient`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientTransform="rotate(15)"
        >
          {gender === "female" ? (
            <>
              <stop offset="0%" stopColor="#FF6B8B">
                <animate
                  attributeName="stop-color"
                  values="#FF6B8B; #FF8E8E; #FF6B8B"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#FF8E8E">
                <animate
                  attributeName="stop-color"
                  values="#FF8E8E; #FFA5A5; #FF8E8E"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#4F8EF7">
                <animate
                  attributeName="stop-color"
                  values="#4F8EF7; #56CCF2; #4F8EF7"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#56CCF2">
                <animate
                  attributeName="stop-color"
                  values="#56CCF2; #7BE0FF; #56CCF2"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </>
          )}
        </linearGradient>
      </defs>
      {gender === "female" ? (
        <>
          <circle
            cx="12"
            cy="7"
            r="5"
            stroke={`url(#${gender}Gradient)`}
            strokeWidth="1.5"
            fill="none"
          >
            {isSelected && (
              <animate
                attributeName="r"
                values="5;5.2;5"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <path
            d="M12 12v9M9 16h6M12 21v-3"
            stroke={`url(#${gender}Gradient)`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle
            cx="9"
            cy="13"
            r="5"
            stroke={`url(#${gender}Gradient)`}
            strokeWidth="1.5"
            fill="none"
          >
            {isSelected && (
              <animate
                attributeName="r"
                values="5;5.2;5"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <path
            d="M14 8l6-6M20 2h-6M20 8V2"
            stroke={`url(#${gender}Gradient)`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  </div>
);

export const UserProfileForm = ({ quizConcerns, onSubmit }) => {
  const concerns = quizConcerns?.data?.map((i) => i.attributes);
  const [selectedAgeRange, setSelectedAgeRange] = useState("30");
  const [gender, setGender] = useState("");
  const [concernType, setConcernType] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gender || !concernType) {
      setError("Please select all required fields to continue");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShake(true);
      timeoutRef.current = setTimeout(() => setShake(false), 500);
      return;
    }
    setError("");

    onSubmit({
      ageRange: ageRanges?.find((i) => i.value === selectedAgeRange)?.label,
      gender,
      concernType,
    });
  };

  return (
    <div className="animate-slideUp mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Age Selection */}
        <div className="space-y-4">
          <Text
            className="mb-4 block text-lg font-medium"
            responsive
            as="h6"
            size="lg"
          >
            How old are you?
          </Text>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {ageRanges.map((range) => (
              <Button
                key={range.label}
                type="button"
                onClick={() => setSelectedAgeRange(range.value)}
                className={`rounded-xl border-2 p-3 text-center transition-all hover:scale-105 active:scale-95 ${
                  selectedAgeRange === range.value
                    ? "animate-pulse border-yellow-900 bg-yellow-900/10 font-medium text-yellow-900 shadow"
                    : "border-gray-200 text-gray-600 hover:border-yellow-900/50"
                }`}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Gender Selection */}
        <div className="space-y-4">
          <Text
            className="block text-lg font-medium"
            as="h6"
            responsive
            size="lg"
          >
            Tell us about yourself <span className="text-red-500">*</span>
          </Text>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setGender(option.value)}
                className={`rounded-xl border-2 p-6 transition-all hover:scale-105 active:scale-95 ${
                  gender === option.value
                    ? "border-yellow-900 bg-yellow-900/10 shadow"
                    : "border-gray-200 hover:border-yellow-900/50"
                }`}
              >
                <GenderIcon
                  gender={option.value}
                  isSelected={gender === option.value}
                />
                <span
                  className={`mt-3 block text-lg font-medium ${
                    gender === option.value
                      ? "text-yellow-900"
                      : "text-gray-600"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Concern Type Selection */}
        <div className="space-y-4">
          <Text
            className="text-wow-dark block text-lg font-medium"
            as="h6"
            responsive
            size="lg"
          >
            {`What's your top concern?`} <span className="text-red-500">*</span>
          </Text>
          <div className="grid grid-cols-1 gap-4 px-3 md:grid-cols-3">
            {concerns.map(({ title, image }) => (
              <button
                key={title}
                type="button"
                onClick={() => setConcernType(title)}
                className={`rounded-xl border-2 p-6 transition-all hover:scale-105 active:scale-95 ${
                  concernType === title
                    ? "bg-wow-secondary border-yellow-900 bg-yellow-900/10 shadow"
                    : "border-gray-200 hover:border-yellow-900/50"
                }`}
              >
                <div
                  className={`mx-auto h-24 w-24 transition-transform duration-300 ${
                    concernType === title ? "animate-float" : ""
                  }`}
                >
                  <Img
                    src={image?.data?.attributes?.url}
                    alt={title}
                    quality={55}
                    width={120}
                    height={120}
                    className={`h-full w-full object-contain transition-all duration-300 ${
                      concernType === title
                        ? "brightness-110 filter"
                        : "hover:scale-110"
                    }`}
                  />
                </div>
                <span
                  className={`mt-3 block text-lg font-medium ${
                    concernType === title ? "text-yellow-900" : "text-gray-600"
                  }`}
                >
                  {title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <Text
            as="div"
            className={twMerge(
              "rounded-lg bg-red-50 p-3 text-center text-sm text-red-500",
              shake ? "animate-shake" : "",
            )}
          >
            {error}
          </Text>
        )}

        <Button
          type="submit"
          className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-yellow-900 py-4 font-semibold text-white-a700 shadow-md transition-colors hover:scale-105 hover:bg-yellow-900/90 active:scale-95"
        >
          <div className="sm:ml-5">
            <SparklesIcon className="h-5 w-5" size={20} color="#FFFFFF" />
          </div>
          Get Personalized Recommendations
        </Button>
      </form>
      <Text
        as="p"
        className="my-4 text-center text-gray-700 sm:mt-8"
        size="sm"
        responsive
      >
        Your privacy is important to us. All information is kept secure and
        confidential.
      </Text>
    </div>
  );
};
