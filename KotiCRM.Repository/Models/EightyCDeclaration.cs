using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class EightyCDeclaration
    {
        public int Id { get; set; }
        public int? DeductionTypeId { get; set; }
        public int? Amount { get; set; }
        public string? ProofDocumentLink { get; set; }
        public bool IsVerified { get; set; }
        public string? Remarks { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public bool IsDelete { get; set; }

        // Foreign key Employee12BB
        public int Employee12BBId { get; set; }
        public virtual Employee12BB Employee12BB { get; set; }
        //public virtual ICollection<EightyCDeductionType> EightyCDeductionTypes { get; set; }
    }
}
