export interface SharedModel {
    id: number;
    name: string;
}

export interface SharedOwnerModel {
    id: number;
    label: string,
    email: string
}

export interface DbResponse {
    succeed: boolean;
    message: string;
    errorCode: string | null;
}