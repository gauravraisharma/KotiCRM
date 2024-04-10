using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class UserAccountRepository : IUserAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;
        private readonly KotiCRMDbContext _context;
        public UserAccountRepository(
            UserManager<ApplicationUser> userManager,
            KotiCRMDbContext context,
            RoleManager<ApplicationRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration config)
        {

            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _config = config;
            _context = context;
        }
        public async Task<ResponseStatus> CreateApplicationUser(ApplicationUserModel userModel)
        {
            try
            {
                //Check for unique Username
                var userFound = await _userManager.FindByNameAsync(userModel.UserName);
                if (userFound != null && !userFound.IsDeleted)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Username already exist, Please choose another username"
                    };
                }

                //Check for unique email 
                var userFoundByEmail = await _userManager.FindByEmailAsync(userModel.Email);
                if (userFoundByEmail != null && !userFoundByEmail.IsDeleted)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Email already in use"
                    };
                }


                var roleResponse = await GetRoleNameAsync(userModel.UserType);
                if (roleResponse.Status == "FAILED")
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Invalid UserType"
                    };
                }

                ApplicationUser user = new ApplicationUser
                {
                    UserName = userModel.UserName,
                    Email = userModel.Email,
                    PhoneNumber = userModel.PhoneNumber,
                    FirstName = userModel.FirstName,
                    LastName = userModel.LastName,
                    CreatedBy = userModel.CreatedBy,
                    CreatedOn = DateTime.UtcNow
                };

                IdentityResult identityResult = await _userManager.CreateAsync(user, userModel.Password);



                if (!identityResult.Succeeded)
                {
                    var errors = string.Join(" and ", identityResult.Errors.Select(e => e.Description).ToArray());
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = errors
                    };
                }

                if (!await _roleManager.RoleExistsAsync(roleResponse.Message))
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "User create but not role assign to him"
                    };
                }
                else
                {
                    await _userManager.AddToRoleAsync(user, roleResponse.Message);
                }
                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "User successfully created"
                };
            }
            catch (Exception ex)
            {
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Something went wrong "
                };
            }
      
        }

        public async Task<ResponseStatus> UpdateApplicationUser(UpdateApplicationUserModel userModel)
        {
            try
            {
                var userFound = await _userManager.FindByNameAsync(userModel.UserName);
                if (userFound == null && userFound.IsDeleted)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Username not found"
                    };
                }

                //If Email is changed 
                if (userFound.Email != userModel.Email)
                {
                    var userFoundByEmail = await _userManager.FindByEmailAsync(userModel.Email);
                    if (userFoundByEmail != null && !userFoundByEmail.IsDeleted)
                    {
                        return new ResponseStatus
                        {
                            Status = "FAILED",
                            Message = "Email already in use"
                        };
                    }
                }

                //Update the user role 
                var currentRoles = await _userManager.GetRolesAsync(userFound);
                var roleFound = await _roleManager.FindByIdAsync(userModel.UserType);
                if (roleFound != null)
                {
                    var IsRoleAlreadyPresent = false;
                    foreach (var userRole in currentRoles)
                    {
                        if (roleFound.Name != userRole)
                        {
                            await _userManager.RemoveFromRoleAsync(userFound, userRole);
                        }
                        if (roleFound.Name == userRole)
                        {
                            IsRoleAlreadyPresent = true;
                        }
                    }
                    if (!IsRoleAlreadyPresent) await _userManager.AddToRoleAsync(userFound, roleFound.Name);
                }

                //Update User data 

                userFound.Email = userModel.Email;
                userFound.PhoneNumber = userModel.PhoneNumber;
                userFound.FirstName = userModel.FirstName;
                userFound.LastName = userModel.LastName;
                userFound.ModifiedBy = userModel.ModifiedBy;
                userFound.ModifiedOn = DateTime.UtcNow;


                IdentityResult identityResult = await _userManager.UpdateAsync(userFound);

                if (!identityResult.Succeeded)
                {
                    var errors = string.Join(" and ", identityResult.Errors.Select(e => e.Description).ToArray());
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = errors
                    };
                }
                if (!string.IsNullOrEmpty(userModel.Password))
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(userFound);
                    var resetPasswordResult = await _userManager.ResetPasswordAsync(userFound, token, userModel.Password);
                    var errors = string.Join(" and ", resetPasswordResult.Errors.Select(e => e.Description).ToArray());
                    if (!resetPasswordResult.Succeeded)
                        return new ResponseStatus
                        {
                            Status = "FAILED",
                            Message = errors
                        };
                }



                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "User successfully updated"
                };
            }
            catch (Exception ex)
            {
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Something went Wrong"
                };
            }
            finally
            {
                _context.Dispose();
            }
        }

        private async Task<string> GenerateToken(ApplicationUser user, bool rememberMe)
        {
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);




                //Find UserRole 
                var userRoles = await _userManager.GetRolesAsync(user);
                var permissions = (from permission in _context.Permissions
                                   join role in _context.Roles on permission.RoleID equals role.Id
                                   join Modules in _context.Modules on permission.ModuleID equals Modules.Id
                                   where userRoles.Contains(role.Name)
                                   select new
                                   {
                                       ModuleName = Modules.Name,
                                       ADD = permission.Add,
                                       EDIT = permission.Edit,
                                       DELETE = permission.Delete,
                                       VIEW = permission.View
                                   }).ToList();
                var claims = new List<Claim>
                                {
                                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                                    new Claim(ClaimTypes.Name, user.UserName)
                                };


                // Add permissions to claims
                foreach (var permission in permissions)
                {
                    claims.Add(new Claim($"Permission.{permission.ModuleName}", $"Add:{permission.ADD}, Edit:{permission.EDIT}, View:{permission.VIEW}, Delete:{permission.DELETE}"));
                }

                var token = new JwtSecurityToken(claims: claims, expires: (rememberMe) ? DateTime.Now.AddDays(30) : DateTime.Now.AddHours(12), signingCredentials: credentials);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<LoginStatus> UserLogin(UserLoginModel userModel)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(userModel.Username);
                if (user == null)
                {
                    return new LoginStatus
                    {
                        Status = "FAILED",
                        Message = "User doesn't exist"
                    };
                }
                if (!await _userManager.CheckPasswordAsync(user, userModel.Password))
                {
                    return new LoginStatus
                    {
                        Status = "FAILED",
                        Message = "Invalid Password"
                    };
                }

                var signInResult = await _signInManager.PasswordSignInAsync(user, userModel.Password, false, true);
                if (signInResult.Succeeded)
                {
                    var userRoles = await _userManager.GetRolesAsync(user);



                    var token = await GenerateToken(user, userModel.RememberMe);

                    var role = await _roleManager.FindByNameAsync(userRoles[0]);
                    var roleid = role.Id;
                    var ModulePermissionList = (from Permissions in _context.Permissions
                                                join Module in _context.Modules on Permissions.ModuleID equals Module.Id
                                                where Permissions.RoleID == roleid
                                                select new ModulePermission
                                                {
                                                    ModuleId = Module.Id,
                                                    ModuleName = Module.Name,
                                                    IsAdd = Permissions.Add,
                                                    IsEdit = Permissions.Edit,
                                                    IsView = Permissions.View,
                                                    IsDelete = Permissions.Delete,
                                                }
                              ).ToList();


                    var timeZone = (from organization in _context.Organizations
                                     join users in _context.Users on organization.Id equals users.OrganizationId
                                    where users.Id==user.Id
                                     select organization.TimeZone).FirstOrDefault();

                    if (timeZone == null)
                    {
                        return new LoginStatus
                        {
                            Status = "FAILED",
                            Message = "Timezone not found for the logged-in user's organization."
                        };
                    }


                    return new LoginStatus
                    {
                        Status = "SUCCEED",
                        Message = "Login Successfully",
                        Token = token,
                        UserType = userRoles[0],
                        TimeZone= timeZone,
                        UserId = user.Id,

                        ModulePermission=ModulePermissionList
                    };

                }
                else if (signInResult.IsLockedOut)
                {
                    return new LoginStatus
                    {
                        Status = "FAILED",
                        Message = "User Locked out."
                    };
                }
                else
                {
                    return new LoginStatus
                    {
                        Status = "FAILED",
                        Message = "Please login with correct username and password."
                    };
                }
            }
            catch (Exception ex)
            {
                return new LoginStatus
                {
                    Status = "FAILED",
                    Message = ex.Message + " Something went wrong."
                };
            }
            finally
            {
                _context.Dispose();
            }
        }
        public async Task<ResponseStatus> CreateNewRole(string roleName)
        {
            try
            {
                if (string.IsNullOrEmpty(roleName))
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Role name is required"
                    };
                }

                ApplicationRole role = new ApplicationRole
                {
                    Name = roleName,
                    CreatedOn = DateTime.UtcNow,
                    Isactive = true,
                    IsDefault = true,
                    Isdelete = false,
                    ModifiedBy = "1",
                    ModifiedOn = DateTime.UtcNow,
                    CreatedBy = "1"

                };
                var result = await _roleManager.CreateAsync(role);
                if (result.Succeeded)
                {
                    return new ResponseStatus()
                    {
                        Status = "SUCCEED",
                        Message = "Role created successfully"
                    };
                }
                else
                {
                    var errors = string.Join(" and ", result.Errors.Select(item => item.Description).ToArray());
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = errors
                    };
                }
            }
            catch (Exception ex)
            {
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Something went wrong."
                };
            }
            finally
            {
                _context.Dispose();
            }
        }

        public DDListResponse GetUserTypeListDD()
        {
            try
            {
                if (_context == null)
                {
                    return new DDListResponse
                    {
                        Status = "FAILED",
                        DdList = null
                    };
                }
                var result = (from role in _context.Roles
                              select new DropDownModel
                              {
                                  Id = role.Id,
                                  Label = role.Name
                              }
                              ).ToList();
                return new DDListResponse()
                {
                    Status = "SUCCEED",
                    DdList = result
                };

            }
            catch (Exception ex)
            {
                return new DDListResponse
                {
                    Status = "FAILED",
                    DdList = null
                };
            }
            finally
            {
                _context.Dispose();
            }

        }
        //public ResponseStatus GetRoleName(string roleId)
        //{
        //    try
        //    {
        //        if (_context == null)
        //        {
        //            return new ResponseStatus
        //            {
        //                Status = "FAILED",
        //                Message = "Db Context is null"
        //            };
        //        }
        //        var result = from role in _context.Roles
        //                      where role.Id == roleId
        //                      select new
        //                      {Name = role.Name};
        //        return new ResponseStatus
        //        {
        //            Status = "SUCCEED",
        //            Message = result.FirstOrDefault().Name
        //        };

        //    }
        //    catch (Exception ex)
        //    {
        //        return new ResponseStatus
        //        {
        //            Status = "FAILED",
        //            Message = "Something went wrong"
        //        };
        //    }
        //}

        public async Task<ResponseStatus> GetRoleNameAsync(string roleName)
        {
            try
            {
                if (_context == null)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Db Context is null"
                    };
                }

                var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);

                if (role == null)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Role not found"
                    };
                }

                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = role.Name!
                };
            }
            catch (DbException ex)
            {
                // Handle specific database exceptions
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Database error: " + ex.Message
                };
            }
            catch (Exception ex)
            {
                // Catch any other unexpected exceptions
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "An unexpected error occurred: " + ex.Message
                };
            }
        }

        public IEnumerable<ResponseApplicationUserModel> GetUserList()
        {

            if (_context == null)
            {
                return null;
            }
            try
            {
                var result = (from user in _context.Users
                              join userrole in _context.UserRoles on user.Id equals userrole.UserId
                              join role in _context.Roles on userrole.RoleId equals role.Id
                              join creator in _context.Users on user.CreatedBy equals creator.Id
                              select new ResponseApplicationUserModel
                              {
                                  Id = user.Id,
                                  FirstName = user.FirstName,
                                  LastName = user.LastName,
                                  UserName = user.UserName,
                                  UserType = role.Name,
                                  CreatedBy = string.Concat(creator.FirstName, ' ', creator.LastName),
                                  Email = user.Email,
                                  PhoneNumber = user.PhoneNumber
                              }
                              ).ToList();
                return result;

            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                _context.Dispose();
            }

        }
        public ResponseStatus DeleteUser(string userId)
        {
            try
            {
                if (_context == null)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Db Context is null"
                    };
                }
                 (from user in _context.Users
                  where user.Id == userId
                  select user
                              ).ToList().ForEach(user => user.IsDeleted = true);

                _context.SaveChanges();
                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "User record deleted successfully"
                };

            }
            catch (Exception ex)
            {
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Something went wrong"
                };
            }


        }
        
        public async Task<ModulePermissionResponse> GetModulePermission(string userId)
        {
            try
            {
                if (_context == null)
                {
                    return new ModulePermissionResponse
                    {
                        Status = "FAILED",
                        Message = "Db Context is null"
                    };
                }

                var userFound = await  _userManager.FindByIdAsync(userId);
                if (userFound == null || userFound.IsDeleted)
                {
                    return new ModulePermissionResponse
                    {
                        Status = "FAILED",
                        Message = "User Not found"
                    };
                }

                var roleassigned = await _userManager.GetRolesAsync(userFound);

                if (roleassigned.Count == 0)
                {
                    return new ModulePermissionResponse
                    {
                        Status = "FAILED",
                        Message = "User role assigned to user"
                    };

                }

                var role = await _roleManager.FindByNameAsync(roleassigned[0]);
                var roleid = role.Id;

                var ModulePermissionList = (from Permissions in _context.Permissions
                                  join Module in _context.Modules on Permissions.ModuleID equals Module.Id
                                  where Permissions.RoleID == roleid
                                  select new ModulePermission
                                  {
                                      ModuleId = Module.Id,
                                      ModuleName = Module.Name,
                                      IsAdd = Permissions.Add,
                                      IsEdit = Permissions.Edit,
                                      IsView = Permissions.View,
                                      IsDelete = Permissions.Delete,
                                  }
                              ).ToList();
                return new ModulePermissionResponse
                {
                    Status = "SUCCEED",
                    Message = "User Module with permission get successfully ",
                    ModulePermissions=ModulePermissionList
                };

            }
            catch (Exception ex)
            {
                return new ModulePermissionResponse
                {
                    Status = "FAILED",
                    Message = "Something went wrong"
                };
            }


        }
        public UserDataResponse GetUserDataById(string userId)
        {
            try
            {
                if (_context == null)
                {
                    return new UserDataResponse
                    {
                        Status = "FAILED",
                        Message = "Db Context is null"
                    };
                }
                var userData = (from user in _context.Users
                                join userRole in _context.UserRoles on user.Id equals userRole.UserId
                                join role in _context.Roles on userRole.RoleId equals role.Id
                                where user.Id == userId
                                select new UserDetailModel
                                {
                                    Username = user.UserName,
                                    FirstName = user.FirstName,
                                    LastName = user.LastName,
                                    Email = user.Email,
                                    PhoneNumber = user.PhoneNumber,
                                    UserType = userRole.RoleId,
                                    Password = user.PasswordHash,
                                    IsAdmin = (role.Name.ToUpper() == "ADMIN") ? true : false
                                }

                              ).FirstOrDefault();

                return new UserDataResponse
                {
                    Status = "SUCCEED",
                    Message = "User record found",
                    userDetail = userData
                };

            }
            catch (Exception ex)
            {
                return new UserDataResponse
                {
                    Status = "FAILED",
                    Message = "Something went wrong"
                };
            }


        }

        //for createEmployee
        public async Task<ResponseStatus> CreateEmployee(CreateEmployeeDTO createEmployeeDTO)
        {
            using var transaction = _context.Database.BeginTransaction(); // Begin transaction
            try
            {
                //Check if createEmployeeDTO is null
                if (createEmployeeDTO == null)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Invalid payload"
                    };
                }
                var userId = "";

                // For extract FirstName and LastName from Name
                string[] nameParts = createEmployeeDTO.Name.Split(' ');
                var firstName = "";
                var lastName = "";
                var username = "";
                if (nameParts.Length >= 2)
                {
                    firstName = nameParts.FirstOrDefault();
                    lastName = nameParts.LastOrDefault();
                }
                username = (nameParts.Length >= 2 ? firstName : createEmployeeDTO.Name);


                ApplicationUserModel user = new ApplicationUserModel
                {
                    FirstName = (nameParts.Length >= 2 ? firstName : createEmployeeDTO.Name),
                    LastName = lastName,
                    UserName = username,
                    Email = createEmployeeDTO.PersonalEmailId,
                    PhoneNumber = createEmployeeDTO.ContactNumber1,
                    UserType = "Employee",
                    Password = createEmployeeDTO.OfficialEmailPassword,
                    CreatedBy = ""
                };

                var result = await CreateApplicationUser(user);

                if (result.Status == "FAILED")
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = result.Message
                    };
                }
                var createdUser = await _userManager.FindByNameAsync(username);
                userId = createdUser.Id;


                Employee employee = new()
                {
                    EmployeeId = createEmployeeDTO.EmployeeId,
                    UserId = userId,
                    FatherName = createEmployeeDTO.FatherName,
                    EmpCode = createEmployeeDTO.EmployeeCode,
                    DesignationId = createEmployeeDTO.DesignationId,
                    DepartmentId = createEmployeeDTO.DepartmentId,
                    JoiningDate = createEmployeeDTO.JoiningDate,
                    RelievingDate = createEmployeeDTO.RelievingDate,
                    BankId = createEmployeeDTO.BankId,
                    DateOfBirth = createEmployeeDTO.DateOfBirth,
                    CorrespondenceAddress = createEmployeeDTO.CorrespondenceAddress,
                    PermanentAddress = createEmployeeDTO.PermanentAddress,
                    PersonalEmailId = createEmployeeDTO.PersonalEmailId,
                    PanNumber = createEmployeeDTO.PanNumber,
                    OfficialEmailId = createEmployeeDTO.OfficialEmailId,
                    SkypeId = createEmployeeDTO.SkypeId,
                    Status = createEmployeeDTO.StatusId,
                    CompanyId = createEmployeeDTO.CompanyId,
                    AdharCardNumber = createEmployeeDTO.AdharCardNumber,
                    BloodGroup = createEmployeeDTO.BloodGroup,
                    ShiftId = createEmployeeDTO.ShiftId,
                };

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                // Commit transaction if everything succeeds
                await transaction.CommitAsync();

                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "Employee successfully created"
                };
            }
            catch (Exception ex)
            {
                // Rollback transaction if an exception occurs
                await transaction.RollbackAsync();

                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Something went wrong "
                };
            }
            finally
            {
                _context.Dispose();
            }
        }

        //userList
        public async Task<IEnumerable<UserDetailModel>> GetUsers()
        {
            try
            {
                var users = from user in _context.Users
                            join userRole in _context.UserRoles on user.Id equals userRole.UserId
                            join role in _context.Roles on userRole.RoleId equals role.Id

                            select new UserDetailModel
                            {
                                Username = user.UserName,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Email = user.Email,
                                PhoneNumber = user.PhoneNumber,
                                UserType = userRole.RoleId,
                                Password = user.PasswordHash,
                                IsAdmin = (role.Name.ToUpper() == "ADMIN") ? true : false
                            };
                        return users;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}

