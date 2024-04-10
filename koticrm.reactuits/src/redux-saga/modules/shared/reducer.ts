
import {  GET_INDUSTRY_SUCCESS, GET_ORGANIZATION_SUCCESS, SIDEBAR_TOGGLE, UPDATE_TIMEZONE_SUCCESS } from "../../../constants/reduxConstants";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { sharedState } from "../../../models/reduxState/sharedState";
import { Reducer } from "redux";
const INITIAL_STATE : sharedState = {
   refreashData:true,
   industries:[],
   organization:[],
   sidebarToggle:true,
  };


const sharedReducer: Reducer<sharedState, AppAction> = (state: sharedState = INITIAL_STATE, action: AppAction): sharedState => {
    switch (action.type) {
        // case UPDATE_TIMEZONE_SUCCESS: 
        // return {...state,
        //     refreashData: true,
        //     }    
    case GET_INDUSTRY_SUCCESS:
        return {
            ...state,
            industries: (action as actionPayloadModel).payload,
        }
    case GET_ORGANIZATION_SUCCESS: 
        return {...state,
            organization: (action as actionPayloadModel).payload,
            }
    case SIDEBAR_TOGGLE:
        return {
        ...state,
            sidebarToggle: (action as actionPayloadModel).payload
    }
      default:
        return state;
    }
  };

  export default sharedReducer;