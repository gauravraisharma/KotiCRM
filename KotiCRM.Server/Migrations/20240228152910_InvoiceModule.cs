using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class InvoiceModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountID = table.Column<int>(type: "int", nullable: false),
                    OwnerID = table.Column<int>(type: "int", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvoiceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ContactID = table.Column<int>(type: "int", nullable: false),
                    PurchaseOrder = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    BillingStreet = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    BillingCity = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    BillingState = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    BillingCode = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    BillingCountry = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    TermsAndConditions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SubTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Adjustments = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GrandTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_IndustryId",
                table: "Accounts",
                column: "IndustryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Industry_IndustryId",
                table: "Accounts",
                column: "IndustryId",
                principalTable: "Industry",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Industry_IndustryId",
                table: "Accounts");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_IndustryId",
                table: "Accounts");
        }
    }
}
