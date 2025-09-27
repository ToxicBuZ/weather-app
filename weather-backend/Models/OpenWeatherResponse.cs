namespace weather_app.Models
{
    public class OpenWeatherResponse
    {
        public Coord Coord { get; set; } = new Coord();
        public List<Weather> Weather { get; set; } = new List<Weather>();
        public string Base { get; set; } = string.Empty;
        public Main Main { get; set; } = new Main();
        public int Visibility { get; set; }
        public Wind Wind { get; set; } = new Wind();
        public Clouds Clouds { get; set; } = new Clouds();
        public int Dt { get; set; }
        public Sys Sys { get; set; } = new Sys();    
        public int Timezone { get; set; }
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Cod { get; set; }
    }
    public class Coord
    {
        public double Lon { get; set; }
        public double Lat { get; set; }
    }
    public class Weather
    {
        public int Id { get; set; }
        public string Main { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }
    public class Main
    {
        public double Temp { get; set; }
        public double Feels_Like { get; set; }
        public double Temp_Min { get; set; }
        public double Temp_Max { get; set; }
        public int Pressure { get; set; }
        public int Humidity { get; set; }
        public int Sea_Level { get; set; }
        public int Grnd_Level { get; set; }
    }
    public class Wind
    {
        public double Speed { get; set; }
        public int Deg { get; set; }
    }
    public class Clouds
    {
        public int All { get; set; }
    }
    public class Sys
    {
        public int Type { get; set; }
        public int Id { get; set; }
        public string Country { get; set; } = string.Empty;
        public int Sunrise { get; set; }
        public int Sunset { get; set; }
    }
}

