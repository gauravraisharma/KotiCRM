using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Repository.DTOs;
using KotiCRM.Services.IServices;
using System.Reflection;

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
        Attachment attachment = new Attachment()
        {
            UserID = createAttachmentDTO.UserID,
            DateAdded = createAttachmentDTO.DateAdded,
            SizeMb = ((decimal)createAttachmentDTO.File.Length / (1024 * 1024)).ToString(),
            FileName = uploadedFileName,
        };
        return await _attachmentRepository.CreateAttachment(attachment);
    }

    public async Task<IEnumerable<Attachment>> GetAttachmentList()
    {
        return await _attachmentRepository.GetAttachmentList();
    }
}