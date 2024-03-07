import agent from "../api/agent";
import { Note } from "../models/notes/notes";


export default class NotesService {
    static async GetNotesList(): Promise<Note[]> {
        debugger
        try {
            const response = await agent.Notes.get();
            return response;
        }
        catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        }
    }

    static async CreateNote(notes: any): Promise<Note> {
        try {
            debugger
            const response = await agent.Notes.create(notes.payload);
            return response;
        }
        catch (error) {
            console.error('Error :', error);
            throw error;
        }
    }
}