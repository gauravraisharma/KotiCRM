
import { Account } from '../../../models/account/Account';
import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { CreateAccount, DeleteAccount, GetAccountById, GetAccountList, GetAccountOwnerList, GetAccountStatus, GetAccountType, UpdateAccount } from './apiService';

import {
  CREATE_ACCOUNT_SUCCESS,
  GET_ACCOUNT_DETAIL_SUCCESS,
  GET_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  GET_ACCOUNT_OWNER_SUCCESS,
  GET_ACCOUNT_STATUS_SUCCESS,
  GET_ACCOUNT_TYPE_SUCCESS
} from '../../../constants/reduxConstants';
import { actionPayloadModel } from '../../../models/actionModel/actionModel';
import { SharedModel } from '../../../models/commonModels/SharedModels';

export function* workGetAccountFetch(): Generator<any> {
  try {
    const response: any = yield call(GetAccountList);
    if (response.status != 200) {
      toast.error(response.statusText)
    } else {
      const accounts: Account[] = response.data;
      yield put({ type: GET_ACCOUNT_SUCCESS, payload: accounts });
      return response;
    }

  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workCreateAccount(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(CreateAccount, action.payload);
    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const account: Account = response.data;
      yield put({ type: CREATE_ACCOUNT_SUCCESS, account });
      toast.success('Account created successfully')
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}



export function* workGetAccountByIdFetch(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(GetAccountById, action.payload);

    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const account: Account = response.data;
      yield put({ type: GET_ACCOUNT_DETAIL_SUCCESS, payload: account });
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workUpdateAccount(action: actionPayloadModel): Generator<any> {
  try {
    debugger;
    const response: any = yield call(UpdateAccount, action.payload.id, action.payload.account);

    if (response.status != 200) {
      toast.error('errror in updated account')
    }
    else {
      const updatedAccount: Account = response.data;
      yield put({ type: UPDATE_ACCOUNT_SUCCESS, payload: updatedAccount });
      toast.success('Account updated successfully')
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }

}


export function* workDeleteAccount(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(DeleteAccount, action.payload);

    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const Account: Account = response.data;
      yield put({ type: DELETE_ACCOUNT_SUCCESS, payload: Account });
      toast.success('Account Deleted Successfully')
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}


export function* workGetAccountOwnerFetch(): Generator<any> {
  try {
    const response: any = yield call(GetAccountOwnerList);

    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const accountOwners: SharedModel[] = response.data;
      yield put({ type: GET_ACCOUNT_OWNER_SUCCESS, payload: accountOwners });
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workGetAccountStatusFetch(): Generator<any> {
  try {
    const response: any = yield call(GetAccountStatus);

    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const accountstatus: SharedModel[] = response.data;
      yield put({ type: GET_ACCOUNT_STATUS_SUCCESS, payload: accountstatus });
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}


export function* workGetAccountTypeFetch(): Generator<any> {
  try {
    const response: any = yield call(GetAccountType);

    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const accountTypes: SharedModel[] = response.data;
      yield put({ type: GET_ACCOUNT_TYPE_SUCCESS, payload: accountTypes });
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}