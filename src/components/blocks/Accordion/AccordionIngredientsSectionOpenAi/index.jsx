"use client";

import IngredientIcon from "@/assets/svg/ingredientIcon";
import { Heading, Img, Text } from "@/components/elements";
import ToggleArrow from "@/components/features/Accordion/AccordionToggle";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { extractAttributes } from "@/utils/helpers";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

const AccordionIngredientsSectionOpenAi = ({
  accordionIngredientsOpenAITitle: title,
  accordionIngredientsOpenAIImage: image,
  ingredientList = "",
  accordionIngredientsOpenAIshowComponentInWeb: showComponentInWeb,
  mains,
}) => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const ingredientDetails = mains?.data?.map((ing) => ing?.attributes) || [];
  const { customEvent } = useEventsDispatch();

  const { url: accordionImageUrl, alternativeText: accordionImageAlt } =
    useMemo(() => {
      return extractAttributes(image) || {};
    }, [image]);

  const plainDescription = useMemo(() => {
    return ingredientList?.replace(/<[^>]*>/g, "").trim();
  }, [ingredientList]);

  const allIngredients = useMemo(() => {
    return (
      plainDescription
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean) || []
    );
  }, [plainDescription]);

  const noOfIngredients = allIngredients?.length || 0;
  const numberOfIngredientsToShow = 3;

  const firstThreeIngredients = useMemo(() => {
    return plainDescription
      .split(", ")
      .slice(0, numberOfIngredientsToShow)
      .map((item) =>
        item
          .replace(/\s*\([^)]*\)/g, "") // removes brackets
          .split(/\s+/)
          .slice(0, 2)
          .join(" "),
      );
  }, [plainDescription]);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState(null);

  const toggleAccordion = () =>
    setIsOpen((prev) => {
      if (!prev) {
        customEvent({
          event: "ingredient_section_full_list_viewed",
          source: "key_ingredient_section",
          slug: slug,
        });
      }
      return !prev;
    });
  const handleIngredientHover = (ingredient) => {
    setActiveIngredient(ingredient);
    customEvent({
      event: "key_ingredient_hovered",
      source: "key_ingredient_section",
      slug: slug,
      ingredient: ingredient,
    });
  };
  const clearActiveIngredient = () => setActiveIngredient(null);

  if (!title || !showComponentInWeb) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "flex w-full flex-col justify-center gap-4 border-b py-3 sm:rounded-lg",
        !isOpen ? "pb-0" : "",
      )}
    >
      <div className="flex w-full items-center" onClick={toggleAccordion}>
        {accordionImageUrl && (
          <div className="aspect-square w-6 md:w-7">
            <Img
              src={accordionImageUrl}
              width={26}
              height={26}
              alt={accordionImageAlt || title}
              className="aspect-square h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
        )}
        <Heading
          size="lg"
          as="h2"
          className={twMerge(
            "ml-2 line-clamp-2 w-fit flex-grow md:ml-2.5",
            "max-sm:text-base",
          )}
          responsive
        >
          {title}
        </Heading>
        <div className="mr-1.5 flex items-center justify-center gap-2 transition-all duration-700 ease-in-out">
          <ToggleArrow open={isOpen} size={16} />
        </div>
      </div>
      <div className="relative flex flex-wrap items-end gap-2 capitalize md:px-5 lg:px-7">
        {ingredientDetails.map((ingredient, idx) => {
          const {
            benefits,
            text: description = "",
            title: name = "",
          } = ingredient || {};
          return (
            <div
              key={`ingredient-${idx}`}
              onMouseEnter={() => handleIngredientHover(name)}
              onMouseLeave={clearActiveIngredient}
            >
              <Text
                as="p"
                size="sm"
                className="w-fit rounded-full bg-[#f7f2ed] px-2 py-1 font-medium text-yellow-900 md:px-2.5"
                onClick={() => handleIngredientHover(name)}
              >
                {name}
              </Text>
              {activeIngredient === name && (
                <div className="absolute z-[99] mt-2 max-w-72 rounded-xl border bg-white-a700 p-3 shadow-xl">
                  <Text as="h4" className="mb-2 font-medium text-gray-900">
                    {name}
                  </Text>
                  <Text as="p" className="mb-2 text-sm text-gray-600">
                    {description}
                  </Text>
                  <div className="flex flex-wrap gap-1">
                    {benefits
                      ?.split(",")
                      .map((item) => item.trim())
                      .filter(Boolean)
                      ?.map((benefit, i) => (
                        <span
                          key={i}
                          className="flex rounded-full bg-[#f7f2ed] px-4 py-1 text-sm text-yellow-900"
                        >
                          {benefit}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {noOfIngredients > numberOfIngredientsToShow && !isOpen && (
          <Text
            as="span"
            size="sm"
            className="w-fit cursor-pointer rounded-full bg-[#f7f2ed] px-2 py-1 font-medium text-gray-600 md:px-2.5"
            onClick={toggleAccordion}
          >
            {`+${noOfIngredients - numberOfIngredientsToShow} more`}
          </Text>
        )}
      </div>
      {!isOpen && (
        <div
          className="mr-1.5 flex items-center justify-center gap-2 transition-all duration-700 ease-in-out"
          onClick={() => {
            if (!isOpen) {
              toggleAccordion();
            }
          }}
        >
          <Text size="sm" className="text-gray-600">
            {"Show Full List"}
          </Text>
          <ToggleArrow
            open={isOpen}
            size={10}
            variant={"small"}
            className={"!pt-1"}
          />
        </div>
      )}

      {/* ISOPEN THEN SHOW CONTAIN BELOWED */}
      <div
        className={twMerge(
          "overflow-scroll opacity-100 transition-all duration-300 ease-in-out sm:px-3 md:px-5 lg:px-7",
          isOpen ? "my-2.5 max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="sticky -top-[1px] flex items-start space-x-2 bg-white-a700 pb-2 sm:top-0">
          <IngredientIcon size={20} />
          <Text as="p" size="sm" className="text-gray-600">
            Full ingredients as listed on package:
          </Text>
        </div>
        {/* <ReadMore content={description} maxLength={200} isHtml /> */}
        <Text
          as="p"
          size="base"
          className="overflow-hidden text-sm !leading-relaxed"
          responsive
        >
          <span
            className=""
            dangerouslySetInnerHTML={{ __html: ingredientList }}
          />
        </Text>
      </div>
      {isOpen && (
        <div
          className="mb-2 mr-1.5 flex items-center justify-center gap-2 transition-all duration-700 ease-in-out"
          onClick={() => {
            if (isOpen) {
              toggleAccordion();
            }
          }}
        >
          <Text size="sm" className="text-gray-600">
            {"Show Less"}
          </Text>
          <ToggleArrow
            open={isOpen}
            size={10}
            variant={"small"}
            className={"!pt-1"}
          />
        </div>
      )}
    </div>
  );
};
export default AccordionIngredientsSectionOpenAi;
