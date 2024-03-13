export interface Attachment {
    id: number;
    userID: string;
    dateAdded: string;
    sizeMb: number;
    fileName: string;
    fileExtension: string;
}

export interface CreateAttachment {
    userID: string;
    file: File | null;
}

export class CreateAttachmentClass implements CreateAttachment {
    userID: string = '';
    file: File | null = null;
}