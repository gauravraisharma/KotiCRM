﻿using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface INotesService
    {
        Task<DbResponse> CreateNote(Note note);
        Task<IEnumerable<ResponseNoteModel>> GetNoteList();
        Task<ResponseNoteModel> GetNoteDetails(int id);
        Task<DbResponse> DeleteNote(int id);
        Task<Note> UpdateNote(int id, Note note);
    }
}
