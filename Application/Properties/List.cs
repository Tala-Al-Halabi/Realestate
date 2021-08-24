using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Properties
{
    public class List
    {
        public class Query : IRequest<List<Property>> { }



        public class Handler : IRequestHandler<Query, List<Property>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;

            }

            public async Task<List<Property>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Properties.ToListAsync(cancellationToken);
            }
        }

    }
}