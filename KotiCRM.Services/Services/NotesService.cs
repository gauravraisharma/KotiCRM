using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class NotesService : INotesService
    {
        private readonly INotesRepository _noteRepository;

        public NotesService(INotesRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }
        public async Task<ReturnTask> CreateNote(Note note)
        {
            return await _noteRepository.CreateNote(note);
        }

        public async Task<ReturnTask> DeleteNote(int id)
        {
            return await _noteRepository.DeleteNote(id);  
        }

        public async Task<Note> GetNoteDetails(int id)
        {
            return await _noteRepository.GetNoteDetails(id);
        }

        public async Task<IEnumerable<Note>> GetNoteList()
        {
            return await _noteRepository.GetNoteList();
        }

        public async Task<Note> UpdateNote(int id, Note note)
        {
            return await _noteRepository.UpdateNote(id,note);
        }
    }
}
