using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs.Organization;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly KotiCRMDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public OrganizationRepository(KotiCRMDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        public async Task<IEnumerable<OrganizationBankResponse>> GetOrganizationList()
        {
            try
            {
                {
                    var organizations = await _context.Organizations.ToListAsync();
                    var banks = await _context.Banks.ToListAsync();
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
                            BillingCode = organization.BillingCode,
                            BillingCountry = organization.BillingCountry
                        },
                        Banks = banks.Where(bank => bank.OrganizationId == organization.Id)
                .Select(bank => new BankResponse()
                {
                    BankId = bank.BankId,
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
                throw new Exception(ex.Message, ex);

            }
        }

        public async Task<Organization> GetOrganization(int id)
        {
            try
            {
                var organization = await _context.Organizations.FindAsync(id);
                return organization!;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<OrganizationDTO> UpdateOrganizationTimeZone(int id, Organization organization)
        {
            //var userRoles = await _userManager.GetRolesAsync(ownerFound);


                var organizationDTO = new OrganizationDTO();
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
                    await _context.SaveChangesAsync();
                    organizationDTO.OrgName = organization.OrgName;
                    organizationDTO.IsActive = organization.IsActive;
                    organizationDTO.TimeZone = organization.TimeZone;
                    organizationDTO.Shifts = organization.Shifts;
                    organizationDTO.IncludeLogofToIdle = organization.IncludeLogofToIdle;
                    organizationDTO.Currency = organization.Currency;
                    organizationDTO.BillingStreet = organization.BillingStreet;
                    organizationDTO.BillingCity = organization.BillingCity;
                    organizationDTO.BillingState = organization.BillingState;
                    organizationDTO.BillingCode = organization.BillingCode;
                    organizationDTO.BillingCountry = organization.BillingCountry;


                }
                catch (DbUpdateConcurrencyException ex)
                {
                    throw new Exception("Concurrency conflict occurred. The entity has been modified or deleted by another user.", ex);
                }
                return organizationDTO;
            }


    }
}
