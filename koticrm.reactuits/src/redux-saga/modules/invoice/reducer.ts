import { Reducer } from "react";
import {  CREATE_INVOICE_SUCCESS, DELETE_INVOICE_SUCCESS, GET_INVOICE_DETAIL_SUCCESS, GET_INVOICE_OWNER_SUCCESS, GET_INVOICE_STATUS_SUCCESS, GET_INVOICE_SUCCESS, UPDATE_INVOICE_SUCCESS } from "../../../constants/reduxConstants";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { Invoice } from "../../../models/invoice/Invoice";
import { invoiceState } from "../../../models/reduxState/invoiceState";
const INITIAL_STATE : invoiceState = {
    invoiceStatus : [],
    invoices:[],
    invoice:null as Invoice | null,
    createInvoiceResponse: null,
    updateInvoiceResposne: null,
    deleteInvoiceResponse: null,
    invoiceOwner: [],
   refreshList:false
  };


const invoiceReducer: Reducer<invoiceState, actionPayloadModel> = (state: invoiceState = INITIAL_STATE, action: actionPayloadModel): invoiceState => {
    switch (action.type) {
        case GET_INVOICE_STATUS_SUCCESS:
            return {
                ...state,
                invoiceStatus: action.payload,
            }
        case GET_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: action.payload
            }
        case GET_INVOICE_DETAIL_SUCCESS:
            return {
                ...state,
                invoice: action.payload
            }
        case CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                createInvoiceResponse: action.payload
            }
        case UPDATE_INVOICE_SUCCESS:
            return {
                ...state,
                updateInvoiceResposne: action.payload
            }
        case DELETE_INVOICE_SUCCESS:
            return {
                ...state,
                deleteInvoiceResponse: action.payload
            }
        case GET_INVOICE_OWNER_SUCCESS:
            return {
                ...state,
                invoiceOwner: action.payload,
            }

      default:
        return state;
    }
  };

  export default invoiceReducer;