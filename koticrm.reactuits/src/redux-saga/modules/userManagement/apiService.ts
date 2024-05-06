import axios from "axios";
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
        return responseBody(response);
        // const response = await axios.post<Employee>(`/UserAccount/CreateEmployee`, employee, {
        //     headers: {
        //     'Content-Type': 'multipart/form-data'
        //     }
        // });
        // return responseBody(response);
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

