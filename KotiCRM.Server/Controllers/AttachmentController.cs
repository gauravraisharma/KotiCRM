using KotiCRM.Repository.DTOs;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class AttachmentController : Controller
    {
        private readonly IAttachmentService _attachmentService;

        public AttachmentController(IAttachmentService attachmentService)
        {
            _attachmentService = attachmentService;
        }

        [HttpGet]
        [Route("GetAttachmentList")]
        public async Task<IEnumerable<Attachment>> GetAttachmentList()
        {
            return await _attachmentService.GetAttachmentList();
        }

        [HttpPost]
        [Route("CreateAttachment")]
        public async Task<ActionResult<Attachment>> CreateAttachment([FromForm] CreateAttachmentDTO createAttachmentDTO)
        {
            var response = await _attachmentService.CreateAttachment(createAttachmentDTO);
            if (response == null || !response.Succeed)
            {
                return StatusCode(500, response?.Message);
            }
            return Ok(response);
        }
    }
}