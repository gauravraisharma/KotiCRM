import { CButton, CCol, CForm, CFormTextarea, CRow } from "@coreui/react";
import { IoPersonCircleOutline } from "react-icons/io5";
// import { TiAttachmentOutline } from "react-icons/ti"
import { useSelector } from "react-redux";
import { Note } from "../../models/notes/notes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BsClockFill } from "react-icons/bs";
import TimeDisplay from "../timeDisplay/TimeDisplay";
import {
  createNotesRequest,
  getNotes,
} from "../../redux-saga/modules/notes/action";

interface NoteProps {
  getNotesCount: (data: string) => void;
  accountId: any;
  accountName: string;
}

const Notes: React.FC<NoteProps> = ({
  getNotesCount,
  accountId,
  accountName,
}) => {
  const dispatch = useDispatch();
  const notes = useSelector((state: any) => state.noteReducer.notes);
  const noteResponse = useSelector(
    (state: any) => state.noteReducer.noteResponse
  );

  const userId = useSelector((state: any) => state.authReducer.userId);

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
  const filteredNotes = notes?.filter((note: any) => {
    return note.accountID == accountId;
  });
  const noteCount = filteredNotes?.length;

  console.log(filteredNotes);
  useEffect(() => {
    dispatch(getNotes());
  }, [noteResponse]);

  useEffect(() => {
    getNotesCount(noteCount);
  });
  return (
    <div>
      <CRow>
        <CCol xs={12} sm={8}>
          <ul>
            {filteredNotes?.map((note: Note) => (
              <li key={note.id}>
                <div className="mb-4">
                  <div>
                    <span className="person">
                      <IoPersonCircleOutline />
                    </span>
                    <span>{note.description}</span>
                  </div>
                  <div className="mt-2 mx-5 d-flex align-items-center">
                    <span>
                      Account - <span className="linking">{accountName} </span>
                    </span>
                    <span className=" mx-1">.</span>
                    <span className="mx-2">Add Note</span>
                    <BsClockFill color="#3c4b64" className="mx-1" />
                    <TimeDisplay createdAt={note.dateOfNote} />
                    <span className="mx-1">by</span>
                    <span className="mx-1 ">
                      {note.firstName} {note.lastName}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={8}>
          <CForm>
            <CFormTextarea
              className="textarea"
              rows={3}
              placeholder="Add a note"
              name="noteDescription"
              value={noteDescription}
              onChange={(e: any) => setNoteDescription(e.target.value)}
            ></CFormTextarea>

            <div className="text-end ">
              {/* <TiAttachmentOutline /> */}

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
          </CForm>
        </CCol>
      </CRow>
    </div>
  );
};

export default Notes;
