import { takeEvery } from "redux-saga/effects";
import { CREATE_NOTES_REQUEST, GET_NOTES_FETCH } from "../../../constants/reduxConstants";
import { workCreateNote, workGetNotesFetch } from "./WorkerSaga";

function* noteSaga() {
    yield takeEvery(GET_NOTES_FETCH, workGetNotesFetch);
    yield takeEvery(CREATE_NOTES_REQUEST, workCreateNote);
  }

  export default noteSaga