using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class AttachmentRepository : IAttachmentRepository
    {
        private readonly KotiCRMDbContext _context;

        public AttachmentRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        public Task<DbResponse> CreateAttachment(Attachment attachment)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Attachment>> GetAttachmentList()
        {
            throw new NotImplementedException();
        }
    }
}
