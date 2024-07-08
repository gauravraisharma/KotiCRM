using KotiCRM.Repository.DTOs.Organization;
using KotiCRM.Repository.Models;
using System;

namespace KotiCRM.Services.IServices
{
    public interface IOrganizationService
    {
        Task<IEnumerable<OrganizationBankResponse>> GetOrganizationList();

        Task<OrganizationDTO> GetOrganization(int id);
        Task<OrganizationDTO> UpdateOrganizationTimeZone(int id,Organization organization);
        Task<bool> UpdateTimeZoneAsync(string userId, string timeZone);
    }
}