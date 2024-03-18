import { AxiosError, AxiosResponse } from 'axios';
import { apiResponse, axiosInstance,responseBody } from '../../../apiInterceptor/axiosInterceptor';
import { Note } from '../../../models/notes/notes';


 export function  GetNotesList(): Promise<apiResponse<Note[]>>{
    return axiosInstance.get<Note[]>(`/Notes/GetNoteList`).then((response: AxiosResponse<Note[]>) => responseBody(response)).
    catch((error:AxiosError) =>{ 
        const errorResponse: apiResponse<Note[]> = {
            data: [],
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    });
 }


 export function  CreateNote(note: Note): Promise<apiResponse<Note>>{
    return axiosInstance.post<Note>(`/Notes/CreateNote`,note).then((response: AxiosResponse<Note>) => responseBody(response)).
    catch((error:AxiosError) =>{ 
        const errorResponse: apiResponse<Note> = {
            data: undefined,
            status: 500,
            statusText: error.message
        };
        return errorResponse;
    });
 }
