import { call, put } from 'redux-saga/effects';

import {
    CREATE_CONTACT_SUCCESS,
    GET_CONTACTS_SUCCESS, GET_CONTACT_DETAIL_SUCCESS, UPDATE_CONTACT_SUCCESS
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

function* getContactById(action: { payload: any }): Generator<any> {
    try {
        const { payload } = action;
        const response = yield call(ContactService.GetContactDetails, payload);
        return response as Contact;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
    }
}

export function* workGetContactByIdFetch(action: any) {
    try {
        const contact: Contact = yield call(getContactById, { payload: action });
        yield put({ type: GET_CONTACT_DETAIL_SUCCESS, contact });
    } catch (error) {
        console.log(error);
    }
}

function* createContact(action: { payload: Contact }): Generator<any> {
    try {
        const { payload } = action;
        const response = yield call(ContactService.CreateContact, payload);
        return response;
    } catch (error) {
        console.error('Error creating contact in saga:', error);
        throw error;
    }
}

export function* workCreateContact(action: any) {
    try {
        const contact: Contact = yield call(createContact, { payload: action });
        yield put({ type: CREATE_CONTACT_SUCCESS, contact });
    } catch (error) {
        console.log(error);
    }
}

function* updateContact(action: { payload: { contact: Contact, id: any } }): Generator<any> {
    try {
        const { contact, id } = action.payload;
        const response = yield call(ContactService.UpdateContact, contact, id);
        console.log("Contact update on saga:");
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
}

export function* workUpdateContact(action: any) {
    try {
        const updatedContact: Contact = yield call(updateContact, { payload: action.payload });
        yield put({ type: UPDATE_CONTACT_SUCCESS, updatedContact });
    } catch (error) {
        // Handle error if needed
    }
}