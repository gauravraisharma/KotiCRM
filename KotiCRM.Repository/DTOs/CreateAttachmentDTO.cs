using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace KotiCRM.Repository.DTOs;

public class CreateAttachmentDTO
{
    [Required(ErrorMessage = "User Id Is required")]
    public string? UserID { get; set; }
    public DateTime DateAdded { get; set; }
    [NotMapped]
    [Required(ErrorMessage = "File is required")]
    public IFormFile? File { get; set; }
}