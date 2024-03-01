import { Action } from 'redux';
import {GET_SUCCESS} from '../action'
interface GetSuccessAction extends Action {
    type: typeof GET_SUCCESS; // Ensure type safety by using typeof
    accounts: any[]; // Define the type of the accounts property
}

const reducer = (state = {accounts : []}, action:GetSuccessAction) =>{
    debugger
    switch (action.type){
        case GET_SUCCESS: 
            return {...state, accounts: action.accounts}

        default :
            return state;
    }
};
 export default reducer 