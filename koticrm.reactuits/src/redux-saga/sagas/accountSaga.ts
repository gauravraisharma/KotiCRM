import { call, put } from 'redux-saga/effects';
import { GET_ACCOUNT_SUCCESS } from '../action';
import AccountService from '../../services/AccountService';
import { Account } from '../../models/account/Account';



 function* accountFetch() : Generator<any>{
  try {
    debugger
      const response = yield call(AccountService.GetAccountsList);
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
    yield put({ type: GET_ACCOUNT_SUCCESS, accounts });
  } catch (error) {
    // Handle error if needed
  }
}
export default workGetAccountFetch;
