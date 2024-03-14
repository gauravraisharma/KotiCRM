import { call, put } from 'redux-saga/effects';

import {
  CREATE_INVOICE_SUCCESS,
  GET_INVOICE_DETAIL_SUCCESS,
    GET_INVOICE_SUCCESS,
    UPDATE_INVOICE_SUCCESS,
    DELETE_INVOICE_SUCCESS
} from '../../constants/reduxConstants';
import InvoiceService from '../../services/InvoiceService';
import { Invoice, InvoiceCreationModel } from '../../models/invoice/Invoice';

function* invoiceFetch(): Generator<any> {
  try {
    const response = yield call(InvoiceService.GetInvoiceList);
    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch Invoices');
    // }
    return response;
  } catch (error) {
    console.error('Error fetching Invoices:', error);
    throw error;
  }
}

export function* workGetInvoiceFetch() {
  try {
    const invoices: InvoiceCreationModel[] = yield call(invoiceFetch);
    yield put({ type: GET_INVOICE_SUCCESS, invoices });
  } catch (error) {
    // Handle error if needed
  }
}

function* createInvoice(action: { payload: InvoiceCreationModel }): Generator<any> {
  try {
    const { payload } = action;

    const response = yield call(InvoiceService.CreateInvoice, payload);
    return response;
  } catch (error) {
    console.error('Error fetching invoice:', error);
    throw error;
  }
}

export function* workCreateInvoice(action: any) {
  try {
    const invoiceModel: InvoiceCreationModel = yield call(createInvoice, { payload: action });
    yield put({ type: CREATE_INVOICE_SUCCESS, invoiceModel });
  } catch (error) {
    // Handle error if needed
  }
}

function* getInvoiceById(action: { payload: any }): Generator<any> {
  try {
    const { payload } = action;

    const response = yield call(InvoiceService.GetInvoiceDetails, payload);
    return response as InvoiceCreationModel;
  } catch (error) {
    console.error('Error fetching invoice:', error);
    throw error;
  }
}

export function* workGetInvoiceByIdFetch(action: any) {
  try {
    const invoice: InvoiceCreationModel = yield call(getInvoiceById, { payload: action });
    yield put({ type: GET_INVOICE_DETAIL_SUCCESS, invoice });
  } catch (error) {
    // Handle error if needed
  }
}

function* updateInvoice(action: {payload: { invoice: any, id: any }}) : Generator<any>{
  try {
    const { invoice, id } = action.payload;

      const response = yield call(InvoiceService.UpdateInvoice,invoice, id );
      return response;
  } catch (error) {
    console.error('Error fetching Invoices:', error);
    throw error;
  }
}

export function* workUpdateInvoice(action: any) {
  try {
    const updatedInvoice: InvoiceCreationModel = yield call(updateInvoice, {payload : action.payload} );
    yield put({ type: UPDATE_INVOICE_SUCCESS, updatedInvoice });
  } catch (error) {
    // Handle error if needed
  }
}



function* deleteInvoice(action: { payload: any }) : Generator<any>{
  try {
    const { payload } = action;

      const response = yield call(InvoiceService.DeleteInvoice,payload );
      return response;
  } catch (error) {
    console.error('Error fetching invoice:', error);
    throw error;
  }
}

export function* workDeleteInvoice(action:any) {
  try {
    const response: Invoice = yield call(deleteInvoice, { payload: action });
    yield put({ type: DELETE_INVOICE_SUCCESS, response });
  } catch (error) {
    // Handle error if needed
  }
}

