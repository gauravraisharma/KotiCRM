
import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { Attachment } from '../../../models/attachment/Attachment';
import {  CREATE_ATTACHMENT_SUCCESS, GET_ATTACHMENTS_SUCCESS } from '../../../constants/reduxConstants';
import { CreateAttachment, GetAttachmentsList } from './apiService';
import { actionPayloadModel } from '../../../models/actionModel/actionModel';
import { DbResponse } from '../../../models/commonModels/SharedModels';

export function* workGetAttachmentsFetch(): Generator<any> {
  try {
    const response:any  = yield call(GetAttachmentsList);
    if(response.status!=200){
      toast.error('Error fetching accounts')
    }else{
      const attachments: Attachment[]  =response.data;
      yield put({ type: GET_ATTACHMENTS_SUCCESS, payload:attachments });
    }
   
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}


export function* workCreateAttachment(action: actionPayloadModel): Generator<any> {
  try {
    const response:any  = yield call(CreateAttachment,action.payload);
    if(response.status!=200){
      toast.error('Error fetching accounts')
    }else{
      const dbResponse: DbResponse  =response.data;
      yield put({ type: CREATE_ATTACHMENT_SUCCESS, dbResponse });
    }
   
  } catch (error) {
    toast.error('SomethingWent Wrong, Please try after sometime')
  }
}

