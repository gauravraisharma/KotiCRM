import { Invoice } from "../invoice/Invoice";

export interface invoiceState{
    invoiceStatus : [],
    invoices:[],
    invoice:Invoice | null,
    createInvoiceResponse: Invoice | null,
    updateInvoiceResposne: Invoice | null,
    deleteInvoiceResponse: Invoice | null,
    invoiceOwner: [],
   refreshList:boolean
   isLoading: boolean
}