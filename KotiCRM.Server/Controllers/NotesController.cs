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
        [HttpGet]
        [Route("GetNoteList")]
        [Authorize(Policy = Policies.Notes_View)]
        public async Task<IEnumerable<ResponseNoteModel>> GetnoteList()
        {
            return await _noteService.GetNoteList();
        }

        [HttpGet("GetNoteDetails/{id}")]
        [Authorize(Policy = Policies.Notes_View)]
        public async Task<ActionResult<ResponseNoteModel>> GetNoteDetails(int id)
        {
            return Ok(await _noteService.GetNoteDetails(id));
        }

        [HttpPost]
        [Route("CreateNote")]
        [Authorize(Policy = Policies.Notes_Add)]
        public async Task<ActionResult<Note>> Createnote(Note note)
        {
            return Ok(await _noteService.CreateNote(note));
        }

        [HttpPut("UpdateNote/{id}")]
        [Authorize(Policy = Policies.Notes_Edit)]
        public async Task<IActionResult> UpdateNote(int id, Note note)
        {
            return Ok(await _noteService.UpdateNote(id, note));
        }


        [HttpDelete("Deletenote/{id}")]
        [Authorize(Policy = Policies.Notes_Delete)]
        public async Task<IActionResult> DeleteNote(int id)
        {
            return Ok(await _noteService.DeleteNote(id));
        }
    }
}
