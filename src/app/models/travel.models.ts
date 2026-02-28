export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Country {
  currencies: Currency[];
  flag: string;
}

export interface ExchangeRateResponse {
  conversion_result: number;
}

export interface WeatherCondition {
  icon: string;
  description: string;
}

export interface CurrentWeather {
  name: string;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export interface ForecastItem {
  dt: number;
  temp: { day: number };
  weather: { icon: string }[];
}

export interface WeatherForecast {
  list: ForecastItem[];
}

export interface UnsplashPhoto {
  urls: { regular: string };
}

export interface UnsplashResponse {
  results: UnsplashPhoto[];
}

export interface ForecastDay {
  day: string;
  temp: string;
  icon: string;
}
