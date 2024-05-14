
export interface authState{
    token: string|null,
    modulePermission:any,
    loggedIn: boolean,
    userId:string | null,
    userType:string | null,
    organizationId: number| null,
    isLoading:boolean
}