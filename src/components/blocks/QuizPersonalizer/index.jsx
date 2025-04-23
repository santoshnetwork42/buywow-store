"use client";
import SectionHeading from "@/components/common/SectionHeading";
import { Button, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import { useEffect, useState } from "react";
import { QuizProblemSelector } from "./QuizModal/QuizProblemSelector";
import { QuizQuestions } from "./QuizModal/QuizQuestion";
import { QuizResults } from "./QuizModal/QuizResults";
import { UserProfileForm } from "./QuizModal/UserProfileForm";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
const Personalizer = ({
  title,
  quizConcerns,
  button,
  quizDescription,
  couponCode,
}) => {
  const { handlePersonalizerModalVisibility } = useModalDispatch();
  const [quizState, setQuizState] = useState({
    recommendedProduct: null,
    answers: [],
    totalScore: 0,
    userProfile: {},
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { buttonLink = "", text: buttonText } = button || {};

  const onUserProfileSubmit = (userProfile) => {
    const problems = quizConcerns?.data
      ?.map((i) => i.attributes)
      ?.find((i) => i.title === userProfile?.concernType)
      ?.subConcerns?.data?.map((i) => i.attributes);

    setQuizState((quizState) => ({
      ...quizState,
      userProfile,
    }));
    setSelectedProblem(problems);
    setActiveIndex((activeIndex) => activeIndex + 1);
  };

  const onProblemSelect = (problem) => {
    setQuizState((quizState) => ({
      ...quizState,
      subConcern: problem,
    }));
    setActiveIndex((activeIndex) => activeIndex + 1);
  };

  const onAnswerSelect = (answer, totalScore) => {
    setQuizState((quizState) => ({
      ...quizState,
      answers: [...(quizState?.answers || {}), answer],
      totalScore,
    }));
  };

  const onResetQuiz = () => {
    setQuizState({
      recommendedProduct: null,
      answers: [],
      totalScore: 0,
      userProfile: {},
    });
    setActiveIndex(0);
  };

  useEffect(() => {
    handlePersonalizerModalVisibility(isOpen);
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col items-center gap-4 bg-yellow-900/10 px-2 py-10 sm:py-14 md:gap-6">
        <SectionHeading title={title} className="sm:mb-1 lg:mb-2" />
        <Text
          className="text-center text-gray-700 max-sm:px-4"
          as="p"
          size="lg"
          responsive
        >
          {quizDescription}
        </Text>
        <Button
          variant="primary"
          size="none"
          className="rounded-full px-6 py-3 text-white-a700 transition-colors duration-300"
          onClick={(e) => {
            setIsOpen((isOpen) => !isOpen);
          }}
        >
          {buttonText}
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={(e) => {
          setIsOpen(false);
          onResetQuiz();
        }}
        showMobileView
        title="Personalized Beauty & Wellness Analysis"
        enableOutsideClick={true}
        modalContainerClassName="!w-full sm:!w-3/5 "
        titleClassName="pb-5 w-full border-b-[1px]"
      >
        <div className="max-h-[460px] overflow-y-scroll px-4 pt-6 sm:max-h-[600px] sm:px-2">
          {activeIndex == 0 && (
            <UserProfileForm
              quizConcerns={quizConcerns}
              onSubmit={onUserProfileSubmit}
            />
          )}
          {activeIndex == 1 && (
            <QuizProblemSelector
              problems={selectedProblem}
              onProblemSelect={onProblemSelect}
            />
          )}
          {activeIndex == 2 && (
            <QuizQuestions
              subConcern={quizState?.subConcern}
              setQuizState={setQuizState}
              setActiveIndex={setActiveIndex}
              onAnswerSelect={onAnswerSelect}
            />
          )}
          {activeIndex == 3 && (
            <QuizResults
              recommendedProduct={quizState?.recommendedProduct}
              onResetQuiz={onResetQuiz}
              setIsOpen={setIsOpen}
              couponCode={couponCode}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Personalizer;
