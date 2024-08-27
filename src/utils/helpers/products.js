export const getFirstVariantPriority = (product, variantId) => {
  if (!product) return {};
  const { variants = {} } = product || {};
  const { items = [] } = variants || {};

  let firstVariant;
  if (variantId) {
    firstVariant = items.find((v) => v.id === variantId);
  }

  if (!firstVariant) {
    const variantsSortedByPosition =
      ([...items] || []).sort((a, b) => a.position - b.position) || [];
    let firstVariant = variantsSortedByPosition[0];
    if (variantsSortedByPosition) {
      for (let index = 0; index < variantsSortedByPosition.length; index++) {
        const element = variantsSortedByPosition[index];
        if (element.inventory && element.inventory > 0) {
          firstVariant = element;
          break;
        }
      }
    }
    return { firstVariant };
  }

  return {
    firstVariant,
  };
};

export const getProductInventory = (product, selectedVariantId = null) => {
  const {
    continueSellingOutOfStock,
    isInventoryEnabled,
    inventory = 0,
    variants = {},
    availability,
  } = product;
  const { items = [] } = variants;

  if (isInventoryEnabled) {
    if (!continueSellingOutOfStock) {
      if (items.length) {
        if (!selectedVariantId) {
          const { firstVariant } = getFirstVariantPriority(product);
          const { inventory: variantInventory } = firstVariant;
          return {
            hasInventory: !!variantInventory,
            currentInventory: variantInventory,
          };
        } else {
          const selectedVariant = items.find((s) => s.id === selectedVariantId);
          const { inventory: variantInventory } = selectedVariant || {};
          return {
            hasInventory: !!variantInventory,
            currentInventory: variantInventory,
          };
        }
      } else {
        return {
          hasInventory: !!inventory,
          currentInventory: inventory,
        };
      }
    }
  }

  return {
    hasInventory: !availability || availability === "in stock",
    currentInventory: 99,
  };
};

export const setSoldOutLast = (items) => {
  let soldOutProducts = [];
  if (items) {
    const products = items.filter(Boolean).reduce((acc, item) => {
      const { fetchedProduct: prod } = item;
      if (!("hasInventory" in prod)) {
        const { hasInventory } = getProductInventory(prod);
        if (hasInventory) {
          return [...acc, { ...{ fetchedProduct: prod, hasInventory } }];
        } else {
          soldOutProducts.push({ ...{ fetchedProduct: prod, hasInventory } });
          return acc;
        }
      } else {
        if (prod.hasInventory) {
          return [...acc, { fetchedProduct: prod }];
        } else {
          soldOutProducts.push({ fetchedProduct: prod });
          return acc;
        }
      }
    }, []);
    return [...products, ...soldOutProducts];
  }
  return [];
};
