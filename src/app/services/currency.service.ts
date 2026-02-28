import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExchangeRateResponse } from '../models/travel.models';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private readonly baseUrl = 'https://v6.exchangerate-api.com/v6';

  constructor(private http: HttpClient) {}

  convert(from: string, to: string, amount: number): Observable<ExchangeRateResponse> {
    const key = environment.exchangeRateApiKey;
    return this.http.get<ExchangeRateResponse>(
      `${this.baseUrl}/${key}/pair/${from}/${to}/${amount}`
    );
  }
}
