import { call, put, select } from "redux-saga/effects";
import { loginUser } from "./apiService";
import { toast } from "react-toastify";
import { LoginResponse } from "../../../models/userAccount/loginResponse";
import { loginSuccess } from "./action";
import { authAction } from "../../../models/actionModel/authAction";

export function* workerloginUser(action: authAction): Generator<any> {
    try {
      const response:any  = yield call(loginUser,action.payload);
      if(response.status!=200){
        toast.error('Error fetching accounts')
      }
      else{
        const userReposne: LoginResponse =response.data;
        yield put(loginSuccess(userReposne));
        const isLoggedIn = yield select((state: any) => { return state.authReducer.loggedIn });

        if (isLoggedIn) {
            action.navigate('/dashboard')
        } else if (!userReposne) {
            toast.error('Something went wrong, please contact administrator');
        } else {
            toast.error('Invalid Credentials')
        }
      }
     
    } catch (error) {
      toast.error('SomethingWent Wrong, Please try after sometime')
    }
  }
  