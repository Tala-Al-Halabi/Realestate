using System;
using System.Collections.Generic;

namespace Domain
{
    public class Property
    {
        public Guid Id { get; set; }
        public string PType { get; set; }
        public string Title { get; set; }
        public string About { get; set; }
        public  string WhytoInvest { get; set; }
        public string Size { get; set; }
        public string Bedrooms { get; set; }
        public string Bathrooms { get; set; }
        public double PricePersqm { get; set; }
        public string Location { get; set; }
        public DateTime PDate { get; set; }
        public string IType { get; set; }
        public double investnow { get; set; }
        public double price { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<PropertyInvestor> Investors { get; set; } = new List<PropertyInvestor>();

    }

    
}