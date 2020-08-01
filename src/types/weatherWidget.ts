export interface CurrentWeatherData {
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

export interface HourlyWeatherData {
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
  rain?: undefined | { '1h': number };
}

export interface DailyWeatherData {
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

export interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeatherData;
  hourly: HourlyWeatherData[];
  daily: DailyWeatherData[];
}

export type OpenWeatherMapExclude =
  ['main'] |
  ['daily'] |
  ['hourly'] |
  ['daily', 'hourly'] |
  ['main', 'daily'] |
  ['main', 'hourly'] |
  null |
  undefined;

export interface WeatherWidgetTheme {
  color: [string, string];
  width: string;
  height: string;
  mainFontSize: string;
  subFontSize: string;
  mainFontColor: string;
  subFontColor: string;
  hrColor: string;
  lineChartPadding: [number, number, number, number];
  lineChartColor: string;
  lineChartFontSize: number;
  lineChartFontColor: string;
  lineChartHeight: string;
}