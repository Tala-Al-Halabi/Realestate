using System;
using Application.Properties;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PropertiesController : BaseApiController
    {
        
        [HttpGet]

        public async Task<IActionResult> GetProperties()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateProperty(Property property)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Property = property}));
        }
        [Authorize(Policy = "IsPropertyHost")]
        [HttpPut("{id}")]

        public async Task<IActionResult> EditProperty(Guid id, Property property)
        {
            property.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Property = property}));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsPropertyHost")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/invest")]
        public async Task<IActionResult> Invest(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateInvestment.Command{Id = id}));
        }
    }
} 