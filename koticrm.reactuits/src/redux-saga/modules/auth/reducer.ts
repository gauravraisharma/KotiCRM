
import { Reducer } from "react";
import {LOGIN_SUCCESS,LOGOUT} from "../../../constants/reduxConstants";
import { authState } from "../../../models/reduxState/authState";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";


const INITIAL_STATE : authState = {
  token: null,
  modulePermission: null,
  timezone:null,
  userType:null,
  userId:null,
  loggedIn: false
};

const authReducer: Reducer<authState, AppAction> = (state: authState = INITIAL_STATE, action: AppAction): authState => {
  switch (action.type) {
      case LOGIN_SUCCESS:

          if ((action as actionPayloadModel).payload != null && (action as actionPayloadModel).payload != undefined && (action as actionPayloadModel).payload.status == 'SUCCEED') {
              localStorage.setItem('accessToken', (action as actionPayloadModel).payload.token);
          return {
              ...state,
              token: (action as actionPayloadModel).payload.token,
              modulePermission: (action as actionPayloadModel).payload.modulePermission,
              userId: (action as actionPayloadModel).payload.userId,
              userType: (action as actionPayloadModel).payload.userType,
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