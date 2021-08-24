using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Properties
{
    public class Details
    {
        public class Query : IRequest<Property>
        {
            public Guid ID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Property>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                   _context = context;
            }
            public async Task<Property> Handle(Query request, CancellationToken cancellationToken)
            {
             
               return await _context.Properties.FindAsync(request.ID);
            }
        }
    }
}