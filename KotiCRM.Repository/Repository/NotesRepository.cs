using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Azure.Core.HttpHeader;

namespace KotiCRM.Repository.Repository
{
    public class NotesRepository : INotesRepository
    {
        private readonly KotiCRMDbContext _context;

        public NotesRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        public async Task<DbResponse> CreateNote(Note note)
        {
            try
            {
                _context.Notes.Add(note);
                await _context.SaveChangesAsync();
                return new DbResponse()
                {
                    Succeed = true,
                    Message = "Note added successfully"
                };
            }
            catch (Exception ex)
            {
                return new DbResponse()
                {
                    Succeed = false,
                    Message = ex.Message

                };
            }
        }

        public async Task<ResponseNoteModel> GetNoteDetails(int id)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);

                if (note == null)
                {
                    throw new Exception($"Note with ID {id} was not found.");
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == note.UserID);

                if (user != null)
                {
                    var responseNote = new ResponseNoteModel
                    {
                        ID = note.ID,
                        AccountID = note.AccountID,
                        UserID = note.UserID,
                        DateOfNote = note.DateOfNote,
                        Description = note.Description,
                        FirstName = user.FirstName,
                        LastName = user.LastName
                    };

                    return responseNote;
                }
                else
                {
                    throw new Exception($"User with ID {note.UserID} was not found.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }


        public async Task<IEnumerable<ResponseNoteModel>> GetNoteList()
        {
            try
            {

                var notes = await _context.Notes.ToListAsync();
                var responseNotes = new List<ResponseNoteModel>();

                        foreach (var note in notes)
                        {
                            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == note.UserID);

                            if (user != null)
                            {
                                var responseNote = new ResponseNoteModel
                                {
                                    ID = note.ID,
                                    AccountID = note.AccountID,
                                    UserID = note.UserID,
                                    DateOfNote = note.DateOfNote,
                                    Description = note.Description,
                                    FirstName = user.FirstName,
                                    LastName = user.LastName
                                };

                                responseNotes.Add(responseNote);
                            }
                        }

                        return responseNotes;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message, ex);
                    }
                }

 

        public async Task<DbResponse> DeleteNote(int id)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);
                if (note != null)
                {
                    _context.Notes.Remove(note);
                    await _context.SaveChangesAsync();
                    return new DbResponse()
                    {
                        Succeed = true,
                        Message = "Note deleted successfully"
                    };
                }
                else
                {
                    // note not found
                    return new DbResponse()
                    {
                        Succeed = false,
                        Message = "Note not found"
                    };
                }
            }
            catch (Exception ex)
            {
                return new DbResponse()
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
