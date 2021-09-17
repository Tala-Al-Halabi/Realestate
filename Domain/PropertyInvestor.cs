using System;

namespace Domain
{
    public class PropertyInvestor
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid PropertyId { get; set; }
        public Property Property { get; set; }
        public bool IsHost { get; set; }
    }
}