using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class EightyGRecordDTO
    {    
        public int Id { get; set; }
        public string NameOfDonee { get; set; }
        public string PanNumber { get; set; } 
        public string Address { get; set; }  
        public decimal Amount { get; set; }    
        public string ProofDocumentLink { get; set; } 
        public bool IsVerified { get; set; }
        public string Remarks { get; set; }
    }
}
