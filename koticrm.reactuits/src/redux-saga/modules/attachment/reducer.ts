import { Reducer } from "react";
import { CREATE_ATTACHMENT_SUCCESS, GET_ATTACHMENTS_SUCCESS } from "../../../constants/reduxConstants";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { Attachment } from "../../../models/attachment/Attachment";
import { attachmentState } from "../../../models/reduxState/attachmentState";
const INITIAL_STATE: attachmentState = {
   attachments:[],
   attachment:null as Attachment | null,
   refreshList:false
  };


const attachmentReducer: Reducer<attachmentState, actionPayloadModel> = (state: attachmentState = INITIAL_STATE, action: actionPayloadModel): attachmentState => {
    switch (action.type) {
        case GET_ATTACHMENTS_SUCCESS:
            return {
                ...state,
                attachments: action.payload
            }
     case CREATE_ATTACHMENT_SUCCESS:
                return {
                    ...state,
                    attachment: action.payload,
                    refreshList:true
                }
      default:
        return state;
    }
  };

  export default attachmentReducer;