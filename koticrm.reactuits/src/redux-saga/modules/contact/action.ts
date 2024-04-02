import {
  CLEAR_CONTACT_REQUEST,
  CREATE_CONTACT_REQUEST,
  DELETE_CONTACT_REQUEST,
  GET_CONTACTS_FETCH,
  GET_CONTACT_DETAIL_FETCH,
  UPDATE_CONTACT_REQUEST
} from "../../../constants/reduxConstants";
import { Contact } from "../../../models/contact/Contact";


export const getContacts = () => ({
  type: GET_CONTACTS_FETCH
})

export const getContactById = (id: number) => ({
  type: GET_CONTACT_DETAIL_FETCH,
  payload: id
})

export const clearContact = () => ({
  type: CLEAR_CONTACT_REQUEST
})

export const createContact = (contact: Contact) => ({
  type: CREATE_CONTACT_REQUEST,
  payload: contact
});

export const updateContact = (contact: Contact) => ({
  type: UPDATE_CONTACT_REQUEST,
  payload: contact,
});

export const deleteContact = (id: number) => ({
  type: DELETE_CONTACT_REQUEST,
  payload: id,
});