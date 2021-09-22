using System;
using Application.Core;

namespace Application.Properties
{
    public class PropertyParams : PagingParams
    {
        public bool IsInvesting { get; set; }
        public bool IsHost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}