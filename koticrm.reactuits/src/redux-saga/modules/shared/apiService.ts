import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance,responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { OrganizationBankModel, OrganizationModel, SharedModel } from '../../../models/commonModels/SharedModels';



 export function updateTimeZone(id : number,organization: OrganizationModel): Promise<apiResponse<OrganizationModel>>{ 
   return axiosInstance.post<OrganizationModel>(`/Organization/UpdateOrganization/${id}`, organization).
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