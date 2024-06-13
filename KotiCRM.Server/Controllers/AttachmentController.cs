using KotiCRM.Repository.DTOs.Attachment;
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
    public class AttachmentController : Controller
    {
        private readonly IAttachmentService _attachmentService;

        public AttachmentController(IAttachmentService attachmentService)
        {
            _attachmentService = attachmentService;
        }

        [HttpGet]
        [Route("GetAttachmentList")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<IEnumerable<AttachmentDTO>> GetAttachmentList()
        {
            return await _attachmentService.GetAttachmentList();
        }

        [HttpPost]
        [Route("CreateAttachment")]
        [Authorize(Policy = Policies.Accounts_Add)]
        public async Task<ActionResult<Attachment>> CreateAttachment([FromForm] CreateAttachmentDTO createAttachmentDTO)
        {
            var response = await _attachmentService.CreateAttachment(createAttachmentDTO);
            if (response == null || !response.Succeed)
            {
                return StatusCode(500, response?.Message);
            }
            return Ok(response);
        }

        [HttpGet("{attachmentId}/download")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<IActionResult> DownloadAttachmentAsync(int attachmentId)
        {
            var dbResponse = await _attachmentService.DownloadAttachmentAsync(attachmentId);

            if (dbResponse.Succeed == false)
            {
                return NotFound(dbResponse.Message);
            }

            var path = dbResponse.Message;

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            var contentType = "APPLICATION/octet-stream";
            var fileName = Path.GetFileName(path);

            var file = File(memory, contentType, fileName);

            return file;
        }
    }
}