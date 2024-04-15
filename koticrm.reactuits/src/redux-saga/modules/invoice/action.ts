import { CLEAR_INVOICE_REQUEST, CREATE_INVOICE_REQUEST, DELETE_INVOICE_REQUEST, GET_INVOICES_FETCH, GET_INVOICE_DETAIL_FETCH, GET_INVOICE_OWNER_FETCH, GET_INVOICE_STATUS_FETCH, UPDATE_INVOICE_REQUEST } from "../../../constants/reduxConstants";
import { InvoiceCreationModel } from "../../../models/invoice/Invoice";

export const getInvoiceStatus = () => ({
  type: GET_INVOICE_STATUS_FETCH
})

export const getInvoices = (accountID?: number | null, status?: number | null, startDate?: string | null, endDate?: string | null) => ({
  type: GET_INVOICES_FETCH,
  payload: { accountID, status, startDate, endDate }
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