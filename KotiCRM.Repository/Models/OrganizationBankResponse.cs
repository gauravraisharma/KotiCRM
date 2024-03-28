using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class OrganizationBankResponse
    {
        public OrganizationResponse OrganizationResponse { get; set; }
        public List<BankResponse> Banks { get; set; }
    }

    public class OrganizationResponse
    {
        public int Id { get; set; }

        public string? OrgName { get; set; }

        public bool? IsActive { get; set; }

        public string? TimeZone { get; set; }

        public bool? Shifts { get; set; }

        public bool? IncludeLogofToIdle { get; set; }

        public string? Currency { get; set; }
        public string? BillingStreet { get; set; }
        public string? BillingCity { get; set; }
        public string? BillingState { get; set; }
        public string? ZipCode { get; set; }
        public string? BillingCountry { get; set; }
    }
        public class BankResponse
        {
            public int BankId { get; set; }

            public string? Name { get; set; }

            public string? Branch { get; set; }

            public string? Ifsc { get; set; }

            public int? OrganizationId { get; set; }
        }
}
