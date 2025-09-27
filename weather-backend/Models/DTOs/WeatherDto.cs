namespace weather_app.Models.DTOs
{
    public class WeatherDto
    {
        public WeatherDto(OpenWeatherResponse openWeatherResponse)
        {
            this.Longitude = openWeatherResponse.Coord.Lon.ToString();
            this.Latitude = openWeatherResponse.Coord.Lat.ToString();
            this.Description = openWeatherResponse.Weather.FirstOrDefault()?.Description ?? string.Empty;
            this.WeatherMain = openWeatherResponse.Weather.FirstOrDefault()?.Main ?? string.Empty;
            this.Icon = openWeatherResponse.Weather.FirstOrDefault()?.Icon ?? string.Empty;
            this.Temperature = openWeatherResponse.Main.Temp;
            this.Humidity = openWeatherResponse.Main.Humidity;
            this.MinTemperature = openWeatherResponse.Main.Temp_Min;
            this.MaxTemperature = openWeatherResponse.Main.Temp_Max;
            this.WindSpeed = openWeatherResponse.Wind.Speed;
            this.WindDegree = openWeatherResponse.Wind.Deg;
            this.Country = openWeatherResponse.Sys.Country;
            this.City = openWeatherResponse.Name;
            this.ForecastDateTime = DateTimeOffset.FromUnixTimeSeconds(openWeatherResponse.Dt).UtcDateTime;
        }

        public WeatherDto(OpenWeatherForecastResponse openWeatherForecastResponse, int index)
        {
            this.Longitude = openWeatherForecastResponse.City.Coord.Lon.ToString();
            this.Latitude = openWeatherForecastResponse.City.Coord.Lat.ToString();
            this.Country = openWeatherForecastResponse.City.Country;
            this.City = openWeatherForecastResponse.City.Name;
            this.Description = openWeatherForecastResponse.List[index].Weather.FirstOrDefault()?.Description ?? string.Empty;
            this.WeatherMain = openWeatherForecastResponse.List[index].Weather.FirstOrDefault()?.Main ?? string.Empty;
            this.Icon = openWeatherForecastResponse.List[index].Weather.FirstOrDefault()?.Icon ?? string.Empty;
            this.Temperature = openWeatherForecastResponse.List[index].Main.Temp;
            this.Humidity = openWeatherForecastResponse.List[index].Main.Humidity;
            this.MinTemperature = openWeatherForecastResponse.List[index].Main.Temp_Min;
            this.MaxTemperature = openWeatherForecastResponse.List[index].Main.Temp_Max;
            this.WindSpeed = openWeatherForecastResponse.List[index].Wind.Speed;
            this.WindDegree = openWeatherForecastResponse.List[index].Wind.Deg;
            this.ForecastDateTime = DateTimeOffset.FromUnixTimeSeconds(openWeatherForecastResponse.List[index].Dt).UtcDateTime;
        }

        public string Longitude { get; set; } = string.Empty;
        public string Latitude { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WeatherMain { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public double Temperature { get; set; } = 0.0;
        public double Humidity { get; set; } = 0.0;
        public double MinTemperature { get; set; } = 0.0;
        public double MaxTemperature { get; set; } = 0.0;
        public double WindSpeed { get; set; } = 0.0;
        public int WindDegree { get; set; } = 0;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public DateTime ForecastDateTime { get; set; } = new DateTime();
    }
}