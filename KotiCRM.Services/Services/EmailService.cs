using KotiCRM.Repository.Enums;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using Task = System.Threading.Tasks.Task;

namespace KotiCRM.Services.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendMailAsync(EmailMessage emailMessage)
        {
            var smtpConfig = _configuration.GetSection("smtp");
            var username = smtpConfig["SMTP_Mail"];
            var password = smtpConfig["SMTP_Password"];
            var hostName = smtpConfig["SMTP_client"];
            var port = smtpConfig["SMTP_port"];
            var isSslEnabled = bool.Parse(smtpConfig["SMTP_EnableSsl"]);


            var client = new SmtpClient(hostName, int.Parse(port))
            {
                EnableSsl = isSslEnabled,
                Credentials = new NetworkCredential(username, password),
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            try
            {

                var mailMessage = new MailMessage();

                mailMessage.From = new MailAddress(username);
                mailMessage.Subject = emailMessage.Subject;
                mailMessage.Body = GetEmailBodyContent(emailMessage);
                mailMessage.IsBodyHtml = true;
                emailMessage.Recipients.ForEach(emailAddress =>
                {
                    mailMessage.To.Add(emailAddress);
                });


                await client.SendMailAsync(mailMessage);
            }
            catch(Exception ex) 
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private string GetEmailBodyContent(EmailMessage emailMessage)
        {
            if (emailMessage.Template == Repository.Enums.EmailTemplate.None) return emailMessage.Body;

            return PopulateEmailTemplateContent(emailMessage.Template, emailMessage.TemplateDynamicPlaceholders);
        }

        private string PopulateEmailTemplateContent(EmailTemplate template, Dictionary<string, string> templateDynamicPlaceholders)
        {
            var emailTemplatePrefix = template.ToString();
            string fileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, $"EmailTemplates\\{emailTemplatePrefix}.html");
            var emailTemplateContent = File.ReadAllText(fileName);

            foreach (var key in templateDynamicPlaceholders.Keys)
            {
                emailTemplateContent = emailTemplateContent.Replace(key, templateDynamicPlaceholders[key]);
            }

            return emailTemplateContent;
        }
    }
}
