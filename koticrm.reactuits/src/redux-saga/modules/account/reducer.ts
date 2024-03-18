import { CREATE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_SUCCESS, GET_ACCOUNT_DETAIL_SUCCESS, GET_ACCOUNT_OWNER_SUCCESS, GET_ACCOUNT_STATUS_SUCCESS, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_TYPE_SUCCESS, UPDATE_ACCOUNT_SUCCESS } from "../../../constants/reduxConstants";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { Account } from '../../../models/account/Account';
const INITIAL_STATE = {
   accounts:[],
   account:null as Account | null,
   createAccountResponse:null as Account | null,
   updateAccountResponse:null as Account|null,
   refreshList:false
  };


  const accountReducer= (state = INITIAL_STATE, action:actionPayloadModel) => {
    switch (action.type) {
      case  GET_ACCOUNT_SUCCESS:
        return {
            ...state,
            accounts: action.payload,
        }
    case CREATE_ACCOUNT_SUCCESS:
        return {
            ...state,
            createAccountResponse: action.payload,
            refreshList:true
        }
    case GET_ACCOUNT_DETAIL_SUCCESS:
            return {
                ...state,
                account: action.payload,
            }
    case DELETE_ACCOUNT_SUCCESS:
    return {
        ...state,
        refreshList:true
    }
    
    case UPDATE_ACCOUNT_SUCCESS:
        return {
            ...state,
            updateAccountResponse: action.payload
        }
 case GET_ACCOUNT_OWNER_SUCCESS:
    return {
        ...state,

        accountOwner: action.payload,
    }
case GET_ACCOUNT_STATUS_SUCCESS:
    return {
        ...state,
        accountStatus: action.payload,
    }

case GET_ACCOUNT_TYPE_SUCCESS:
    return {
        ...state,
        accountType: action.payload,
    }

      default:
        return state;
    }
  };

  export default accountReducer;