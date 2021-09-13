using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Properties
{
    public class Details
    {
        public class Query : IRequest<Result<Property>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Property>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                   _context = context;
            }
            public async Task<Result<Property>> Handle(Query request, CancellationToken cancellationToken)
            {
             
               var property = await _context.Properties.FindAsync(request.Id);
               return Result<Property>.Success(property);
            }
        }
    }
}