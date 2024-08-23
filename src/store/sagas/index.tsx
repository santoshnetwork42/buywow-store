import { addressWatcher } from "@/store/sagas/watchers/address.watcher";
import { authWatcher } from "@/store/sagas/watchers/auth.watcher";
import { cartWatcher } from "@/store/sagas/watchers/cart.watcher";
import { eventsWatcher } from "@/store/sagas/watchers/events.watcher";
import { modalWatcher } from "@/store/sagas/watchers/modal.watcher";
import { recentlyViewedWatcher } from "@/store/sagas/watchers/recentlyViewed.watcher";
import { systemWatcher } from "@/store/sagas/watchers/system.watcher";
import { userWatcher } from "@/store/sagas/watchers/user.watcher";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(modalWatcher),
    fork(userWatcher),
    fork(cartWatcher),
    fork(addressWatcher),
    fork(eventsWatcher),
    fork(systemWatcher),
    fork(recentlyViewedWatcher),
  ]);
}
