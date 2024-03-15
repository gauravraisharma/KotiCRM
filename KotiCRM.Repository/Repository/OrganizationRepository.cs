using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
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

        public OrganizationRepository(KotiCRMDbContext context)
        {
            _context = context;
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

        public async Task<DbResponse> UpdateOrganization(Organization organization)
        {
            try
            {
                _context.Update(organization);
                await _context.SaveChangesAsync();
                return new DbResponse()
                {
                    Succeed = true,
                    Message = "Organization update successfully"
                };
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return new DbResponse()
                {
                    Succeed = true,
                    Message = ex.Message
                };
            }
        }
    }
}
