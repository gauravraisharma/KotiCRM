export interface InvoiceCreationModel{
  Invoice: Invoice;
  InvoiceItems : InvoiceItem[];
}


export interface Invoice {
  id: number;
  accountID: number;
  ownerID: string ;
  subject: string ;
  invoiceDate: string;
  dueDate: string;
  contactID: number;
  dealName: string | null ;
  purchaseOrder: string ;
  status: number;
  fromBillingStreet: string | null;
  fromBillingCity: string | null;
  fromBillingState: string | null;
  fromBillingCode: string | null;
  fromBillingCountry: string | null;
  toBillingStreet: string | null;
  toBillingCity: string | null;
  toBillingState: string | null;
  toBillingCode: string | null;
  toBillingCountry: string | null;
  termsAndConditions: string | null;
  description: string | null;
  // isDelete: boolean;
  createdBy: string | null;
  createdOn: string ;
  modifiedBy: string | null;
  modifiedOn: string;
}


export interface InvoiceItem {
  id: number;
  invoiceID: number;
  sno: number;
  productName: string;
  description: string | null;
  quantity: number;
  amount: number;
  discount: number;
  tax: number;
  total: number;
}
