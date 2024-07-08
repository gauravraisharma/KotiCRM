
import { Note } from "../notes/notes"

export interface noteState{
    notes:[],
    note: Note | null,
   refreshList:boolean
}