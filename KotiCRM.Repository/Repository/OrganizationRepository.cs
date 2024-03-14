using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs.Organization;
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

        public async Task<IEnumerable<Organization>> GetOrganizationList()
        {
            try
            {
                var organizations = await _context.Organizations.ToListAsync();
                return organizations;
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
