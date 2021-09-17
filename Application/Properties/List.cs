using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Properties
{
    public class List
    {
        public class Query : IRequest<Result<List<PropertyDto>>> { }



        public class Handler : IRequestHandler<Query, Result<List<PropertyDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;
            public Handler(DataContext context, ILogger<List> logger, IMapper mapper)
            {
                _mapper = mapper;
                _logger = logger;
                _context = context;

            }

            public async Task<Result<List<PropertyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var properties = await _context.Properties
                    .ProjectTo<PropertyDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<PropertyDto>>.Success(properties);
            }
        }

    }
}