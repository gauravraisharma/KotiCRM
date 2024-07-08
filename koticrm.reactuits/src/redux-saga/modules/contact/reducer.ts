import { Reducer } from "react";
import { CLEAR_CONTACT_SUCCESS, CREATE_CONTACT_SUCCESS, DELETE_CONTACT_SUCCESS, GET_CONTACTS_FETCH, GET_CONTACTS_SUCCESS, GET_CONTACT_DETAIL_SUCCESS, UPDATE_CONTACT_SUCCESS } from "../../../constants/reduxConstants";
import { Contact } from "../../../models/contact/Contact";
import { contactState } from "../../../models/reduxState/contactState";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";

const INITIAL_STATE: contactState = {
    contacts: [],
    contact: null as Contact | null,
    createContactResponse: null as Contact | null,
    refreshList: false,
    isLoading : false

};


const contactReducer: Reducer<contactState, AppAction> = (state: contactState = INITIAL_STATE, action: AppAction): contactState => {
    switch (action.type) {
        case GET_CONTACTS_FETCH:
            return {
                ...state,
                isLoading : true
            }
        case GET_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: (action as actionPayloadModel).payload,
                isLoading : false
            }

        case GET_CONTACT_DETAIL_SUCCESS:
            return {
                ...state,
                contact: (action as actionPayloadModel).payload,
            }

        case CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                createContactResponse: (action as actionPayloadModel).payload
            }

        case UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                contact: (action as actionPayloadModel).payload,
            }
        case DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                refreshList: true
            }

        case CLEAR_CONTACT_SUCCESS:
            return {
                ...state,
                contact: null,
            }

        default:
            return state;
    }
};

export default contactReducer;