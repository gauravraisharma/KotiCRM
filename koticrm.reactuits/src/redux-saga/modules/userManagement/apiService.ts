import { AxiosError, AxiosResponse } from "axios";
import { apiResponse, axiosInstance, responseBody } from "../../../apiInterceptor/axiosInterceptor";
import { Employee } from "../../../models/userManagement/employee";
import { Employees } from "../../../models/userManagement/employees";


export async function GetEmployeesList(){
    try {
        const response = await axiosInstance.get(`/UserAccount/GetUsers`);
        return response.data.result;
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