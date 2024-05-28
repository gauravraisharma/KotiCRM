export interface HouseRentRecord {
    Id: number;
    Amount: number;
    ownerPanCard: string | null;
    proofdocumentLink: File | null;
    isVerfied: boolean;
    remarks: string;
  }
  
  export interface TravelExpenditureRecord {
    Id: number;
    Amount: number;
    proofdocumentLink: File | null;
    isVerfied: boolean;
    remarks: string;
  }
  
  export interface HomeLoanRecord {
    Id: number;
    lenderName: string;
    LenderAddress: string;
    LenderPanNumber: string;
    Amount: number;
    proofdocumentLink: File | null;
    isVerfied: boolean;
    remarks: string;
  }
  
  export interface DeductionRecord {
    Id: number;
    DeductionTypeId: number;
    Amount: number;
    proofdocumentLink: File | null;
    isVerfied: boolean;
    remarks: string;
  }
  
 export interface EightyDRecord {
    Id: number;
    InsuranceAmount: number;
    InsuranceProofLink: File | null;
    MedicalExpenseAmount: number;
    MedicalExpenseProof: File | null;
    isVerfied: boolean;
    remarks: string;
  }
  
 export  interface EightyGRecord {
    Id: number;
    nameofdonee: string;
    PanNumber: string;
    Address: string;
    Amount: number;
    proofdocumentLinkL: File | null;
    isVerfied: boolean;
    remarks: string;
  }
  
  export interface OtherInvestmentRecord {
    Id: number;
    description: string;
    proofdocumentLink: File | null;
    isVerfied: boolean;
    remarks: string;
  }
  
  export interface EmployeeFinancialRecord {
    Id: number;
    EmployeeId: number;
    FinancialYear: string;
    HouseRentRecord: HouseRentRecord;
    IsNoHouseRentDeclaration: boolean;
    TravelExpenditureRecord: TravelExpenditureRecord;
    IsNoTravelDeclaration: boolean;
    HomeLoanRecord: HomeLoanRecord;
    IsNoHomeDeclaration: boolean;
    EightyCRecord: DeductionRecord[];
    EightyDRecord: EightyDRecord;
    EightyGRecord: EightyGRecord;
    OtherInvestmentRecord: OtherInvestmentRecord;
  }
// Define your initial values
export const initialValues: EmployeeFinancialRecord = {
    Id: 0, // Assuming this is the default value for Id
    EmployeeId: 0, // Assuming this is the default value for EmployeeId
    FinancialYear: '',
    HouseRentRecord: {
      Id: 0,
      Amount: 0,
      ownerPanCard: null,
      proofdocumentLink: null,
      isVerfied: false,
      remarks: ''
    },
    IsNoHouseRentDeclaration: false,
    TravelExpenditureRecord: {
      Id: 0,
      Amount: 0,
      proofdocumentLink: null,
      isVerfied: false,
      remarks: ''
    },
    IsNoTravelDeclaration: false,
    HomeLoanRecord: {
      Id: 0,
      lenderName: '',
      LenderAddress: '',
      LenderPanNumber: '',
      Amount: 0,
      proofdocumentLink: null,
      isVerfied: false,
      remarks: ''
    },
    IsNoHomeDeclaration: false,
    EightyCRecord: [],
    EightyDRecord: {
      Id: 0,
      InsuranceAmount: 0,
      InsuranceProofLink: null,
      MedicalExpenseAmount: 0,
      MedicalExpenseProof: null,
      isVerfied: false,
      remarks: ''
    },
    EightyGRecord: {
      Id: 0,
      nameofdonee: '',
      PanNumber: '',
      Address: '',
      Amount: 0,
      proofdocumentLinkL: null,
      isVerfied: false,
      remarks: ''
    },
    OtherInvestmentRecord: {
      Id: 0,
      description: '',
      proofdocumentLink: null,
      isVerfied: false,
      remarks: ''
    }
};