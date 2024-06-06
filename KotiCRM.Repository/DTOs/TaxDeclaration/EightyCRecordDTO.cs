using System;
using System.ComponentModel.DataAnnotations;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class EightyCRecordDTO
    {
        public int Id { get; set; }
        public int DeductionTypeId { get; set; }  
        public decimal Amount { get; set; }
        public string ProofDocumentLink { get; set; }
        public bool IsVerified { get; set; }
        public string Remarks { get; set; }
    }
}
