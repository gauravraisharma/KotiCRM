
import accountSaga from "./modules/account/watcherSaga";
import authSaga from "./modules/auth/watcherSaga";
import attachmentSaga from "./modules/attachment/watcherSaga";
import contactSaga from "./modules/contact/watcherSaga";
import invoiceSaga from "./modules/invoice/watcherSaga";
import noteSaga from "./modules/notes/watcherSaga";
import sharedSaga from "./modules/shared/watcherSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
      authSaga(),
      accountSaga(),
      attachmentSaga(),
      contactSaga(),
      invoiceSaga(),
      noteSaga(),
      sharedSaga()
    ]);
  }