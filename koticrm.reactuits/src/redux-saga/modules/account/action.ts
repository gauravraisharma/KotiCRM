import { CREATE_ACCOUNT_REQUEST, DELETE_ACCOUNT_REQUEST, GET_ACCOUNTS_FETCH, GET_ACCOUNT_DETAIL_FETCH, GET_ACCOUNT_OWNER_FETCH, GET_ACCOUNT_STATUS_FETCH, GET_ACCOUNT_TYPE_FETCH, UPDATE_ACCOUNT_REQUEST } from "../../../constants/reduxConstants";
import { Account } from "../../../models/account/Account";

export const getAccounts = () => ({
  type: GET_ACCOUNTS_FETCH
})

export const createAccountRequest = (account: Account) => ({
  type: CREATE_ACCOUNT_REQUEST,
  payload: account,
});

export const getAccountByIdRequest = (id: number) => ({
  type: GET_ACCOUNT_DETAIL_FETCH,
  payload: id,
});
export const deleteAccountRequest = (id: any) => ({
  type: DELETE_ACCOUNT_REQUEST,
  payload: id,
});

export const updateAccountRequest = (account: Account, id: any) => ({
  type: UPDATE_ACCOUNT_REQUEST,
  payload: { account, id },
});

export const getAccountOwner = () => ({
  type: GET_ACCOUNT_OWNER_FETCH
})

export const getAccountStatus = () => ({
  type: GET_ACCOUNT_STATUS_FETCH
})

export const getAccountType = () => ({
  type: GET_ACCOUNT_TYPE_FETCH
})