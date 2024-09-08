import {
  addPaymentInfoEventHandler,
  addressAddedEventHandler,
  addressSelectedEventHandler,
  addToCartEventHandler,
  applyCouponsEventHandler,
  authEventHandler,
  bannerClickedEventHandler,
  blogClickEventHandler,
  categoryViewedEventHandler,
  checkoutStartedEventHandler,
  homeViewedEventHandler,
  logOutEventHandler,
  otpRequestedEventHandler,
  outOfStockEventHandler,
  placeOrderEventHandler,
  proceedToCheckoutEventHandler,
  removeFromCartEventHandler,
  searchEventHandler,
  shopByClickEventHandler,
  // productSearchedEventHandler,
  tileClickedEventHandler,
  topNavbarClickedEventHandler,
  viewCartEventHandler,
  viewItemEventHandler,
  viewListItemEventHandler,
} from "@/store/sagas/handlers/events.handle";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { eventsSagaActions } from "@/store/sagas/sagaActions/events.actions";
import { all, fork, takeLatest } from "redux-saga/effects";

function* outOfStock() {
  yield takeLatest(eventsSagaActions.OUT_OF_STOCK, outOfStockEventHandler);
}

function* search() {
  yield takeLatest(eventsSagaActions.SEARCH, searchEventHandler);
}

function* priceMisMatch() {
  // yield takeLatest(eventsSagaActions.PRICE_MISMATCH, priceMisMatchEventHandler);
}

function* auth() {
  yield takeLatest(eventsSagaActions.AUTH, authEventHandler);
}

function* proceedToCheckout() {
  yield takeLatest(
    eventsSagaActions.PROCEED_TO_CHECKOUT,
    proceedToCheckoutEventHandler,
  );
}

//cart actions
function* addToCartEvent() {
  yield takeLatest(cartSagaActions.ADD_TO_CART, addToCartEventHandler);
}

//cart actions
function* removeFromCartEvent() {
  yield takeLatest(
    cartSagaActions.REMOVE_FROM_CART,
    removeFromCartEventHandler,
  );
}

function* viewItem() {
  yield takeLatest(eventsSagaActions.VIEW_ITEM, viewItemEventHandler);
}

function* placeOrder() {
  yield takeLatest(eventsSagaActions.PLACE_ORDER, placeOrderEventHandler);
}
//cart actions
function* applyCoupons() {
  yield takeLatest(cartSagaActions.APPLY_COUPONS, applyCouponsEventHandler);
}

function* checkoutStarted() {
  yield takeLatest(
    eventsSagaActions.CHECKOUT_STARTED,
    checkoutStartedEventHandler,
  );
}

function* viewCart() {
  yield takeLatest(eventsSagaActions.VIEW_CART, viewCartEventHandler);
}

function* viewListItem() {
  yield takeLatest(eventsSagaActions.VIEW_LIST_ITEM, viewListItemEventHandler);
}

function* addressAdded() {
  yield takeLatest(eventsSagaActions.ADDRESS_ADDED, addressAddedEventHandler);
}

function* addressSelected() {
  yield takeLatest(
    eventsSagaActions.ADDRESS_SELECTED,
    addressSelectedEventHandler,
  );
}

function* addPaymentInfo() {
  yield takeLatest(
    eventsSagaActions.ADD_PAYMENT_INFO,
    addPaymentInfoEventHandler,
  );
}

function* bannerClicked() {
  yield takeLatest(eventsSagaActions.BANNER_CLICKED, bannerClickedEventHandler);
}

function* otpRequested() {
  yield takeLatest(eventsSagaActions.OTP_REQUESTED, otpRequestedEventHandler);
}

function* categoryViewed() {
  yield takeLatest(
    eventsSagaActions.CATEGORY_VIEWED,
    categoryViewedEventHandler,
  );
}

function* tileClicked() {
  yield takeLatest(eventsSagaActions.TILE_CLICKED, tileClickedEventHandler);
}

function* topNavbarClicked() {
  yield takeLatest(
    eventsSagaActions.TOP_NAVBAR_CLICKED,
    topNavbarClickedEventHandler,
  );
}

function* shopByClick() {
  yield takeLatest(eventsSagaActions.SHOP_BY_CLICK, shopByClickEventHandler);
}
function* blogClick() {
  yield takeLatest(eventsSagaActions.BLOG_CLICK, blogClickEventHandler);
}

// function* productSearched() {
//   yield takeLatest(
//     eventsSagaActions.PRODUCT_SEARCHED,
//     productSearchedEventHandler,
//   );
// }

function* homeViewed() {
  yield takeLatest(eventsSagaActions.HOME_VIEWED, homeViewedEventHandler);
}

function* logOut() {
  yield takeLatest(eventsSagaActions.LOG_OUT, logOutEventHandler);
}

// function* spinTheWheelPlayed() {
//   yield takeLatest(
//     eventsSagaActions.SPIN_THE_WHEEL_PLAYED,
//     spinTheWheelPlayedEventHandler,
//   );
// }

// function* spinTheWheelReward() {
//   yield takeLatest(
//     eventsSagaActions.SPIN_THE_WHEEL_REWARD,
//     spinTheWheelRewardEventHandler,
//   );
// }
// function* customEventVercel() {
//   yield takeLatest(
//     eventsSagaActions.CUSTOM_EVENT_VERCEL,
//     customEventVercelEventHandler,
//   );
// }

export function* eventsWatcher() {
  yield all([
    fork(outOfStock),
    fork(addToCartEvent),
    fork(removeFromCartEvent),
    fork(applyCoupons),
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
    // fork(productSearched),
    fork(homeViewed),
    fork(logOut),
    // fork(spinTheWheelPlayed),
    // fork(spinTheWheelReward),
    // fork(customEventVercel),
  ]);
}
