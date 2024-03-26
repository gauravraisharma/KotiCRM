import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance, responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { Account } from '../../../models/account/Account';
import { SharedModel, SharedOwnerModel } from '../../../models/commonModels/SharedModels';

export function GetAccountList(): Promise<apiResponse<Account[]>> {
    return axiosInstance.get<Account[]>(`/Account/GetAccountList`).then((response: AxiosResponse<Account[]>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Account[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function CreateAccount(account: Account): Promise<apiResponse<Account>> {
    return axiosInstance.post<Account>(`/Account/CreateAccount`, account).then((response: AxiosResponse<Account>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Account> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function UpdateAccount(id: number, account: Account): Promise<apiResponse<Account>> {
    return axiosInstance.put<Account>(`/Account/UpdateAccount/${id}`, account).then((response: AxiosResponse<Account>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Account> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetAccountById(id: number): Promise<apiResponse<Account>> {
    return axiosInstance.get<Account>(`/Account/GetAccountDetails/${id}`).then((response: AxiosResponse<Account>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Account> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function DeleteAccount(id: number): Promise<apiResponse<Account>> {
    return axiosInstance.delete<Account>(`/Account/DeleteAccount/${id}`)
        .then((response: AxiosResponse<Account>) => responseBody(response))
        .catch((error: AxiosError) => {
            const errorResponse: apiResponse<Account> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetAccountOwnerList(): Promise<apiResponse<SharedOwnerModel[]>> {
    return axiosInstance.get<SharedOwnerModel[]>(`/Shared/GetAccountOwner`).then((response: AxiosResponse<SharedOwnerModel[]>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<SharedOwnerModel[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetAccountStatus(): Promise<apiResponse<SharedModel[]>> {
    return axiosInstance.get<SharedModel[]>(`/Shared/AccountStatus`).then((response: AxiosResponse<SharedModel[]>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<SharedModel[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetAccountType(): Promise<apiResponse<SharedModel[]>> {
    return axiosInstance.get<SharedModel[]>(`/Shared/AccountType`).then((response: AxiosResponse<SharedModel[]>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<SharedModel[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}