import { useDispatch } from "react-redux";
import { recentlyViewedSagaActions } from "../sagaActions/recentlyViewed.action";

export const useRecentlyViewedDispatch = () => {
  const dispatch = useDispatch();

  const addRecentlyViewedProduct = (product) => {
    dispatch({
      type: recentlyViewedSagaActions.ADD_RECENTLY_VIEWED_PRODUCT,
      payload: { product },
    });
  };

  const clearRecentlyViewedProducts = () => {
    dispatch({
      type: recentlyViewedSagaActions.CLEAR_RECENTLY_VIEWED_PRODUCTS,
      payload: {},
    });
  };

  return {
    addRecentlyViewedProduct,
    clearRecentlyViewedProducts,
  };
};
