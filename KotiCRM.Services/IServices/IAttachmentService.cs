using KotiCRM.Repository.DTOs.Attachment;
using KotiCRM.Repository.Models;

namespace KotiCRM.Services.IServices;

public interface IAttachmentService
{
    Task<DbResponse> CreateAttachment(CreateAttachmentDTO createAttachmentDTO);
    Task<IEnumerable<AttachmentDTO>> GetAttachmentList();
}