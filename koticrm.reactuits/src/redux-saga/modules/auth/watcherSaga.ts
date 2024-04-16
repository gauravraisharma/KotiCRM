import { takeEvery } from 'redux-saga/effects';
import { LOGIN_REQUEST, START_LOADING } from '../../../constants/reduxConstants';
import {workerLoader, workerloginUser} from './workerSaga';

function* authSaga() {
      yield takeEvery(LOGIN_REQUEST, workerloginUser);
      yield takeEvery(START_LOADING, workerLoader);
  }

  export default authSaga