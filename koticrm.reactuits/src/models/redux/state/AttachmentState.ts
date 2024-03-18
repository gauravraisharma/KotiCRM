import { Attachment } from "../../attachment/Attachment";

export interface AttachmentState {
    attachments: Attachment[];
    attachment: Attachment | null;
    refreshList: boolean;
}