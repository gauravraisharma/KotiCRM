using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class NotesRepository : INotesRepository
    {
        private readonly KotiCRMDbContext _context;

        public NotesRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        public async Task<ReturnTask> CreateNote(Note note)
        {
            try
            {
                _context.Notes.Add(note);
                await _context.SaveChangesAsync();
                return new ReturnTask()
                {
                    Succeed = true,
                    Message = "Note added successfully"
                };
            }
            catch (Exception ex)
            {
                return new ReturnTask()
                {
                    Succeed = false,
                    Message = ex.Message

                };
            }
        }

        public async Task<Note> GetNoteDetails(int id)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);

                if (note == null)
                {
                    throw new Exception($"Note with ID {id} was not found.");
                }
                return note;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<Note>> GetNoteList()
        {
            try
            {
                return await _context.Notes.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }
        }

        public async Task<ReturnTask> DeleteNote(int id)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);
                if (note != null)
                {
                    _context.Notes.Remove(note);
                    await _context.SaveChangesAsync();
                    return new ReturnTask()
                    {
                        Succeed = true,
                        Message = "Note deleted successfully"
                    };
                }
                else
                {
                    // note not found
                    return new ReturnTask()
                    {
                        Succeed = false,
                        Message = "Note not found"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ReturnTask()
                {
                    Succeed = false,
                    Message = ex.Message

                };
            }


        }
        public async Task<Note> UpdateNote(int id, Note note)
        {
            if (id == note.ID)
            {
                _context.Entry(note).State = EntityState.Modified;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new Exception("Concurrency conflict occurred. The entity has been modified or deleted by another user.", ex);
            }
            return note;
        }
    }
}
