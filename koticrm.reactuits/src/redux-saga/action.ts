import { Account } from "../models/account/Account";
import { CreateContact } from "../models/contact/CreateContact";
import { UserLogin } from "../models/userAccount/login";
import { LoginResponse } from "../models/userAccount/loginResponse";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  GET_ACCOUNTS_FETCH,
  CREATE_ACCOUNT_REQUEST,
  GET_ACCOUNT_DETAIL_FETCH,
  GET_ACCOUNT_OWNER_FETCH,
  GET_ACCOUNT_STATUS_FETCH,
  GET_ACCOUNT_TYPE_FETCH,
  GET_CONTACTS_FETCH,
  GET_CONTACT_DETAIL_FETCH,
  CREATE_CONTACT_REQUEST,
  GET_INDUSTRY_FETCH,
  GET_INVOICE_STATUS_FETCH
} from "../constants/reduxConstants";

// Login action methods
export const loginRequest = (userLogin: UserLogin, navigate: any, toast: any) => ({
  type: LOGIN_REQUEST,
  payload: userLogin,
  navigate,
  toast
});

export const loginSuccess = (response: LoginResponse) => ({
  type: LOGIN_SUCCESS,
  payload: response,
});

// Account action methods
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

export const getAccountOwner = () => ({
  type: GET_ACCOUNT_OWNER_FETCH
})

export const getAccountStatus = () => ({
  type: GET_ACCOUNT_STATUS_FETCH
})

export const getAccountType = () => ({
  type: GET_ACCOUNT_TYPE_FETCH
})

// Contact action methods
export const getContacts = () => ({
  type: GET_CONTACTS_FETCH
})

export const getContactById = (id: number) => ({
  type: GET_CONTACT_DETAIL_FETCH,
  payload: id
})

export const createContact = (createContact: CreateContact) => ({
  type: CREATE_CONTACT_REQUEST,
  payload: createContact
});

export const getIndustry = () => ({
  type: GET_INDUSTRY_FETCH
})

export const getInvoiceStatus = () => ({
  type: GET_INVOICE_STATUS_FETCH
})