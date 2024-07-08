import { AxiosError, AxiosResponse } from 'axios';
import {
    apiResponse,
    axiosInstance,
    responseBody
} from '../../../apiInterceptor/axiosInterceptor';
import { Contact } from '../../../models/contact/Contact';
import { ContactWithAccountName } from '../../../models/contact/ContactWithAccountName';
import { ContactWithAccountNameListAndTotalCount } from '../../../models/contact/ContactWithAccountNameListAndTotalCount';

export function GetContactsList(accountId?: number, searchQuery?: string, pageNumber?: number, pageSize?: number): Promise<apiResponse<ContactWithAccountNameListAndTotalCount>> {
    const params = new URLSearchParams();
    if (accountId) params.append('accountId', accountId.toString());
    if (searchQuery) params.append('searchQuery', searchQuery.toString());
    if (pageNumber) params.append('pageNumber', pageNumber.toString());
    if (pageSize) params.append('pageSize', pageSize.toString());

    const getContactListURL = `/Contact/GetContactList?${params.toString()}`;
    return axiosInstance.get<ContactWithAccountNameListAndTotalCount>(getContactListURL)
        .then((response: AxiosResponse<ContactWithAccountNameListAndTotalCount>) => responseBody(response))
        .catch((error: AxiosError) => {
            const errorResponse: apiResponse<ContactWithAccountNameListAndTotalCount> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetContactDetails(id: any): Promise<apiResponse<ContactWithAccountName>> {
    return axiosInstance.get<ContactWithAccountName>(`/Contact/GetContactDetails/${id}`).then((response: AxiosResponse<ContactWithAccountName>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<ContactWithAccountName> = {
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

export function DeleteContact(id: number): Promise<apiResponse<Contact>> {
    return axiosInstance.delete<Contact>(`/Contact/DeleteContact/${id}`)
        .then((response: AxiosResponse<Contact>) => responseBody(response))
        .catch((error: AxiosError) => {
            const errorResponse: apiResponse<Contact> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse
        });
}