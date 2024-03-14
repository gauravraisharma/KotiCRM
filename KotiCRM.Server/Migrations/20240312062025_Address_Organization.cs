using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Address_Organization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BillingCity",
                table: "Organization",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BillingStreet",
                table: "Organization",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "billingCode",
                table: "Organization",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "billingCountry",
                table: "Organization",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "billingState",
                table: "Organization",
                type: "nvarchar(100)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillingCity",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "BillingStreet",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "billingCode",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "billingCountry",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "billingState",
                table: "Organization");
        }
    }
}
