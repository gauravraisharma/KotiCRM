using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DAL
{
    public interface IUserRepository
    {
        Task<DbResponse> CreateUser(ApplicationUser user);

    }
}
