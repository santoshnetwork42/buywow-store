import { Button, Img, Text } from "@/components/elements";

export const QuizProblemSelector = ({ problems, onProblemSelect }) => {
  return (
    <div className="">
      <Text className="mb-8 text-center text-gray-600" as="p">
        Select your specific concern to get personalized recommendations
      </Text>
      <div className="mx-auto mb-10 grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
        {problems.map(({ image, title, ...rest }) => (
          <Button
            key={title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex w-full flex-col items-center rounded-xl bg-yellow-900/10 p-6 transition-all hover:scale-105 hover:border-2 hover:border-yellow-900 hover:shadow-xl active:scale-105`}
            onClick={() => onProblemSelect({ image, title, ...rest })}
          >
            <div
              className={`hover:animate-float mx-auto h-20 w-20 transition-transform duration-300`}
            >
              <Img
                src={image?.data?.attributes?.url}
                alt={title}
                quality={55}
                width={80}
                height={80}
                className={`hover:brightness-110" h-full w-full object-contain transition-all duration-300 hover:scale-110`}
              />
            </div>
            <span className="text-center text-lg font-medium">{title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
