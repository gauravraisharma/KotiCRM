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
  homeDeclarationId:number;
  isNoTravelDeclaration: boolean;
  homeLoanRecord: HomeLoanRecord;
  isNoHomeDeclaration: boolean;
  eightyCRecord: any[]; // You might want to define a type for this
  eightyDRecord: EightyDRecord;
  eightyGRecord: EightyGRecord;
  otherInvestmentRecord: OtherInvestmentRecord;
  otherInvestmentRecordId: string;



  constructor() {
    this.id = 0;
    this.employeeId = 0;
    this.financialYear = "";
    this.houseRentRecord = {
      id: 0,
      amount: null,
      ownerPanCard: null,
      proofdocumentLink: null,
      isVerified: false,
      remarks: "",
    };
    this.houseRentRecordId = 0;
    this.isNoHouseRentDeclaration = false;
    this.travelExpenditureRecord = {
      id: 0,
      amount: 0,
      proofdocumentLink: null,
      isVerified: false,
      remarks: "",
    };
    this.travelExpenditureRecordId = 0;

    this.isNoTravelDeclaration = false;
    this.homeLoanRecord = {
      id: 0,
      lenderName: "",
      lenderAddress: "",
      lenderPanNumber: "",
      amount: 0,
      proofdocumentLink: null,
      isVerified: false,
      remarks: "",
    };

    this.homeDeclarationId = 0;  
    this.isNoHomeDeclaration = false;
    this.eightyCRecord = [];
    this.eightyDRecord = {
      id: 0,
      insuranceAmount: 0,
      insuranceProofLink: null,
      medicalExpenseAmount: 0,
      medicalExpenseProof: null,
      isVerified: false,
      remarks: "",
    };
    this.eightyGRecord = {
      id: 0,
      nameofdonee: "",
      panNumber: "",
      address: "",
      amount: 0,
      proofdocumentLinkL: null,
      isVerified: false,
      remarks: "",
    };
    this.otherInvestmentRecord = {
      id: 0,
      description: "",
      proofdocumentLink: null,
      isVerified: false,
      remarks: "",
    };
    this.otherInvestmentRecordId = '';
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
  amount: number;
  proofdocumentLink: string | null;
  isVerified: boolean;
  remarks: string;
}

export interface HomeLoanRecord {
  id: number;
  lenderName: string;
  lenderAddress: string;
  lenderPanNumber: string;  
  amount: number;
  proofdocumentLink: string | null;
  isVerified: boolean;
  remarks: string;
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
  proofdocumentLinkL: string | null;
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
  eightyCRecord: any[]; // You might want to define a type for this
  eightyDRecord: EightyDRecord;
  eightyGRecord: EightyGRecord;
  otherInvestmentRecord: OtherInvestmentRecord;
}
