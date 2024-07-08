import { CREATE_ATTACHMENT_REQUEST, GET_ATTACHMENTS_FETCH } from "../../../constants/reduxConstants";

export const getAttachments=()=>({
  type: GET_ATTACHMENTS_FETCH
});

export const createAttachment=(formData: FormData)=>({
  type: CREATE_ATTACHMENT_REQUEST,
  payload: formData
});