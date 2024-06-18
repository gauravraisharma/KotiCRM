using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class NotesController : Controller
    {
        private readonly INotesService _noteService;
        public NotesController(INotesService noteService)
        {
            _noteService = noteService;
        }
        /// Gets the list of notes.

        [HttpGet]
        [Route("GetNoteList")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<IEnumerable<ResponseNoteModel>> GetnoteList()
        {
            return await _noteService.GetNoteList();
        }
        /// Gets the details of a specific note by id.

        [HttpGet("GetNoteDetails/{id}")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<ActionResult<ResponseNoteModel>> GetNoteDetails(int id)
        {
            return Ok(await _noteService.GetNoteDetails(id));
        }
        /// Creates a new note.
        [HttpPost]
        [Route("CreateNote")]
        [Authorize(Policy = Policies.Accounts_Add)]
        public async Task<ActionResult<Note>> Createnote(Note note)
        {
            return Ok(await _noteService.CreateNote(note));
        }
        /// Updates an existing note by id.

        [HttpPut("UpdateNote/{id}")]
        [Authorize(Policy = Policies.Accounts_Edit)]
        public async Task<IActionResult> UpdateNote(int id, Note note)
        {
            return Ok(await _noteService.UpdateNote(id, note));
        }
        /// Deletes a note by id.
        [HttpDelete("Deletenote/{id}")]
        [Authorize(Policy = Policies.Accounts_Delete)]
        public async Task<IActionResult> DeleteNote(int id)
        {
            return Ok(await _noteService.DeleteNote(id));
        }
    }
}
