import { Component, OnInit } from '@angular/core';
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


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteModule, CardModule, ProgressSpinnerModule, ToastModule],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public longitude!: number;
  public latitude!: number;
  public showSpinner: boolean = false;
  public selectedCity!: City;
  public cities: City[] = [];
  public filteredCities: any[] = [];
  public currentWeather!: Weather;

  private subscriptions: Subscription;

  constructor(private messageService: MessageService, private weatherService: WeatherService) {
    this.subscriptions = new Subscription();
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
          console.log(foundCity)
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
            console.log(this.currentWeather);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No current weather found.' });
          }
          this.showSpinner = false;
        })
    );
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
          console.log(this.currentWeather);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No current weather found.' });
        }
        this.showSpinner = false;
      })
    );
  }
}
