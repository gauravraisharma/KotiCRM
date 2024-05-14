// import { call, put, select } from "redux-saga/effects";
// import { loginUser } from "./apiService";
// import { toast } from "react-toastify";
// import { LoginResponse } from "../../../models/userAccount/loginResponse";
// import { loginSuccess } from "./action";
// import { authAction } from "../../../models/actionModel/authAction";

// export function* workerloginUser(action: authAction): Generator<any> {
//   try {
//     const response: any = yield call(loginUser, action.payload);
//     if (response.status != 200) {
//       toast.error('Error fetching accounts')
//     }
//     else {
//       const userReposne: LoginResponse = response.data;
//       yield put(loginSuccess(userReposne));
//       const isLoggedIn = yield select((state: any) => { return state.authReducer.loggedIn });

//       if (isLoggedIn) {
//         action.navigate('/dashboard')
//       } else if (!userReposne) {
//         toast.error('Something went wrong, please contact administrator');
//       } else {
//         toast.error('Invalid Credentials')
//       }
//     }

//   } catch (error) {
//     toast.error('SomethingWent Wrong, Please try after sometime')
//   }
// }

import { call, put, select } from "redux-saga/effects";
import { loginUser } from "./apiService";
import { toast } from "react-toastify";
import { LoginResponse } from "../../../models/userAccount/loginResponse";
import { loginFailure, loginSuccess } from "./action";
import { authAction } from "../../../models/actionModel/authAction";
import { START_LOADING, UPDATE_TIMEZONE_SUCCESS } from "../../../constants/reduxConstants";

export function* workerloginUser(action: authAction): Generator<any> {
  try {
    const response: any = yield call(loginUser, action.payload);
    if (response.status !== 200) {
      toast.error(response.statusText)
      yield put(loginFailure());
    }
    else {
      const userResponse: LoginResponse = response.data;
      yield put(loginSuccess(userResponse));
      yield put({ type: UPDATE_TIMEZONE_SUCCESS,  timezone: userResponse && userResponse.timeZone });
      const isLoggedIn = yield select((state: any) => state.authReducer.loggedIn);

      if (isLoggedIn) {
        action.navigate('/dashboard')
      } else if (!userResponse) {
        toast.error('Something went wrong, please contact administrator');
      } else {
        toast.error('Invalid Credentials')
      }
    }
  } catch (error) {
    toast.error('Something went wrong, please try again later');
  }

}
export function* workerLoader(action: authAction): Generator<any> {
  try {
    yield put({ type: START_LOADING, payload: true });

  } catch (error) {
    toast.error('Something went wrong, please try again later');
  }
  
}
