export interface SharedModel {
    id: number;
    name: string;
}

export interface SharedOwnerModel {
    id: number;
    label: string,
    email: string
}

export interface OrganizationBankModel{
    organizationModel : OrganizationModel;
    bankModel : BankModel[],
}
export interface OrganizationModel{
    id :number;
    orgName : string,
    isActive: boolean,
    timeZone: string,
    shifts: boolean,
    includeLogofToIdle :boolean,
    currency : string,
    billingStreet:string,
    billingCity :string,
    billingState:string,
    zipCode:string,
    billingCountry:string
}
export interface BankModel {
    bankId: number;
    name: string | null;
    branch: string | null;
    ifsc: string | null;
    organizationId: number | null;
}



export interface DbResponse {
    succeed: boolean;
    message: string;
    errorCode: string | null;
}