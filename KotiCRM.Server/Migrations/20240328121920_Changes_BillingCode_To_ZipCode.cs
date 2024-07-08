using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Changes_BillingCode_To_ZipCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BillingCode",
                table: "Organization",
                newName: "ZipCode");

            migrationBuilder.RenameColumn(
                name: "ToBillingCode",
                table: "Invoices",
                newName: "ToZipCode");

            migrationBuilder.RenameColumn(
                name: "FromBillingCode",
                table: "Invoices",
                newName: "FromZipCode");

            migrationBuilder.RenameColumn(
                name: "Zip",
                table: "Contacts",
                newName: "ZipCode");

            migrationBuilder.RenameColumn(
                name: "BillingCode",
                table: "Accounts",
                newName: "ZipCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ZipCode",
                table: "Organization",
                newName: "BillingCode");

            migrationBuilder.RenameColumn(
                name: "ToZipCode",
                table: "Invoices",
                newName: "ToBillingCode");

            migrationBuilder.RenameColumn(
                name: "FromZipCode",
                table: "Invoices",
                newName: "FromBillingCode");

            migrationBuilder.RenameColumn(
                name: "ZipCode",
                table: "Contacts",
                newName: "Zip");

            migrationBuilder.RenameColumn(
                name: "ZipCode",
                table: "Accounts",
                newName: "BillingCode");
        }
    }
}
