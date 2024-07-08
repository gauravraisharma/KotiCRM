using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;

namespace KotiCRM.Server.Authentication
{
    public class ModuleAuthorizationHandler : AuthorizationHandler<ModuleRequirement>
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        public ModuleAuthorizationHandler(
            IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ModuleRequirement requirement)
        {
            var claimType = $"Permission.{requirement.Module}";

            // Check if the user has the required permission for the module
            if (context.User.Claims.Any(c => c.Type == claimType && c.Value.Contains(requirement.Permission)))
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            // The required permission was not found, return 403 Forbidden
            (httpContextAccessor.HttpContext).Response.StatusCode = 403;  // Forbidden

            //context.Fail();
            return Task.CompletedTask;
        }
    }

    public class ModuleRequirement : IAuthorizationRequirement
    {
        public string Module { get; }
        public string Permission { get; }

        public ModuleRequirement(string module, string permission)
        {
            Module = module;
            Permission = permission;
        }
    }
}
