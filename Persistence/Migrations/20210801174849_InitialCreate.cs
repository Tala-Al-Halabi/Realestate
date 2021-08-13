using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    PType = table.Column<string>(type: "TEXT", nullable: true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    About = table.Column<string>(type: "TEXT", nullable: true),
                    WhytoInvest = table.Column<string>(type: "TEXT", nullable: true),
                    Size = table.Column<float>(type: "REAL", nullable: false),
                    Bedrooms = table.Column<int>(type: "INTEGER", nullable: false),
                    Bathrooms = table.Column<int>(type: "INTEGER", nullable: false),
                    PricePersqm = table.Column<float>(type: "REAL", nullable: false),
                    Location = table.Column<string>(type: "TEXT", nullable: true),
                    PDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IType = table.Column<string>(type: "TEXT", nullable: true),
                    Iminamount = table.Column<float>(type: "REAL", nullable: false),
                    appreciation = table.Column<float>(type: "REAL", nullable: false),
                    Iperiod = table.Column<int>(type: "INTEGER", nullable: false),
                    expectedreturn = table.Column<float>(type: "REAL", nullable: false),
                    payoutfrequency = table.Column<string>(type: "TEXT", nullable: true),
                    investnow = table.Column<float>(type: "REAL", nullable: false),
                    IDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    totalIamount = table.Column<float>(type: "REAL", nullable: false),
                    servicecharge = table.Column<string>(type: "TEXT", nullable: true),
                    registrationfees = table.Column<float>(type: "REAL", nullable: false),
                    taxes = table.Column<string>(type: "TEXT", nullable: true),
                    maintenance = table.Column<float>(type: "REAL", nullable: false),
                    spvfees = table.Column<float>(type: "REAL", nullable: false),
                    Iincome = table.Column<float>(type: "REAL", nullable: false),
                    Iyield = table.Column<float>(type: "REAL", nullable: false),
                    price = table.Column<float>(type: "REAL", nullable: false),
                    capitalgains = table.Column<float>(type: "REAL", nullable: false),
                    capitalgainyield = table.Column<float>(type: "REAL", nullable: false),
                    totalyieled = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Properties");
        }
    }
}
