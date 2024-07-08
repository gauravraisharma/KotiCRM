using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class SharedService : ISharedService
    {
        private readonly ISharedRepository _sharedRepository;
        public SharedService(ISharedRepository sharedRepository)
        {
            _sharedRepository = sharedRepository;
        }

        public async Task<IEnumerable<Industry>> GetIndustryList()
        {
            return await _sharedRepository.GetIndustryList();
        }
        public List<DropDownModel> GetAccountOwner()
        {
            return _sharedRepository.GetAccountOwner();
        }
        public List<DropDownModel> GetInvoiceOwner()
        {
            return _sharedRepository.GetInvoiceOwner();
        }

        public async Task<IEnumerable<Department>> GetDepartmentList()
        {
            return await _sharedRepository.GetDepartmentList();
        }
        public async Task<IEnumerable<Designation>> GetDesignationList()
        {
            return await _sharedRepository.GetDesignationList();
        }
        public async Task<IEnumerable<Bank>> GetBankList()
        {
            return await _sharedRepository.GetBankList();
        }
        public async Task<IEnumerable<Shift>> GetShiftList()
        {
            return await _sharedRepository.GetShiftList();
        }
        public string GetEmployeeId()
        {
            return _sharedRepository.GetEmployeeId();
        }
    }
}