using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace KotiCRM.Repository.Repository;

public class AttachmentRepository : IAttachmentRepository
{
    // Dependency Injection of the DbContext
    private readonly KotiCRMDbContext _context;

    // Constructor to initialize the DbContext
    public AttachmentRepository(KotiCRMDbContext context)
    {
        _context = context;
    }

    // Method to create and save a new attachment
    public async Task<DbResponse> CreateAttachment(Attachment attachment)
    {
        try
        {
            // Adding the attachment entity to the context
            _context.Attachments.Add(attachment);
            await _context.SaveChangesAsync();
            return new DbResponse()
            {
                Succeed = true,
                Message = "Attachment added successfully"
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
    // Method to get a list of all attachments, ordered by DateAdded in descending order
    public async Task<IEnumerable<Attachment>> GetAttachmentList()
    {
        try
        {
            // Retrieving the list of attachments from the database asynchronously
            return await _context.Attachments.OrderByDescending(a => a.DateAdded).ToListAsync();
        }
        catch (Exception ex)
        {
            // Throwing a new exception with the original exception's message
            throw new Exception(ex.Message, ex);
        }
    }

    // Method to get an attachment by its ID
    public async Task<Attachment> GetAttachmentByIdAsync(int attachmentID)
    {
        try
        {
            // Finding the attachment by its ID asynchronously
            var attachment = await _context.Attachments.FindAsync(attachmentID);
            // Returning the attachment or throwing an exception if not found
            return attachment ?? throw new InvalidOperationException($"Attachment with ID {attachmentID} not found.");
        }
        catch (Exception ex)
        {

            // Throwing a new exception with the original exception's message
            throw new Exception(ex.Message, ex);
        }
    }
}