import {GET_SUCCESS} from '../action'
const reducer = (state = {accounts : []}, action) =>{
    debugger
    switch (action.type){
        case GET_SUCCESS: 
            return {...state, accounts: action.accounts}

        default :
            return state;
    }
};
 export default reducer