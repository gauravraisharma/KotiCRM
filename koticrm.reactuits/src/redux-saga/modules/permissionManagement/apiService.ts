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

export async function GetRolesList(){
    try {
        const response = await axiosInstance.get(`/UserAccount/GetRoles`);
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

