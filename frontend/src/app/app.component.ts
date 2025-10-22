import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import
import { FormsModule } from '@angular/forms'; // <-- Import
import { WeatherService } from './services/weather.service';


@Component({
  selector: 'app-root',
  standalone: true, // <-- Mark as standalone
  imports: [
    CommonModule, // <-- Add CommonModule for *ngIf, pipes, etc.
    FormsModule   // <-- Add FormsModule for [(ngModel)]
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  city: string = 'London';
  weatherData: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    if (!this.city) {
      this.error = "Please enter a city name.";
      return;
    }

    this.loading = true;
    this.weatherData = null;
    this.error = null;

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Could not fetch weather data. Check the city name or try again.';
        this.loading = false;
      }
    });
  }
}