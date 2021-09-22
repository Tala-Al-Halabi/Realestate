using System;
using System.Threading.Tasks;
using Application.Properties;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PropertiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProperties([FromQuery] PropertyParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }
        
        [Authorize]
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

        [Authorize(Policy = "IsPropertyHost")]
        [HttpDelete("{id}")]
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