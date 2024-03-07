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
    workGetContactsFetch
} from './contactSaga';
import workerLoginRequest from './loginSaga';
import {
    workGetAccountOwnerFetch,
    workGetAccountStatusFetch,
    workGetAccountTypeFetch,
    workGetIndustryFetch,
    workGetInvoiceStatusFetch
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
    GET_CONTACT_DETAIL_FETCH,
    CREATE_CONTACT_REQUEST,

} from '../../constants/reduxConstants';
import { workCreateNote, workGetNotesFetch } from './notesSaga';

export default function* mySaga() {
    yield takeEvery(GET_ACCOUNTS_FETCH, workGetAccountFetch);
    yield takeEvery(LOGIN_REQUEST, workerLoginRequest);
    yield takeEvery(CREATE_ACCOUNT_REQUEST, workCreateAccount);
    yield takeEvery(GET_ACCOUNT_DETAIL_FETCH, workGetAccountByIdFetch)
    yield takeEvery(GET_ACCOUNT_OWNER_FETCH, workGetAccountOwnerFetch)
    yield takeEvery(GET_INDUSTRY_FETCH, workGetIndustryFetch)
    yield takeEvery(GET_ACCOUNT_STATUS_FETCH, workGetAccountStatusFetch)
    yield takeEvery(GET_ACCOUNT_TYPE_FETCH, workGetAccountTypeFetch)
    yield takeEvery(GET_INVOICE_STATUS_FETCH, workGetInvoiceStatusFetch)
    yield takeEvery(GET_NOTES_FETCH, workGetNotesFetch)
    yield takeEvery(CREATE_NOTES_REQUEST, workCreateNote);
    yield takeEvery(DELETE_ACCOUNT_REQUEST, workDeleteAccount)
    yield takeEvery(UPDATE_ACCOUNT_REQUEST, workUpdateAccount)

    yield takeEvery(GET_CONTACTS_FETCH, workGetContactsFetch);
    yield takeEvery(GET_CONTACT_DETAIL_FETCH, workGetContactByIdFetch);
    yield takeEvery(CREATE_CONTACT_REQUEST, workCreateContact);
}