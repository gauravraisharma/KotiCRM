import { takeEvery } from "redux-saga/effects";
import { CREATE_ATTACHMENT_REQUEST, GET_ATTACHMENTS_FETCH } from "../../../constants/reduxConstants";
import { workCreateAttachment, workGetAttachmentsFetch } from "./WorkerSaga";


function* attachmentSaga() {
  yield takeEvery(GET_ATTACHMENTS_FETCH, workGetAttachmentsFetch);
  yield takeEvery(CREATE_ATTACHMENT_REQUEST, workCreateAttachment);
  }

  export default attachmentSaga  