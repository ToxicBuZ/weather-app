using Microsoft.AspNetCore.Http.HttpResults;
using Newtonsoft.Json;
using weather_app.Models;
using weather_app.Models.DTOs;

namespace weather_app.Services
{
    public class WeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly WeatherConfig _weatherConfig;
        public WeatherService(HttpClient httpClient, WeatherConfig weatherConfig)
        {
            _httpClient = httpClient;
            _weatherConfig = weatherConfig;
        }

        public async Task<WeatherDto> GetCurrentWeather(string longitude, string latitude)
        {
            var key = _weatherConfig.ApiKey;
            var url = $"{_weatherConfig.BaseWeatherUrl}/weather?lat={latitude}&lon={longitude}&appid={key}&units=metric";

            var response = await _httpClient.GetAsync(url);

            response.EnsureSuccessStatusCode(); // Throws exception if not 2xx

            var content = await response.Content.ReadAsStringAsync();

            var weather = JsonConvert.DeserializeObject<OpenWeatherResponse>(content);

            if (weather == null)
            {
                throw new Exception("Failed to deserialize weather data.");
            }

            return new WeatherDto(weather);
        }

        public async Task<List<WeatherDto>> GetHourlyForecast(string longitude, string latitude)
        {
            var key = _weatherConfig.ApiKey;
            var url = $"{_weatherConfig.BaseWeatherUrl}/forecast?lat={latitude}&lon={longitude}&appid={key}&units=metric";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode(); // Throws exception if not 2xx
            var content = await response.Content.ReadAsStringAsync();
            var forecast = JsonConvert.DeserializeObject<OpenWeatherForecastResponse>(content);
            if (forecast == null)
            {
                throw new Exception("Failed to deserialize forecast data.");
            }
            var weatherDtos = new List<WeatherDto>();
            for (int i = 0; i < forecast.List.Count; i++)
            {
                weatherDtos.Add(new WeatherDto(forecast, i));
            }
            return weatherDtos;
        }
    }
}
