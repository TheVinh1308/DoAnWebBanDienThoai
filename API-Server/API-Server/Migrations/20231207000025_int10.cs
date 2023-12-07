using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Server.Migrations
{
    public partial class int10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "camerasaujson",
                table: "ModPhones");

            migrationBuilder.DropColumn(
                name: "cameratruocjson",
                table: "ModPhones");

            migrationBuilder.DropColumn(
                name: "hedieuhanhjson",
                table: "ModPhones");

            migrationBuilder.DropColumn(
                name: "ketnoijson",
                table: "ModPhones");

            migrationBuilder.DropColumn(
                name: "pinjson",
                table: "ModPhones");

            migrationBuilder.DropColumn(
                name: "tienichjson",
                table: "ModPhones");

            migrationBuilder.DropColumn(
                name: "tinhchatchungjson",
                table: "ModPhones");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "camerasaujson",
                table: "ModPhones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "cameratruocjson",
                table: "ModPhones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "hedieuhanhjson",
                table: "ModPhones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ketnoijson",
                table: "ModPhones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "pinjson",
                table: "ModPhones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "tienichjson",
                table: "ModPhones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "tinhchatchungjson",
                table: "ModPhones",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
