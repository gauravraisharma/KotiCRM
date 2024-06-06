import { apiResponse, axiosInstance, responseBody } from "../../../apiInterceptor/axiosInterceptor";
import { DeductionRecord, EightyDRecord, EightyGRecord, EmployeeFinancialRecord, HomeLoanRecord, HouseRentRecord, OtherInvestmentRecord, TravelExpenditureRecord } from "../../../models/Form12BB/Form12BB";
import { Employee } from "../../../models/userManagement/employee";
import { Employees } from "../../../models/userManagement/employees";


export async function GetEmployeeId(){
    try {
        const response = await axiosInstance.get(`/Shared/GetEmployeeId`);
        return response;
    } catch (error: any) {
        const errorResponse = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function GetEmployeesList(searchQuery: string, pageNumber: number, pageSize: number){
    try {
        const response = await axiosInstance.get(`/UserAccount/GetUsers?searchQuery=${searchQuery}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<Employees[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}



export async function GetEmployeeById(employeeId: string){
    try {
        const response = await axiosInstance.get(`/UserAccount/GetEmployeeById/` + employeeId);
        return response.data.employeeData;
    } catch (error: any) {
        const errorResponse: apiResponse<Employees[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
  
export async function CreateEmployee(employee: FormData) {
    try {
        const response = await axiosInstance.post<Employee>(`/UserAccount/CreateEmployee`, employee);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<Employee> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function UpdateEmployee(employee: FormData) {
    try {
        const response = await axiosInstance.put<Employee>(`/UserAccount/UpdateEmployee`, employee);
        return responseBody(response);
    } catch (error: any) {
        const errorResponse: apiResponse<Employee> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function DeleteEmployee(employeeId: string) {
    try {
        const response = await axiosInstance.get(`/UserAccount/DeleteEmployee/${employeeId}`);
        return responseBody(response);
    } catch (error: any) {
        const errorResponse: apiResponse<Employee> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function ChangePassword(passwordRequestModal:any) {
    try {
        const response = await axiosInstance.post(`/UserAccount/ChangePassword`,passwordRequestModal);
        return responseBody(response);
    } catch (error: any) {
        const errorResponse: apiResponse<Employee> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

// Taxation services
  

export async function GetEmployee12BB(id: string , financialYear : string){
    try {
     
        const response = await axiosInstance.get(`/TaxDeclaration/Employee12BB/` + id + '/' + financialYear);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<EmployeeFinancialRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function GetHouseRent(id: number){
    try {
        const response = await axiosInstance.get(`/TaxDeclaration/GetHouseRent/` + id);
        console.log(response)
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<HouseRentRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
// https://localhost:7063/api/TaxDeclaration/GetHouseRent/3
export async function GetLeaveTravelExpenditure(id: number){
    try {
        const response = await axiosInstance.get(`/TaxDeclaration/GetLeaveTravelExpenditure/` + id);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<TravelExpenditureRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
export async function GetInterestPayableOnHomeLoan(id: number){
    try {
        const response = await axiosInstance.get(`/TaxDeclaration/GetInterestPayableOnHomeLoan/` + id);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<HomeLoanRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function GetEightyC(id: number){
    try {
        const response = await axiosInstance.get(`/TaxDeclaration/GetEightyC/` + id);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<DeductionRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
export async function GetEightyD(id: number){
    try {
        const response = await axiosInstance.get(`/TaxDeclaration/GetEightyD/` + id);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<EightyDRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
export async function GetEightyG(id: number){
    try {
        const response = await axiosInstance.get(`/TaxDeclaration/GetEightyG/` + id);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<EightyGRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
export async function GetOtherInvestment(id: number){
    try {
        const response = await axiosInstance.get(`/TaxDeclaration/GetOtherInvestment/` + id);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<OtherInvestmentRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

//save taxation


export async function SaveHouseRent(houseRentData: HouseRentRecord) {
    try {
        const response = await axiosInstance.post<HouseRentRecord>(`/TaxDeclaration/HouseRent`, houseRentData);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<HouseRentRecord> = {
            data: undefined,
            status: error.response?.status || 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function SaveLeaveTravelExpenditure(LeaveTravelExpenditure: TravelExpenditureRecord) {
    try {
        const response = await axiosInstance.post<TravelExpenditureRecord>(`/TaxDeclaration/LeaveTravelExpenditure`, LeaveTravelExpenditure);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<TravelExpenditureRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function SaveInterestPayableOnHomeLoan(InterestPayableOnHomeLoan: HomeLoanRecord) {
    try {
        const response = await axiosInstance.post<HomeLoanRecord>(`/TaxDeclaration/InterestPayableOnHomeLoan`, InterestPayableOnHomeLoan);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<HomeLoanRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function SaveEightyC(EightyC: FormData) {
    try {
        const response = await axiosInstance.post<DeductionRecord>(`/TaxDeclaration/EightyC`, EightyC);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<DeductionRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function SaveEightyD(EightyD: FormData) {
    try {
        const response = await axiosInstance.post<EightyDRecord>(`/TaxDeclaration/EightyC`, EightyD);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<EightyDRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function SaveEightyG(EightyG: FormData) {
    try {
        const response = await axiosInstance.post<EightyGRecord>(`/TaxDeclaration/EightyG`, EightyG);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<EightyGRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
export async function SaveOtherInvestment(OtherInvestment: OtherInvestmentRecord) {
    try {
        const response = await axiosInstance.post<OtherInvestmentRecord>(`/TaxDeclaration/OtherInvestment`, OtherInvestment);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<OtherInvestmentRecord> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}



