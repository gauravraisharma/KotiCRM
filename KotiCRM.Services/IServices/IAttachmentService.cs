using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface IAttachmentService
    {
        Task<DbResponse> CreateAttachment(Attachment attachment);
        Task<IEnumerable<Attachment>> GetAttachmentList();
    }
}
