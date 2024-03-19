import { Attachment } from "../attachment/Attachment";

export interface attachmentState{
    attachments:[],
    attachment: Attachment | null,
    refreshList:boolean
}