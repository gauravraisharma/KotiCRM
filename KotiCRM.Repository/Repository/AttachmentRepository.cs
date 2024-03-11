using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace KotiCRM.Repository.Repository;

public class AttachmentRepository : IAttachmentRepository
{
    private readonly KotiCRMDbContext _context;

    public AttachmentRepository(KotiCRMDbContext context)
    {
        _context = context;
    }

    public async Task<DbResponse> CreateAttachment(Attachment attachment)
    {
        try
        {
            _context.Attachments.Add(attachment);
            await _context.SaveChangesAsync();
            return new DbResponse()
            {
                Succeed = true,
                Message = "Contact added successfully"
            };
        }
        catch (Exception ex)
        {
            return new DbResponse()
            {
                Succeed = false,
                Message = ex.Message
            };
        }
    }

    public async Task<IEnumerable<Attachment>> GetAttachmentList()
    {
        try
        {
            return await _context.Attachments.ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message, ex);
        }
    }
}