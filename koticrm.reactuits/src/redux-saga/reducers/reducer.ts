import { Action } from 'redux';
import {GET_SUCCESS} from '../action'

const initialState = {
    reducer: {
        accounts: [] 
    }
     };
const reducer = (state = initialState, action : any) =>{
    debugger
    switch (action.type){
        case GET_SUCCESS: 
            return {...state, accounts: action.accounts}

        default :
            return state;
    }
};
 export default reducer 