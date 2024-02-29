using Microsoft.AspNetCore.Authorization;

namespace KotiCRM.Server.Authentication
{
    public class ModuleAuthorizationHandler : AuthorizationHandler<ModuleRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ModuleRequirement requirement)
        {
            // Check if the user has the required permission for the module
            if (context.User.HasClaim(c =>
                c.Type == "Permission." + requirement.Module &&
                c.Value.Contains(requirement.Permission)))
            {
                context.Succeed(requirement);
            }
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
