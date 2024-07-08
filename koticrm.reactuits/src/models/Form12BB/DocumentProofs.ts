export class InitialDocumentProofs implements DocumentProofs{
    section: string;
    fieldName: string;
    file: File;

    constructor(section: string = '',fieldName: string = '', file: File){
        this.section = section;
        this.fieldName = fieldName;
        this.file = file;
    }
}

export interface DocumentProofs{
    section: string;
    fieldName: string;
    file: File;
}