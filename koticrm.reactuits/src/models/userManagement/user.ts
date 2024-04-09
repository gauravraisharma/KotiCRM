export interface User {
    employeeID: string;
    employeeCode: string;
    joiningDate: string;
    relievingDate: string;
    isActive: boolean;
    name: string;
    fatherName: string;
    dateOfBirth: string;
    panNumber: string;
    aadharCardNumber: number;
    bloodGroup: string;
    correspondenceAddress: string;
    permanentAddress: string;
    contactNumber1: number;
    contactNumber2: number;
    personalEmail: string;
    officialEmail: string;
    officialEmailPassword: string;
    officialSkype: string;
    designationID: number;
    departmentID: number;
    bankID: string;
    accountNumber: number;
    // ifscCode: string;
    shiftID: string;
    
    guardianName: string;
    guardianContactNumber: number;
    profilePictureURL: string;
    organizationID: string;
}

export interface Designation{
    designationID: number,
    name: string
}

export interface Department{
    departmentID: number,
    name: string
}


export class UserClass implements User{
        employeeID: string;
    employeeCode: string;
    joiningDate: string;
    relievingDate: string;
    isActive: boolean;
    name: string;
    fatherName: string;
    dateOfBirth: string;
    panNumber: string;
    aadharCardNumber: number;
    bloodGroup: string;
    correspondenceAddress: string;
    permanentAddress: string;
    contactNumber1: number;
    contactNumber2: number | 0;
    personalEmail: string;
    officialEmail: string;
    officialEmailPassword: string;
    officialSkype: string;
    designationID: number;
    departmentID: number;
    bankID: string;
    accountNumber: number;
    shiftID: string;
    guardianName: string;
    guardianContactNumber: number;
    profilePictureURL: string;
    organizationID: string;


    constructor (){
        this.employeeID = '';
        this.employeeCode = '';
        this.joiningDate = '';
        this.relievingDate = '';
        this.isActive = true;
        this.name = '';
        this.fatherName = '';
        this.dateOfBirth = '';
        this.panNumber = '';
        this.aadharCardNumber = 0;
        this.bloodGroup = '';
        this.correspondenceAddress = '';
        this.permanentAddress = '';
        this.contactNumber1 = 0;
        this.contactNumber2 = 0;
        this.personalEmail = '';
        this.officialEmail = '';
        this.officialEmailPassword = '';
        this.officialSkype = '';
        this.designationID = 0;
        this.departmentID = 0;
        this.bankID = '';
        this.accountNumber = 0;
        this.shiftID = '';
        this.guardianName = '';
        this.guardianContactNumber = 0;
        this.profilePictureURL = '';
        this.organizationID = '';
    }
} 