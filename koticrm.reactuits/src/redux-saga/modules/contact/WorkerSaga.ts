import { toast } from 'react-toastify';
import { actionPayloadModel } from '../../../models/actionModel/actionModel';
import { Contact } from '../../../models/contact/Contact';
import { CREATE_CONTACT_SUCCESS, DELETE_CONTACT_SUCCESS, GET_CONTACTS_SUCCESS, GET_CONTACT_DETAIL_SUCCESS, UPDATE_CONTACT_SUCCESS } from '../../../constants/reduxConstants';
import { call, put } from 'redux-saga/effects';
import { CreateContact, DeleteContact, GetContactDetails, GetContactsList, UpdateContact } from './apiService';
import { ContactWithAccountName } from '../../../models/contact/ContactWithAccountName';
import { getContacts } from './action';

// const DEFAULT_PAGE_NUMBER = 1;
// const DEFAULT_PAGE_SIZE = 5;

export function* workGetContactsFetch(action: actionPayloadModel): Generator<any> {
  try {
    const { accountId, searchQuery, pageNumber, pageSize } = action.payload;
    const response: any = yield call(GetContactsList, accountId, searchQuery, pageNumber, pageSize);
    if (response.status != 200) {
      toast.error('Error fetching contacts')
    } else {
      const contacts: ContactWithAccountName[] = response.data;
      yield put({ type: GET_CONTACTS_SUCCESS, payload: contacts });
      return response;
    }

  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workGetContactByIdFetch(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(GetContactDetails, action.payload);
    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const contact: ContactWithAccountName = response.data;
      yield put({ type: GET_CONTACT_DETAIL_SUCCESS, payload: contact });
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workCreateContact(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(CreateContact, action.payload);
    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const contact: Contact = response.data;
      yield put({ type: CREATE_CONTACT_SUCCESS, payload: contact });
      yield put(getContacts());
      toast.success('Contact created successfully ')
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workUpdateContact(action: any): Generator<any> {
  try {
    const response: any = yield call(UpdateContact, action.payload);

    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const updatedContact: Contact = response.data;
      yield put({ type: UPDATE_CONTACT_SUCCESS, payload: updatedContact });
      yield put(getContacts());
      toast.success('Update contact successfully')
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workDeleteContact(action: actionPayloadModel): Generator<any> {
  try {
    const response: any = yield call(DeleteContact, action.payload);
    if (response.status !== 200) {
      toast.error("Error deleting contact");
    } else {
      const contact: Contact = response.data;
      yield put({ type: DELETE_CONTACT_SUCCESS, payload: contact });
      yield put(getContacts());
      toast.success("Contact deleted successfully");
    }
  } catch (error) {
    toast.error("Somethign went wrong, please try again or contact administrator");
  }
}