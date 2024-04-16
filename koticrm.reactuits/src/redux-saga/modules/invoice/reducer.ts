import { Reducer } from "react";
import { CREATE_INVOICE_SUCCESS, DELETE_INVOICE_SUCCESS, GET_INVOICES_FETCH, GET_INVOICES_SUCCESS, GET_INVOICE_DETAIL_SUCCESS, GET_INVOICE_OWNER_SUCCESS, GET_INVOICE_STATUS_SUCCESS, UPDATE_INVOICE_SUCCESS } from "../../../constants/reduxConstants";
import { Invoice } from "../../../models/invoice/Invoice";
import { invoiceState } from "../../../models/reduxState/invoiceState";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
const INITIAL_STATE: invoiceState = {
    invoiceStatus: [],
    invoices: [],
    invoice: null as Invoice | null,
    createInvoiceResponse: null,
    updateInvoiceResposne: null,
    deleteInvoiceResponse: null,
    invoiceOwner: [],
    refreshList: false,
    isLoading: false

};


const invoiceReducer: Reducer<invoiceState, AppAction> = (state: invoiceState = INITIAL_STATE, action: AppAction): invoiceState => {
    switch (action.type) {
        case GET_INVOICE_STATUS_SUCCESS:
            return {
                ...state,
                invoiceStatus: (action as actionPayloadModel).payload,
            }
        case GET_INVOICES_FETCH : 
            return {
                ...state,
                isLoading: true
            }
        case GET_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: (action as actionPayloadModel).payload,
                isLoading: false
            }
        case GET_INVOICE_DETAIL_SUCCESS:
            return {
                ...state,
                invoice: (action as actionPayloadModel).payload
            }
        case CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                createInvoiceResponse: (action as actionPayloadModel).payload
            }
        case UPDATE_INVOICE_SUCCESS:
            return {
                ...state,
                updateInvoiceResposne: (action as actionPayloadModel).payload
            }
        case DELETE_INVOICE_SUCCESS:
            return {
                ...state,
                deleteInvoiceResponse: (action as actionPayloadModel).payload
            }
        case GET_INVOICE_OWNER_SUCCESS:
            return {
                ...state,
                invoiceOwner: (action as actionPayloadModel).payload,
            }

        default:
            return state;
    }
};

export default invoiceReducer;