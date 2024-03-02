import { UserLogin } from "../models/userAccount/login";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const GET_ACCOUNTS_FETCH = 'GET_ACCOUNTS_FETCH';
export const GET_CONTACTS_FETCH = 'GET_CONTACTS_FETCH';

export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


export const loginRequest = (userLogin: UserLogin) => ({
    type: LOGIN_REQUEST,
    payload: userLogin,
  });

  export const loginSuccess = (response: any) => ({ 
    type: LOGIN_SUCCESS,
    payload: response,
  });
  
export const getAccounts = ()=>({
    type: GET_ACCOUNTS_FETCH
})

export const getContacts = ()=>({
    type: GET_CONTACTS_FETCH
})
