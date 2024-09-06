import { Img, Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import { extractAttributes } from "@/utils/helpers";

const IngredientItem = ({ text, imageUrl, imageAlt }) => (
  <div className="flex gap-2">
    <Img
      src={imageUrl}
      width={22}
      height={22}
      alt={imageAlt}
      className="aspect-square h-auto w-6 object-contain"
    />
    <div>
      <Text as="span" size="sm" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  </div>
);

IngredientItem.displayName = "IngredientItem";

const AccordionIngredients = ({
  accordionIngredientsTitle,
  accordionIngredientsImage: image,
  ingredientItems,
}) => {
  if (!accordionIngredientsTitle || !ingredientItems?.data) {
    return null;
  }

  const { url: accordionImageUrl, alternativeText: accordionImageAlt } =
    extractAttributes(image) || {};
  const ingredients = ingredientItems.data;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return null;
  }

  return (
    <Accordion
      title={accordionIngredientsTitle}
      imgUrl={accordionImageUrl}
      alternativeText={accordionImageAlt}
    >
      <div className="flex flex-col gap-3 md:gap-4">
        {ingredients.map((item, index) => {
          if (!item?.attributes) return null;

          const { text, subText, image } = item.attributes;
          const {
            url: ingredientImageUrl,
            alternativeText: ingredientImageAlt,
          } = extractAttributes(image) || {};

          return (
            <IngredientItem
              key={`ingredient-${index}`}
              text={text}
              imageUrl={ingredientImageUrl}
              imageAlt={ingredientImageAlt}
            />
          );
        })}
      </div>
    </Accordion>
  );
};

export default AccordionIngredients;
