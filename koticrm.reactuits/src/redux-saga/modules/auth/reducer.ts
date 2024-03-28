
import { Reducer } from "react";
import { LOGIN_SUCCESS, LOGOUT } from "../../../constants/reduxConstants";
import { authState } from "../../../models/reduxState/authState";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";


const INITIAL_STATE: authState = {
    token: null,
    modulePermission: null,
    timezone: "",
    userType: null,
    userId: null,
    loggedIn: false
};

const authReducer: Reducer<authState, AppAction> = (state: authState = INITIAL_STATE, action: AppAction): authState => {
    let loginPayload;
    switch (action.type) {
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
                };
            }
            return {
                ...state,
                token: null,
                modulePermission: null,
                loggedIn: false,
            };

        case LOGOUT:
            localStorage.removeItem('accessToken')
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
};

export default authReducer;