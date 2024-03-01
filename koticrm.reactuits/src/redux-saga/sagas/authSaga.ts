// import { takeLatest, put, call } from 'redux-saga/effects';
// import { loginSuccess, loginFailure } from '../actions/authActions';
// import  loginUserApi  from '../../api/authApi';

// function* login(action) {
//   try {
//     // Extract payload data
//     const { username, password } = action.payload;

//     // Call the API and wait for the result
//     const user = yield call(loginUserApi, username, password);

//     // Dispatch a success action with the user data
//     yield put(loginSuccess(user));
//   } catch (error) {
//     // Dispatch a failure action with the error data
//     yield put(loginFailure(error));
//   }
// }

// // Watch for LOGIN_REQUEST actions and trigger the login saga
// export function* watchLogin() {
//   yield takeLatest('LOGIN_REQUEST', login);
// }
