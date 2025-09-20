using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using weather_app.Models;
using weather_app.Services;

namespace weather_app.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserService _service;
        public UserController(
            UserService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var users = _service.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetById(int id)
        {
            var user = _service.GetById(id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User value)
        {
            var createdUser = _service.Create(value);
            return Ok(createdUser);
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Put(int id, [FromBody] User value)
        {
            var updatedUser = _service.Update(id, value);
            return Ok(updatedUser);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var result = _service.Delete(id);
            return Ok(result);
        }


    }
}
