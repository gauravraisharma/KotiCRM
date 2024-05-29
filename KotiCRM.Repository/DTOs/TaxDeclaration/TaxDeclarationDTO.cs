using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class TaxDeclarationDTO
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string FinancialYear { get; set; }
        public decimal Amount { get; set; }
        public string PAN { get; set; }
        public string Address { get; set; }
        public Record HouseRentRecord { get; set; }
        public bool IsNoHouseRentDeclaration { get; set; }

        public Record TravelExpenditureRecord { get; set; }
        public bool IsNoTravelDeclaration { get; set; }

        public HomeLoanRecord HomeLoanRecord { get; set; }
        public bool IsNoHomeDeclaration { get; set; }

        public List<DeductionRecord> EightyCRecords { get; set; }
        public EightyDRecord EightyDRecord { get; set; }
        public DonationRecord EightyGRecord { get; set; }
        public OtherInvestmentRecord OtherInvestmentRecord { get; set; }
    }

    public class Record
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string ProofDocumentLink { get; set; }
        public bool IsVerified { get; set; }
        public string Remarks { get; set; }
    }

    public class HomeLoanRecord : Record
    {
        public string LenderName { get; set; }
        public string LenderAddress { get; set; }
        public string LenderPanNumber { get; set; }
    }

    public class DeductionRecord : Record
    {
        public int DeductionTypeId { get; set; }
    }

    public class EightyDRecord : Record
    {
        public decimal InsuranceAmount { get; set; }
        public string InsuranceProofLink { get; set; }
        public decimal MedicalExpenseAmount { get; set; }
        public string MedicalExpenseProof { get; set; }
    }

    public class DonationRecord : Record
    {
        public string NameOfDonee { get; set; }
        public string PanNumber { get; set; }
        public string Address { get; set; }
        public decimal Amount { get; set; }
    }

    public class OtherInvestmentRecord : Record
    {
        public string Description { get; set; }
    }

}
