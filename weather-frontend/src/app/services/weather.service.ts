import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { City, Coordinate } from '../models/city.model';
import { Weather } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentLocation(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        observer.error('Geolocation is not supported by this browser.');
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

    public getCurrentWeather(coordinates: Coordinate): Observable<Weather> {
    return this.httpClient.get<Weather>(`${environment.API_URL}/api/Weather?lon=${coordinates.lon}&lat=${coordinates.lat}`).pipe(
      catchError(error => {
        console.error(error)
        return of({} as Weather)
      })
    )
  } 

  public getFiveDayWeather(coordinates: Coordinate): Observable<Weather[]> {
    return this.httpClient.get<Weather[]>(`${environment.API_URL}/api/Weather/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}`).pipe(
      catchError(error => {
        console.error(error)
        return of([] as Weather[])
      })
    )
  } 

  public getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(`../../../assets/data/cities.json`).pipe(
      catchError(error => {
        console.error(error)
        return of([] as City[])
      })
    )
  } 



}
