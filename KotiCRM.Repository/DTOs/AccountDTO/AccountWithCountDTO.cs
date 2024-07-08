using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.AccountDTO
{
    public class AccountWithCountDTO
    {
        public int AccountCount { get; set; }
        public IEnumerable<Account> Account { get; set; }
    }
}
