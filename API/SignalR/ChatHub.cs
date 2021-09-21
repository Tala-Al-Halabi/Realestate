using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.PropertyId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var propertyId = httpContext.Request.Query["propertyId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, propertyId);
            var result = await _mediator.Send(new List.Query{PropertyId = Guid.Parse(propertyId)});
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}