
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import {  GET_INDUSTRY_SUCCESS, GET_ORGANIZATION_SUCCESS, SIDEBAR_TOGGLE, UPDATE_TIMEZONE_SUCCESS } from "../../../constants/reduxConstants";
const INITIAL_STATE = {
   refreashData:true,
   industries:[],
   organization:[],
   sidebarToggle:true,
  };


  const sharedReducer= (state = INITIAL_STATE, action:actionPayloadModel) => {
    switch (action.type) {
        case UPDATE_TIMEZONE_SUCCESS: 
        return {...state,
            refreashData: true,
            }    
    case GET_INDUSTRY_SUCCESS:
        return {
            ...state,
            industries: action.payload,
        }
    case GET_ORGANIZATION_SUCCESS: 
        return {...state,
            organization: action.payload,
            }
    case SIDEBAR_TOGGLE:
        return {
        ...state,
        sidebarToggle: action.payload
    }
      default:
        return state;
    }
  };

  export default sharedReducer;