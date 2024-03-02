import {GET_ACCOUNT_SUCCESS,LOGIN_SUCCESS} from '../action'

const initialState = {
    reducer: {
        token: null,
        loggedIn:false,
        accounts: []
    }
};

const reducer = (state = {initialState}, action: any ) => {

    debugger
    switch (action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem('accessToken', action.payload.token);
            return {
                ...state,
                token: action.payload.token, 
                loggedIn : true,
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