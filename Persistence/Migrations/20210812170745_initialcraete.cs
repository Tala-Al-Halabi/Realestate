using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class initialcraete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IDate",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Iincome",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Iminamount",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Iperiod",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Iyield",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "appreciation",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "capitalgains",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "capitalgainyield",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "expectedreturn",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "maintenance",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "payoutfrequency",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "registrationfees",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "servicecharge",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "spvfees",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "taxes",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "totalIamount",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "totalyieled",
                table: "Properties");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "IDate",
                table: "Properties",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<float>(
                name: "Iincome",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Iminamount",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "Iperiod",
                table: "Properties",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Iyield",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "appreciation",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "capitalgains",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "capitalgainyield",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "expectedreturn",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "maintenance",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "payoutfrequency",
                table: "Properties",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "registrationfees",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "servicecharge",
                table: "Properties",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "spvfees",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "taxes",
                table: "Properties",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "totalIamount",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "totalyieled",
                table: "Properties",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
