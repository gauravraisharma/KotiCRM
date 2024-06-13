using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class OtherInvestmentRecordDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public string? ProofDocumentLink { get; set; } // Assuming this is a string URL
        public bool IsVerified { get; set; }
        public string? Remarks { get; set; }
    }
}
