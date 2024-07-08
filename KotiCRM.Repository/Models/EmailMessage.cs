using KotiCRM.Repository.Enums;
using System.Net.Mail;

namespace KotiCRM.Repository.Models
{
    public class EmailMessage
    {
        public List<MailAddress> Recipients { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public EmailTemplate Template { get; set; }
        public Dictionary<string, string> TemplateDynamicPlaceholders { get; set; }
    }
}
