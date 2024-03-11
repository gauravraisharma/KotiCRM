using KotiCRM.Repository.Models;

namespace KotiCRM.Repository.IRepository;

public interface IAttachmentRepository
{
    Task<DbResponse> CreateAttachment(Attachment attachment);
    Task<IEnumerable<Attachment>> GetAttachmentList();
}