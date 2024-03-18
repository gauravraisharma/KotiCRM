import { takeEvery } from 'redux-saga/effects';
import { LOGIN_REQUEST } from '../../../constants/reduxConstants';
import {workerloginUser} from './workerSaga';

function* authSaga() {
      yield takeEvery(LOGIN_REQUEST, workerloginUser);
  
  }

  export default authSaga