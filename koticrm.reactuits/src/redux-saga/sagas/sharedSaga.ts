import { call, put } from 'redux-saga/effects';
import SharedService from '../../services/SharedService';
import { SharedModel } from '../../models/commonModels/SharedModels';

import {
  GET_ACCOUNT_OWNER_SUCCESS,
  GET_ACCOUNT_STATUS_SUCCESS,
  GET_ACCOUNT_TYPE_SUCCESS,
  GET_INDUSTRY_SUCCESS,
  GET_INVOICE_OWNER_SUCCESS,
  GET_INVOICE_STATUS_SUCCESS,
} from '../../constants/reduxConstants';


function* accountOwnerFetch(): Generator<any> {
  try {
    const response = yield call(SharedService.GetAccountOwnerList);
    return response;
  } catch (error) {
    console.error('Error fetching account owners:', error);
    throw error;
  }
}


export function* workGetAccountOwnerFetch() {
  try {
    const accountOwners: SharedModel[] = yield call(accountOwnerFetch);
    yield put({ type: GET_ACCOUNT_OWNER_SUCCESS, accountOwners });
  } catch (error) {
    // Handle error if needed
  }
}

function* invoicOwnerFetch(): Generator<any> {
  try {
    const response = yield call(SharedService.GetInvoiceOwnerList);
    return response;
  } catch (error) {
    console.error('Error fetching account owners:', error);
    throw error;
  }
}


export function* workGetInvoiceOwnerFetch() {
  try {
    const invoiceOwners: SharedModel[] = yield call(invoicOwnerFetch);
    yield put({ type: GET_INVOICE_OWNER_SUCCESS, invoiceOwners });
  } catch (error) {
    // Handle error if needed
  }
}


function* industryFetch(): Generator<any> {
  try {
    const response = yield call(SharedService.GetIndustryList);
    return response;
  } catch (error) {
    console.error('Error fetching industry:', error);
    throw error;
  }
}

export function* workGetIndustryFetch() {
  try {
    const industry: SharedModel[] = yield call(industryFetch);
    yield put({ type: GET_INDUSTRY_SUCCESS, industry });
  } catch (error) {
    // Handle error if needed
  }
}

function* accountStatusFetch(): Generator<any> {
  try {
    const response = yield call(SharedService.GetAccountStatus);
    return response;
  } catch (error) {
    console.error('Error fetching account status:', error);
    throw error;
  }
}

export function* workGetAccountStatusFetch() {
  try {
    const accountStatus: SharedModel[] = yield call(accountStatusFetch);
    yield put({ type: GET_ACCOUNT_STATUS_SUCCESS, accountStatus });
  } catch (error) {
    // Handle error if needed
  }
}

function* accountTypeFetch(): Generator<any> {
  try {
    const response = yield call(SharedService.GetAccountType);
    return response;
  } catch (error) {
    console.error('Error fetching account type:', error);
    throw error;
  }
}

export function* workGetAccountTypeFetch() {
  try {
    const accountType: SharedModel[] = yield call(accountTypeFetch);
    yield put({ type: GET_ACCOUNT_TYPE_SUCCESS, accountType });
  } catch (error) {
    // Handle error if needed
  }
}

function* invoiceStatusFetch(): Generator<any> {
  try {
    const response = yield call(SharedService.GetInvoiceStatus);
    return response;
  } catch (error) {
    console.error('Error fetching invoice status:', error);
    throw error;
  }
}

export function* workGetInvoiceStatusFetch() {
  try {
    const invoiceStatus: SharedModel[] = yield call(invoiceStatusFetch);
    yield put({ type: GET_INVOICE_STATUS_SUCCESS, invoiceStatus });
  } catch (error) {
    // Handle error if needed
  }
}

