import { Reducer } from "react";
import { CREATE_CONTACT_SUCCESS, GET_CONTACTS_SUCCESS, GET_CONTACT_DETAIL_SUCCESS, UPDATE_CONTACT_SUCCESS } from "../../../constants/reduxConstants";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { Contact } from "../../../models/contact/Contact";
import { contactState } from "../../../models/reduxState/contactState";

const INITIAL_STATE : contactState = {
    contacts:[],
    contact:null as Contact | null,
   refreshList:false
  };


const contactReducer: Reducer<contactState, actionPayloadModel> = (state: contactState = INITIAL_STATE, action: actionPayloadModel): contactState => {
    switch (action.type) {
        case GET_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.payload,
            }
       
        case GET_CONTACT_DETAIL_SUCCESS:
            return {
                ...state,
                contact: action.payload,
            }
       
        case CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                contact: action.payload,
                refreshList : true
            }
       
        case UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                contact: action.payload,
            }

      default:
        return state;
    }
  };

  export default contactReducer;