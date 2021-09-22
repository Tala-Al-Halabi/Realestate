
using System;
using System.Text.Json.Serialization;

namespace Application.Profiles
{
    public class UserPropertyDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string IType { get; set; }
        public DateTime PDate { get; set; }

        [JsonIgnore]
        public string HostUsername { get; set; }
    }
}