﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("Domain.Property", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("About")
                        .HasColumnType("TEXT");

                    b.Property<string>("Bathrooms")
                        .HasColumnType("TEXT");

                    b.Property<string>("Bedrooms")
                        .HasColumnType("TEXT");

                    b.Property<string>("IType")
                        .HasColumnType("TEXT");

                    b.Property<string>("Location")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("PDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("PType")
                        .HasColumnType("TEXT");

                    b.Property<double>("PricePersqm")
                        .HasColumnType("REAL");

                    b.Property<string>("Size")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<string>("WhytoInvest")
                        .HasColumnType("TEXT");

                    b.Property<double>("investnow")
                        .HasColumnType("REAL");

                    b.Property<double>("price")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Properties");
                });
#pragma warning restore 612, 618
        }
    }
}
