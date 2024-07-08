import { ContactWithAccountName } from "./ContactWithAccountName";

export interface ContactWithAccountNameListAndTotalCount {
    contactsCount: number;
    contactWithAccountNames: ContactWithAccountName[];
}