using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;
using System.Collections;

namespace ApplicationService.Utilities
{
    public static class MailOperation
    {
        public static async  Task SendEmailAsync(List<string> email, string subject, string message, IConfiguration _config, Dictionary<string, string> subjectVariables = null, Dictionary<string, string> contentVariables = null)
        {
            var fromMail = _config["smtp:SMTP_Mail"];
            var password = _config["smtp:SMTP_Password"];
            var SMTP_client = _config["smtp:SMTP_client"];
            var SMTP_port = _config["smtp:SMTP_port"];
            var SMTP_EnableSsl = _config["smtp:SMTP_EnableSsl"];



            string subjectValue = (subjectVariables != null) ? ReplaceVaribaleWithValue(subjectVariables, subject) : subject;
            string messageValue = (contentVariables != null) ? ReplaceVaribaleWithValue(contentVariables, message) : message;


            var client = new SmtpClient(SMTP_client, int.Parse(SMTP_port))
            {
                EnableSsl = bool.Parse(SMTP_EnableSsl),
                Credentials = new NetworkCredential(fromMail, password)
            };

            var mailMessage = new MailMessage();
            MailAddress _fromMail = new MailAddress(fromMail);
            mailMessage.From = _fromMail;
            mailMessage.Subject = subjectValue;
            mailMessage.Body = messageValue;
            mailMessage.IsBodyHtml = true;
            //email.ForEach(mail =>
            //{
            //    mailMessage.To.Add(new MailAddress(mail));
            //});

            //return client.SendMailAsync(mailMessage);
            foreach (var recipientEmail in email)
            {
                mailMessage.To.Add(new MailAddress(recipientEmail));
            }

            await client.SendMailAsync(mailMessage);

        }
        //public static async Task SendPasswordResetEmailAsync(string userEmail, string resetLink, IConfiguration _config)
        //{
        //    var subject = "Password Reset Request";
        //    var message = $"Click <a href='{resetLink}'>here</a> to reset your password.";

        //    await SendEmailAsync(new List<string> { userEmail }, subject, message, _config);
        //}
        public static async Task SendPasswordResetEmailAsync(string userEmail, string resetLink, IConfiguration config)
        {
            var subject = "Password Reset Request";
            var message = $"Click <a href='{resetLink}'>here</a> to reset your password.";

            await SendEmailAsync(new List<string> { userEmail }, subject, message, config);
        }


        private static string ReplaceVaribaleWithValue(Dictionary<string, string> valuePairs, string oprationalString)
        {
            IDictionaryEnumerator dictionaryEnumerator = valuePairs.GetEnumerator();

            if (!string.IsNullOrEmpty(oprationalString))
            {
                while (dictionaryEnumerator.MoveNext())
                {
                    oprationalString = oprationalString.Replace(dictionaryEnumerator.Key.ToString(), dictionaryEnumerator.Value.ToString());
                }
                //foreach (var pair in valuePairs)
                //{
                //    operationalString = operationalString.Replace(pair.Key, pair.Value);
                //}
            }

            return oprationalString;
        }
    }
}

