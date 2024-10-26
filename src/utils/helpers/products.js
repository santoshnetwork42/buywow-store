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

export const setSoldOutLast = (
  items,
  isContainAttributes = false,
  showProductsOnVariantStockOut = true,
) => {
  let soldOutProducts = [];
  if (items) {
    const products = items
      ?.filter((item) =>
        isContainAttributes
          ? item?.attributes?.fetchedProduct
          : item?.fetchedProduct,
      )
      ?.reduce((acc, item) => {
        const { fetchedProduct: prod } = isContainAttributes
          ? item?.attributes
          : item;

        if (!("hasInventory" in prod)) {
          const { hasInventory } = getProductInventory(prod);
          if (hasInventory) {
            return [
              ...acc,
              { ...item, fetchedProduct: { ...prod, hasInventory } },
            ];
          } else {
            soldOutProducts.push({
              ...item,
              fetchedProduct: { ...prod, hasInventory },
            });
            return acc;
          }
        } else {
          if (prod.hasInventory) {
            return [...acc, { ...item, fetchedProduct: prod }];
          } else {
            soldOutProducts.push({ ...item, fetchedProduct: prod });
            return acc;
          }
        }
      }, []);

    if (!showProductsOnVariantStockOut) {
      const filteredProducts = products?.filter((product) => {
        if (!product?.attributes?.fetchedProduct?.variants?.items?.length) {
          return true;
        }

        const variantsSortedByPosition =
          product?.attributes?.fetchedProduct?.variants?.items
            ?.slice()
            .sort((a, b) => (a.position ?? 1) - (b.position ?? 1));

        let firstVariant = variantsSortedByPosition[0];

        const { inventory: variantInventory, minimumOrderQuantity } =
          firstVariant || {};
        const currentInventory = Math.max(0, variantInventory || 0);

        if (currentInventory === 0 || currentInventory < minimumOrderQuantity) {
          return false;
        }

        return true;
      });
      return [...filteredProducts, ...soldOutProducts];
    }

    return [...products, ...soldOutProducts];
  }
  return [];
};
