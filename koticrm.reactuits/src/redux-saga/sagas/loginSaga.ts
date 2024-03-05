import { call, put, select } from 'redux-saga/effects';
import { loginSuccess, LOGIN_SUCCESS, loginRequest, LOGIN_REQUEST } from '../action';
import LoginService from '../../services/LoginService';
import { UserLogin } from '../../models/userAccount/login';
import { LoginResponse } from '../../models/userAccount/loginResponse';


function* loginUser(action: { payload: UserLogin }): Generator<any> {
  try {
    const { payload } = action;
    const userReposne = yield call(LoginService.LoginUser, payload);

    return userReposne as LoginResponse;
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

function* workerLoginRequest(action: any) {
  try {
    const userReposne: LoginResponse = yield call(loginUser, { payload: action });
    yield put(loginSuccess(userReposne));
    const isLoggedIn = yield select((state: any) => { return state.reducer.loggedIn });

    if (isLoggedIn) {
      action.navigate('/dashboard')
    } else if (!userReposne) {
      action.toast.error('Something went wrong, please contact administrator');
    } else {
      action.toast.error('Invalid Credentials')
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
}
export default workerLoginRequest;