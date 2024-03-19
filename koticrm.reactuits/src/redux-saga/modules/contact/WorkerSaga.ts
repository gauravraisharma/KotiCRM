
import { toast } from 'react-toastify';
import { actionPayloadModel } from '../../../models/actionModel/actionModel';
import { Contact } from '../../../models/contact/Contact';
import { CREATE_CONTACT_SUCCESS, GET_CONTACTS_SUCCESS, GET_CONTACT_DETAIL_SUCCESS, UPDATE_CONTACT_SUCCESS } from '../../../constants/reduxConstants';
import { call, put } from 'redux-saga/effects';
import { CreateContact, GetContactDetails, GetContactsList, UpdateContact } from './apiService';

export function* workGetContactsFetch(): Generator<any> {
  try {
    const response: any = yield call(GetContactsList);
    if (response.status != 200) {
      toast.error('Error fetching contacts')
    } else {
      const contacts: Contact[] = response.data;
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
      const contact: Contact = response.data;
      yield put({ type: GET_CONTACT_DETAIL_SUCCESS, payload: contact });
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

export function* workCreateContact(action: any): Generator<any> {
  try {
    const response: any = yield call(CreateContact, action.payload);

    if (response.status != 200) {
      toast.error('Error fetching accounts')
    }
    else {
      const contact: Contact = response.data;
      yield put({ type: CREATE_CONTACT_SUCCESS, payload: contact });
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
    }
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}