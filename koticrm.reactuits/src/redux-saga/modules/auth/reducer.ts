
import { Reducer } from "react";
import {LOGIN_SUCCESS,LOGOUT} from "../../../constants/reduxConstants";
import { actionPayloadModel } from '../../../models/actionModel/actionModel';
import { authState } from "../../../models/reduxState/authState";


const INITIAL_STATE : authState = {
  token: null,
  modulePermission: null,
  timezone:null,
  userType:null,
  userId:null,
  loggedIn: false
};

const authReducer: Reducer<authState, actionPayloadModel> = (state: authState = INITIAL_STATE, action: actionPayloadModel): authState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (action.payload != null && action.payload != undefined && action.payload.status == 'SUCCEED') {
          localStorage.setItem('accessToken', action.payload.token);
          return {
              ...state,
              token: action.payload.token,
              modulePermission: action.payload.modulePermission,
              userId: action.payload.userId,
              userType :action.payload.userType,
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