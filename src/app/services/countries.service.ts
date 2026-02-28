import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/travel.models';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly baseUrl = 'https://restcountries.com/v2/capital';

  constructor(private http: HttpClient) {}

  getByCapital(capital: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/${capital}`);
  }
}
