export interface AuthState {
    token: string | null;
    modulePermission: any;
    timezone: string | null;
    loggedIn: boolean;
    userId?: string;
    userType?: string;
}