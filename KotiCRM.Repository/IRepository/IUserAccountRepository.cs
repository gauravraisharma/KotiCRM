﻿using KotiCRM.Repository.DTOs.ForgotPasswordDTO;
using KotiCRM.Repository.DTOs.RoleManagement;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.IRepository
{
    public interface IUserAccountRepository
    {
        Task<LoginStatus> UserLogin(UserLoginModel userModel);
        Task<string> ForgotPassword(ForgotPasswordDTO forgotPasswordDTO);
        Task<bool> ResetPassword(string email, string token, string newPassword);
        Task<ResponseStatus> CreateApplicationUser(ApplicationUserModel userModel);
        Task<ResponseStatus> UpdateApplicationUser(UpdateApplicationUserModel userModel);
        Task<ResponseStatus> GetRoleNameAsync(string roleId);
        Task<RolesResponseStatus> GetRoles(string? searchQuery, int? pageNumber, int? pageSize);
        Task<RoleResponseStatus> GetRole(string roleId);
        Task<RoleResponse> CreateNewRole(CreateUpdateRoleDTO createUpdateRoleDTO);
        Task<RoleResponseStatus> UpdateRole(CreateUpdateRoleDTO createUpdateRoleDTO);
        Task<ResponseStatus> DeleteRole(string roleId);
        DDListResponse GetUserTypeListDD();
        IEnumerable<ResponseApplicationUserModel> GetUserList();
        ResponseStatus DeleteUser(string userId);
        Task<ModulePermissionResponse> GetModulePermissions(string userType);
        Task<ModulePermissionResponse> GetModulePermission(string userId);

        Task<ResponseStatus> CreateModulePermission(List<CreateModulePermissionDTO> createModulePermissions);
        Task<ResponseStatus> UpdateModulePermission(List<UpdateModulePermissionDTO> updateModulePermissions);

        UserDataResponse GetUserDataById(string userId);

        // For Employee
        Task<EmployeeWithCountDTO> GetEmployees(string? searchQuery, int? pageNumber, int? pageSize);

        EmployeeResponse GetEmployeeById(string employeeId);
        Task<EmployeeResponseStatus> CreateEmployee(CreateEmployeeDTO createEmployeeDTO);
        Task<EmployeeResponseStatus> UpdateEmployee(CreateEmployeeDTO createEmployeeDTO);
        ResponseStatus DeleteEmployee(string employeeId);

        //For Employee Password
        Task<ChangePasswordDbResponse> ChangePassword(ChangePasswordRequest passwordData);
        Task<IEnumerable<GetModulesDTO>> GetAllModulesAsync();
        


    }
}
