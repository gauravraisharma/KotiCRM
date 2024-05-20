import { Employee } from "../userManagement/employee";

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
    timeZone: boolean,
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

export interface Department {
    departmentId: number;
    name?: string;
    organizationId?: number;
    employees: Employee[];
    organization?: OrganizationModel | null;
}

export interface Designation {
    designationId: number;
    name?: string | null;
    organizationId?: number | null;
    employees: Employee[];
    organization?: OrganizationModel | null;
}


export interface Bank {
    bankId: number;
    bankAccountNumber?: string | null;
    name?: string | null;
    branch?: string | null;
    ifsc?: string | null;
    organizationId?: number | null;
    employees: Employee[];
}

export interface Shift {
    shiftId: number;
    name?: string | null;
    startTime?: string | null;
    endTime?: string | null;
    organizationId?: number | null;
    employees: Employee[];
  }



