import { apiResponse, axiosInstance, responseBody } from "../../../apiInterceptor/axiosInterceptor";
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

export async function GetEmployeesList(){
    try {
        const response = await axiosInstance.get(`/UserAccount/GetUsers`);
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
  
export async function CreateEmployee(employee: Employee) {
    try {
        const response = await axiosInstance.post<Employee>(`/UserAccount/CreateEmployee`, employee);
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

export async function UpdateEmployee(employee: Employee) {
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
