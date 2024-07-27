import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../../services/weather.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  city: string = '';
  @Output() cityWeather = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) {}

  searchCity() {
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe(
        (response: any) => {
          console.log(response);
          this.cityWeather.emit(response);
        },
        (error: any) => {
          this.cityWeather.emit('error');
          console.error('Error fetching weather data', error);
        }
      );
    }
  }
}