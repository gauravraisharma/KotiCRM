
// import { takeLatest, put, call } from 'redux-saga/effects';
// import { FETCH_PERMISSIONS_REQUEST, fetchPermissionsSuccess, fetchPermissionsFailure } from '../actions/permissionActions';
// import { fetchPermissions } from '../../services/permissionService';

// // Worker saga to handle fetching permissions
// function* handleFetchPermissions(action) {
//   try {
//     // Call the fetchPermissions service function to fetch permissions
//     const permissions = yield call(fetchPermissions, action.payload.userId);
//     // Dispatch an action to update the permissions in the Redux store
//     yield put(fetchPermissionsSuccess(permissions));
//   } catch (error) {
//     // Dispatch an action to handle errors when fetching permissions
//     yield put(fetchPermissionsFailure(error.message));
//   }
// }

// // Watcher saga to listen for FETCH_PERMISSIONS_REQUEST action
// function* watchFetchPermissions() {
//   yield takeLatest(FETCH_PERMISSIONS_REQUEST, handleFetchPermissions);
// }

// // Export the root saga which combines all watcher sagas
// export default function* permissionSaga() {
//   yield watchFetchPermissions();
// }
