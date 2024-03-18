﻿using KotiCRM.Repository.DTOs.Organization;
using KotiCRM.Repository.Models;

namespace KotiCRM.Repository.IRepository
{
    public interface IOrganizationRepository
    {
        Task<IEnumerable<OrganizationBankResponse>> GetOrganizationList();
        Task<Organization> GetOrganization(int id);
        Task<OrganizationDTO> UpdateOrganizationTimeZone(int id, Organization organization);

    }
}