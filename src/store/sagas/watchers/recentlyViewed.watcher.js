import { all, fork, takeLatest } from "redux-saga/effects";
import {
  addRecentlyViewedProductHandler,
  clearRecentlyViewedProductsHandler,
} from "../handlers/recentlyViewed.handle";
import { recentlyViewedSagaActions } from "../sagaActions/recentlyViewed.actions";

function* addRecentlyViewedProduct() {
  yield takeLatest(
    recentlyViewedSagaActions.ADD_RECENTLY_VIEWED_PRODUCT,
    addRecentlyViewedProductHandler,
  );
}

function* clearRecentlyViewedProducts() {
  yield takeLatest(
    recentlyViewedSagaActions.CLEAR_RECENTLY_VIEWED_PRODUCTS,
    clearRecentlyViewedProductsHandler,
  );
}

export function* recentlyViewedWatcher() {
  yield all([
    fork(addRecentlyViewedProduct),
    fork(clearRecentlyViewedProducts),
  ]);
}
