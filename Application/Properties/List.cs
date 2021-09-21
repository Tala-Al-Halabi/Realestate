using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties {
    public class List
    {
        public class Query : IRequest<Result<List<PropertyDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<PropertyDto>>>
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

            public async Task<Result<List<PropertyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var properties = await _context.Properties
                    .ProjectTo<PropertyDto>(_mapper.ConfigurationProvider, 
                        new {currentUsername = _userAccessor.GetUsername()})
                    .ToListAsync(cancellationToken);

                return Result<List<PropertyDto>>.Success(properties);
            }
        }
    }
}