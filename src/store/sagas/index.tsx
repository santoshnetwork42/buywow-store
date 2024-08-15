import { all, fork } from "redux-saga/effects";
import { authWatcher } from "@/store/sagas/watchers/auth.watcher";
import { modalWatcher } from "@/store/sagas/watchers/modal.watcher";
import { userWatcher } from "@/store/sagas/watchers/user.watcher";
import { cartWatcher } from "@/store/sagas/watchers/cart.watcher";
import { addressWatcher } from "@/store/sagas/watchers/address.watcher";
import { eventsWatcher } from "./watchers/events.watcher";
import { recentlyViewedWatcher } from "./watchers/recentlyViewed.watcher";

export default function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(modalWatcher),
    fork(userWatcher),
    fork(cartWatcher),
    fork(eventsWatcher),
    fork(addressWatcher),
    fork(eventsWatcher),
    fork(recentlyViewedWatcher),
  ]);
}
