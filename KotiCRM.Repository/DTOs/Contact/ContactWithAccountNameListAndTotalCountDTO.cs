namespace KotiCRM.Repository.DTOs.Contact;

public class ContactWithAccountNameListAndTotalCountDTO
{
    public int ContactsCount { get; set; }
    public IEnumerable<ContactWithAccountNameDTO>? ContactWithAccountNames { get; set; }
}