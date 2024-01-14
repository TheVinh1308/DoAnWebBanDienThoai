using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Server.Migrations
{
    public partial class init3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_ModPhones_ModPhoneId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "ModPhoneId",
                table: "Comments",
                newName: "PhoneId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_ModPhoneId",
                table: "Comments",
                newName: "IX_Comments_PhoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Phones_PhoneId",
                table: "Comments",
                column: "PhoneId",
                principalTable: "Phones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Phones_PhoneId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "PhoneId",
                table: "Comments",
                newName: "ModPhoneId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_PhoneId",
                table: "Comments",
                newName: "IX_Comments_ModPhoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_ModPhones_ModPhoneId",
                table: "Comments",
                column: "ModPhoneId",
                principalTable: "ModPhones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
