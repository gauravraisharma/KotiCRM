import {GET_ACCOUNT_SUCCESS,LOGIN_SUCCESS} from '../action'

const initialState = {
    reducer: {
        token: null,
        modulePermission:null,
        loggedIn:false,
        accounts: []
    }
};

const reducer = (state = {initialState}, action: any ) => {
    switch (action.type){
        case LOGIN_SUCCESS:
            if (action.payload != null && action.payload != undefined && action.payload.status == 'SUCCEED') {
                localStorage.setItem('accessToken', action.payload.tokenStatus);
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

        default :
            return state;
    }
};
 export default reducer 