import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UnsplashResponse } from '../models/travel.models';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private readonly baseUrl = 'https://api.unsplash.com/search/photos';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<UnsplashResponse> {
    const key = environment.unsplashApiKey;
    return this.http.get<UnsplashResponse>(`${this.baseUrl}?client_id=${key}&query=${query}`);
  }
}
