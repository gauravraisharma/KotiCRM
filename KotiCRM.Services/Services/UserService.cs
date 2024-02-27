﻿using KotiCRM.Repository.DAL;
using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<DbResponse> CreateUser(ApplicationUser user)
        {
            var response = await _userRepository.CreateUser(user);
            return response;
        }
    }
}
