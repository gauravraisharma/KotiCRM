export interface SharedModel {
    id: number;
    name: string;
}

export interface SharedOwnerModel {
    id: number;
    label: string,
    email: string
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
    billingCode:string,
    billingCountry:string
}


export interface DbResponse {
    succeed: boolean;
    message: string;
    errorCode: string | null;
}