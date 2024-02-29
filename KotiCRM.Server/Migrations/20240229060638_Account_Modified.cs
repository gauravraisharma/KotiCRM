using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Account_Modified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Industry_IndustryId",
                table: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_IndustryId",
                table: "Accounts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
