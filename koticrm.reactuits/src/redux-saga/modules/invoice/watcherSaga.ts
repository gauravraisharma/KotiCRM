import { takeEvery } from 'redux-saga/effects';
import { CREATE_INVOICE_REQUEST, DELETE_INVOICE_REQUEST, GET_INVOICE_DETAIL_FETCH, GET_INVOICE_FETCH, GET_INVOICE_OWNER_FETCH, GET_INVOICE_STATUS_FETCH, UPDATE_INVOICE_REQUEST } from '../../../constants/reduxConstants';
import { workCreateInvoice, workDeleteInvoice, workGetInvoiceByIdFetch, workGetInvoiceFetch, workGetInvoiceOwnerFetch, workGetInvoiceStatusFetch, workUpdateInvoice } from './WorkerSaga';

function* invoiceSaga() {
  yield takeEvery(GET_INVOICE_STATUS_FETCH, workGetInvoiceStatusFetch);
  yield takeEvery(GET_INVOICE_FETCH, workGetInvoiceFetch);
  yield takeEvery(GET_INVOICE_DETAIL_FETCH, workGetInvoiceByIdFetch);
  yield takeEvery(CREATE_INVOICE_REQUEST, workCreateInvoice);
  yield takeEvery(UPDATE_INVOICE_REQUEST, workUpdateInvoice);
  yield takeEvery(DELETE_INVOICE_REQUEST, workDeleteInvoice);
  yield takeEvery(GET_INVOICE_OWNER_FETCH, workGetInvoiceOwnerFetch);
  }

  export default invoiceSaga