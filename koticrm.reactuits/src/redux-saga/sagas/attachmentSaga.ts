import { call, put } from "redux-saga/effects";
import AttachmentService from "../../services/AttachmentService";
import { Attachment } from "../../models/attachment/Attachment";
import { CREATE_CONTACT_SUCCESS, GET_ATTACHMENTS_SUCCESS } from "../../constants/reduxConstants";
import { DbResponse } from "../../models/commonModels/SharedModels";

function* attachmentsFetch(): Generator<any> {
    try {
        const response = yield call(AttachmentService.GetAttachmentsList);
        return response;
    } catch (error) {
        console.error('Error fetching attachments in saga:', error);
        throw error;
    }
}

export function* workGetAttachmentsFetch() {
    try {
        const attachments: Attachment[] = yield call(attachmentsFetch);
        yield put({ type: GET_ATTACHMENTS_SUCCESS, attachments });
    } catch (error) {
        // Handle error if needed
    }
}

function* createAttachment(action: any): Generator<any> {
    try {
        const { payload } = action;
        const response = yield call(AttachmentService.CreateAttachment, payload);
        return response;
    } catch (error) {
        console.error('Error creating Attachment in saga:', error);
        throw error;
    }
}

export function* workCreateAttachment(action: any) {
    try {
        const dbResponse: DbResponse = yield call(createAttachment, action);
        yield put({ type: CREATE_CONTACT_SUCCESS, dbResponse });
    } catch (error) {
        console.log(error);
    }
}