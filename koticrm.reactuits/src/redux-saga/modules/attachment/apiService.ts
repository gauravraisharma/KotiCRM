import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance, responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { Attachment, CreateAttachment } from '../../../models/attachment/Attachment';
import { DbResponse } from '../../../models/commonModels/SharedModels';


export function GetAttachmentsList(): Promise<apiResponse<Attachment[]>> {
    return axiosInstance.get<Attachment[]>(`/Attachment/GetAttachmentList`).then((response: AxiosResponse<Attachment[]>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Attachment[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function CreateAttachment(createAttachment: CreateAttachment): Promise<apiResponse<DbResponse>> {
    return axiosInstance.post<DbResponse>(`/Attachment/CreateAttachment`, createAttachment).then((response: AxiosResponse<DbResponse>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<DbResponse> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export async function DownloadAttachmentAsync(attachmentId: number, contentType: string): Promise<apiResponse<Blob>> {
    try {
        const response = await axiosInstance.get(`/Attachment/${attachmentId}/download`, {
            responseType: 'blob', // Ensure response is treated as binary data
            headers: {
                'Content-Type': contentType // Specify the content type
            }
        });
        return responseBody(response);
    } catch (error) {
        const err = error as AxiosError;
        const errorResponse: apiResponse<Blob> = {
            data: new Blob(), // Create an empty Blob object
            status: err.response?.status || 500,
            statusText: err.message
        };
        return errorResponse;
    }
}