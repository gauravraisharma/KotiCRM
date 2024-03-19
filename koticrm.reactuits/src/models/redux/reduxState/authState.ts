
export interface authState{
    token: string|null,
    modulePermission:any,
    timezone:string |null,
    loggedIn: boolean,
    userId:string | null,
    userType:string | null
}