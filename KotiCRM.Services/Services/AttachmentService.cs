using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Repository.DTOs;
using KotiCRM.Services.IServices;

namespace KotiCRM.Services.Services;

public class AttachmentService : IAttachmentService
{
    private readonly IAttachmentRepository _attachmentRepository;
    public AttachmentService(IAttachmentRepository attachmentRepository)
    {
        _attachmentRepository = attachmentRepository;
    }

    public async Task<DbResponse> CreateAttachment(CreateAttachmentDTO createAttachmentDTO)
    {
        if (createAttachmentDTO.File == null)
        {
            throw new ArgumentNullException(nameof(createAttachmentDTO.File));
        }
        Attachment attachment = new Attachment() {
            UserID = createAttachmentDTO.UserID,
            DateAdded = createAttachmentDTO.DateAdded,
            SizeMb = createAttachmentDTO.File.Length,
        };
        return await _attachmentRepository.CreateAttachment(attachment);
    }

    public async Task<IEnumerable<Attachment>> GetAttachmentList()
    {
        return await _attachmentRepository.GetAttachmentList();
    }
}