using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.ForgotPasswordDTO
{
    public class ForgotPasswordDTO
    {

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter correct email format")]
        public string Email { get; set; }
    }
}

  


