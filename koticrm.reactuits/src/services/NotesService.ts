import agent from "../api/agent";
import { Note } from "../models/notes/notes";


export default class NotesService {
	static async GetNotesList(): Promise<Note[]> {
	  try {
		const response  = await agent.Notes.get();
		console.log(response)
		return response;
		}
	  catch (error) {
		console.error('Error fetching notes:', error);
		throw error; 
	  }
	}

	static async CreateNotes(notes: any): Promise<Note> {
		try {
		  debugger
		  const response  = await agent.Notes.create(notes.payload);
		  console.log(response)
		  
		  return response;
		  }
		catch (error) {
		  console.error('Error :', error);
		  throw error; 
		}
	  }

	// static async GetAccountDetails(id:any): Promise<Note> {
	// 	try {
	// 	  const response  = await agent.Notes.getById(id.payload);
	// 	  return response;
	// 	  }
	// 	catch (error) {
	// 	  console.error('Error fetching notes:', error);
	// 	  throw error; 
	// 	}
	//   }
}