using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class AttachmentService : IAttachmentService
    {
        private readonly IAttachmentRepository _attachmentRepository;
        public AttachmentService(IAttachmentRepository attachmentRepository)
        {
            _attachmentRepository = attachmentRepository;
        }

        public async Task<DbResponse> CreateAttachment(Attachment attachment)
        {
          return  await _attachmentRepository.CreateAttachment(attachment);
        }

        public async Task<IEnumerable<Attachment>> GetAttachmentList()
        {
           return await _attachmentRepository.GetAttachmentList();
        }
    }
}
