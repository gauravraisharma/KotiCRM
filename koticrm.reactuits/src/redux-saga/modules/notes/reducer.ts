import {  CREATE_NOTES_SUCCESS, GET_NOTES_SUCCESS } from "../../../constants/reduxConstants";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { Note } from "../../../models/notes/notes";
import { noteState } from "../../../models/redux/reduxState/noteState";
const INITIAL_STATE : noteState = {
    notes:[],
    note:null as Note | null,
   refreshList:false
  };


  const noteReducer= (state : noteState = INITIAL_STATE, action:actionPayloadModel) => {
    switch (action.type) {
        case GET_NOTES_SUCCESS:
            return {
                ...state,
                notes: action.payload,
            }
        case CREATE_NOTES_SUCCESS:
            return {
                ...state,
                note: action.payload,
                refreash:true
            }
      
      default:
        return state;
    }
  };

  export default noteReducer;