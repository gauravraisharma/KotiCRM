import { Contact } from "../contact/Contact";

export interface contactState{
    contacts:[],
    contact:Contact | null,
   refreshList:boolean
}