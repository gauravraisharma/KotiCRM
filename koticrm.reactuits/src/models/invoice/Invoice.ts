export interface Invoice {
    id: number;
    accountId: number;
    ownerId: number;
    subject: string;
    invoiceDate: Date;
    dueDate: Date;
    contactId: number;
    purchaseOrder: string | null;
    status: string;
    billingStreet: string | null;
    billingCity: string | null;
    billingState: string | null;
    billingCode: string | null;
    billingCountry: string | null;
    termsAndConditions: string | null;
    description: string | null;
    subTotal: number;
    discount: number;
    adjustments: number;
    grandTotal: number;
  }
  
 
  