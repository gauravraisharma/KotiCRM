import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../../../constants/reduxConstants";
import { UserLogin } from "../../../models/userAccount/login";
import { LoginResponse } from "../../../models/userAccount/loginResponse";


export const loginSuccess = (response: LoginResponse) => ({
    type: LOGIN_SUCCESS,
    payload: response,
  });
  

  export const logout = () => ({
    type: LOGOUT
  });


  export const loginRequest = (userLogin: UserLogin, navigate: any) => ({
    type: LOGIN_REQUEST,
    payload: userLogin,
    navigate
  });
  