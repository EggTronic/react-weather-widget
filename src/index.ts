import WeatherWidget from './weatherWidget';
import WeatherDaily from './weatherDaily';
import WeatherHeader from './weatherHeader';
import WeatherHourly from './weatherHourly';
import useFetchWeather from './hooks/useFetchWeather';
import useGeoLocation from './hooks/useGeoLocation';
import LineChart from './lineChart';

import {
  dayTheme,
  nightTheme,
  defaultTheme
} from './theme';

export * from './types/weatherWidget';

export {
  dayTheme,
  nightTheme,
  defaultTheme,
  useFetchWeather,
  useGeoLocation,
  WeatherDaily,
  WeatherHeader,
  WeatherHourly,
  LineChart
};

export default WeatherWidget;
