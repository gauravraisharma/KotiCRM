// Define your initial values
export class InitialEmployeeRecord implements EmployeeFinancialRecord {
  id: number;
  employeeId: string;
  financialYear: string;
  houseRentRecord: HouseRentRecord;
  houseRentRecordId: number;
  travelExpenditureRecordId: number;
  homeLoanRecordId: number;
  eightyDRecordId: number;
  eightyGRecordId: number;
  otherInvestmentRecordId: number;
  isNoHouseRentDeclaration: boolean;
  travelExpenditureRecord: TravelExpenditureRecord;
  isNoTravelDeclaration: boolean;
  homeLoanRecord: HomeLoanRecord;
  isNoHomeDeclaration: boolean;
  eightyCRecordId: number;
  eightyCDeclarations: EightyCDeclaration[]; // You might want to define a type for this
  eightyCDeductionTypes: EightyCDeductionTypes[];
  eightyDRecord: EightyDRecord;
  eightyGRecord: EightyGRecord;
  otherInvestmentRecord: OtherInvestmentRecord;
  isDeclarationComplete: boolean;
  modifiedBy: string;
  modifiedOn: Date | null;
  createdBy: string ;



constructor(
  id: number = 0,
  employeeId: string = "",
  financialYear: string = "",
  houseRentRecord: HouseRentRecord = {
      id: 0,
      amount: null,
      ownerPanCard: null,
      proofDocumentLink: null,
      isVerified: false,
      remarks: "",
  },
  houseRentRecordId: number = 0,
  eightyDRecordId: number = 0,
  eightyGRecordId: number = 0,
  isNoHouseRentDeclaration: boolean = false,
  travelExpenditureRecord: TravelExpenditureRecord = {
      id: 0,
      amount: 0,
      proofDocumentLink: null,
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
  eightyCDeductionTypes: EightyCDeductionTypes[] = [],
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
      nameOfDonee: "",
      panNumber: "",
      address: "",
      amount: 0,
      proofDocumentLink: null,
      isVerified: false,
      remarks: "",
  },
  otherInvestmentRecord: OtherInvestmentRecord = {
      id: 0,
      description: "",
      proofDocumentLink: null,
      isVerified: false,
      remarks: "",
  },
  otherInvestmentRecordId: number = 0,
  
  isDeclarationComplete: boolean = false,
  modifiedBy: string = "",
  modifiedOn: Date | null = null,
  createdBy: string = "",
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
  this.eightyDRecordId = eightyDRecordId;
  this.eightyGRecordId = eightyGRecordId;
  this.isNoHomeDeclaration = isNoHomeDeclaration;
  this.eightyCRecordId = eightyCRecordId;
  this.eightyCDeclarations = eightyCRecord;
  this.eightyCDeductionTypes = eightyCDeductionTypes;
  this.eightyDRecord = eightyDRecord;
  this.eightyGRecord = eightyGRecord;
  this.otherInvestmentRecord = otherInvestmentRecord;
  this.otherInvestmentRecordId = otherInvestmentRecordId;
  
  this.isDeclarationComplete = isDeclarationComplete;
  this.modifiedBy = modifiedBy;
  this.modifiedOn = modifiedOn;
  this.createdBy = createdBy;
}
}
export interface HouseRentRecord {
  id: number;
  amount: number | null;
  ownerPanCard: File | null;
  proofDocumentLink: string | null;
  isVerified: boolean;
  remarks: string;
}

export interface TravelExpenditureRecord {
  id: number;
  amount: number ;
  proofDocumentLink: File | null;
  isVerified: boolean;
  remarks: string;
}

export interface HomeLoanRecord {
  id: number;
  lenderName: string | null;
  lenderAddress: string | null;
  lenderPanNumber: string | null;  
  amount: number | null;
  proofDocumentLink: File | null;
  isVerified: boolean;
  remarks: string | null;
}
export interface EightyCDeclaration {
  id: number;
  deductionTypeId: number;
  amount: number;
  proofDocumentLink: File | null;
  isVerified: boolean;
  remarks: string;
  createdBy: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
  isDelete: boolean;
  employee12BBId: number;
  employee12BB?: ''; // Optional as it's a navigation property
  eightyCDeductionTypes: EightyCDeductionTypes[];
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
  nameOfDonee: string;
  panNumber: string;
  address: string;
  amount: number;
  proofDocumentLink: File | null;
  isVerified: boolean;
  remarks: string;
}

export interface OtherInvestmentRecord {
  id: number;
  description: string;
  proofDocumentLink: File | null;
  isVerified: boolean;
  remarks: string;
}

export interface EightyCDeductionTypes {
  id: number;
  name: string;
}

export interface EmployeeFinancialRecord {
  id: number;
  employeeId: string;
  financialYear: string;
  houseRentRecordId: number;
  travelExpenditureRecordId: number;
  homeLoanRecordId: number;
  eightyDRecordId: number;
  eightyGRecordId: number;
  otherInvestmentRecordId: number;
  houseRentRecord: HouseRentRecord;
  isNoHouseRentDeclaration: boolean;
  travelExpenditureRecord: TravelExpenditureRecord;
  isNoTravelDeclaration: boolean;
  homeLoanRecord: HomeLoanRecord;
  isNoHomeDeclaration: boolean;
  eightyCDeclarations: EightyCDeclaration[]; // You might want to define a type for this
  eightyCDeductionTypes: EightyCDeductionTypes[];
  eightyDRecord: EightyDRecord;
  eightyGRecord: EightyGRecord;
  otherInvestmentRecord: OtherInvestmentRecord;
  isDeclarationComplete: boolean;
  modifiedBy: string;
  modifiedOn: Date | null;
  createdBy: string;
}
