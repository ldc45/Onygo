import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { CountriesService } from './services/countries.service';
import { CurrencyService } from './services/currency.service';
import { WeatherService } from './services/weather.service';
import { PhotosService } from './services/photos.service';
import { ForecastDay } from './models/travel.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logo = 'assets/images/logo.png';
  photodeProfilKilian = 'assets/images/photo-profil-Kilian.jpg';
  photodeProfilLudo = 'assets/images/photo-profil-Ludo.jpg';
  photodeProfilMika = 'assets/images/photo-profil-Michael.jpg';

  showMe = false;
  loading = false;
  errorMessage: string | null = null;

  inputDepart = new FormControl('');
  inputDestination = new FormControl('');
  budget = new FormControl('');

  flagdepart = '';
  flagarrive = '';
  symboleDevisedepart = '';
  symboleDevisearrive = '';
  montant = '';
  cityName = '';
  date = '';
  temp = '';
  codeImage = '';
  description = '';
  feels = '';
  humidity = 0;
  windSpeed = 0;
  forecastDays: ForecastDay[] = [];
  photos: string[] = [];

  private readonly jourSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  constructor(
    private countriesService: CountriesService,
    private currencyService: CurrencyService,
    private weatherService: WeatherService,
    private photosService: PhotosService
  ) {}

  afficherResultat(): void {
    const departure = this.inputDepart.value;
    const destination = this.inputDestination.value;
    const amount = Number(this.budget.value) || 0;

    if (!departure || departure === 'Départ' || !destination || destination === 'Destination') {
      this.errorMessage = 'Veuillez sélectionner une ville de départ et une destination.';
      return;
    }

    this.loading = true;
    this.showMe = false;
    this.errorMessage = null;

    forkJoin([
      this.countriesService.getByCapital(departure),
      this.countriesService.getByCapital(destination)
    ]).pipe(
      switchMap(([departureData, destinationData]) => {
        this.flagdepart = departureData[0].flag;
        this.symboleDevisedepart = departureData[0].currencies[0].symbol;
        this.flagarrive = destinationData[0].flag;
        this.symboleDevisearrive = destinationData[0].currencies[0].symbol;

        const codeDepart = departureData[0].currencies[0].code;
        const codeDestination = destinationData[0].currencies[0].code;

        return forkJoin([
          this.currencyService.convert(codeDepart, codeDestination, amount),
          this.weatherService.getCurrent(destination),
          this.weatherService.getForecast(destination),
          this.photosService.search(destination)
        ]);
      }),
      catchError(() => {
        this.errorMessage = 'Une erreur est survenue. Vérifiez vos sélections et réessayez.';
        this.loading = false;
        return EMPTY;
      })
    ).subscribe(([exchangeData, weatherData, forecastData, photosData]) => {
      this.montant = exchangeData.conversion_result.toFixed(0);

      this.cityName = weatherData.name;
      this.temp = `${weatherData.main.temp.toFixed(0)}°C`;
      this.codeImage = weatherData.weather[0].icon;
      this.description = weatherData.weather[0].description;
      this.feels = `${weatherData.main.feels_like.toFixed(0)}°C`;
      this.humidity = weatherData.main.humidity;
      this.windSpeed = weatherData.wind.speed;
      this.date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

      this.forecastDays = forecastData.list.slice(1, 5).map(item => ({
        day: this.jourSemaine[new Date(item.dt * 1000).getDay()],
        temp: `${item.temp.day.toFixed(0)}°C`,
        icon: item.weather[0].icon
      }));

      this.photos = photosData.results.slice(0, 3).map(p => p.urls.regular);

      this.loading = false;
      this.showMe = true;
    });
  }
}
