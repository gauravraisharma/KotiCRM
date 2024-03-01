
export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  userType: string;
  userId: string;
}
export interface ResponseStatus {
  status: string;
  message: string;
}

export interface modulePermission {
  moduleId: number;
  moduleName: string;
  isView: boolean;
  IsEdit: boolean;
  IsDelete: boolean;
  IsAdd: boolean;

}