
import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { actionPayloadModel } from '../../../models/actionModel/actionModel';
import { SharedModel } from '../../../models/commonModels/SharedModels';
import {
  CREATE_INVOICE_SUCCESS,
  DELETE_INVOICE_SUCCESS,
  GET_INVOICES_SUCCESS,
  GET_INVOICE_DETAIL_SUCCESS,
  GET_INVOICE_OWNER_SUCCESS,
  GET_INVOICE_STATUS_SUCCESS,
  UPDATE_INVOICE_SUCCESS
} from '../../../constants/reduxConstants';
import { Invoice, InvoiceCreationModel } from '../../../models/invoice/Invoice';
import {
  CreateInvoice,
  DeleteInvoice,
  GetInvoiceDetails,
  GetInvoiceList,
  GetInvoiceOwnerList,
  GetInvoiceStatus,
  UpdateInvoice
} from './apiService';
import { getInvoices } from './action';

export function* workGetInvoiceStatusFetch(): Generator<any> {
  try {
    const response: any = yield call(GetInvoiceStatus);
    if (response.status != 200) {
      toast.error('Error fetching accounts')
    } else {
      const invoiceStatus: SharedModel[] = response.data;
      yield put({ type: GET_INVOICE_STATUS_SUCCESS, payload: invoiceStatus });
    }

  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workGetInvoicesFetch(action: actionPayloadModel): Generator<any> {
  try {
    const { accountID, status, startDate, endDate } = action.payload;
    const response: any = yield call(GetInvoiceList, accountID, status, startDate, endDate);
    if (response.status != 200) {
      toast.error('Error fetching invoices')
    } else {
      const invoices: InvoiceCreationModel[] = response.data;
      yield put({ type: GET_INVOICES_SUCCESS, payload: invoices });
      return response;
    }

  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}
export function* workGetInvoiceByIdFetch(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(GetInvoiceDetails, action.payload);
    if (response.status != 200) {
      toast.error('Error fetching accounts')
    } else {
      const invoice: InvoiceCreationModel = response.data;
      yield put({ type: GET_INVOICE_DETAIL_SUCCESS, payload: invoice });
    }

  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workCreateInvoice(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(CreateInvoice, action.payload);
    if (response.status != 200) {
      toast.error('Error creating invoice')
    } else {
      const invoice: InvoiceCreationModel = response.data;
      yield put({ type: CREATE_INVOICE_SUCCESS, payload: invoice });
      toast.success('Invoice created successfully')
    }

  } catch (error) {
    toast.error('Something went wrong, Please try after sometime')
  }
}


export function* workUpdateInvoice(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(UpdateInvoice, action.payload);
    if (response.status != 200) {
      toast.error('Error fetching accounts')
    } else {
      const invoice: InvoiceCreationModel = response.data;
      yield put({ type: UPDATE_INVOICE_SUCCESS, payload: invoice });
      toast.success('Invoice updated succeffully')
    }

  } catch (error) {
    toast.error('Something went wrong, Please try after sometime')
  }
}

export function* workDeleteInvoice(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(DeleteInvoice, action.payload);
    if (response.status != 200) {
      toast.error('Could not delete invoice, please try again later')
    } else {
      const invoice: Invoice = response.data;
      yield put({ type: DELETE_INVOICE_SUCCESS, payload: invoice });
      toast.success('Invoice deleted successfully')
    }

  } catch (error) {
    toast.error('Something went wrong, Please try after sometime')
  }
}

export function* workGetInvoiceOwnerFetch(): Generator<any> {
  try {
    const response: any = yield call(GetInvoiceOwnerList);
    if (response.status != 200) {
      toast.error('Error fetching Invoice Owners')
    } else {
      const invoiceOwners: SharedModel[] = response.data;
      yield put({ type: GET_INVOICE_OWNER_SUCCESS, payload: invoiceOwners });
    }

  } catch (error) {
    toast.error('Something went wrong, Please try after sometime')
  }
}