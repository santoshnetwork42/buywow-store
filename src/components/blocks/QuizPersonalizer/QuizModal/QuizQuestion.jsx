import React, { use, useEffect, useMemo, useState } from "react";
import { ShieldIcon, AwardIcon, ClockIcon } from "@/assets/svg/quiz";
import { Img } from "@/components/elements";

// import { ShieldIconIconIconIcon, Award, Clock } from "lucide-react";

export const QuizQuestions = ({
  subConcern,
  onAnswerSelect,
  setQuizState,
  setActiveIndex,
}) => {
  const { Questions, RecommendedProducts, image, title } = subConcern || {};
  const questionsLength = Questions?.length || 1;

  const [answersTotalScore, setAnswersTotalScore] = useState(0);

  const onOptionSelected = (id, score, label) => {
    onAnswerSelect({ id, value: score, label }, answersTotalScore + score);
    setAnswersTotalScore((oldScore) => oldScore + score);
    setCurrentQuestionIndex((index) => index + 1);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const recommendedProduct = useMemo(() => {
    if (currentQuestionIndex === questionsLength) {
      return RecommendedProducts.find(
        (item) =>
          answersTotalScore >= item.minScore &&
          answersTotalScore < item.maxScore,
      );
    }
    return null;
  }, [answersTotalScore, RecommendedProducts, currentQuestionIndex, Questions]);

  useEffect(() => {
    if (!!recommendedProduct) {
      setActiveIndex((index) => index + 1);
      setQuizState((quizState) => ({ ...quizState, recommendedProduct }));
    }
  }, [recommendedProduct]);

  if (currentQuestionIndex >= questionsLength) {
    return <></>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full`}
          >
            <div
              className={`mx-auto h-12 w-12 rounded-full bg-yellow-900/10 p-1 transition-transform duration-300`}
            >
              <Img
                src={image?.data?.attributes?.url}
                alt={title}
                quality={55}
                width={40}
                height={40}
                className={`h-full w-full object-contain transition-all duration-300 hover:scale-110 hover:brightness-110 hover:filter`}
              />
            </div>
          </div>
          <h2 className="text-wow-primary text-xl font-bold">
            {title} Analysis
          </h2>
        </div>

        {/* Trust Indicators */}
        {/* <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-yellow-900/10 p-4 text-center">
            <ShieldIcon className="text-wow-primary mx-auto mb-2 h-6 w-6" />
            <p className="text-sm text-gray-700">Expert Analysis</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-yellow-900/10 p-4 text-center">
            <AwardIcon className="text-wow-primary mx-auto mb-2 h-6 w-6" />
            <p className="text-sm text-gray-700">Proven Results</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-yellow-900/10 p-4 text-center">
            <ClockIcon className="text-wow-primary mx-auto mb-2 h-6 w-6" />
            <p className="text-sm text-gray-700">2-Min Analysis</p>
          </div>
        </div> */}

        <div className="space-y-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Step {currentQuestionIndex + 1} of {questionsLength}
            </span>
            <span>
              {Math.round(((currentQuestionIndex + 1) / questionsLength) * 100)}
              % Complete
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-yellow-900 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questionsLength) * 100}%`,
              }}
            />
          </div>

          {Questions?.map(({ question, options }, index) => {
            if (index === currentQuestionIndex)
              return (
                <>
                  <h3 className="text-lg">{question}</h3>
                  <div className="space-y-3">
                    {options.map(({ label, id, score }) => (
                      <button
                        key={id}
                        className="w-full rounded-lg border-2 border-gray-200 p-4 text-left transition-colors hover:border-yellow-900 hover:bg-yellow-900/10"
                        onClick={() => onOptionSelected(id, score, label)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              );

            return <></>;
          })}
        </div>
      </div>
    </div>
  );
};
