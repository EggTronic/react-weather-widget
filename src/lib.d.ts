declare interface CurrentWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

declare interface HourlyWeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number;
  rain?: undefined | {'1h': number};
}

declare interface DailyWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: number;
  pop: number;
  rain?: number | undefined;
  uvi: number;
}

declare interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeatherData;
  hourly: HourlyWeatherData[];
  daily: DailyWeatherData[];
}

declare interface WeatherWidgetPorps {
  apiKey: string;
  width?: number;
  height?: number;
  geo?: {
    lat: string,
    lon: string
  }
  theme?: {
    color?: [string, string];
    mainFontSize?: string | number; 
    subFontSize?: string | number;
    mainFontColor?: string;
    subFontColor?: string;
  };
  exclude?: 
  ['main'] |
  ['daily'] |
  ['hourly'] |
  ['daily', 'hourly'] |
  ['main', 'daily'] |
  ['main', 'hourly']
  ;
  dayRange?: number;
  hourRange?: number;
}