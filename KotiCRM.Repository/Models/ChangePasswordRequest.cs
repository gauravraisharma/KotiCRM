using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class ChangePasswordRequest
    {
        public string userID { get; set; }
        public string? newPassword { get; set; }
        public bool isEmailSent { get; set; }


    }
}
