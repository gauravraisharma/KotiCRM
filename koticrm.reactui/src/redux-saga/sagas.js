import {call, put, takeEvery} from 'redux-saga/effects'
import { GET_SUCCESS, GET_ACCOUNTS_FETCH} from './actions'
import AccountService from 'src/services/AccountService';

function accountFetch(){
    return AccountService.GetAccountsList()
        .then(response => {
            debugger
            if (response.status !== 200) {
                throw new Error('Failed to fetch accounts');
            }
            return response.data;
        })
        .then(data => {
            console.log(data); 
            return data; 
        })
        .catch(error => {
            console.error('Error fetching accounts:', error);
            throw error; 
        });
}
function* workGetAccountFetch(){
    const accounts = yield call(accountFetch)
    yield put({type : GET_SUCCESS, accounts})
}
function* mySaga(){
    yield takeEvery(GET_ACCOUNTS_FETCH, workGetAccountFetch);
}
export default mySaga
