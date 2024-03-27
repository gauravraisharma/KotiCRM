using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using KotiCRM.Repository.DTOs.Attachment;

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

        string appDirectory = Directory.GetCurrentDirectory();
        string contentDirectory = Path.Combine(appDirectory, "Contents");
        if (!Directory.Exists(contentDirectory))
        {
            Directory.CreateDirectory(contentDirectory);
        }

        string fileName = createAttachmentDTO.File.FileName.Split('.')[0];
        string extension = Path.GetExtension(createAttachmentDTO.File.FileName);
        string uploadedFileName = fileName + DateTime.Now.Ticks.ToString() + extension;
        string path = Path.Combine(contentDirectory, uploadedFileName);
        using (var stream = new FileStream(path, FileMode.CreateNew))
        {
            await createAttachmentDTO.File.CopyToAsync(stream);
        }
        KotiCRM.Repository.Models.Attachment attachment = new()
        {
            UserID = createAttachmentDTO.UserID,
            AccountID = createAttachmentDTO.AccountID,
            DateAdded = DateTime.Now,
            FileSize = createAttachmentDTO.File.Length,
            FileName = uploadedFileName,
            FileExtension = extension,
            ContentType = createAttachmentDTO.File.ContentType
        };
        return await _attachmentRepository.CreateAttachment(attachment);
    }

    public async Task<IEnumerable<AttachmentDTO>> GetAttachmentList()
    {
        var attachments = await _attachmentRepository.GetAttachmentList();
        List<AttachmentDTO> attachmentDTOs = attachments.Select(attachment => new AttachmentDTO()
        {
            ID = attachment.ID,
            UserID = attachment.UserID,
            AccountID = attachment.AccountID,
            DateAdded = attachment.DateAdded,
            FileSize = attachment.FileSize,
            FileName = attachment.FileName,
            FileExtension = attachment.FileExtension,
            ContentType = attachment.ContentType
        }).ToList();

        return attachmentDTOs;
    }

    public async Task<DbResponse> DownloadAttachmentAsync(int attachmentID)
    {
        var attachment = await _attachmentRepository.GetAttachmentByIdAsync(attachmentID);

        if (attachment == null)
        {
            return new DbResponse
            {
                Succeed = false,
                Message = $"Attachment with ID {attachmentID} not found."
            };
        }

        var appDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Contents");

        var path = Path.Combine(appDirectory, attachment.FileName!);

        return new DbResponse
        {
            Succeed = true,
            Message = path
        };
    }
}