using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Bifrost.Data.Migrations
{
    public partial class TechModelChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Technologies");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "RespondentTechnology");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Respondents");

            migrationBuilder.RenameColumn(
                name: "TechonologyName",
                table: "Technologies",
                newName: "TechnologyName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TechnologyName",
                table: "Technologies",
                newName: "TechonologyName");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Technologies",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "RespondentTechnology",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Respondents",
                nullable: true);
        }
    }
}
