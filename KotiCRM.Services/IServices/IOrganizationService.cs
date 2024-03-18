﻿using KotiCRM.Repository.DTOs.Organization;
using KotiCRM.Repository.Models;

namespace KotiCRM.Services.IServices
{
    public interface IOrganizationService
    {
        Task<IEnumerable<OrganizationBankResponse>> GetOrganizationList();

        Task<OrganizationDTO> GetOrganization(int id);
        Task<OrganizationDTO> UpdateOrganizationTimeZone(int id,Organization organization);
    }
}