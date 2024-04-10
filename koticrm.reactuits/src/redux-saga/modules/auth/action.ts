import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, START_LOADING, STOP_LOADING } from "../../../constants/reduxConstants";
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


// export const workerLoader = (isLoading:boolean) => ({
//   type: START_LOADING,
//   payload:isLoading
// });

// export const stopLoading = () => ({
//   type: STOP_LOADING,
// });
