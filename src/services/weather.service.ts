import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '81d21fb86bf64518bc9212955242607'; 
  private apiUrl = 'https://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?key=${this.apiKey}&q=${city}`);
  }
}