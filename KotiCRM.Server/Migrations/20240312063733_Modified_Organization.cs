using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Modified_Organization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "billingState",
                table: "Organization",
                newName: "BillingState");

            migrationBuilder.RenameColumn(
                name: "billingCountry",
                table: "Organization",
                newName: "BillingCountry");

            migrationBuilder.RenameColumn(
                name: "billingCode",
                table: "Organization",
                newName: "BillingCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BillingState",
                table: "Organization",
                newName: "billingState");

            migrationBuilder.RenameColumn(
                name: "BillingCountry",
                table: "Organization",
                newName: "billingCountry");

            migrationBuilder.RenameColumn(
                name: "BillingCode",
                table: "Organization",
                newName: "billingCode");
        }
    }
}
