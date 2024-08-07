import { all, fork, takeLatest } from "redux-saga/effects";
import { eventsSagaActions } from "@/store/sagas/sagaActions/events.actions";
import {
  outOfStockHandler,
  proceedToCheckoutHandler,
} from "../handlers/events.handle";

function* outOfStock() {
  yield takeLatest(eventsSagaActions.OUT_OF_STOCK, outOfStockHandler);
}

function* search() {
  yield takeLatest(eventsSagaActions.SEARCH, signOutHandler);
}

function* priceMisMatch() {
  yield takeLatest(eventsSagaActions.PRICE_MISMATCH, signOutHandler);
}

function* auth() {
  yield takeLatest(eventsSagaActions.AUTH, signOutHandler);
}

function* proceedToCheckout() {
  yield takeLatest(
    eventsSagaActions.PROCEED_TO_CHECKOUT,
    proceedToCheckoutHandler,
  );
}

//cart actions
function* addToCart() {
  // yield takeLatest(cartSagaActions.ADD_TO_CART, signOutHandler);
}

//cart actions
function* removeFromCart() {
  // yield takeLatest(cartSagaActions.REMOVE_FROM_CART, signOutHandler);
}

function* viewItem() {
  yield takeLatest(eventsSagaActions.VIEW_ITEM, signOutHandler);
}

function* placeOrder() {
  yield takeLatest(eventsSagaActions.PLACE_ORDER, signOutHandler);
}

function* applyCoupons() {
  yield takeLatest(eventsSagaActions.APPLY_COUPONS, signOutHandler);
}

function* checkoutStarted() {
  yield takeLatest(eventsSagaActions.CHECKOUT_STARTED, signOutHandler);
}

function* viewCart() {
  yield takeLatest(eventsSagaActions.VIEW_CART, signOutHandler);
}

function* viewListItem() {
  yield takeLatest(eventsSagaActions.VIEW_LIST_ITEM, signOutHandler);
}

function* addressAdded() {
  yield takeLatest(eventsSagaActions.ADDRESS_ADDED, signOutHandler);
}

function* addressSelected() {
  yield takeLatest(eventsSagaActions.ADDRESS_SELECTED, signOutHandler);
}

function* addPaymentInfo() {
  yield takeLatest(eventsSagaActions.ADD_PAYMENT_INFO, signOutHandler);
}

function* bannerClicked() {
  yield takeLatest(eventsSagaActions.BANNER_CLICKED, signOutHandler);
}

function* otpRequested() {
  yield takeLatest(eventsSagaActions.OTP_REQUESTED, signOutHandler);
}

function* categoryViewed() {
  yield takeLatest(eventsSagaActions.CATEGORY_VIEWED, signOutHandler);
}

function* tileClicked() {
  yield takeLatest(eventsSagaActions.TILE_CLICKED, signOutHandler);
}

function* topNavbarClicked() {
  yield takeLatest(eventsSagaActions.TOP_NAVBAR_CLICKED, signOutHandler);
}

function* shopByClick() {
  yield takeLatest(eventsSagaActions.SHOP_BY_CLICK, signOutHandler);
}
function* blogClick() {
  yield takeLatest(eventsSagaActions.BLOG_CLICK, signOutHandler);
}

function* productSearched() {
  yield takeLatest(eventsSagaActions.PRODUCT_SEARCHED, signOutHandler);
}

function* homeViewed() {
  yield takeLatest(eventsSagaActions.HOME_VIEWED, signOutHandler);
}

function* logOut() {
  yield takeLatest(eventsSagaActions.LOG_OUT, signOutHandler);
}

function* spinTheWheelPlayed() {
  yield takeLatest(eventsSagaActions.SPIN_THE_WHEEL_PLAYED, signOutHandler);
}

function* spinTheWheelReward() {
  yield takeLatest(eventsSagaActions.SPIN_THE_WHEEL_REWARD, signOutHandler);
}

export function* eventsWatcher() {
  yield all([
    fork(outOfStock),
    fork(search),
    fork(priceMisMatch),
    fork(auth),
    fork(proceedToCheckout),
    fork(viewItem),
    fork(placeOrder),
    fork(applyCoupons),
    fork(checkoutStarted),
    fork(viewCart),
    fork(viewListItem),
    fork(addressAdded),
    fork(addressSelected),
    fork(addPaymentInfo),
    fork(bannerClicked),
    fork(otpRequested),
    fork(categoryViewed),
    fork(tileClicked),
    fork(topNavbarClicked),
    fork(shopByClick),
    fork(blogClick),
    fork(productSearched),
    fork(homeViewed),
    fork(logOut),
    fork(spinTheWheelPlayed),
    fork(spinTheWheelReward),
  ]);
}
