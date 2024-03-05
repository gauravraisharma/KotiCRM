import AccountService from '../../services/AccountService';
import { Account } from '../../models/account/Account';
import { call, put } from 'redux-saga/effects';

import {
  CREATE_ACCOUNT_SUCCESS,
  GET_ACCOUNT_DETAIL_SUCCESS,
  GET_ACCOUNT_SUCCESS
} from '../../constants/reduxConstants';

function* accountFetch(): Generator<any> {
  try {
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

export function* workGetAccountFetch() {
  try {
    const accounts: Account[] = yield call(accountFetch);
    yield put({ type: GET_ACCOUNT_SUCCESS, accounts });
  } catch (error) {
    // Handle error if needed
  }
}

function* createAccount(action: { payload: Account }): Generator<any> {
  try {
    const { payload } = action;

    const response = yield call(AccountService.CreateAccount, payload);
    return response;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
}

export function* workCreateAccount(action: any) {
  try {
    const account: Account = yield call(createAccount, { payload: action });
    yield put({ type: CREATE_ACCOUNT_SUCCESS, account });
  } catch (error) {
    // Handle error if needed
  }
}

function* getAccountById(action: { payload: any }): Generator<any> {
  try {
    const { payload } = action;

    const response = yield call(AccountService.GetAccountDetails, payload);
    return response as Account;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
}

export function* workGetAccountByIdFetch(action: any) {
  try {
    const account: Account = yield call(getAccountById, { payload: action });
    yield put({ type: GET_ACCOUNT_DETAIL_SUCCESS, account });
  } catch (error) {
    // Handle error if needed
  }
}