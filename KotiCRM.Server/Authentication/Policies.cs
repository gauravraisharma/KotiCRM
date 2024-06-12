using Microsoft.AspNetCore.Authorization;

namespace KotiCRM.Server.Authentication
{
    public static class Policies
    {
        public const string Accounts_View = "Accounts.View";
        public const string Accounts_Add = "Accounts.Add";
        public const string Accounts_Edit = "Accounts.Edit";
        public const string Accounts_Delete = "Accounts.Delete";

        public const string Contacts_View = "Contacts.View";
        public const string Contacts_Add = "Contacts.Add";
        public const string Contacts_Edit = "Contacts.Edit";
        public const string Contacts_Delete = "Contacts.Delete";

        //public const string Leads_View = "Leads.View";
        //public const string Leads_Add = "Leads.Add";
        //public const string Leads_Edit = "Leads.Edit";
        //public const string Leads_Delete = "Leads.Delete";

        public const string Invoices_View = "Invoices.View";
        public const string Invoices_Add = "Invoices.Add";
        public const string Invoices_Edit = "Invoices.Edit";
        public const string Invoices_Delete = "Invoices.Delete";

        public const string Notes_View = "Notes.View";
        public const string Notes_Add = "Notes.Add";
        public const string Notes_Edit = "Notes.Edit";
        public const string Notes_Delete = "Notes.Delete";

        //public const string Employees_View = "Employees.View";
        //public const string Employees_Add = "Employees.Add";
        //public const string Employees_Edit = "Employees.Edit";
        //public const string Employees_Delete = "Employees.Delete";

        public const string ManageUsers_View = "ManageUsers.View";
        public const string ManageUsers_Add = "ManageUsers.Add";
        public const string ManageUsers_Edit = "ManageUsers.Edit";
        public const string ManageUsers_Delete = "ManageUsers.Delete";

        public const string ManagePermission_View = "ManagePermission.View";
        public const string ManagePermission_Add = "ManagePermission.Add";
        public const string ManagePermission_Edit = "ManagePermission.Edit";
        public const string ManagePermission_Delete = "ManagePermission.Delete";
    }
}
