import { CREATE_ACCOUNT_SUCCESS, GET_ACCOUNT_DETAIL_SUCCESS,
     GET_ACCOUNT_OWNER_SUCCESS, GET_ACCOUNT_STATUS_SUCCESS, GET_ACCOUNT_SUCCESS,GET_ACCOUNT_TYPE_SUCCESS,GET_INDUSTRY_SUCCESS,GET_INVOICE_STATUS_SUCCESS,LOGIN_SUCCESS} from '../action'

const initialState = {
    reducer: {
        token: null,
        modulePermission:[],
        loggedIn:false,
        accounts: [],
        response:null, 
        account:null,
        accountOwner :[],
        industry:[],
        accountStatus :[],
        accountType :[],
        invoiceStatus : []
    }
};

const reducer = (state = {initialState}, action: any ) => {
    debugger
    switch (action.type){
        case LOGIN_SUCCESS:
            if (action.payload != null && action.payload != undefined && action.payload.status == 'SUCCEED') {
                localStorage.setItem('accessToken', action.payload.token);
                return {
                    ...state,
                    token: action.payload.token,
                    modulePermission: action.payload.modulePermission,
                    loggedIn: true,
                };
            }
            return {
                ...state,
                token: null,
                modulePermission:null,
                loggedIn: false,
            };
            
        case GET_ACCOUNT_SUCCESS: 
            return {...state,
                  accounts: action.accounts,
                }
        case CREATE_ACCOUNT_SUCCESS: 
            return {...state,
                  response: action.account,
                }
        case GET_ACCOUNT_DETAIL_SUCCESS: 
            return {...state,
                account: action.account,
                }
        case GET_ACCOUNT_OWNER_SUCCESS: 
            return {...state,
                accountOwner: action.accountOwners,
                }

        case GET_INDUSTRY_SUCCESS: 
            return {...state,
                industry: action.industry,
                }
        case GET_ACCOUNT_STATUS_SUCCESS: 
            return {...state,
                accountStatus: action.accountStatus,
                }
        case GET_ACCOUNT_TYPE_SUCCESS: 
            return {...state,
                accountType: action.accountType,
                }

        case GET_INVOICE_STATUS_SUCCESS: 
            return {...state,
                invoiceStatus: action.invoiceStatus,
                }                
        default :
            return state;
    }
};
 export default reducer 