import { takeEvery } from 'redux-saga/effects';
import {
  workCreateAccount,
  workGetAccountByIdFetch,
  workGetAccountFetch,
  workDeleteAccount,
  workUpdateAccount
} from './accountSaga';
import {
  workCreateContact,
  workGetContactByIdFetch,
  workGetContactsFetch,
  workUpdateContact
} from './contactSaga';
import workerLoginRequest from './loginSaga';
import {
    workGetAccountOwnerFetch,
    workGetAccountStatusFetch,
    workGetAccountTypeFetch,
    workGetIndustryFetch,
    workGetInvoiceOwnerFetch,
    workGetInvoiceStatusFetch,
} from './sharedSaga';

import {
    CREATE_ACCOUNT_REQUEST,
    GET_ACCOUNTS_FETCH,
    GET_ACCOUNT_DETAIL_FETCH,
    GET_ACCOUNT_OWNER_FETCH,
    GET_ACCOUNT_STATUS_FETCH,
    GET_ACCOUNT_TYPE_FETCH,
    GET_CONTACTS_FETCH,
    GET_INDUSTRY_FETCH,
    GET_INVOICE_STATUS_FETCH,
    LOGIN_REQUEST,
    UPDATE_ACCOUNT_REQUEST,
    DELETE_ACCOUNT_REQUEST,
    GET_NOTES_FETCH,
    CREATE_NOTES_REQUEST,
    GET_INVOICE_FETCH,
    GET_INVOICE_DETAIL_FETCH,
    CREATE_INVOICE_REQUEST,
    UPDATE_INVOICE_REQUEST,
    DELETE_INVOICE_REQUEST,
   
    GET_CONTACT_DETAIL_FETCH,
    CREATE_CONTACT_REQUEST,
    UPDATE_CONTACT_REQUEST,
    GET_INVOICE_OWNER_FETCH,
    GET_ORGANIZATION_FETCH,


    GET_ATTACHMENTS_FETCH,
    CREATE_ATTACHMENT_REQUEST,
    UPDATE_ORGANIZATION_REQUEST,
} from '../../constants/reduxConstants';
import { workCreateNote, workGetNotesFetch } from './notesSaga';
import { workCreateInvoice, workDeleteInvoice, workGetInvoiceByIdFetch, workGetInvoiceFetch, workUpdateInvoice } from './invoiceSaga';
import { workCreateAttachment, workGetAttachmentsFetch } from './attachmentSaga';
import { workGetOrganizationFetch, workUpdateOrganization } from './organizationSaga';

export default function* mySaga() {
  //account
  yield takeEvery(GET_ACCOUNTS_FETCH, workGetAccountFetch);
  yield takeEvery(CREATE_ACCOUNT_REQUEST, workCreateAccount);
  yield takeEvery(GET_ACCOUNT_DETAIL_FETCH, workGetAccountByIdFetch);
  yield takeEvery(GET_ACCOUNT_OWNER_FETCH, workGetAccountOwnerFetch);
  yield takeEvery(GET_ACCOUNT_STATUS_FETCH, workGetAccountStatusFetch);
  yield takeEvery(GET_ACCOUNT_TYPE_FETCH, workGetAccountTypeFetch)
  yield takeEvery(DELETE_ACCOUNT_REQUEST, workDeleteAccount);
  yield takeEvery(UPDATE_ACCOUNT_REQUEST, workUpdateAccount);
  //login
  yield takeEvery(LOGIN_REQUEST, workerLoginRequest);
  //industry
  yield takeEvery(GET_INDUSTRY_FETCH, workGetIndustryFetch);
  //organization
  yield takeEvery(GET_ORGANIZATION_FETCH, workGetOrganizationFetch)
  yield takeEvery(UPDATE_ORGANIZATION_REQUEST, workUpdateOrganization)
  //Invoice
  yield takeEvery(GET_INVOICE_STATUS_FETCH, workGetInvoiceStatusFetch);
  yield takeEvery(GET_INVOICE_FETCH, workGetInvoiceFetch);
  yield takeEvery(GET_INVOICE_DETAIL_FETCH, workGetInvoiceByIdFetch);
  yield takeEvery(CREATE_INVOICE_REQUEST, workCreateInvoice);
  yield takeEvery(UPDATE_INVOICE_REQUEST, workUpdateInvoice);
  yield takeEvery(DELETE_INVOICE_REQUEST, workDeleteInvoice);
  yield takeEvery(GET_INVOICE_OWNER_FETCH, workGetInvoiceOwnerFetch);
  // Attachment
  yield takeEvery(GET_ATTACHMENTS_FETCH, workGetAttachmentsFetch);
  yield takeEvery(CREATE_ATTACHMENT_REQUEST, workCreateAttachment);
  //contact
  yield takeEvery(GET_CONTACTS_FETCH, workGetContactsFetch);
  yield takeEvery(GET_CONTACT_DETAIL_FETCH, workGetContactByIdFetch);
  yield takeEvery(CREATE_CONTACT_REQUEST, workCreateContact);
  yield takeEvery(UPDATE_CONTACT_REQUEST, workUpdateContact);
  //note
  yield takeEvery(GET_NOTES_FETCH, workGetNotesFetch);
  yield takeEvery(CREATE_NOTES_REQUEST, workCreateNote);

  
}