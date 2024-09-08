import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { recentlyViewedSagaActions } from "@/store/sagas/sagaActions/recentlyViewed.actions";

export const useRecentlyViewedDispatch = () => {
  const dispatch = useDispatch();

  const addRecentlyViewedProduct = useCallback(
    (product) => {
      dispatch({
        type: recentlyViewedSagaActions.ADD_RECENTLY_VIEWED_PRODUCT,
        payload: { product },
      });
    },
    [dispatch],
  );

  const clearRecentlyViewedProducts = useCallback(() => {
    dispatch({
      type: recentlyViewedSagaActions.CLEAR_RECENTLY_VIEWED_PRODUCTS,
      payload: {},
    });
  }, [dispatch]);

  return {
    addRecentlyViewedProduct,
    clearRecentlyViewedProducts,
  };
};
