import { takeEvery } from 'redux-saga/effects';
import {GET_ACCOUNTS_FETCH, LOGIN_REQUEST} from '../action';
import workGetAccountFetch from './accountSaga';
import workerLoginRequest from './loginSaga';

export default function* mySaga() {
  yield takeEvery(GET_ACCOUNTS_FETCH, workGetAccountFetch);
  yield takeEvery(LOGIN_REQUEST, workerLoginRequest);
}

