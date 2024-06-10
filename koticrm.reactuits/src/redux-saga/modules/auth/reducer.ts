import { Reducer } from "react";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, START_LOADING, UPDATE_TIMEZONE_SUCCESS } from "../../../constants/reduxConstants";
import { authState } from "../../../models/reduxState/authState";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { EmployeeClass } from "../../../models/userManagement/employee";

const INITIAL_STATE: authState = {
  token: null,
  modulePermission: null,
  userType: null,
  userId: null,
  organizationId:null,
  user: new EmployeeClass(),
  loggedIn: false,
  isLoading: false,
};

const authReducer: Reducer<authState, AppAction> = (state: authState = INITIAL_STATE, action: AppAction): authState => {
    let loginPayload;
    
    switch (action.type) {
       case LOGIN_REQUEST:
        return{
          ...state,
          isLoading :true
        }
        case LOGIN_SUCCESS:
            loginPayload = (action as actionPayloadModel).payload;
            if (loginPayload && loginPayload.status === 'SUCCEED') { // Simplify condition
                localStorage.setItem('accessToken', loginPayload.token);
                localStorage.setItem('currentUser', loginPayload.currentUser);
                return {
                    ...state,
                    token: loginPayload.token,
                    modulePermission: loginPayload.modulePermission,
                    userId: loginPayload.userId,
                    userType: loginPayload.userType,
                    user: loginPayload.employee,
                    organizationId:loginPayload.organizationId,
                    loggedIn: true,
                    isLoading :false
                };
            }
            return {
                ...state,
                token: null,
                modulePermission: null,
                loggedIn: false,
                isLoading : false
            };
            case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false
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
