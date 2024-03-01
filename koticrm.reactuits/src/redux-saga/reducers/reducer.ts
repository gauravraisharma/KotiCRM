import {GET_SUCCESS} from '../action'
interface Action {
    type: string;
    accounts?: any; 
  }
const reducer = (state = {accounts : []}, action : Action) =>{
    debugger
    switch (action.type){
        case GET_SUCCESS: 
            return {...state, accounts: action.accounts}

        default :
            return state;
    }
};
 export default reducer