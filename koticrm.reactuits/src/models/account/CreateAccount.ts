export interface CreateAccount {
    ownerId: number;
    industryId: number;
    annualRevenue: string;
    status: number;
    phone: string;
    fax: string;
    webSite: string;
    type: number;
    billingStreet: string;
    billingCity: string;
    billingState: string;
    billingCode: string;
    country: string;
    description: string;
    isactive: boolean;
    isdelete: boolean;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
}