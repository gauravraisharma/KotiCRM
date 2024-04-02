import { takeLatest } from 'redux-saga/effects';
import {
  CREATE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_REQUEST,
  GET_ACCOUNTS_FETCH,
  GET_ACCOUNT_DETAIL_FETCH,
  GET_ACCOUNT_OWNER_FETCH,
  GET_ACCOUNT_STATUS_FETCH,
  GET_ACCOUNT_TYPE_FETCH,
  UPDATE_ACCOUNT_REQUEST
} from '../../../constants/reduxConstants';
import {
  workCreateAccount,
  workDeleteAccount,
  workGetAccountByIdFetch,
  workGetAccountFetch,
  workGetAccountOwnerFetch,
  workGetAccountStatusFetch,
  workGetAccountTypeFetch,
  workUpdateAccount
} from './WorkerSaga';

function* accountSaga() {
  yield takeLatest(GET_ACCOUNTS_FETCH, workGetAccountFetch);
  yield takeLatest(CREATE_ACCOUNT_REQUEST, workCreateAccount);
  yield takeLatest(GET_ACCOUNT_DETAIL_FETCH, workGetAccountByIdFetch);
  yield takeLatest(GET_ACCOUNT_OWNER_FETCH, workGetAccountOwnerFetch);
  yield takeLatest(GET_ACCOUNT_STATUS_FETCH, workGetAccountStatusFetch);
  yield takeLatest(GET_ACCOUNT_TYPE_FETCH, workGetAccountTypeFetch)
  yield takeLatest(DELETE_ACCOUNT_REQUEST, workDeleteAccount);
  yield takeLatest(UPDATE_ACCOUNT_REQUEST, workUpdateAccount);
}

export default accountSaga