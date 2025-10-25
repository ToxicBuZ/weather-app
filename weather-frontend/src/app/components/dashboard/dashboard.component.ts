import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { City, Coordinate } from '../../models/city.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Weather } from '../../models/weather.model';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    CardModule,
    DividerModule,
    DataViewModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public longitude!: number;
  public latitude!: number;
  public showSpinner: boolean = false;
  public selectedCity!: City;
  public cities: City[] = [];
  public filteredCities: any[] = [];
  public currentWeather!: Weather;
  public fiveDayWeather: Weather[] = [];
  // instead of describing everypossible value and need to maintain later
  public weatherIconMapper!: any;
  public dayArray: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  private subscriptions: Subscription;

  constructor(private messageService: MessageService, private weatherService: WeatherService) {
    this.subscriptions = new Subscription();
    this.weatherIconMapper = {
      'clear sky': 'wi-day-sunny text-orange-700',
      'few clouds': 'wi-cloudy text-gray-500',
      'scattered clouds': 'wi-cloud text-gray-600',
      'broken clouds': 'wi-day-sunny-overcast text-gray-700',
      'overcast clouds': 'wi-day-sunny-overcast text-orange-700',
      'shower rain': 'wi-showers text-blue-200',
      rain: 'wi-rain text-blue-400',
      thunderstorm: 'wi-thunderstorm text-purple-500',
      snow: 'wi-snow text-gray-400',
      mist: 'wi-fog text-gray-900'
    };
  }

  async ngOnInit() {
    this.showSpinner = true;
    const position: GeolocationPosition = await firstValueFrom(this.weatherService.getCurrentLocation());
    this.longitude = position.coords.longitude;
    this.latitude = position.coords.latitude;
    this.subscriptions.add(
      this.weatherService.getCities().subscribe((response: City[]) => {
        if (response && response.length > 0) {
          const sortedResponse: City[] = response.sort((a, b) => a.country.localeCompare(b.country));
          this.cities = sortedResponse;
          this.filteredCities = sortedResponse;
          let foundCity!: City;
          let smallestDifference: number = 99999999999999;
          sortedResponse.forEach(city => {
            let differenceLat = Math.abs(city.coord.lat - this.latitude);
            let differenceLon = Math.abs(city.coord.lon - this.longitude);
            if (differenceLat + differenceLon < smallestDifference) {
              foundCity = city;
              smallestDifference = differenceLat + differenceLat;
            }
          });
          this.selectedCity = foundCity;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No data found.' });
        }
        this.showSpinner = false;
      })
    );
    this.subscriptions.add(
      this.weatherService
        .getCurrentWeather({ lon: this.longitude, lat: this.latitude } as Coordinate)
        .subscribe((response: Weather) => {
          if (response) {
            this.currentWeather = response;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No current weather found.' });
          }
          this.showSpinner = false;
        })
    );
    this.subscriptions.add(
      this.weatherService
        .getFiveDayWeather({ lon: this.longitude, lat: this.latitude } as Coordinate)
        .subscribe((response: Weather[]) => {
          if (response) {
            const forecastStart = response[0].forecastDateTime.split('T')[1];
            
            this.fiveDayWeather = response.filter((f: Weather) => f.forecastDateTime.includes(forecastStart));
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No five day weather found.' });
          }
          this.showSpinner = false;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public filterCity(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.cities as any[]).length; i++) {
      let city = (this.cities as any[])[i];
      const displayValue = `${city.country} - ${city.name}`;
      if (displayValue.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(city);
      }
    }
    this.filteredCities = filtered;
  }

  public onCitySelect(): void {
    this.showSpinner = true;
    this.subscriptions.add(
      this.weatherService.getCurrentWeather(this.selectedCity.coord).subscribe((response: Weather) => {
        if (response) {
          this.currentWeather = response;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No current weather found.' });
        }
        this.showSpinner = false;
      })
    );
    this.subscriptions.add(
      this.weatherService.getFiveDayWeather(this.selectedCity.coord).subscribe((response: Weather[]) => {
        if (response) {
          const forecastStart = response[0].forecastDateTime.split('T')[1];
          this.fiveDayWeather = response.filter((f: Weather) => f.forecastDateTime.includes(forecastStart));
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No five day weather found.' });
        }
        this.showSpinner = false;
      })
    );
  }

  public getDay(weather: Weather): string {
    return this.dayArray[new Date(weather.forecastDateTime).getDay()];
  }
}
