import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance,responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { Attachment, CreateAttachment } from '../../../models/attachment/Attachment';
import { DbResponse } from '../../../models/commonModels/SharedModels';


 export function  GetAttachmentsList(): Promise<apiResponse<Attachment[]>>{
    return axiosInstance.get<Attachment[]>(`/Attachment/GetAttachmentList`).then((response: AxiosResponse<Attachment[]>) => responseBody(response)).
    catch((error:AxiosError) =>{ 
        const errorResponse: apiResponse<Attachment[]> = {
            data: [],
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    });
 }
   
 export function  CreateAttachment(createAttachment: CreateAttachment): Promise<apiResponse<DbResponse>>{
    return axiosInstance.post<DbResponse>(`/Attachment/GetAttachmentList`,createAttachment).then((response: AxiosResponse<DbResponse>) => responseBody(response)).
    catch((error:AxiosError) =>{ 
        const errorResponse: apiResponse<DbResponse> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    });
 }
   