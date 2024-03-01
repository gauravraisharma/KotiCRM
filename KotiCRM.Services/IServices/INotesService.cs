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
        Task<ReturnTask> CreateNote(Note note);
        Task<IEnumerable<Note>> GetNoteList();
        Task<Note> GetNoteDetails(int id);
        Task<ReturnTask> DeleteNote(int id);
        Task<Note> UpdateNote(int id, Note note);
    }
}
