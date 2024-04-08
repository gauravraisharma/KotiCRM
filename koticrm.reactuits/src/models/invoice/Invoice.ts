export interface Invoice {
  id: number;
  accountID: number;
  ownerID: string;
  subject: string;
  invoiceDate: string;
  dueDate: string;
  contactID: number;
  dealName: string | null;
  purchaseOrder: string;
  status: number;
  fromBillingStreet: string | null;
  fromBillingCity: string | null;
  fromBillingState: string | null;
  fromZipCode: string | null;
  fromBillingCountry: string | null;
  toBillingStreet: string | null;
  toBillingCity: string | null;
  toBillingState: string | null;
  toZipCode: string | null;
  toBillingCountry: string | null;
  termsAndConditions: string | null;
  description: string | null;
  isDelete: boolean;
  createdBy: string | null;
  createdOn: string;
  modifiedBy: string | null;
  modifiedOn: string;
}

export class InvoiceClass implements Invoice {
  id: number;
  accountID: number;
  ownerID: string;
  subject: string;
  invoiceDate: string;
  dueDate: string;
  contactID: number;
  dealName: string | null;
  purchaseOrder: string;
  status: number;
  fromBillingStreet: string | null;
  fromBillingCity: string | null;
  fromBillingState: string | null;
  fromZipCode: string | null;
  fromBillingCountry: string | null;
  toBillingStreet: string | null;
  toBillingCity: string | null;
  toBillingState: string | null;
  toZipCode: string | null;
  toBillingCountry: string | null;
  termsAndConditions: string | null;
  description: string | null;
  isDelete: boolean;
  createdBy: string | null;
  createdOn: string;
  modifiedBy: string | null;
  modifiedOn: string;

  constructor() {
    this.id = 0;
    this.accountID = 0;
    this.ownerID = '';
    this.subject = '';
    this.invoiceDate = '';
    this.dueDate = '';
    this.contactID = 0;
    this.dealName = null;
    this.purchaseOrder = '';
    this.status = 0;
    this.fromBillingStreet = null;
    this.fromBillingCity = null;
    this.fromBillingState = null;
    this.fromZipCode = null;
    this.fromBillingCountry = null;
    this.toBillingStreet = null;
    this.toBillingCity = null;
    this.toBillingState = null;
    this.toZipCode = null;
    this.toBillingCountry = null;
    this.termsAndConditions = null;
    this.description = null;
    this.isDelete = false;
    this.createdBy = null;
    this.createdOn = '';
    this.modifiedBy = null;
    this.modifiedOn = '';
  }
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

export class InvoiceItemClass implements InvoiceItem {
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

  constructor() {
    this.id = 0;
    this.invoiceID = 0;
    this.sno = 0;
    this.productName = '';
    this.description = null;
    this.quantity = 0;
    this.amount = 0;
    this.discount = 0;
    this.tax = 0;
    this.total = 0;
  }
}

export interface InvoiceCreationModel {
  invoice: Invoice;
  invoiceItems: InvoiceItem[];
}

export class InvoiceCreationModelClass implements InvoiceCreationModel {
  invoice: Invoice;
  invoiceItems: InvoiceItem[];

  constructor() {
    this.invoice = new InvoiceClass();
    this.invoiceItems = [];
  }
}