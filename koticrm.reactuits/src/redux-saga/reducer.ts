import { Action } from 'redux';
import {GET_SUCCESS} from '../redux-saga/action'

interface State {
    accounts: any[]; // Update the type based on your actual account data structure
  }

  
const initialState: State = {
    accounts: [],
  };
  
// const reducer = (state = {accounts : []}, action) =>{
//     debugger
//     switch (action.type){
//         case GET_SUCCESS: 
//             return {...state, accounts: action.accounts}

//         default :
//             return state;
//     }
// };

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case GET_SUCCESS:
        return { ...state, accounts: (action as any).accounts }; // Update any with your actual action type
      default:
        return state;
    }
  };
  
export default reducer

