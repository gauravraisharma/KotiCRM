import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance, responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { UserLogin } from '../../../models/userAccount/login';


export function  loginUser(userLogin: UserLogin): Promise<apiResponse<UserLogin>>{
    return axiosInstance.post<UserLogin>(`/UserAccount/LoginUser`,userLogin).
    then((response: AxiosResponse<UserLogin>) => responseBody(response)).
    catch((error:AxiosError) =>{ 
        const errorResponse: apiResponse<UserLogin> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    });
 }
 
 

