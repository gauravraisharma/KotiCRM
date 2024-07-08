import { CREATE_NOTES_REQUEST, GET_NOTES_FETCH } from "../../../constants/reduxConstants";
import { Note } from "../../../models/notes/notes";

export const getNotes = () => ({
  type: GET_NOTES_FETCH
})

export const createNotesRequest = (notes: Note) => ({
    type: CREATE_NOTES_REQUEST,
    payload: notes,
});
  
