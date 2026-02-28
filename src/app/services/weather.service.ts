import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurrentWeather, WeatherForecast } from '../models/travel.models';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly apiKey = environment.openWeatherApiKey;

  constructor(private http: HttpClient) {}

  getCurrent(city: string): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      `${this.baseUrl}/weather?q=${city}&lang=fr&appid=${this.apiKey}&units=metric`
    );
  }

  getForecast(city: string): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(
      `${this.baseUrl}/forecast/daily?q=${city}&cnt=5&lang=fr&appid=${this.apiKey}&units=metric`
    );
  }
}
