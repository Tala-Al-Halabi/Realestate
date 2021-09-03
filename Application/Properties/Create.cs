using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Properties
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Property Property { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> 
        {
            public CommandValidator()
            {
                RuleFor(x => x.Property).SetValidator(new PropertyValidator());
            }
            
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                 _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Properties.Add(request.Property);
                var result = await _context.SaveChangesAsync() > 0 ;
                if (!result) return Result<Unit>.Failure("Failed to create property");
                return Result<Unit>.Success(Unit.Value);
                
            }
        }
    }
}