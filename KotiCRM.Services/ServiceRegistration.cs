using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Repository;
using KotiCRM.Services.IServices;
using KotiCRM.Services.Services;
using Microsoft.Extensions.DependencyInjection;
namespace KotiCRM.Services
{
    public static class ServiceRegistration
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            services.AddTransient<IUserAccountService, UserAccountService>();
            services.AddTransient<IUserAccountRepository, UserAccountRepository>();
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IContactService, ContactService>();
            services.AddTransient<IContactRepository, ContactRepository>();
            services.AddTransient<ISharedService, SharedService>();
            services.AddTransient<ISharedRepository, SharedRepository>();
            services.AddTransient<IInvoiceService, InvoiceService>();
            services.AddTransient<IInvoiceRepository, InvoiceRepository>();
            services.AddTransient<INotesService, NotesService>();
            services.AddTransient<INotesRepository, NotesRepository>();
        }
    }
}
