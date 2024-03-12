using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KotiCRM.Repository.Models;

public class Attachment
{
    public int ID { get; set; }
    public string? UserID { get; set; }
    public DateTime DateAdded { get; set; }
    public decimal SizeMb { get; set; }
    public string? FileName { get; set; }
    public string? FileExtension { get; set;}
}