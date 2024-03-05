import { call, put } from 'redux-saga/effects';

import {
    GET_CONTACTS_SUCCESS
} from '../../constants/reduxConstants';

import ContactService from '../../services/ContactService';
import { Contact } from '../../models/contact/Contact';

function* contactsFetch(): Generator<any> {
    try {
        const response = yield call(ContactService.GetContactsList);
        // if (response.status !== 200) {
        //   throw new Error('Failed to fetch accounts');
        // }
        // console.log("Contacts on saga:");
        // console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
    }
}

export function* workGetContactsFetch() {
    try {
        const contacts: Contact[] = yield call(contactsFetch);
        yield put({ type: GET_CONTACTS_SUCCESS, contacts });
    } catch (error) {
        // Handle error if needed
    }
}

// function* getContactById(action: { payload: any }): Generator<any> {
//   try {
//     const { payload } = action;
//     const response = yield call(ContactService.GetContactsDetails, payload);
//     return response as Account;
//   } catch (error) {
//     console.error('Error fetching accounts:', error);
//     throw error;
//   }
// }

// export function* workGetAccountByIdFetch(action: any) {
//   try {
//     const account: Account = yield call(getAccountById, { payload: action });
//     yield put({ type: GET_ACCOUNT_DETAIL_SUCCESS, account });
//   } catch (error) {
//     // Handle error if needed
//   }
// }

// function* createAccount(action: { payload: Account }): Generator<any> {
//   try {
//     const { payload } = action;

//     const response = yield call(AccountService.CreateAccount, payload);
//     return response;
//   } catch (error) {
//     console.error('Error fetching accounts:', error);
//     throw error;
//   }
// }

// export function* workCreateAccount(action: any) {
//   try {
//     const account: Account = yield call(createAccount, { payload: action });
//     yield put({ type: CREATE_ACCOUNT_SUCCESS, account });
//   } catch (error) {
//     // Handle error if needed
//   }
// }