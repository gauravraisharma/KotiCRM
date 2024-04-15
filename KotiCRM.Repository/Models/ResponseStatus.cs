using KotiCRM.Repository.DTOs.UserManagement;
using System.ComponentModel.DataAnnotations;

namespace KotiCRM.Repository.Models
{
    public class LoginStatus
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public string? Token { get; set; }
        public string? UserType { get; set; }
        public string? UserId { get; set; }
        public string? TimeZone { get; set; }
        public List<ModulePermission>? ModulePermission { get; set; }
    }
    public class ResponseStatus
    {
        public string Status { get; set; }
        public string Message { get; set; }
    }

    public class EmployeeResponseStatus
    {
        public string? EmployeeId { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
    }

    public class DDListResponse
    {
        public string Status { get; set; }
        public IEnumerable<DropDownModel> DdList { get; set; }
    }
    public class DropDownModel
    {
        public dynamic Id { get; set; }
        public string Label { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
    }

    public class ResponseApplicationUserModel
    {

        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string UserType { get; set; }
        public string CreatedBy { get; set; }
    }

    public class UserDataResponse {
        public string Status { get; set; }
        public string Message { get; set; }
        public EmployeesDTO userDetail { get; set; }
    }

    public class EmployeesDTO
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserType { get; set; }
        public string? PhoneNumber { get; set; }
        public int? Department { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        public bool IsAdmin { get; set; }
    }
    public class ModulePermissionResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public List<ModulePermission> ModulePermissions {get; set;}
    }


    public class ModulePermission
    {
        public int ModuleId { get; set; }
        public string ModuleName { get; set; }
        public bool IsView { get; set; }
        public bool IsEdit { get; set; }
        public bool IsDelete { get; set; }
        public bool IsAdd { get; set; }
    }

    public class EmployeeResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public EmployeeDTO employeeData { get; set; }
    }

}

