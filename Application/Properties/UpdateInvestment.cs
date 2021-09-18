
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties
{
    public class UpdateInvestment
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var property = await _context.Properties
                    .Include(a => a.Investors).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (property == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = property.Investors.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var investment = property.Investors.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (investment != null && hostUsername == user.UserName)
                    property.IsCancelled = !property.IsCancelled;

                if (investment != null && hostUsername != user.UserName)
                    property.Investors.Remove(investment);

                if (investment == null)
                {
                    investment = new PropertyInvestor
                    {
                        AppUser = user,
                        Property = property,
                        IsHost = false
                    };

                    property.Investors.Add(investment);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating investment");
            }
        }
    }
}