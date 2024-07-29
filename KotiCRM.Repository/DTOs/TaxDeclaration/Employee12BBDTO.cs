﻿using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class Employee12BBDTO
    {
        public int Id { get; set; }
        public string? EmployeeId { get; set; }
        public int FinancialYearId { get; set; }
        public int? HouseRentRecordId { get; set; }
        public int? TravelExpenditureRecordId { get; set; }
        public int? HomeLoanRecordId { get; set; }
        public int? EightyDRecordId { get; set; }
        public int? EightyGRecordId { get; set; }
        public int? OtherInvestmentRecordId { get; set; }
        public string CreatedBy { get; set; } = ""; // Initialize to an empty string

        public DateTime CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDelete { get; set; }
        public bool IsActive { get; set; }
        public bool IsFormVerified { get; set; }
        public bool IsDeclarationComplete { get; set; }

        public virtual Employee? Employee { get; set; }
        //public virtual ICollection<FinancialYear>? FinancialYears { get; set; }
        //public virtual FinancialYear FinancialYear { get; set; }
        public virtual HouseRentDeclaration? HouseRentRecord { get; set; }
        public virtual TravelExpenditureDeclaration? TravelExpenditureRecord { get; set; }
        public virtual HomeLoanDeclaration? HomeLoanRecord { get; set; }

        public virtual EightyDDeclaration? EightyDRecord { get; set; }
        public virtual EightyGDeclaration? EightyGRecord { get; set; }
        public virtual OtherInvestmentDeclaration? OtherInvestmentRecord { get; set; }
        public virtual ICollection<EightyCDeclaration>? EightyCDeclarations { get; set; }
        public virtual ICollection<EightyCDeductionType>? EightyCDeductionTypes { get; set; }
        // Add FinancialYearName property
        public string FinancialYearName { get; set; }
    }
}
