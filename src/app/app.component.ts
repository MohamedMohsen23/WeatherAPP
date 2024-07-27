import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  weatherData: any;
  displayWeather(weather: any) {
    this.weatherData = weather;
  }
  
}