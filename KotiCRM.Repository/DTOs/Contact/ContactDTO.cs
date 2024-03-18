using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KotiCRM.Repository.DTOs.Contact;

public class ContactDTO
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "Owner Id Is required")]
    [StringLength(200)]
    public string? OwnerId { get; set; }
    [Required(ErrorMessage = "First Name Is required")]
    [StringLength(200)]
    public string? FirstName { get; set; }
    [StringLength(200)]
    public string? LastName { get; set; }
    [Required(ErrorMessage = "Account ID Is required")]
    public int AccountID { get; set; }
    [EmailAddress]
    [StringLength(100)]
    public string? Email { get; set; }
    [StringLength(20)]
    public string? Phone { get; set; }
    [StringLength(20)]
    public string? OtherPhone { get; set; }
    [StringLength(20)]
    public string? Mobile { get; set; }
    [StringLength(200)]
    public string? Title { get; set; }
    [StringLength(200)]
    public string? Department { get; set; }
    public DateTime? DateOfBirth { get; set; }
    [StringLength(20)]
    public string? HomePhone { get; set; }
    [Required(ErrorMessage = "Skype Id Is required")]
    [StringLength(200)]
    public string? SkypeID { get; set; }
    [StringLength(200)]
    public string? LinkedinURL { get; set; }
    [StringLength(200)]
    public string? TwitterURL { get; set; }
    [EmailAddress]
    [StringLength(100)]
    public string? SecondaryEmail { get; set; }
    [StringLength(200)]
    public string? MailingStreet { get; set; }
    [StringLength(100)]
    public string? City { get; set; }
    [StringLength(100)]
    public string? State { get; set; }
    [StringLength(100)]
    public string? Zip { get; set; }
    [StringLength(100)]
    public string? Country { get; set; }
    [StringLength(450)]
    public string? Description { get; set; }
}