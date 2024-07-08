import { apiResponse, axiosInstance, responseBody } from "../../../apiInterceptor/axiosInterceptor";
import { Permission } from "../../../models/permissionManagement/Permissions";
import { Role } from "../../../models/permissionManagement/Role";

export async function GetPermissionsList(roleId: string){
    try {
     
        const response = await axiosInstance.get(`/UserAccount/GetModulePermissions/${roleId}`);
        return response.data;
    } catch (error: any) {
        const errorResponse: apiResponse<Permission[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
export async function GetModules(){
    try {
     
        const response = await axiosInstance.get(`/UserAccount/GetModules`);
        return response.data;
    } catch (error: any) {
        const errorResponse: apiResponse<Permission[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function createModulePermission(permissions: Permission[]) {
    try {
        const response = await axiosInstance.post<Permission>('/UserAccount/CreateModulePermission', permissions);
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText
        };
    } catch (error: any) {
        return {
            data: undefined,
            status: error.response?.status || 500,
            statusText: error.response?.statusText || error.message
        };
    }
}

export async function UpdatePermission(permission: Permission[]) {
    try {
        const response = await axiosInstance.put<Permission[]>(`/UserAccount/UpdateModulePermission`, permission);
        return responseBody(response);
    } catch (error: any) {
        const errorResponse: apiResponse<Permission> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function GetRolesList(searchQuery?: string, pageNumber?: number, pageSize?: number){
    try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('searchQuery', searchQuery.toString());
        if (pageNumber) params.append('pageNumber', pageNumber.toString());
        if (pageSize) params.append('pageSize', pageSize.toString());
        const response = await axiosInstance.get(`/UserAccount/GetRoles?${params.toString()}`);
        return response.data;
    } catch (error: any) {
        const errorResponse: apiResponse<Role[]> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function GetRoleById(roleId: string){
    try {
        const response = await axiosInstance.get(`/UserAccount/GetRole/` + roleId);
        return response.data;
    } catch (error: any) {
        const errorResponse: apiResponse<Role> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}
  
export async function CreateRole(role: Role) {
    try {
        const response = await axiosInstance.post<Role>(`/UserAccount/CreateNewRole`, role);
        return response;
    } catch (error: any) {
        const errorResponse: apiResponse<Role> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function UpdateRole(role: Role) {
    try {
        const response = await axiosInstance.put<Role>(`/UserAccount/UpdateRole`, role);
        return responseBody(response);
    } catch (error: any) {
        const errorResponse: apiResponse<Role> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

export async function DeleteRole(roleId: string) {
    try {
        const response = await axiosInstance.get(`/UserAccount/DeleteRole/${roleId}`);
        return responseBody(response);
    } catch (error: any) {
        const errorResponse: apiResponse<Role> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    }
}

