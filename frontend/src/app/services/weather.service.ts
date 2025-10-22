import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // This relative path will be proxied by Netlify
  // to our serverless function.
  private apiUrl = '/api/weather';

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<any> {
    const params = new HttpParams().set('city', city);
    return this.http.get(this.apiUrl, { params });
  }
}