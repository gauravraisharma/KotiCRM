using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs.Organization;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace KotiCRM.Repository.Repository
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly KotiCRMDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        // Constructor to initialize the context and userManager
        public OrganizationRepository(KotiCRMDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Method to get a list of organizations along with their associated banks
        public async Task<IEnumerable<OrganizationBankResponse>> GetOrganizationList()
        {
            try
            {
                {
                    // Retrieve all organizations and banks from the database
                    var organizations = await _context.Organizations.ToListAsync();
                    var banks = await _context.Banks.ToListAsync();
                    // Map organizations to DTOs and associate banks with each organization
                    var organizationDto = organizations.Select(organization => new OrganizationBankResponse
                    {
                        OrganizationResponse = new OrganizationResponse()
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
                            ZipCode = organization.ZipCode,
                            BillingCountry = organization.BillingCountry
                        },
                        Banks = banks.Where(bank => bank.OrganizationId == organization.Id)
                .Select(bank => new BankResponse()
                {
                    BankId = (int)bank.BankId,
                    Name = bank.Name,
                    Branch = bank.Branch,
                    Ifsc = bank.Ifsc,
                    OrganizationId = bank.OrganizationId
                })
                .ToList()
                    });

                    return organizationDto;

                }
            }
            catch (Exception ex)
            {
                // Throw an exception if something goes wrong
                throw new Exception(ex.Message, ex);

            }
        }
        // Method to get a single organization by its ID
        public async Task<Organization> GetOrganization(int id)
        {
            try
            {
                // Find the organization in the database by its ID
                var organization = await _context.Organizations.FindAsync(id);
                return organization!;
            }
            catch (Exception ex)
            {
                // Throw an exception if something goes wrong
                throw new Exception(ex.Message, ex);
            }
        }

        // Method to update the time zone of an organization
        public async Task<OrganizationDTO> UpdateOrganizationTimeZone(int id, Organization organization)
        {
            //var userRoles = await _userManager.GetRolesAsync(ownerFound);


                var organizationDTO = new OrganizationDTO();
            // Check if the organization ID matches the provided ID
            if (id == organization.Id)
                {
                //var usersWithOrg = (
                //from org in _context.Organizations
                //join userDetail in _context.Users on org.Id equals userDetail.OrganizationId
                //select new { Organization = org, User = userDetail }
                //).ToList();
                //var ownerFound = await _userManager.FindByIdAsync(ToString());
                //var userRoles = await _userManager.GetRolesAsync(usersWithOrg);



                //if (!userHasAdmin)
                //{
                //    var userHasPermission = (
                //    from permission in _context.Permissions
                //    join role in _context.Roles on permission.RoleID equals role.Id
                //    join modules in _context.Modules on permission.ModuleID equals modules.Id
                //    where userRoles.Contains(role.Name)
                //    select permission
                //    ).Any(); // Check if any permission matches the user's roles
                //    if (!userHasPermission)
                //    {
                //        return new OrganizationDTO()
                //        {
                //            Succeed = false,
                //            Message = "User does not have the required permission."
                //        };
                //    }

                //}


                _context.Entry(organization).State = EntityState.Modified;
                }
                try
                {
                // Save the changes to the database
                await _context.SaveChangesAsync();

                // Map the updated organization to the DTO
                organizationDTO.OrgName = organization.OrgName;
                    organizationDTO.IsActive = organization.IsActive;
                    organizationDTO.TimeZone = organization.TimeZone;
                    organizationDTO.Shifts = organization.Shifts;
                    organizationDTO.IncludeLogofToIdle = organization.IncludeLogofToIdle;
                    organizationDTO.Currency = organization.Currency;
                    organizationDTO.BillingStreet = organization.BillingStreet;
                    organizationDTO.BillingCity = organization.BillingCity;
                    organizationDTO.BillingState = organization.BillingState;
                    organizationDTO.ZipCode = organization.ZipCode;
                    organizationDTO.BillingCountry = organization.BillingCountry;


                }
                catch (DbUpdateConcurrencyException ex)
                {
                // Throw an exception if a concurrency conflict occurs
                throw new Exception("Concurrency conflict occurred. The entity has been modified or deleted by another user.", ex);
                }
                return organizationDTO;
            }


    }
}
