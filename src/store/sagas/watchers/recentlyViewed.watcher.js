import { all, fork, takeLatest } from "redux-saga/effects";
import {
  addRecentlyViewedProductHandler,
  clearRecentlyViewedProductsHandler,
  setRecentlyViewedStalePeriod,
} from "@/store/sagas/handlers/recentlyViewed.handle";
import { recentlyViewedSagaActions } from "@/store/sagas/sagaActions/recentlyViewed.actions";

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
function* recentlyViewedStalePeriod() {
  yield takeLatest(
    recentlyViewedSagaActions.SET_RECENTLY_VIEWED_STALE_PERIOD,
    setRecentlyViewedStalePeriod,
  );
}

export function* recentlyViewedWatcher() {
  yield all([
    fork(addRecentlyViewedProduct),
    fork(clearRecentlyViewedProducts),
    fork(recentlyViewedStalePeriod),
  ]);
}
