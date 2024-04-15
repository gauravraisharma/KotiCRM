import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance, responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { SharedModel, SharedOwnerModel } from '../../../models/commonModels/SharedModels';
import { Invoice, InvoiceCreationModel } from '../../../models/invoice/Invoice';


export function GetInvoiceStatus(): Promise<apiResponse<SharedModel[]>> {
    return axiosInstance.get<SharedModel[]>(`/Shared/InvoiceStatus`).then((response: AxiosResponse<SharedModel[]>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<SharedModel[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetInvoiceList(accountID?: number | null, status?: number | null, startDate?: Date | null, endDate?: Date | null): Promise<apiResponse<InvoiceCreationModel[]>> {
    const params = new URLSearchParams();
    if (accountID) params.append('accountID', accountID.toString());
    if (status) params.append('status', status.toString());
    if (startDate) params.append('startDate', startDate.toString());
    if (endDate) params.append('endDate', endDate.toString());

    const getInvoiceListURL = `/Invoice/GetInvoiceList?${params.toString()}`;

    return axiosInstance.get<InvoiceCreationModel[]>(getInvoiceListURL)
        .then((response: AxiosResponse<InvoiceCreationModel[]>) => responseBody(response))
        .catch((error: AxiosError) => {
            const errorResponse: apiResponse<InvoiceCreationModel[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function CreateInvoice(invoiceModel: InvoiceCreationModel): Promise<apiResponse<InvoiceCreationModel>> {
    return axiosInstance.post<InvoiceCreationModel>(`/Invoice/CreateInvoice`, invoiceModel).then((response: AxiosResponse<InvoiceCreationModel>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<InvoiceCreationModel> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function UpdateInvoice(invoiceCreationModel: InvoiceCreationModel): Promise<apiResponse<Invoice>> {
    return axiosInstance.put<Invoice>(`/Invoice/UpdateInvoice`, invoiceCreationModel).then((response: AxiosResponse<Invoice>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<Invoice> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetInvoiceDetails(id: number): Promise<apiResponse<InvoiceCreationModel>> {
    return axiosInstance.get<InvoiceCreationModel>(`/Invoice/GetInvoiceDetails/${id}`).then((response: AxiosResponse<InvoiceCreationModel>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<InvoiceCreationModel> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function DeleteInvoice(id: number): Promise<apiResponse<InvoiceCreationModel>> {
    return axiosInstance.delete<InvoiceCreationModel>(`/Invoice/DeleteInvoice/${id}`).then((response: AxiosResponse<InvoiceCreationModel>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<InvoiceCreationModel> = {
                data: undefined,
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}

export function GetInvoiceOwnerList(): Promise<apiResponse<SharedOwnerModel[]>> {
    return axiosInstance.get<SharedOwnerModel[]>(`/Shared/GetInvoiceOwner`).then((response: AxiosResponse<SharedOwnerModel[]>) => responseBody(response)).
        catch((error: AxiosError) => {
            const errorResponse: apiResponse<SharedOwnerModel[]> = {
                data: [],
                status: 500,
                statusText: error.message
            };
            return errorResponse;
        });
}