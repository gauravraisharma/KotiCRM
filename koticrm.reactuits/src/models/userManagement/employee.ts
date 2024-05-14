export interface Employee {
    employeeId: string;
    employeeCode: string;
    name: string;
    profilePicture: File | null;
    fatherName: string;
    guardianName: string;
    bloodGroup: string;
    dateOfBirth: string;
    joiningDate: string;
    relievingDate: string | null;
    contactNumber: string;
    guardianContactNumber: string;
    email: string;
    password: string;
    skypeId: string;
    adharCardNumber: string;
    panNumber: string;
    bankAccountNumber: string;
    bank: string;
    branch: string;
    ifsc: string;
    departmentId: number |null ;
    designationId: number |null;
    roleId: string | null;
    shiftId: number | null;
    isActive: boolean;
    permanentAddress: string;
    correspondenceAddress: string;
    organizationId : number | null;


}
export interface UploadProfilePicture {
    userID: string;
    file: File | null;
}

export class EmployeeClass implements Employee{
    employeeId: string;
    employeeCode: string;
    name: string;
    profilePicture: File | null;
    fatherName: string;
    guardianName: string;
    bloodGroup: string;
    dateOfBirth: string;
    joiningDate: string;
    relievingDate: string | null;
    contactNumber: string;
    guardianContactNumber: string;
    email: string;
    password: string;
    skypeId: string;
    adharCardNumber: string;
    panNumber: string;
    bankAccountNumber: string;
    bank: string;
    branch: string;
    ifsc: string;
    departmentId: number | null;
    designationId: number |null;
    roleId: string;
    shiftId: number |null;
    isActive: boolean;
    permanentAddress: string;
    correspondenceAddress: string;
    organizationId : number | null;

    constructor() {
        this.employeeId = "";
        this.employeeCode = "";
        this.name = "";
        this.profilePicture = null;
        this.fatherName = "";
        this.guardianName = "";
        this.bloodGroup = "";
        this.dateOfBirth = "";
        this.joiningDate = "";
        this.relievingDate = null;
        this.contactNumber = "";
        this.guardianContactNumber = "";
        this.email = "";
        this.password = "";
        this.skypeId = "";
        this.adharCardNumber = "";
        this.panNumber = "";
        this.bankAccountNumber = "";
        this.bank = "";
        this.branch = "";
        this.ifsc = "";
        this.departmentId = null;
        this.designationId = null;
        this.roleId = "";
        this.shiftId = null;
        this.isActive = false;
        this.permanentAddress = "";
        this.correspondenceAddress = "";
        this.organizationId = null;
    }
    
}