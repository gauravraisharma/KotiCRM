import { call, put } from 'redux-saga/effects';
// import { CREATE_NOTES_SUCCESS, GET_ACCOUNT_DETAIL_SUCCESS, GET_NOTES_SUCCESS } from '../action';
import NotesService from '../../services/NotesService';
import { Note } from '../../models/notes/notes';
import { CREATE_NOTES_SUCCESS, GET_NOTES_SUCCESS } from '../action';



 function* notesFetch() : Generator<any>{
  try {
    debugger
      const response = yield call(NotesService.GetNotesList);
    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch accounts');
    // }
    return response;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}

export function* workGetNotesFetch() {
  try {
    const notes: Note[] = yield call(notesFetch);
    yield put({ type: GET_NOTES_SUCCESS, notes });
  } catch (error) {
    // Handle error if needed
  }
}

function* createNote(action: { payload: Note }) : Generator<any>{
  try {
    debugger
    const { payload } = action;

      const response = yield call(NotesService.CreateNotes,payload );
      return response;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
}

export function* workCreateNote(action:any) {
  try {
    const notes: Note = yield call(createNote, { payload: action });
    yield put({ type: CREATE_NOTES_SUCCESS, notes });
  } catch (error) {
    // Handle error if needed
  }
}

function* getNotesById(action: { payload: any }) : Generator<any>{
  try {
    debugger
    const { payload } = action;

      const response = yield call(NotesService.CreateNotes,payload );
      return response as Note;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}

export function* workGetNotesByIdFetch(action:any) {
  try {
    const notes: Note = yield call(getNotesById, { payload: action });
    yield put({ type: GET_NOTES_SUCCESS, notes });
  } catch (error) {
    // Handle error if needed
  }
}


