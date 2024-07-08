using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Added_Account_Number_In_Bank_Model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.AlterColumn<string>(
                name: "BankAccountNumber",
                table: "Bank",
                type: "varchar(100)",
                unicode: false,
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeRoleRoleId",
                table: "Employee",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BankAccountNumber",
                table: "Bank",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldUnicode: false,
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "EmployeeRoles",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeRoles", x => x.RoleId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employee_EmployeeRoleRoleId",
                table: "Employee",
                column: "EmployeeRoleRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_EmployeeRoles_EmployeeRoleRoleId",
                table: "Employee",
                column: "EmployeeRoleRoleId",
                principalTable: "EmployeeRoles",
                principalColumn: "RoleId");
        }
    }
}
