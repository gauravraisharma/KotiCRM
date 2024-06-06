using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class EightyDDeclaration
    {
        public int Id { get; set; }
        public int? InsuranceAmount { get; set; }
        public string? InsuranceProofLink { get; set; }
        public int? MedicalExpenseAmount { get; set; }
        public string? MedicalExpenseProof { get; set; }
        public bool IsVerified { get; set; }
        public string Remarks { get; set; }
    }
}
