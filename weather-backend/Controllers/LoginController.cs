using Microsoft.AspNetCore.Mvc;
using weather_app.Models;
using weather_app.Services;

namespace weather_app.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly LoginService _service;
        public LoginController(LoginService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Login payload)
        {
            var username = payload.Username;
            var password = payload.Password;
            User? user;
            var token = string.Empty;
            var result = _service.Login(username, password, out user, out token);
            if (result)
            {
                return Ok(new { user, token });
            }
            else
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }
        }

    }
}
