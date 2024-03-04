import { Account } from "../models/account/Account";
import { UserLogin } from "../models/userAccount/login";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const GET_ACCOUNTS_FETCH = 'GET_ACCOUNTS_FETCH';
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';

export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';

export const GET_ACCOUNT_DETAIL_FETCH = 'GET_ACCOUNT_DETAIL_FETCH';
export const GET_ACCOUNT_DETAIL_SUCCESS = 'GET_ACCOUNT_DETAIL_SUCCESS';

export const GET_ACCOUNT_OWNER_FETCH = 'GET_ACCOUNT_OWNER_FETCH';
export const GET_ACCOUNT_OWNER_SUCCESS = 'GET_ACCOUNT_OWNER_SUCCESS';

export const GET_INDUSTRY_FETCH = 'GET_INDUSTRY_FETCH';
export const GET_INDUSTRY_SUCCESS = 'GET_INDUSTRY_SUCCESS';

export const GET_ACCOUNT_STATUS_FETCH = 'GET_ACCOUNT_STATUS_FETCH';
export const GET_ACCOUNT_STATUS_SUCCESS = 'GET_ACCOUNT_STATUS_SUCCESS';

export const GET_ACCOUNT_TYPE_FETCH = 'GET_ACCOUNT_TYPE_FETCH';
export const GET_ACCOUNT_TYPE_SUCCESS = 'GET_ACCOUNT_TYPE_SUCCESS';

export const GET_INVOICE_STATUS_FETCH = 'GET_INVOICE_STATUS_FETCH';
export const GET_INVOICE_STATUS_SUCCESS = 'GET_INVOICE_STATUS_SUCCESS';


export const GET_CONTACTS_FETCH = 'GET_CONTACTS_FETCH';





export const loginRequest = (userLogin: UserLogin, navigate: any, toast:any) => ({
    type: LOGIN_REQUEST,
    payload: userLogin,
    navigate,
    toast
  });


  export const loginSuccess = (response: any) => ({ 
    type: LOGIN_SUCCESS,
    payload: response,
  });


export const getAccounts = ()=>({
    type: GET_ACCOUNTS_FETCH
})

export const createAccountRequest = (account: Account) => ({
  type: CREATE_ACCOUNT_REQUEST,
  payload: account,
});

export const getAccountByIdRequest = (id: any) => ({
  type: GET_ACCOUNT_DETAIL_FETCH,
  payload: id,
});
export const getContacts = ()=>({
    type: GET_CONTACTS_FETCH
})

export const getAccountOwner = ()=>({
  type: GET_ACCOUNT_OWNER_FETCH
})
export const getIndustry = ()=>({
  type: GET_INDUSTRY_FETCH
})
export const getAccountStatus = ()=>({
  type: GET_ACCOUNT_STATUS_FETCH
})
export const getAccountType = ()=>({
  type: GET_ACCOUNT_TYPE_FETCH
})
export const getInvoiceStatus = ()=>({
  type: GET_INVOICE_STATUS_FETCH
})