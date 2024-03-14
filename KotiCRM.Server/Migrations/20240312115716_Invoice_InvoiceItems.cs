using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Invoice_InvoiceItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Adjustments",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "BillingCity",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "BillingCode",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "BillingCountry",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "BillingState",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "BillingStreet",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "GrandTotal",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "SubTotal",
                table: "Invoices");

            migrationBuilder.AlterColumn<string>(
                name: "TermsAndConditions",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "PurchaseOrder",
                table: "Invoices",
                type: "nvarchar(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Invoices",
                type: "nvarchar(200)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Invoices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FromBillingCity",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FromBillingCode",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FromBillingCountry",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FromBillingState",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FromBillingStreet",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Isdelete",
                table: "Invoices",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Invoices",
                type: "nvarchar(200)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Invoices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ToBillingCity",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToBillingCode",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToBillingCountry",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToBillingState",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToBillingStreet",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "InvoiceItems",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "FromBillingCity",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "FromBillingCode",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "FromBillingCountry",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "FromBillingState",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "FromBillingStreet",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "Isdelete",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ToBillingCity",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ToBillingCode",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ToBillingCountry",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ToBillingState",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ToBillingStreet",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "InvoiceItems");

            migrationBuilder.AlterColumn<string>(
                name: "TermsAndConditions",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PurchaseOrder",
                table: "Invoices",
                type: "nvarchar(200)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Invoices",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Adjustments",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "BillingCity",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingCode",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingCountry",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingState",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingStreet",
                table: "Invoices",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "GrandTotal",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SubTotal",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
