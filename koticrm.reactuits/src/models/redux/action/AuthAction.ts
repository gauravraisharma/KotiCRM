import { UserLogin } from "../../userAccount/login";
import { ActionModel } from "./ActionModel";

export interface AuthAction extends ActionModel{
    payload:UserLogin;
    navigate:any
}