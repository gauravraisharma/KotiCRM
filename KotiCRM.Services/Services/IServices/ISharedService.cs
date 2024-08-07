﻿using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface ISharedService
    {
        Task<IEnumerable<Industry>> GetIndustryList();
        List<DropDownModel> GetAccountOwner();
        List<DropDownModel> GetInvoiceOwner();

        Task<IEnumerable<Department>> GetDepartmentList();
        Task<IEnumerable<Designation>> GetDesignationList();
        Task<IEnumerable<Bank>> GetBankList();
        Task<IEnumerable<Shift>> GetShiftList();
        string GetEmployeeId();

    }
}
