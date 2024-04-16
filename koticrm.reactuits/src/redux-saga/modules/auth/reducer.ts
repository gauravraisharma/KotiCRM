import { Reducer } from "react";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, START_LOADING, UPDATE_TIMEZONE_SUCCESS } from "../../../constants/reduxConstants";
import { authState } from "../../../models/reduxState/authState";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";

const INITIAL_STATE: authState = {
  token: null,
  modulePermission: null,
  timezone: "",
  userType: null,
  userId: null,
  loggedIn: false,
  isLoading: false,
};

const authReducer: Reducer<authState, AppAction> = (state: authState = INITIAL_STATE, action: AppAction): authState => {
    let loginPayload;
    
    switch (action.type) {
        //  case UPDATE_TIMEZONE_SUCCESS: 
        // return {...state,
        //     timezone:(action as actionPayloadModel).payload,
        //     }  
        case LOGIN_REQUEST:
          return {
            ...state,
            isLoading :true
          }  
        case LOGIN_SUCCESS:
            loginPayload = (action as actionPayloadModel).payload;
            if (loginPayload && loginPayload.status === 'SUCCEED') { // Simplify condition
                localStorage.setItem('accessToken', loginPayload.token);
                return {
                    ...state,
                    token: loginPayload.token,
                    modulePermission: loginPayload.modulePermission,
                    timezone: loginPayload.timeZone,
                    userId: loginPayload.userId,
                    userType: loginPayload.userType,
                    loggedIn: true,
                    isLoading :false
                };
            }
            return {
                ...state,
                token: null,
                modulePermission: null,
                loggedIn: false,
            };

    case LOGOUT:
      localStorage.removeItem("accessToken");
      return {
        ...INITIAL_STATE,
      };
    case START_LOADING:
      return {
        ...INITIAL_STATE,
        isLoading: (action as actionPayloadModel).payload,
      };
    default:
      return state;
  }
};

export default authReducer;
