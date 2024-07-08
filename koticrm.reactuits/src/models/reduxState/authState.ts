import { Employee } from "../userManagement/employee"

export interface authState{
    token: string|null,
    modulePermission:any,
    loggedIn: boolean,
    userId:string | null,
    userType:string | null,
    user: Employee,
    organizationId: number| null,
    isLoading:boolean
}