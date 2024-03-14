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
            // Add dependency for repositories
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IAttachmentRepository, AttachmentRepository>();
            services.AddTransient<IContactRepository, ContactRepository>();
            services.AddTransient<IInvoiceRepository, InvoiceRepository>();
            services.AddTransient<INotesRepository, NotesRepository>();
            services.AddTransient<IOrganizationRepository, OrganizationRepository>();
            services.AddTransient<ISharedRepository, SharedRepository>();
            services.AddTransient<IUserAccountRepository, UserAccountRepository>();

            // Add dependency for services
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IAttachmentService, AttachmentService>();
            services.AddTransient<IContactService, ContactService>();
            services.AddTransient<IInvoiceService, InvoiceService>();
            services.AddTransient<INotesService, NotesService>();
            services.AddTransient<IOrganizationService, OrganizationService>();
            services.AddTransient<ISharedService, SharedService>();
            services.AddTransient<IUserAccountService, UserAccountService>();

        }
    }
}