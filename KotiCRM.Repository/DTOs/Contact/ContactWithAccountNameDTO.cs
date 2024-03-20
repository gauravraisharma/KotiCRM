using System.ComponentModel.DataAnnotations;

namespace KotiCRM.Repository.DTOs.Contact;

public class ContactWithAccountNameDTO
{
    public int Id { get; set; }
    public string? OwnerId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int AccountID { get; set; }
    public string? AccountName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? OtherPhone { get; set; }
    public string? Mobile { get; set; }
    public string? Title { get; set; }
    public string? Department { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? HomePhone { get; set; }
    public string? SkypeID { get; set; }
    public string? LinkedinURL { get; set; }
    public string? TwitterURL { get; set; }
    public string? SecondaryEmail { get; set; }
    public string? MailingStreet { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Zip { get; set; }
    public string? Country { get; set; }
    public string? Description { get; set; }
}