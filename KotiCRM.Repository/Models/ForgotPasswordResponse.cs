using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class ForgotPasswordResponse
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public string Email { get; set; }
        public string UserFullName { get; set; }
    }

}
