import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance, responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { Contact } from '../../../models/contact/Contact';


export function GetContactsList(): Promise<apiResponse<Contact[]>> {
    return axiosInstance.get<Contact[]>(`/Contact/GetContactList`).then((response: AxiosResponse<Contact[]>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Contact[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetContactDetails(id: any): Promise<apiResponse<Contact>> {
    return axiosInstance.get<Contact>(`/Contact/GetContactDetails/${id}`).then((response: AxiosResponse<Contact>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Contact> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function CreateContact(contact: Contact): Promise<apiResponse<Contact>> {
    return axiosInstance.post<Contact>(`/Contact/CreateContact`, contact).then((response: AxiosResponse<Contact>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Contact> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}
export function UpdateContact(contact: Contact): Promise<apiResponse<Contact>> {
    return axiosInstance.put<Contact>(`/Contact/UpdateContact`, contact).then((response: AxiosResponse<Contact>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Contact> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}