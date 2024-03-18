import { CREATE_ATTACHMENT_SUCCESS, GET_ATTACHMENTS_SUCCESS } from "../../../constants/reduxConstants";
import { actionPayloadModel } from "../../../models/actionModel/actionModel";
import { Attachment } from "../../../models/attachment/Attachment";
const INITIAL_STATE = {
   attachments:[],
   attachment:null as Attachment | null,
   refreshList:false
  };


  const attachmentReducer= (state = INITIAL_STATE, action:actionPayloadModel) => {
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