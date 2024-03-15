using KotiCRM.Repository.DTOs.Organization;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Repository.Repository;
using KotiCRM.Services.IServices;

namespace KotiCRM.Services.Services
{
    class OrganizationService : IOrganizationService
    {
        private readonly IOrganizationRepository _organizationRepository;

        public OrganizationService(IOrganizationRepository organizationRepository)
        {
            _organizationRepository = organizationRepository;
        }

         public async Task<IEnumerable<OrganizationBankResponse>> GetOrganizationList()
        {
            return await _organizationRepository.GetOrganizationList();
        }

        public async Task<OrganizationDTO> GetOrganization(int id)
        {
            var organization = await _organizationRepository.GetOrganization(id);
            OrganizationDTO organizationDTO = new OrganizationDTO()
            {
                Id = organization.Id,
                OrgName = organization.OrgName,
                IsActive = organization.IsActive,
                TimeZone = organization.TimeZone,
                Shifts = organization.Shifts,
                IncludeLogofToIdle = organization.IncludeLogofToIdle,
                Currency = organization.Currency,
                BillingStreet = organization.BillingStreet,
                BillingCity = organization.BillingCity,
                BillingState = organization.BillingState,
                BillingCode = organization.BillingCode,
                BillingCountry = organization.BillingCountry
            };

            return organizationDTO;
        }

        public async Task<OrganizationDTO> UpdateOrganization(int id, Organization organization)
        {
            if (organization == null)
            {
                throw new ArgumentNullException(nameof(organization));
            }
            var organizationData = await _organizationRepository.UpdateOrganization(id, organization);
            return organizationData;
  
        }
    }
}
