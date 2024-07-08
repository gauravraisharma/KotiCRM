using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class TaxDeclarationDTO
    {

        public CommonFormDTO CommonFormDTO { get; set; }
        public HouseRentRecordDTO HouseRentRecordDTO { get; set; }
        public HomeLoanRecordDTO HomeLoanRecordDTO { get; set; }
        public EightyCRecordDTO EightyCRecordDTO { get; set; }
        public EightyDRecordDTO EightyDRecordDTO { get; set; }
        public EightyGRecordDTO EightyGRecordDTO { get; set; }
        public OtherInvestmentRecordDTO OtherInvestmentRecordDTO { get; set; }
        public TravelExpenditureDeclarationDTO TravelExpenditureDeclarationDTO { get; set; }

        //public ProofDocumentLinkDTO ProofDocumentLinkDTO {get;set;}

        public int EmployeeId { get; set; }
        public string FinancialYear { get; set; }
        public decimal Amount { get; set; }
        public string PAN { get; set; }
        public string Address { get; set; }


    }


}
