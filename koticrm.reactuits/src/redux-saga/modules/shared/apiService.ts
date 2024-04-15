import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance,responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { Bank, BankModel, Department, Designation, OrganizationBankModel, OrganizationModel, SharedModel, Shift } from '../../../models/commonModels/SharedModels';


 export function updateTimeZone(id : number,organization: OrganizationModel): Promise<apiResponse<OrganizationModel>>{ 
   return axiosInstance.put<OrganizationModel>(`/Organization/UpdateOrganization/${id}`, organization).
   then((response: AxiosResponse<OrganizationModel>) => responseBody(response)).
   catch((error:AxiosError) =>{ 
    const errorResponse: apiResponse<OrganizationModel> = {
        data:undefined,
        status: 500,
        statusText: error.message
    };
    return errorResponse;
});
}
export function GetIndustryList(): Promise<apiResponse<SharedModel[]>>{ 
    return axiosInstance.get<SharedModel[]>(`/Shared/GetIndustryList`).
    then((response: AxiosResponse<SharedModel[]>) => responseBody(response)).
    catch((error:AxiosError) =>{ 
     const errorResponse: apiResponse<SharedModel[]> = {
         data:undefined,
         status: 500,
         statusText: error.message
     };
     return errorResponse;
 });
 }

 export function GetOrganizationList(): Promise<apiResponse<OrganizationBankModel[]>>{ 
    return axiosInstance.get<OrganizationBankModel[]>(`/Organization/GetOrganizationList`).
    then((response: AxiosResponse<OrganizationBankModel[]>) => responseBody(response)).
    catch((error:AxiosError) =>{ 
     const errorResponse: apiResponse<OrganizationBankModel[]> = {
         data:undefined,
         status: 500,
         statusText: error.message
     };
     return errorResponse;
 });
 }


 // Without redux store

export async function GetDepartments(): Promise<apiResponse<Department[]>> {
    try {
        return await axiosInstance.get<Department[]>('/Shared/GetDepartmentList');
    } catch (error) {
        const errorResponse: apiResponse<Department[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function GetDesignations(): Promise<apiResponse<Designation[]>> {
    try {
        const response = await axiosInstance.get<Designation[]>('/Shared/GetDesignationList');
        return responseBody(response);
    } catch (error) {
        const errorResponse: apiResponse<Designation[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function GetBanks(): Promise<apiResponse<Bank[]>> {
    try {
        const response = await axiosInstance.get<Bank[]>('/Shared/GetBankList');
        return responseBody(response);
    } catch (error) {
        const errorResponse: apiResponse<Bank[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function GetShifts(): Promise<apiResponse<Shift[]>> {
    try {
        const response = await axiosInstance.get<Shift[]>('/Shared/GetShiftList');
        return responseBody(response);
    } catch (error) {
        const errorResponse: apiResponse<Shift[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}