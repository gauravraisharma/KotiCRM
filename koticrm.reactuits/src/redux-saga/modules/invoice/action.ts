import { CLEAR_INVOICE_REQUEST, CREATE_INVOICE_REQUEST, DELETE_INVOICE_REQUEST, GET_INVOICE_DETAIL_FETCH, GET_INVOICE_FETCH, GET_INVOICE_OWNER_FETCH, GET_INVOICE_STATUS_FETCH, UPDATE_INVOICE_REQUEST } from "../../../constants/reduxConstants";
import { Invoice, InvoiceCreationModel } from "../../../models/invoice/Invoice";

export const getInvoiceStatus = () => ({
  type: GET_INVOICE_STATUS_FETCH
})

export const getInvoice = () => ({
  type: GET_INVOICE_FETCH
})

export const getInvoiceByIdRequest = (id: any) => ({
  type: GET_INVOICE_DETAIL_FETCH,
  payload: id,
});

export const createInvoiceRequest = (invoice: InvoiceCreationModel) => ({
  type: CREATE_INVOICE_REQUEST,
  payload: invoice,
});

export const updateInvoiceRequest = (invoiceCreationModel: InvoiceCreationModel) => ({
  type: UPDATE_INVOICE_REQUEST,
  payload: invoiceCreationModel,
});

export const deleteInvoiceRequest = (id: any) => ({
  type: DELETE_INVOICE_REQUEST,
  payload: id,
});

export const getInvoiceOwner = () => ({
  type: GET_INVOICE_OWNER_FETCH
})

export const clearInvoice = () => ({
  type: CLEAR_INVOICE_REQUEST
})