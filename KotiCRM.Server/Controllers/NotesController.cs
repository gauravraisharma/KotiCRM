using KotiCRM.Repository.Models;
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
        [HttpGet]
        [Route("GetNoteList")]
        public async Task<IEnumerable<Note>> GetnoteList()
        {
            return await _noteService.GetNoteList();
        }

        [HttpGet("GetNoteDetails/{id}")]
        public async Task<ActionResult<Note>> GetNoteDetails(int id)
        {
            return Ok(await _noteService.GetNoteDetails(id));
        }

        [HttpPost]
        [Route("CreateNote")]
        public async Task<ActionResult<Note>> Createnote(Note note)
        {
            return Ok(await _noteService.CreateNote(note));
        }

        [HttpPut("UpdateNote/{id}")]

        public async Task<IActionResult> UpdateNote(int id, Note note)
        {
            return Ok(await _noteService.UpdateNote(id, note));
        }


        [HttpDelete("Deletenote/{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            return Ok(await _noteService.DeleteNote(id));
        }
    }
}
