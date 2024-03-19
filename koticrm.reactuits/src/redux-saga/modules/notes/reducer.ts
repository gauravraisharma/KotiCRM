import { Reducer } from "react";
import {  CREATE_NOTES_SUCCESS, GET_NOTES_SUCCESS } from "../../../constants/reduxConstants";
import { Note } from "../../../models/notes/notes";
import { noteState } from "../../../models/reduxState/noteState";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
const INITIAL_STATE : noteState = {
    notes:[],
    note:null as Note | null,
   refreshList:false
  };


const noteReducer: Reducer<noteState, actionPayloadModel> = (state: noteState = INITIAL_STATE, action: actionPayloadModel): noteState => {
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
                refreshList:true
            }
      
      default:
        return state;
    }
  };

  export default noteReducer;