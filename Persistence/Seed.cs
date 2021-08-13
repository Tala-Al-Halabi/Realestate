using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Properties.Any()) return;
            
            var properties = new List<Property>
            {
                new Property
                {
                    PType = "Appartment",
                    Title = "333 sqm Penthouse in Gated Community in Tilal Al Fanar",
                    About = "It is 280m2 on the inside plus a majestic 140m2 terrace.",
                    WhytoInvest = " potential rental income",
                    Size = 333,
                    Bedrooms = 4,
                    Bathrooms = 2,
                    PricePersqm = 966,
                    Location = "Fanar",
                    PDate = DateTime.Now.AddMonths(-1),
                    IType = "Lease To Sell",
                    investnow = 500,
                    price = 352870,
                  
                },

                new Property
                {
                    PType = "Appartment",
                    Title = "500 sqm Penthouse in Gated Community in Bshamoun",
                    About = "It is 500m2 on the inside plus a majestic 140m2 terrace.",
                    WhytoInvest = " potential rental income",
                    Size = 500,
                    Bedrooms = 4,
                    Bathrooms = 2,
                    PricePersqm = 1000,
                    Location = "Bshamoun",
                    PDate = DateTime.Now.AddMonths(-1),
                    IType = "Own and Gain",
                    investnow = 500,
                    price = 500000,
                  
                },

                new Property
                {
                    PType = "Appartment",
                    Title = "420 sqm Penthouse in Gated Community in Beirut",
                    About = "It is 420m2 on the inside plus a majestic 140m2 terrace.",
                    WhytoInvest = " potential rental income",
                    Size = 420,
                    Bedrooms = 4,
                    Bathrooms = 2,
                    PricePersqm = 1000,
                    Location = "Beirut",
                    PDate = DateTime.Now.AddMonths(-1),
                    IType = "Lease to sell",
                    investnow = 500,
                    price = 420000,
                  
                },
               
            };

            await context.Properties.AddRangeAsync(properties);
            await context.SaveChangesAsync();
        }
    }
}