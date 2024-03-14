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

        public async Task<DbResponse> UpdateOrganization(OrganizationDTO organizationDTO)
        {
            if (organizationDTO == null)
            {
                throw new ArgumentNullException(nameof(organizationDTO));
            }
            var organization = await _organizationRepository.GetOrganization(organizationDTO.Id);

            if (organization == null)
            {
                // If organization is not found, return failure response
                return new DbResponse(false, "Organization not found.");
            }

            // Update organization entity properties with values from DTO
            organization.OrgName = organizationDTO.OrgName;
            organization.IsActive = organizationDTO.IsActive;
            organization.TimeZone = organizationDTO.TimeZone;
            organization.Shifts = organizationDTO.Shifts;
            organization.IncludeLogofToIdle = organizationDTO.IncludeLogofToIdle;
            organization.Currency = organizationDTO.Currency;
            organization.BillingStreet = organizationDTO.BillingStreet;
            organization.BillingCity = organizationDTO.BillingCity;
            organization.BillingState = organizationDTO.BillingState;
            organization.BillingCode = organizationDTO.BillingCode;
            organization.BillingCountry = organizationDTO.BillingCountry;

            var dbResponse = await _organizationRepository.UpdateOrganization(organization);
            return dbResponse;
        }
    }
}
