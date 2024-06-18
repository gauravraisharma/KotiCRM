import { CButton, CCol, CForm, CFormTextarea, CRow } from "@coreui/react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BsClockFill } from "react-icons/bs";
import {
  createNotesRequest,
  getNotes,
} from "../../redux-saga/modules/notes/action";
import moment from "moment";
import 'moment-timezone' 
import GetModulePermissions from "../../utils/Shared/GetModulePermissions";


interface NoteProps {
  getNotesCount: (data: string) => void;
  accountId: any;
  accountName: string;
}

const Notes: React.FC<NoteProps> = ({
  getNotesCount,
  accountId,
 
}) => {
  const dispatch = useDispatch();
  const notes = useSelector((state: any) => state.noteReducer.notes);
  const userId = useSelector((state: any) => state.authReducer.userId);
  const timezone = useSelector((state: any) => state.sharedReducer.timezone);
  const notesPermissions = GetModulePermissions('Accounts');
  
  const [noteDescription, setNoteDescription] = useState("");

  
  const currentDate: Date = new Date();
  const formattedDateTime: string = currentDate.toISOString().slice(0, -1);
  const handleNoteSave = () => {
    const notes: any = {
      id: 0,
      accountId: accountId,
      userId: userId,
      dateOfNote: formattedDateTime,
      description: noteDescription,
    };
    dispatch(createNotesRequest(notes));
    setNoteDescription("");
  };

  const handleCancelClick = () => {
    setNoteDescription("");
  };
  let filteredNotes = notes;
  if (accountId) {
    filteredNotes = notes?.filter((note: any) => note.accountID === accountId);
  }
  const noteCount = filteredNotes?.length;
  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    getNotesCount(noteCount);
  });

  return (
    <div>
      {filteredNotes.length === 0 && (
        <div>No notes found</div>
      )}
      {filteredNotes.length > 0 && (
        <CRow>
          <CCol xs={12} sm={8}>
            <ul>
              {filteredNotes.map((note: any) => (
                <li key={note.id}>
                  <div className="mb-4">
                    <div>
                      <span className="person">
                        <IoPersonCircleOutline />
                      </span>
                      <span>{note.description}</span>
                    </div>
                    <div className="mt-2 mx-5 d-flex align-items-center">
                      <BsClockFill color="#3c4b64" className="mx-1" />
                      <span className="mx-1">
                        {moment.utc(note.dateOfNote).tz(timezone)?.format('DD/MM/YYYY hh:mm A')}

                      </span>
                      <span className="mx-1">by</span>
                      <span className="mx-1">
                        {note.firstName} {note.lastName}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CCol>
        </CRow>
      )}
      <CRow>
        <CCol xs={8}>
        {notesPermissions.isAdd &&
          <CForm>
            <CFormTextarea
              className="textarea"
              rows={3}
              placeholder="Add a note"
              name="noteDescription"
              value={noteDescription}
              onChange={(e: any) => setNoteDescription(e.target.value)}
            ></CFormTextarea>

            <div className="text-end">
              <CButton
                style={{ margin: "5px" }}
                component="input"
                type="button"
                color="secondary"
                value="Cancel"
                onClick={handleCancelClick}
              />
             
              <CButton
                style={{ margin: "5px" }}
                component="input"
                type="button"
                color="primary"
                value="Save"
                onClick={handleNoteSave}
              />
            </div>
          </CForm>}
        </CCol>
      </CRow>
    </div>
  );
};

export default Notes;
