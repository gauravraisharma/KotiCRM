// Define your initial values
export class initialEmployeeRecord implements EmployeeFinancialRecord {
  id: number;
  employeeId: number;
  financialYear: string;
  houseRentRecord: HouseRentRecord;
  houseRentRecordId: number;
  isNoHouseRentDeclaration: boolean;
  travelExpenditureRecord: TravelExpenditureRecord;
  travelExpenditureRecordId: number;
  homeLoanRecordId:number;
  isNoTravelDeclaration: boolean;
  homeLoanRecord: HomeLoanRecord;
  isNoHomeDeclaration: boolean;
  eightyCRecordId: number;
  eightyCRecord: EightyCDeclaration[]; // You might want to define a type for this
  eightyDRecord: EightyDRecord;
  eightyGRecord: EightyGRecord;
  otherInvestmentRecord: OtherInvestmentRecord;
  otherInvestmentRecordId: string;



//   constructor() {
//     this.id = 0;
//     this.employeeId = 0;
//     this.financialYear = "";
//     this.houseRentRecord = {
//       id: 0,
//       amount: null,
//       ownerPanCard: null,
//       proofdocumentLink: null,
//       isVerified: false,
//       remarks: "",
//     };
//     this.houseRentRecordId = 0;
//     this.isNoHouseRentDeclaration = false;
//     this.travelExpenditureRecord = {
//       id: 0,
//       amount: 0,
//       proofdocumentLink: null,
//       isVerified: false,
//       remarks: "",
//     };
//     this.travelExpenditureRecordId = 0;

//     this.isNoTravelDeclaration = false;
//     this.homeLoanRecord = {
//       id: 0,
//       lenderName: "",
//       lenderAddress: "",
//       lenderPanNumber: "",
//       amount: 0,
//       proofDocumentLink: null,
//       isVerified: false,
//       remarks: "",
//     };

//     this.homeLoanRecordId = 0;  
//     this.isNoHomeDeclaration = false;
//     this.eightyCRecordId = 0;
//     this. eightyCRecord: EightyCDeclaration[] = [],

//     this.eightyDRecord = {
//       id: 0,
//       insuranceAmount: 0,
//       insuranceProofLink: null,
//       medicalExpenseAmount: 0,
//       medicalExpenseProof: null,
//       isVerified: false,
//       remarks: "",
//     };

//     this.eightyGRecord = {
//       id: 0,
//       nameofdonee: "",
//       panNumber: "",
//       address: "",
//       amount: 0,
//       proofdocumentLink: null,
//       isVerified: false,
//       remarks: "",
//     };
//     this.otherInvestmentRecord = {
//       id: 0,
//       description: "",
//       proofdocumentLink: null,
//       isVerified: false,
//       remarks: "",
//     };
//     this.otherInvestmentRecordId = '';
//   }
// }
constructor(
  id: number = 0,
  employeeId: number = 0,
  financialYear: string = "",
  houseRentRecord: HouseRentRecord = {
      id: 0,
      amount: null,
      ownerPanCard: null,
      proofdocumentLink: null,
      isVerified: false,
      remarks: "",
  },
  houseRentRecordId: number = 0,
  isNoHouseRentDeclaration: boolean = false,
  travelExpenditureRecord: TravelExpenditureRecord = {
      id: 0,
      amount: 0,
      proofdocumentLink: null,
      isVerified: false,
      remarks: "",
  },
  travelExpenditureRecordId: number = 0,
  isNoTravelDeclaration: boolean = false,
  homeLoanRecord: HomeLoanRecord = {
      id: 0,
      lenderName: "",
      lenderAddress: "",
      lenderPanNumber: "",
      amount: 0,
      proofDocumentLink: null,
      isVerified: false,
      remarks: "",
  },
  homeLoanRecordId: number = 0,
  isNoHomeDeclaration: boolean = false,
  eightyCRecordId: number = 0,
  eightyCRecord: EightyCDeclaration[] = [],
  eightyDRecord: EightyDRecord = {
      id: 0,
      insuranceAmount: 0,
      insuranceProofLink: null,
      medicalExpenseAmount: 0,
      medicalExpenseProof: null,
      isVerified: false,
      remarks: "",
  },
  eightyGRecord: EightyGRecord = {
      id: 0,
      nameofdonee: "",
      panNumber: "",
      address: "",
      amount: 0,
      proofdocumentLink: null,
      isVerified: false,
      remarks: "",
  },
  otherInvestmentRecord: OtherInvestmentRecord = {
      id: 0,
      description: "",
      proofdocumentLink: null,
      isVerified: false,
      remarks: "",
  },
  otherInvestmentRecordId: string = ''
) {
  this.id = id;
  this.employeeId = employeeId;
  this.financialYear = financialYear;
  this.houseRentRecord = houseRentRecord;
  this.houseRentRecordId = houseRentRecordId;
  this.isNoHouseRentDeclaration = isNoHouseRentDeclaration;
  this.travelExpenditureRecord = travelExpenditureRecord;
  this.travelExpenditureRecordId = travelExpenditureRecordId;
  this.isNoTravelDeclaration = isNoTravelDeclaration;
  this.homeLoanRecord = homeLoanRecord;
  this.homeLoanRecordId = homeLoanRecordId;
  this.isNoHomeDeclaration = isNoHomeDeclaration;
  this.eightyCRecordId = eightyCRecordId;
  this.eightyCRecord = eightyCRecord;
  this.eightyDRecord = eightyDRecord;
  this.eightyGRecord = eightyGRecord;
  this.otherInvestmentRecord = otherInvestmentRecord;
  this.otherInvestmentRecordId = otherInvestmentRecordId;
}
}
export interface HouseRentRecord {
  id: number;
  amount: number | null;
  ownerPanCard: string | null;
  proofdocumentLink: string | null;
  isVerified: boolean;
  remarks: string;
}

export interface TravelExpenditureRecord {
  id: number;
  amount: number ;
  proofdocumentLink: string | null;
  isVerified: boolean;
  remarks: string;
}

export interface HomeLoanRecord {
  id: number;
  lenderName: string | null;
  lenderAddress: string | null;
  lenderPanNumber: string | null;  
  amount: number | null;
  proofDocumentLink: string | null;
  isVerified: boolean;
  remarks: string | null;
}
export interface EightyCDeclaration {
  id: number;
  deductionTypeId: number;
  amount: number;
  proofDocumentLink: string | null;
  isVerified: boolean;
  remarks: string;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
  isDelete: boolean;
  employee12BBId: number;
  employee12BB?: ''; // Optional as it's a navigation property
}

export interface EightyDRecord {
  id: number;
  insuranceAmount: number;
  insuranceProofLink: string | null;
  medicalExpenseAmount: number;
  medicalExpenseProof: string | null;
  isVerified: boolean;
  remarks: string;
}

export interface EightyGRecord {
  id: number;
  nameofdonee: string;
  panNumber: string;
  address: string;
  amount: number;
  proofdocumentLink: string | null;
  isVerified: boolean;
  remarks: string;
}

export interface OtherInvestmentRecord {
  id: number;
  description: string;
  proofdocumentLink: string | null;
  isVerified: boolean;
  remarks: string;
}

export interface EmployeeFinancialRecord {
  id: number;
  employeeId: number;
  financialYear: string;
  houseRentRecord: HouseRentRecord;
  houseRentRecordId: number;
  isNoHouseRentDeclaration: boolean;
  travelExpenditureRecord: TravelExpenditureRecord;
  isNoTravelDeclaration: boolean;
  homeLoanRecord: HomeLoanRecord;
  isNoHomeDeclaration: boolean;
  eightyCRecord: EightyCDeclaration[]; // You might want to define a type for this
  eightyDRecord: EightyDRecord;
  eightyGRecord: EightyGRecord;
  otherInvestmentRecord: OtherInvestmentRecord;
}
