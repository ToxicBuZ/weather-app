using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using weather_app.Models;
using weather_app.Services;

namespace weather_app.Controllers
{
    [Route("api/[controller]")]
    public class WeatherController : Controller
    {
        private readonly WeatherService _service;
        public WeatherController(WeatherService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get(string lon, string lat)
        {
            return Ok(await _service.GetCurrentWeather(lon, lat));
        }

        [HttpGet("forecast")]
        [Authorize]
        public async Task<IActionResult> GetHourlyForecast(string lon, string lat)
        {
            return Ok(await _service.GetHourlyForecast(lon, lat));
        }

    }
}
