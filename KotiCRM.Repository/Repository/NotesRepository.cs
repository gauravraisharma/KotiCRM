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
        // Creates a new note in the database
        public async Task<DbResponse> CreateNote(Note note)
        {
            try
            {
                _context.Notes.Add(note);// Add the note to the context
                await _context.SaveChangesAsync();// Save changes asynchronously
                return new DbResponse()
                {
                    Succeed = true,
                    Message = "Note added successfully"// Return success response
                };
            }
            catch (Exception ex)
            {
                return new DbResponse()
                {
                    Succeed = false,
                    Message = ex.Message// Return error message

                };
            }
        }
        // Retrieves the details of a specific note by ID
        public async Task<ResponseNoteModel> GetNoteDetails(int id)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);// Find the note by ID

                if (note == null)
                {
                    throw new Exception($"Note with ID {id} was not found.");// Note not found

                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == note.UserID); // Find the user associated with the note

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

                    return responseNote;// Return the note details with user info
                }
                else
                {
                    throw new Exception($"User with ID {note.UserID} was not found.");// User not found
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);// Return error message
            }
        }

        // Retrieves a list of all notes with user details
        public async Task<IEnumerable<ResponseNoteModel>> GetNoteList()
        {
            try
            {

                var notes = await _context.Notes.ToListAsync();// Get all notes
                var responseNotes = new List<ResponseNoteModel>();

                        foreach (var note in notes)
                        {
                            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == note.UserID);// Find the user associated with each note

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

                                responseNotes.Add(responseNote); // Add the note with user details to the list
                    }
                        }

                        return responseNotes; // Return the list of notes
            }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message, ex); // Return error message
            }
                }
        // Deletes a note by ID
        public async Task<DbResponse> DeleteNote(int id)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);// Find the note by ID
                if (note != null)
                {
                    _context.Notes.Remove(note);// Remove the note from the context
                    await _context.SaveChangesAsync();// Save changes asynchronously
                    return new DbResponse()
                    {
                        Succeed = true,
                        Message = "Note deleted successfully"// Return success response
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
                    Message = ex.Message// Return error message

                };
            }


        }
        // Updates an existing note by ID
        public async Task<Note> UpdateNote(int id, Note note)
        {
            if (id == note.ID)
            {
                _context.Entry(note).State = EntityState.Modified;// Mark the note as modified
            }
            try
            {
                await _context.SaveChangesAsync();// Save changes asynchronously
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new Exception("Concurrency conflict occurred. The entity has been modified or deleted by another user.", ex);
            }
            return note;// Return the updated note
        }
    }
}
