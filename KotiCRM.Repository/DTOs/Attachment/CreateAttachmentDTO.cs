using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace KotiCRM.Repository.DTOs.Attachment;

public class CreateAttachmentDTO
{
    [Required(ErrorMessage = "User Id Is required")]
    public string? UserID { get; set; }
    public int? AccountID { get; set; }
    [Required(ErrorMessage = "File is required")]
    public IFormFile? File { get; set; }
}