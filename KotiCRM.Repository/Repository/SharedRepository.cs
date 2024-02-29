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
    public class SharedRepository : ISharedRepository
    {
        private readonly KotiCRMDbContext _context;

        public SharedRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Industry>> GetIndustryList()
        {
            try
            {
                return await _context.Industry.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }
        }
    }
}
