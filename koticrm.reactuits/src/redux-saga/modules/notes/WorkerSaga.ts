

import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";

import { actionPayloadModel } from '../../../models/actionModel/actionModel';
import { Note } from '../../../models/notes/notes';
import { CREATE_NOTES_SUCCESS, GET_NOTES_SUCCESS } from '../../../constants/reduxConstants';
import { CreateNote, GetNotesList } from './apiService';
import { getNotes } from './action';

export function* workGetNotesFetch(): Generator<any> {
  try {
    const response:any  = yield call(GetNotesList);
    if(response.status!=200){
      toast.error('Error fetching accounts')
    }else{
      const notes: Note[] =response.data;
      
      yield put({ type: GET_NOTES_SUCCESS, payload:notes });
      return response;
    }
   
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}


export function* workCreateNote(action:actionPayloadModel): Generator<any> {
  try {
    const response:any  = yield call(CreateNote, action.payload);
    if(response.status!=200){
      toast.error('Error fetching accounts')
    }else{
      const note: Note=response.data;
      yield put({ type: CREATE_NOTES_SUCCESS, payload:note });
      yield put(getNotes());
      return response;
    }
   
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}
