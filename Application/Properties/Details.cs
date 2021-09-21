using System;
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
    public class Details
    {
        public class Query : IRequest<Result<PropertyDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PropertyDto>>
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

            public async Task<Result<PropertyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var property = await _context.Properties
                    .ProjectTo<PropertyDto>(_mapper.ConfigurationProvider, 
                        new {currentUsername = _userAccessor.GetUsername()})
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<PropertyDto>.Success(property);
            }
        }
    }
}