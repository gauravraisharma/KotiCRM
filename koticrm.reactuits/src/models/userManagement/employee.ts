export interface Employee {
    employeeId: string;
    employeeCode: string;
    name: string;
    profilePictureURL: string;
    fatherName: string;
    guardianName: string;
    bloodGroup: string;
    dateOfBirth: string;
    joiningDate: string;
    relievingDate: string | null;
    contactNumber1: string;
    contactNumber2: string | null;
    guardianContactNumber: string;
    personalEmail: string;
    officialEmail: string;
    officialEmailPassword: string;
    skypeId: string;
    adharCardNumber: string;
    panNumber: string;
    bankAccountNumber: string;
    bank: string;
    branch: string;
    ifsc: string;
    departmentId: number;
    designationId: number;
    shiftId: number;
    isActive: boolean;
    permanentAddress: string;
    correspondenceAddress: string;

    // organizationID: string;
}


export class EmployeeClass implements Employee{
    employeeId: string;
    employeeCode: string;
    name: string;
    profilePictureURL: string;
    fatherName: string;
    guardianName: string;
    bloodGroup: string;
    dateOfBirth: string;
    joiningDate: string;
    relievingDate: string | null;
    contactNumber1: string;
    contactNumber2: string | null;
    guardianContactNumber: string;
    personalEmail: string;
    officialEmail: string;
    officialEmailPassword: string;
    skypeId: string;
    adharCardNumber: string;
    panNumber: string;
    bankAccountNumber: string;
    bank: string;
    branch: string;
    ifsc: string;
    departmentId: number;
    designationId: number;
    shiftId: number;
    isActive: boolean;
    permanentAddress: string;
    correspondenceAddress: string;


    constructor (){
        this.employeeId = "",
        this.employeeCode = "",
        this.name = "",
        this.profilePictureURL = "",
        this.fatherName = "",
        this.guardianName = "",
        this.bloodGroup = "",
        this.dateOfBirth = "",
        this.joiningDate = "",
        this.relievingDate = null,
        this.contactNumber1 = "",
        this.contactNumber2 = "",
        this.guardianContactNumber = "",
        this.personalEmail = "",
        this.officialEmail = "",
        this.officialEmailPassword = "",
        this.skypeId = "",
        this.adharCardNumber = "",
        this.panNumber = "",
        this.bankAccountNumber = "",
        this.bank = "",
        this.branch = "",
        this.ifsc = "",
        this.departmentId = 0,
        this.designationId = 0,
        this.shiftId = 0,
        this.isActive = false,
        this.permanentAddress = "",
        this.correspondenceAddress = ""
    }
} 