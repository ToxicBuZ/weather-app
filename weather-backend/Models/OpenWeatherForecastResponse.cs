namespace weather_app.Models
{
    public class OpenWeatherForecastResponse
    {
        public string Cod { get; set; } = string.Empty;
        public int Message { get; set; }
        public int Cnt { get; set; }
        public List<OpenWeatherResponse> List { get; set; } = new List<OpenWeatherResponse>();
        public City City { get; set; } = new City();
    }

    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Coord Coord { get; set; } = new Coord();
        public string Country { get; set; } = string.Empty;
        public int Population { get; set; }
        public int Timezone { get; set; }
        public int Sunrise { get; set; }
        public int Sunset { get; set; }
    }
}