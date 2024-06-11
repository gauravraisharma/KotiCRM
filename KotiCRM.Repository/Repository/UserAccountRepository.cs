using Azure;
using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs.Contact;
using KotiCRM.Repository.DTOs.RoleManagement;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Enums;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection.Emit;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Policy;
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
        private readonly IProfilePictureRepository _profilePictureRepository;

        public UserAccountRepository(
            UserManager<ApplicationUser> userManager,
            KotiCRMDbContext context,
            RoleManager<ApplicationRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration config, 
            IProfilePictureRepository profilePictureRepository)
        {

            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _config = config;
            _context = context;
            _profilePictureRepository = profilePictureRepository;
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


                var roleResponse = await GetRoleNameAsync(userModel.RoleId);
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
                    OrganizationId = (int)userModel.OrganizationId,
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
                var roleFound = await _roleManager.FindByIdAsync(userModel.RoleId);
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
                //if (!string.IsNullOrEmpty(userModel.Password))
                //{
                //    var token = await _userManager.GeneratePasswordResetTokenAsync(userFound);
                //    var resetPasswordResult = await _userManager.ResetPasswordAsync(userFound, token, userModel.Password);
                //    var errors = string.Join(" and ", resetPasswordResult.Errors.Select(e => e.Description).ToArray());
                //    if (!resetPasswordResult.Succeeded)
                //        return new ResponseStatus
                //        {
                //            Status = "FAILED",
                //            Message = errors
                //        };
                //}



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
                var user = await _userManager.FindByEmailAsync(userModel.Username);
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
                                    where users.Id == user.Id
                                    select organization.TimeZone).FirstOrDefault();

                    if (timeZone == null)
                    {
                        return new LoginStatus
                        {
                            Status = "FAILED",
                            Message = "Timezone not found for the logged-in user's organization."
                        };
                    }

                    var employee = _context.Employees.FirstOrDefault(x => x.UserId == user.Id);
                    if (employee == null)
                    {
                        return new LoginStatus
                        {
                            Status = "FAILED",
                            Message = "User not found."
                        };
                    }

                    if (employee.ProfilePictureURL != null)
                    {
                        string profilePicturePath = _profilePictureRepository.GetImagePathByEmployeeId(employee.ProfilePictureURL);
                        employee.ProfilePictureURL = profilePicturePath;
                    }

                    return new LoginStatus
                    {
                        Status = "SUCCEED",
                        Message = "Login Successfully",
                        Token = token,
                        UserType = userRoles[0],
                        TimeZone = timeZone,
                        UserId = user.Id,
                        OrganizationId = user.OrganizationId,
                        ModulePermission = ModulePermissionList,
                        Employee = (Employee)employee
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

        public async Task<RolesResponseStatus> GetRoles(string? searchQuery, int? pageNumber, int? pageSize) 
        {
            IQueryable<ApplicationRole> rolesQuery = _context.Roles.Where(x => !x.Isdelete);

            // Exclude roles with the name "Administrator"
            rolesQuery = rolesQuery.Where(x => x.Name != "Administrator");

            // Apply search filter if searchQuery is provided
            if (!string.IsNullOrEmpty(searchQuery))
            {
                rolesQuery = rolesQuery.Where(x => x.Name.Contains(searchQuery));
            }

            // Paginate the results if pageNumber and pageSize are provided
            if (pageNumber.HasValue && pageSize.HasValue)
            {
                rolesQuery = rolesQuery.Skip((pageNumber.Value - 1) * pageSize.Value).Take(pageSize.Value);
            }

            var roles = await rolesQuery.ToListAsync();

            if (roles == null || roles.Count == 0)
            {
                return new RolesResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "No role found",
                };
            }

            return new RolesResponseStatus
            {
                Status = "SUCCEED",
                Message = "Roles get successfully",
                Roles = roles
            };
        }

        public async Task<RoleResponseStatus> GetRole(string roleId)
        {
            if (roleId == null)
            {
                return new RoleResponseStatus
                {
                    Status = "FAILED",
                    Message = "Invalid RoleId",
                };
            }
            var role = _context.Roles.FirstOrDefault(role => role.Id == roleId);
            return new RoleResponseStatus
            {
                Status = "SUCCEED",
                Message = "Role get successfully",
                Role = role
            };
        }

        public async Task<RoleResponse> CreateNewRole(CreateUpdateRoleDTO createUpdateRoleDTO)
        {
            try
            {
                if (createUpdateRoleDTO == null)
                {
                    return new RoleResponse
                    {
                        Status = "FAILED",
                        Message = "Invalid model"
                    };
                }

                var role = new ApplicationRole
                {
                    Name = createUpdateRoleDTO.Name,
                    CreatedOn = DateTime.UtcNow,
                    Isactive = createUpdateRoleDTO.Isactive,
                    IsDefault = true,
                    Isdelete = false,
                    ModifiedBy = "1",
                    ModifiedOn = DateTime.UtcNow,
                    CreatedBy = "1"

                };
                var result = await _roleManager.CreateAsync(role);
                if (result.Succeeded)
                {
                    return new RoleResponse()
                    {
                        Status = "SUCCEED",
                        Message = "Role created successfully",
                        RoleId = role.Id

                    };
                }
                else
                {
                    var errors = string.Join(" and ", result.Errors.Select(item => item.Description).ToArray());
                    return new RoleResponse
                    {
                        Status = "FAILED",
                        Message = errors
                    };
                }
            }
            catch (Exception ex)
            {
                return new RoleResponse
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

        public async Task<RoleResponseStatus> UpdateRole(CreateUpdateRoleDTO createUpdateRoleDTO)
        {
            using var transaction = _context.Database.BeginTransaction(); // Begin transaction
            try
            {
                //Check if createUpdateRoleDTO is null
                if (createUpdateRoleDTO == null)
                {
                    return new RoleResponseStatus
                    {
                        Status = "FAILED",
                        Message = "UpdateRoleDTO is null."
                    };
                }
                var role = _context.Roles.FirstOrDefault(x => x.Id == createUpdateRoleDTO.Id);

                if (role == null)
                {
                    return new RoleResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Role not found"
                    };
                }

                role.Name = createUpdateRoleDTO.Name;
                role.Isactive = createUpdateRoleDTO.Isactive;
                role.ModifiedOn = DateTime.UtcNow;

                _context.Roles.Update(role);
                await _context.SaveChangesAsync();

                // Commit transaction if everything succeeds
                await transaction.CommitAsync();

                return new RoleResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "Employee updated successfully",
                    Role = role
                };
            }
            catch (Exception ex)
            {
                // Rollback transaction if an exception occurs
                await transaction.RollbackAsync();

                return new RoleResponseStatus
                {
                    Status = "FAILED",
                    Message = "Failed to update role"
                };

            }
        }

        public async Task<ResponseStatus> DeleteRole(string roleId)
        {
            // Check if the context is null
            if (_context == null)
            {
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Db Context is null"
                };
            }

            try
            {
                // Find the role by roleId
                var role = await _context.Roles.FirstOrDefaultAsync(x => x.Id == roleId).ConfigureAwait(false);
                // If role not found, return failure
                if (role == null)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Role not found"
                    };
                }

                // Check if the role is Administrator, deletion not allowed
                if (role.NormalizedName == "ADMINISTRATOR")
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Role deletion not allowed"
                    };
                }

                // If the role is already marked as deleted, return success
                if (role.Isdelete)
                {
                    return new ResponseStatus
                    {
                        Status = "SUCCEED",
                        Message = "Role already deleted."
                    };
                }

                // Check if the role is assigned to any user
                var userAssignedToRole = await _context.UserRoles.AnyAsync(x => x.RoleId == roleId).ConfigureAwait(false);
                // If assigned to a user, return failure
                if (userAssignedToRole)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Role is assigned to user, can not be deleted"
                    };
                }

                // Mark the role as deleted
                role.Isdelete = true;
                _context.Roles.Update(role);
                // Save changes
                await _context.SaveChangesAsync().ConfigureAwait(false);

                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "Role deleted successfully"
                };
            }
            catch (Exception ex)
            {
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Something went wrong: " + ex.Message
                };
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

        public async Task<ResponseStatus> GetRoleNameAsync(string roleId)
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

                var role = await _context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);

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
        public async Task<ModulePermissionResponse> GetModulePermissions(string userType)
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

                var modulePermissionList = (from permission in _context.Permissions
                                            join module in _context.Modules on permission.ModuleID equals module.Id
                                            where permission.RoleID == userType
                                            select new ModulePermission
                                            {
                                                ModuleId = module.Id,
                                                PermissionId = permission.PermissionId,
                                                ModuleName = module.Name,
                                                IsAdd = permission.Add,
                                                IsEdit = permission.Edit,
                                                IsView = permission.View,
                                                IsDelete = permission.Delete,
                                            }).ToList();
                return new ModulePermissionResponse
                {
                    Status = "SUCCEED",
                    Message = "User Modules with permissions get successfully ",
                    ModulePermissions = modulePermissionList
                };

            }
            catch (Exception ex)
            {
                return new ModulePermissionResponse
                {
                    Status = "FAILED",
                    Message = "Something went wrong" + ex.Message
                };
            }


        }
        //get modules
        public async Task<IEnumerable<GetModulesDTO>> GetAllModulesAsync()
        {
            try
            {
                var allModules = await _context.Modules.ToListAsync();
                var modulesDTOs = allModules.Select(module => new GetModulesDTO
                {
                 
                    Id = module.Id,
                    Name = module.Name,
                
                });
                return modulesDTOs;
            }
            catch (Exception ex)
            {
                throw;
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

                var userFound = await _userManager.FindByIdAsync(userId);
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
                    ModulePermissions = ModulePermissionList
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


        // create module permission
        public async Task<ResponseStatus> CreateModulePermission(List<CreateModulePermissionDTO> createModulePermissions)
        {
            try
            {
                // Check if createModulePermissions is null or empty
                if (createModulePermissions == null)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "No permissions provided."
                    };
                }

                // Loop through each permission in the list
                foreach (var createModulePermissionDTO in createModulePermissions)
                {
                    // Check if the role ID is provided
                    if (string.IsNullOrEmpty(createModulePermissionDTO.RoleId))
                    {
                        return new ResponseStatus
                        {
                            Status = "FAILED",
                            Message = "Role ID is required for creating module permissions."
                        };
                    }

                    
                    // Create a new permission entity
                    Permissions newPermission = new Permissions // Assuming Permission is your entity type
                    {
                     
                        ModuleID = createModulePermissionDTO.ModuleId,
                        RoleID = createModulePermissionDTO.RoleId,
                        View = createModulePermissionDTO.IsView,
                        Add = createModulePermissionDTO.IsAdd,
                        Edit = createModulePermissionDTO.IsEdit,
                        Delete = createModulePermissionDTO.IsDelete
                    };

                    // Add the new permission to the database context
                    _context.Permissions.Add(newPermission);
                }

                // Save changes to the database
                await _context.SaveChangesAsync();

                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "Permissions created successfully",
                };
            }
            catch (Exception ex)
            {
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = "Failed to create permissions"
                };
            }
        }

        public async Task<ResponseStatus> UpdateModulePermission(List<UpdateModulePermissionDTO> updateModulePermissions)
        {
            try
            {
                // Check if updateModulePermissions is null or empty
                if (updateModulePermissions == null || !updateModulePermissions.Any())
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "No permissions provided."
                    };
                }

                foreach (var updateModulePermissionDTO in updateModulePermissions)
                {
                    if (updateModulePermissionDTO.RoleId == null) continue;

                    var permission = _context.Permissions.FirstOrDefault(x =>
                        x.PermissionId == updateModulePermissionDTO.PermissionId &&
                        x.RoleID == updateModulePermissionDTO.RoleId
                    );

                    if (permission == null)
                    {
                        Permissions newPermission = new Permissions // Assuming Permission is your entity type
                        {
                            ModuleID = updateModulePermissionDTO.ModuleId,
                            RoleID = updateModulePermissionDTO.RoleId,
                            View = updateModulePermissionDTO.IsView,
                            Add = updateModulePermissionDTO.IsAdd,
                            Edit = updateModulePermissionDTO.IsEdit,
                            Delete = updateModulePermissionDTO.IsDelete
                        };

                        // Add the new permission to the database context
                        _context.Permissions.Add(newPermission);
                    }
                    else
                    {
                        // Update the existing permission
                        permission.View = updateModulePermissionDTO.IsView;
                        permission.Add = updateModulePermissionDTO.IsAdd;
                        permission.Edit = updateModulePermissionDTO.IsEdit;
                        permission.Delete = updateModulePermissionDTO.IsDelete;

                        _context.Permissions.Update(permission);
                    }
                }

                // Save all changes to the database
                await _context.SaveChangesAsync();

                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "Permissions updated successfully"
                };
            }
            catch (Exception ex)
            {
                return new ResponseStatus
                {
                    Status = "FAILED",
                    Message = $"Failed to update permissions: {ex.Message}"
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
                                select new EmployeesDTO
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

        // for get employee list
        public async Task<EmployeeWithCountDTO> GetEmployees(string? searchQuery, int? pageNumber, int? pageSize)
        {
            try
            {
                var query = (from user in _context.Users
                             join employee in _context.Employees on user.Id equals employee.UserId
                             join department in _context.Departments on employee.DepartmentId equals department.DepartmentId
                             join designation in _context.Designations on employee.DesignationId equals designation.DesignationId
                             join shift in _context.Shifts on employee.ShiftId equals shift.ShiftId
                             where String.IsNullOrEmpty(employee.DeletedBy) &&
                                   employee.IsActive == true &&
                                   (string.IsNullOrEmpty(searchQuery) ||
                                   EF.Functions.Like(user.FirstName, $"%{searchQuery}%") ||
                                   EF.Functions.Like(user.LastName, $"%{searchQuery}%") ||
                                   EF.Functions.Like(employee.EmpCode, $"%{searchQuery}%") ||
                                   EF.Functions.Like(employee.BloodGroup, $"%{searchQuery}%") ||
                                   employee.DateOfBirth.HasValue && employee.DateOfBirth.Value.ToString() == searchQuery)
                             select new GetEmployeesDTO
                             {
                                 UserId = employee.UserId,
                                 EmployeeId = employee.EmployeeId,
                                 EmployeeCode = employee.EmpCode,
                                 Name = user.FirstName + " " + user.LastName,
                                 Email = user.Email,
                                 ContactNumber = user.PhoneNumber,
                                 JoiningDate = employee.JoiningDate,
                                 Department = department.Name,
                                 Designation = designation.Name,
                                 Shift = shift.Name,
                                 BirthDate = employee.DateOfBirth,
                                 BloodGroup = employee.BloodGroup,
                                     ProfilePicturePath=employee.ProfilePictureURL
                             });

                // Count the total number of records
                var usersCount = await query.CountAsync();

                // Apply pagination
                var usersList = await query.OrderByDescending(u => u.EmployeeId) // Order by EmployeeId in descending order
                                           .Skip(pageNumber.HasValue && pageSize.HasValue ? (pageNumber.Value - 1) * pageSize.Value : 0)
                                           .Take(pageNumber.HasValue && pageSize.HasValue ? pageSize.Value : 10)
                                           .ToListAsync();

                return new EmployeeWithCountDTO { Employee = usersList, UserCount = usersCount };
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching users.", ex);
            }
        }


        // for get employee by id
        public EmployeeResponse GetEmployeeById(string employeeId)
        {
            try
            {
                if (employeeId == null)
                {
                    return new EmployeeResponse
                    {
                        Status = "FAILED",
                        Message = "Db Context is null"
                    };
                }
                var employeeData = (from user in _context.Users
                                    join employee in _context.Employees on user.Id equals employee.UserId
                                    join department in _context.Departments on employee.DepartmentId equals department.DepartmentId
                                    join designation in _context.Designations on employee.DesignationId equals designation.DesignationId
                                    join shift in _context.Shifts on employee.ShiftId equals shift.ShiftId
                                    join bank in _context.Banks on employee.BankId equals bank.BankId
                                    join role in _context.UserRoles on employee.UserId equals role.UserId
                                    where employee.EmployeeId == employeeId
                                    select new EmployeeDTO
                                    {
                                        EmployeeId = employee.EmployeeId,
                                        EmployeeCode = employee.EmpCode,
                                        Name = user.FirstName + " " + user.LastName,
                                        ProfilePictureURL = employee.ProfilePictureURL,
                                        FatherName = employee.FatherName,
                                        GuardianName = employee.GuardianName,
                                        BloodGroup = employee.BloodGroup,
                                        DateOfBirth = employee.DateOfBirth,
                                        JoiningDate = employee.JoiningDate,
                                        RelievingDate = employee.RelievingDate,
                                        ContactNumber = user.PhoneNumber,
                                        GuardianContactNumber = employee.GuardianContactNumber,
                                        Email = user.Email,
                                        SkypeId = employee.SkypeId,
                                        AdharCardNumber = employee.AdharCardNumber,
                                        PanNumber = employee.PanNumber,
                                        BankAccountNumber = bank.BankAccountNumber,
                                        Bank = bank.Name,
                                        Branch = bank.Branch,
                                        Ifsc = bank.Ifsc,
                                        DepartmentId = employee.DepartmentId,
                                        DesignationId = employee.DesignationId,
                                        ShiftId = employee.ShiftId,
                                        RoleId = role.RoleId,
                                        IsActive = employee.IsActive,
                                        PermanentAddress = employee.PermanentAddress,
                                        CorrespondenceAddress = employee.CorrespondenceAddress
                                    }).FirstOrDefault();

                if (employeeData == null)
                {
                    return new EmployeeResponse
                    {
                        Status = "FAILED",
                        Message = "No record found"
                    };
                }
                return new EmployeeResponse
                {
                    Status = "SUCCEED",
                    Message = "Employee record found",
                    employeeData = employeeData
                };

            }
            catch (Exception ex)
            {
                return new EmployeeResponse
                {
                    Status = "FAILED",
                    Message = "Something went wrong"
                };
            }
        }

        //for create Employee
        public async Task<EmployeeResponseStatus> CreateEmployee(CreateEmployeeDTO createEmployeeDTO  )
        {
            using var transaction = _context.Database.BeginTransaction(); // Begin transaction
            try
            {
                //Check if createEmployeeDTO is null
                if (createEmployeeDTO == null)
                {
                    return new EmployeeResponseStatus
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
                    Email = createEmployeeDTO.Email,
                    PhoneNumber = createEmployeeDTO.ContactNumber,
                    RoleId = createEmployeeDTO.RoleId,
                    Password = createEmployeeDTO.Password,
                    CreatedBy = "",
                    OrganizationId = createEmployeeDTO.OrganizationId,
                };

                var result = await CreateApplicationUser(user);

                if (result.Status == "FAILED")
                {
                    return new EmployeeResponseStatus
                    {
                        Status = "FAILED",
                        Message = result.Message
                    };
                }
                var createdUser = await _userManager.FindByNameAsync(username);
                userId = createdUser.Id;

                Bank bank = new()
                {
                    Name = createEmployeeDTO.Bank,
                    BankAccountNumber = createEmployeeDTO.BankAccountNumber,
                    Branch = createEmployeeDTO.Branch,
                    Ifsc = createEmployeeDTO.Ifsc,
                    OrganizationId = createdUser.OrganizationId,
                };

                _context.Banks.Add(bank);
                await _context.SaveChangesAsync();

                _context.Entry(bank).GetDatabaseValues();
                int newBankId = (int)bank.BankId;

                
                Employee employee = new()
                {
                    EmployeeId = createEmployeeDTO.EmployeeId,
                    EmpCode = createEmployeeDTO.EmployeeCode,
                    UserId = userId,
                    Name = createEmployeeDTO.Name,
                    ProfilePictureURL = createEmployeeDTO.ProfilePicturePath,
                    FatherName = createEmployeeDTO.FatherName,
                    GuardianName = createEmployeeDTO.GuardianName,
                    BloodGroup = createEmployeeDTO.BloodGroup,
                    DateOfBirth = createEmployeeDTO.DateOfBirth,
                    JoiningDate = createEmployeeDTO.JoiningDate,
                    RelievingDate = createEmployeeDTO.RelievingDate,
                    GuardianContactNumber = createEmployeeDTO.GuardianContactNumber,
                    SkypeId = createEmployeeDTO.SkypeId,
                    AdharCardNumber = createEmployeeDTO.AdharCardNumber,
                    PanNumber = createEmployeeDTO.PanNumber,
                    DepartmentId = createEmployeeDTO.DepartmentId,
                    DesignationId = createEmployeeDTO.DesignationId,
                    BankId = newBankId,
                    ShiftId = createEmployeeDTO.ShiftId,
                    IsActive = createEmployeeDTO.IsActive,
                    PermanentAddress = createEmployeeDTO.PermanentAddress,
                    CorrespondenceAddress = createEmployeeDTO.CorrespondenceAddress,
                    CreateBy = userId,
                    CreatedDate = DateTime.UtcNow,
                };

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                _context.Entry(employee).GetDatabaseValues();
                string employeeId = employee.EmployeeId;

                // Commit transaction if everything succeeds
                await transaction.CommitAsync();

                return new EmployeeResponseStatus
                {
                    EmployeeId = employeeId,
                    Status = "SUCCEED",
                    Message = "Employee successfully created"
                };
            }
            catch (Exception ex)
            {
                // Rollback transaction if an exception occurs
                await transaction.RollbackAsync();

                return new EmployeeResponseStatus
                {
                    Status = "FAILED",
                    Message = "Failed to create employee"
                };

            }
        }

        // for Update employee
        public async Task<EmployeeResponseStatus> UpdateEmployee(CreateEmployeeDTO createEmployeeDTO )
        {
            using var transaction = _context.Database.BeginTransaction(); // Begin transaction
            try
            {
                //Check if createEmployeeDTO is null
                if (createEmployeeDTO == null)
                {
                    return new EmployeeResponseStatus
                    {
                        Status = "FAILED",
                        Message = "CreateEmployeeDTO is null. Please provide data for updating the employee."
                    };
                }

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

                Employee employee = _context.Employees.FirstOrDefault(x => x.EmployeeId == createEmployeeDTO.EmployeeId);

                if (employee == null)
                {
                    return new EmployeeResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Employee not found"
                    };
                }

                UpdateApplicationUserModel updateApplicationUser = new UpdateApplicationUserModel
                {
                    FirstName = (nameParts.Length >= 2 ? firstName : createEmployeeDTO.Name),
                    LastName = lastName,
                    UserName = username,
                    Email = createEmployeeDTO.Email,
                    Password = createEmployeeDTO.Password,
                    PhoneNumber = createEmployeeDTO.ContactNumber,
                    RoleId = createEmployeeDTO.RoleId,
                };

                ResponseStatus response = await UpdateApplicationUser(updateApplicationUser);

                if(response.Status == "FAILED")
                {
                    return new EmployeeResponseStatus
                    {
                        Status = "FAILED",
                        Message = response.Message
                    };
                }

                var bankResponse = _context.Banks.FirstOrDefault(x => x.BankId == employee.BankId);
                if (bankResponse == null)
                {
                    return new EmployeeResponseStatus
                    {
                        Status = "FAILED",
                        Message = "Bank not found"
                    };
                }

                // Update bank
                bankResponse.BankAccountNumber = createEmployeeDTO.BankAccountNumber;
                bankResponse.Name = createEmployeeDTO.Name;
                bankResponse.Branch = createEmployeeDTO.Branch;
                bankResponse.Ifsc = createEmployeeDTO.Ifsc;

                var updatedContact = _context.Banks.Update(bankResponse);
                await _context.SaveChangesAsync();


                // Update Employee
                employee.EmployeeId = createEmployeeDTO.EmployeeId;
                employee.EmpCode = createEmployeeDTO.EmployeeCode;
                employee.UserId = employee.UserId;
                employee.Name = createEmployeeDTO.Name;
                if (createEmployeeDTO.ProfilePicturePath == null)                  // Check if ProfilePicturePath is null then assign ProfilePicturePath from DB
                {
                    employee.ProfilePictureURL = employee.ProfilePictureURL;
                }
                else
                {
                    employee.ProfilePictureURL = createEmployeeDTO.ProfilePicturePath;
                }
                employee.FatherName = createEmployeeDTO.FatherName;
                employee.GuardianName = createEmployeeDTO.GuardianName;
                employee.BloodGroup = createEmployeeDTO.BloodGroup;
                employee.DateOfBirth = createEmployeeDTO.DateOfBirth;
                employee.JoiningDate = createEmployeeDTO.JoiningDate;
                employee.RelievingDate = createEmployeeDTO.RelievingDate;
                employee.GuardianContactNumber = createEmployeeDTO.GuardianContactNumber;
                employee.SkypeId = createEmployeeDTO.SkypeId;
                employee.AdharCardNumber = createEmployeeDTO.AdharCardNumber;
                employee.PanNumber = createEmployeeDTO.PanNumber;
                employee.DepartmentId = createEmployeeDTO.DepartmentId;
                employee.DesignationId = createEmployeeDTO.DesignationId;
                employee.BankId = bankResponse.BankId;
                employee.ShiftId = createEmployeeDTO.ShiftId;
                employee.IsActive = createEmployeeDTO.IsActive;
                employee.PermanentAddress = createEmployeeDTO.PermanentAddress;
                employee.CorrespondenceAddress = createEmployeeDTO.CorrespondenceAddress;
                employee.UpdatedBy = "";
                employee.UpdatedDate = DateTime.UtcNow;

                _context.Employees.Update(employee);
                await _context.SaveChangesAsync();

                // Commit transaction if everything succeeds
                await transaction.CommitAsync();

                return new EmployeeResponseStatus
                {
                    EmployeeId = createEmployeeDTO.EmployeeId,
                    Status = "SUCCEED",
                    Message = "Employee updated successfully"
                };
            }
            catch (Exception ex)
            {
                // Rollback transaction if an exception occurs
                await transaction.RollbackAsync();

                return new EmployeeResponseStatus
                {
                    Status = "FAILED",
                    Message = "Failed to update employee"
                };

            }
        }

        // for delete employee
        public ResponseStatus DeleteEmployee(string employeeId)
        {
            try
            {

                var existingEmployee = (from employee in _context.Employees
                  where employee.EmployeeId == employeeId
                  select employee).FirstOrDefault(employee => employee.IsActive == true);
                

                if (existingEmployee == null)
                {
                    return new ResponseStatus
                    {
                        Status = "FAILED",
                        Message = "No record found"
                    };
                }

                existingEmployee.IsActive = false;
                existingEmployee.UpdatedDate = DateTime.UtcNow;

                _context.Employees.Update(existingEmployee);
                _context.SaveChanges();
                return new ResponseStatus
                {
                    Status = "SUCCEED",
                    Message = "Employee record deleted successfully"
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
        
        //for getEmployee password
        public async Task<ChangePasswordDbResponse> ChangePassword(ChangePasswordRequest passwordData )
        {
            ApplicationUser cUser = await _userManager.FindByIdAsync(passwordData.userID);
            //ApplicationUser cUserEmail = await _userManager.FindByEmailAsync(email);

            if (cUser == null )
            {
                // User not found
                return  new ChangePasswordDbResponse { 
                    status=500,
                    Message= "Something went wrong"
                };
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(cUser);

            var result = await _userManager.ResetPasswordAsync(cUser, token , passwordData.newPassword);
            if (!result.Succeeded)
            {
                return new ChangePasswordDbResponse
                {
                    status = 400,
                    Message = "Something went wrong"
                }; 

            }

            return new ChangePasswordDbResponse
            {
                status = 200,
                Message = "Password changed successfully",
                Email= cUser.Email,
                UserFullName= cUser.FirstName+" "+cUser.LastName,
                //NewPassword=cUser.
               
            }; ;
        }

    }
}

