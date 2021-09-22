using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<PropertyDto>>>
        {
            public PropertyParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<PropertyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<PropertyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Properties
                    .Where(d => d.PDate >= request.Params.StartDate)
                    .OrderBy(d => d.PDate)
                    .ProjectTo<PropertyDto>(_mapper.ConfigurationProvider,
                        new { currentUsername = _userAccessor.GetUsername() })
                    .AsQueryable();

                if (request.Params.IsInvesting && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Investors.Any(a => a.Username == _userAccessor.GetUsername()));
                }

                if (request.Params.IsHost && !request.Params.IsInvesting)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                }

                return Result<PagedList<PropertyDto>>.Success(
                    await PagedList<PropertyDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)
                );
            }
        }
    }
}