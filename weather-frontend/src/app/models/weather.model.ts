export interface Weather {
  longitude: string;
  latitude: string;
  description: string;
  weatherMain: string;
  icon: string;
  temperature: number;
  humidity: number;
  minTemperature: number;
  maxTemperature: number;
  windSpeed: number;
  windDegree: number;
  country: string;
  city: string;
  forecastDateTime: Date;
}