using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListProperties
    {
        public class Query : IRequest<Result<List<UserPropertyDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserPropertyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserPropertyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PropertyInvestors
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Property.PDate)
                    .ProjectTo<UserPropertyDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.PDate <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.PDate >= DateTime.Now)
                };

                var properties = await query.ToListAsync();

                return Result<List<UserPropertyDto>>.Success(properties);
            }
        }
    }
}