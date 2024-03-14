using KotiCRM.Repository.DTOs.Organization;
using KotiCRM.Repository.Models;

namespace KotiCRM.Repository.IRepository
{
    public interface IOrganizationRepository
    {
        Task<IEnumerable<Organization>> GetOrganizationList();
        Task<Organization> GetOrganization(int id);
        Task<DbResponse> UpdateOrganization(Organization organization);

    }
}