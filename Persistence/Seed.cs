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
                    About = "Located in a strategic area in the Metn Caza, Tilal El Fanar provides modern and comfortable housing built on an area of 23,000 sqm including 11,600 sqm of remarkably landscaped green spaces. Fanar is a booming suburban city where additional educational institutions, banks hospitals, commercial centers, and many other central establishments are daily seeing the light. It is 250 m above sea level, a ten-minute drive away from Beirut and twenty to twenty five minutes away from Keserwan district. The whole project is prudently guarded and gated. Tilal El Fanar takes pride in its high end material and specifications extended to every detail offering unique modern styles and refined forms. Along with its high quality standards and practicality, Tilal El Fanar provides various benefits and recreations:- Semi-Olympic swimming pool- Children swimming pool- Tennis and basketball courts- Indoor gymnasium- The interior of the apartment is characterized by its open view of the city and sea and mountain.It is 280m2 on the inside plus a majestic 140m2 terrace.",
                    WhytoInvest = "A quality Penthouse in a gate community in Al Fanar, which is 10 minutes away from Beirut. The community has 24/7 security, playgrounds, swimming pool, and gym, which makes it an ideal home for those who would like to the lifestyle they look for. This property used to sell at $835,000 before the financial crisis that hit Lebanon in 2019/2020, which makes a huge upside for price appreciation potential. Our targeted exit price is at or above $402,000, which delivers at least 25% capital gains for the investors. When we factor in the potential rental income, even at 50% vacancy, the total 5 year expected return ramps up to 39.6%.",
                    Size = "333 square meter in total. 140m2 terrace plus 280 indoors" ,
                    Bedrooms = "3 plus a maid bedroom" ,
                    Bathrooms = "3 plus a maid bathroom" ,
                    PricePersqm = 966,
                    Location = "Fanar",
                    PDate = DateTime.Now.AddMonths(-1),
                    IType = "Lease To Sell",
                    investnow = 500,
                    price = 321700,
                  
                },

                new Property
                {
                    PType = "Appartment",
                    Title = "125 sqm apartment in Klayat",
                    About = "This apartment is in a quiet part of Qlayaat, in brand new building, with an internal space of 125 sqm with open, unblock-able panoramic view over the mountains. Accessible yet calm street in the heart of Qlayaat, with minutes from Qlayaat Souk, primary roads, and all leisure facilities. 2 bedrooms |2 bathrooms | salon | dining | kitchen | entrance | family corner | reception maid room.",
                    WhytoInvest = " A quality simplex with very high finishing standards in a quite neighborhood in Klayat. This property used to sell at $250,000 before the financial crisis that hit Lebanon in 2019/2020, which makes a huge upside for price appreciation potential. This property is indented to be sold on a Lease-to-Own program, which will deliver an immediate 10% capital gains for the investors and an ongoing steady annual income of 4.8% (paid on a quarterly basis). The total 5 year expected return ramps up to 33.9% of your invested capital.",
                    Size = "125 sqm",
                    Bedrooms = "2",
                    Bathrooms = "2",
                    PricePersqm = 759,
                    Location = "Klayat",
                    PDate = DateTime.Now.AddMonths(-1),
                    IType = "Own and Gain",
                    investnow = 500,
                    price = 94900,
                  
                },

                new Property
                {
                    PType = "Appartment",
                    Title = "220 sqm Duplex in Gated Community in Ballouneh",
                    About = "Standing atop the hills of Ballouneh, Pinea is gated community built around a central common garden that brings the residents together in a community-like atmosphere. The landscape greenery within reflects the outside natural beauty that distinguishes the region. TECHNICAL SPECIFICATIONS: Pinea is conceived in accordance with the highest quality standards to provide residents with the very best in convenience, safety and practicality. General specifications and accommodations:- Visitors parking- Swimming pool- Gymnasium- landscaped area.- Security 24/7- Back up generators 24/7- Artesian well- Electricl earhing system- Anti-seismic design- External natural stone cladding- Double exterior walls- Waterproof protection for embedded walls- Water protection for terraces- Aluminium- SIDEM 2000 profile or equivalent- Electric rolling shutters in bedrooms- Double glazing- Lifts Mitsulift or equivalent.",
                    WhytoInvest = "A quality Duplex in a gated community in Ballouneh, which is the center of Keserwan and is suitable for both summer and winter. The community has 24/7 security, playgrounds, swimming pool, and gym, which makes it an ideal home for those who would like to the lifestyle they look for. This property used to sell at $290,000 before the financial crisis that hit Lebanon in 2019/2020, which makes a huge upside for price appreciation potential. This property is indented to be sold on a Lease-to-Own program, which will deliver an immediate 10% capital gains for the investors and an ongoing steady annual income of 4.3% (paid on a quarterly basis). The total 5 year expected return ramps up to 31.7% of your invested capital.",
                    Size = "220 sqm",
                    Bedrooms = "3",
                    Bathrooms = "4",
                    PricePersqm = 595,
                    Location = "Ballouneh",
                    PDate = DateTime.Now.AddMonths(-1),
                    IType = "Lease to sell",
                    investnow = 500,
                    price = 130900,
                  
                },

                 new Property
                {
                    PType = "Appartment",
                    Title = "220 sqm Duplex in Gated Community in Ballouneh",
                    About = "Standing atop the hills of Ballouneh, Pinea is gated community built around a central common garden that brings the residents together in a community-like atmosphere. The landscape greenery within reflects the outside natural beauty that distinguishes the region. TECHNICAL SPECIFICATIONS: Pinea is conceived in accordance with the highest quality standards to provide residents with the very best in convenience, safety and practicality. General specifications and accommodations:- Visitors parking- Swimming pool- Gymnasium- landscaped area.- Security 24/7- Back up generators 24/7- Artesian well- Electricl earhing system- Anti-seismic design- External natural stone cladding- Double exterior walls- Waterproof protection for embedded walls- Water protection for terraces- Aluminium- SIDEM 2000 profile or equivalent- Electric rolling shutters in bedrooms- Double glazing- Lifts Mitsulift or equivalent.",
                    WhytoInvest = "A quality Duplex in a gated community in Ballouneh, which is the center of Keserwan and is suitable for both summer and winter. The community has 24/7 security, playgrounds, swimming pool, and gym, which makes it an ideal home for those who would like to the lifestyle they look for. This property used to sell at $290,000 before the financial crisis that hit Lebanon in 2019/2020, which makes a huge upside for price appreciation potential. This property is indented to be sold on a Lease-to-Own program, which will deliver an immediate 10% capital gains for the investors and an ongoing steady annual income of 4.3% (paid on a quarterly basis). The total 5 year expected return ramps up to 31.7% of your invested capital.",
                    Size = "220 sqm",
                    Bedrooms = "3",
                    Bathrooms = "4",
                    PricePersqm = 595,
                    Location = "Ballouneh",
                    PDate = DateTime.Now.AddMonths(-1),
                    IType = "Lease to sell",
                    investnow = 500,
                    price = 130900,
                  
                },

                new Property
                {
                    PType = "Appartment",
                    Title = "3 BR Apartment in the Center of Aramoun. Strategic Location with Sea and Airport View",
                    About = "Located in center of Daouha Aramoun (next to the statue), next to schools, supermarkets, and the souk. 2 minutes drive to the main highway to Beirut. 5 minutes drive to the airport.",
                    WhytoInvest = "This property has been reserved by the home seeker with 10% downpayment, which makes its forecasted return very accurate with the agreement in place with the home seeker. Your investment will deliver 32.1% in 5 years. Your income will be paid on a quarterly basis.",
                    Size = "210 sqm",
                    Bedrooms = "3",
                    Bathrooms = "4",
                    PricePersqm = 429,
                    Location = "Aramoun",
                    PDate = DateTime.Now.AddMonths(-1),
                    IType = "Lease to sell",
                    investnow = 500,
                    price = 90000,
                  
                },
               
            };

            await context.Properties.AddRangeAsync(properties);
            await context.SaveChangesAsync();
        }
    }
}