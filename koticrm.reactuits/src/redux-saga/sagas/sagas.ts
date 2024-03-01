import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_SUCCESS, GET_ACCOUNTS_FETCH } from '../action';
import AccountService from '../../services/AccountService';
import { AxiosResponse } from 'axios';

// Define a custom type for the data returned by the API
interface AccountData {
  // Define the structure of your account data
}

function* accountFetch(): IterableIterator<ReturnType<typeof AccountService.GetAccountsList>> {
  try {
    const response: AxiosResponse<AccountData[]> = yield call(AccountService.GetAccountsList);
    if (response.status !== 200) {
      throw new Error('Failed to fetch accounts');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
}

function* workGetAccountFetch() {
  try {
    const accounts: AccountData[] = yield call(accountFetch);
    yield put({ type: GET_SUCCESS, accounts });
  } catch (error) {
    // Handle error if needed
  }
}

export default function* mySaga() {
  yield takeEvery(GET_ACCOUNTS_FETCH, workGetAccountFetch);
}

