namespace KotiCRM.Repository.DTOs.Attachment;

public class AttachmentDTO
{
    public int ID { get; set; }
    public string? UserID { get; set; }
    public int? AccountID { get; set; }
    public DateTime DateAdded { get; set; }
    // File Size is in byte
    public decimal FileSize { get; set; }
    public string? FileName { get; set; }
    public string? FileExtension { get; set; }
    public string? ContentType { get; set; }
}