using System;
using Application.Properties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
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

        [HttpPut("{id}")]

        public async Task<IActionResult> EditProperty(Guid id, Property property)
        {
            property.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Property = property}));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
} 