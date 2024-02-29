using Microsoft.AspNetCore.Authorization;

namespace KotiCRM.Server.Authentication
{
    public static class Policies
    {
        public const string Accounts = "Account";
        public const string Accounts_Add = "Accounts.Add";
        public const string Accounts_Edit = "Accounts.Edit";
        public const string Accounts_Delete = "Accounts.Delete";



    }
}
