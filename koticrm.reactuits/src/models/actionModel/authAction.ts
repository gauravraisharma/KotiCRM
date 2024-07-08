import { UserLogin } from "../userAccount/login";
import { actionModel } from "./actionModel";

export interface authAction extends actionModel{
    payload:UserLogin;
    navigate:any
}