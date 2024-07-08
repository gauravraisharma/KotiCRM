import { Reducer } from "react";
import { CREATE_ATTACHMENT_SUCCESS, GET_ATTACHMENTS_FETCH, GET_ATTACHMENTS_SUCCESS } from "../../../constants/reduxConstants";
import { Attachment } from "../../../models/attachment/Attachment";
import { attachmentState } from "../../../models/reduxState/attachmentState";
import { AppAction } from "../../../models/redux/action/ActionModel";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
const INITIAL_STATE: attachmentState = {
   attachments:[],
   attachment:null as Attachment | null,
   refreshList:false,
   isLoading :false

  };


const attachmentReducer: Reducer<attachmentState, AppAction> = (state: attachmentState = INITIAL_STATE, action: AppAction): attachmentState => {
    switch (action.type) {
        case GET_ATTACHMENTS_FETCH:
            return {
                ...state,
                isLoading :true
            }
        case GET_ATTACHMENTS_SUCCESS:
            return {
                ...state,
                attachments: (action as actionPayloadModel).payload,
                isLoading :false
            }
     case CREATE_ATTACHMENT_SUCCESS:
                return {
                    ...state,
                    attachment: (action as actionPayloadModel).payload,
                    refreshList:true
                }
      default:
        return state;
    }
  };

  export default attachmentReducer;