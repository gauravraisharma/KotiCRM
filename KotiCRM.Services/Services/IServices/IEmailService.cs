using KotiCRM.Repository.Models;
using Task = System.Threading.Tasks.Task;

namespace KotiCRM.Services.IServices
{
    public interface IEmailService
    {
        Task SendMailAsync(EmailMessage emailMessage);
    }
}
