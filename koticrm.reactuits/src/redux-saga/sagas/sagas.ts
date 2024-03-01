import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_SUCCESS, GET_ACCOUNTS_FETCH } from '../action';
import AccountService from '../../services/AccountService';
import { Account } from '../../models/account/Account';



async function* accountFetch(){
  try {
      const response = await call(AccountService.GetAccountsList);
    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch accounts');
    // }
    return response;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
}

function* workGetAccountFetch() {
  try {
    const accounts: Account[] = yield call(accountFetch);
    yield put({ type: GET_SUCCESS, accounts });
  } catch (error) {
    // Handle error if needed
  }
}

export default function* mySaga() {
  yield takeEvery(GET_ACCOUNTS_FETCH, workGetAccountFetch);
}

