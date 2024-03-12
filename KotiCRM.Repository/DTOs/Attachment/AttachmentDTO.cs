namespace KotiCRM.Repository.DTOs.Attachment;

public class AttachmentDTO
{
    public int ID { get; set; }
    public string? UserID { get; set; }
    public DateTime DateAdded { get; set; }
    public decimal SizeMb { get; set; }
    public string? FileName { get; set; }
    public string? FileExtension { get; set; }
}