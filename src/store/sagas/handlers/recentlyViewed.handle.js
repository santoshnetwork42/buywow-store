import {
  setRecentlyViewedProducts,
  setStalePeriod,
} from "@/store/slices/recentlyViewed.slice";
import { MAX_RECENTLY_VIEWED_PRODUCTS } from "@/utils/data/constants";
import { errorHandler } from "@/utils/errorHandler";
import { put, select } from "redux-saga/effects";

export function* addRecentlyViewedProductHandler(action) {
  try {
    const { product } = action.payload;
    const recentlyViewedProducts = yield select(
      (state) => state.recentlyViewed.recentlyViewedProducts,
    );

    const updatedProducts = [
      product,
      ...(recentlyViewedProducts?.filter(
        (item) => item?.slug !== product?.slug,
      ) || []),
    ].slice(0, MAX_RECENTLY_VIEWED_PRODUCTS);

    yield put(setRecentlyViewedProducts(updatedProducts));
  } catch (error) {
    errorHandler(error);
  }
}

export function* clearRecentlyViewedProductsHandler() {
  try {
    yield put(setRecentlyViewedProducts([]));
  } catch (error) {
    errorHandler(error);
  }
}
export function* setRecentlyViewedStalePeriod() {
  try {
    yield put(setStalePeriod(Date.now()));
  } catch (error) {
    errorHandler(error);
  }
}
