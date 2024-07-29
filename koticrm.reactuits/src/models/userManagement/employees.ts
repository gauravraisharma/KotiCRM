export interface Employees
{
    userId:string;
    profilePicturePath: string;
    employeeId: string;
    employeeCode?: string;
    name?: string;
    email?: string;
    contactNumber?: string;
    joiningDate?: string;
    department?: string;
    designation?: string;
    shift?: string;

}

export interface ManageTaxes {
    employeeId: string | null;
    userId: string | null;
  
    empCode: string | null;
    name: string | null;
    contactNumber: string | null;
    email: string | null;
    isDeclarationComplete: boolean;
    submittedOn: Date | null;
    FinancialYear: string
}
