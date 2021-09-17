using System.Linq;
using Application.Properties;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Property, Property>();
            CreateMap<Property, PropertyDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Investors
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<PropertyInvestor, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
        
    }
}