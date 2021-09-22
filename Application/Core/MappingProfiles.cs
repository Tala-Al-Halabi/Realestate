using System.Linq;
using Application.Properties;
using Application.Comments;
using Application.Profiles;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;
            CreateMap<Property, Property>();
            CreateMap<Property, PropertyDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Investors
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<PropertyInvestor, InvestorDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<PropertyInvestor, UserPropertyDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Property.Id))
                .ForMember(d => d.PDate, o => o.MapFrom(s => s.Property.PDate))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Property.Title))
                .ForMember(d => d.IType, o => o.MapFrom(s => s.Property.IType))
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => 
                    s.Property.Investors.FirstOrDefault(x => x.IsHost).AppUser.UserName));

        }
    }
}