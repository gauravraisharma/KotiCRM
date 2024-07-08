import { takeEvery } from "redux-saga/effects";
import {
  CREATE_CONTACT_REQUEST,
  DELETE_CONTACT_REQUEST,
  GET_CONTACTS_FETCH,
  GET_CONTACT_DETAIL_FETCH,
  UPDATE_CONTACT_REQUEST
} from "../../../constants/reduxConstants";
import {
  workCreateContact,
  workDeleteContact,
  workGetContactByIdFetch,
  workGetContactsFetch,
  workUpdateContact
} from "./WorkerSaga";

function* contactSaga() {
  yield takeEvery(GET_CONTACTS_FETCH, workGetContactsFetch);
  yield takeEvery(GET_CONTACT_DETAIL_FETCH, workGetContactByIdFetch);
  yield takeEvery(CREATE_CONTACT_REQUEST, workCreateContact);
  yield takeEvery(UPDATE_CONTACT_REQUEST, workUpdateContact);
  yield takeEvery(DELETE_CONTACT_REQUEST, workDeleteContact);
}

export default contactSaga