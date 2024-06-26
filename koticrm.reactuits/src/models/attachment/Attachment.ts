export interface Attachment {
    id: number;
    userID: string;
    dateAdded: string;
    fileSize: number;
    fileName: string;
    fileExtension: string;
}

export interface CreateAttachment {
    userID: string;
    file: File | null;
}

export class CreateAttachmentClass implements CreateAttachment {
    userID: string = 'e807190e-4092-4e2b-97bd-0c2264454501';
    file: File | null = null;
}