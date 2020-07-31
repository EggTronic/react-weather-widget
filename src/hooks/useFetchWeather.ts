import useAsync from './useAsync';
import useGeoLocation from './useGeoLocation';
import { OpenWeatherMapExclude } from '../types/weatherWidget';

/**
 * 
 * @param key api key from openweathermap
 * @param units 
 *        For temperature in Fahrenheit, use units=imperial
 *        For temperature in Celsius, use units=metric
 *        Kelvin is used by default, so there is no need to use the units parameter in the API call if you want this
 * @param exclude https://openweathermap.org/api/one-call-api
 */
export default function useFetchWeather(
  key: string,
  units?: string,
  exclude?: OpenWeatherMapExclude
) {
  const { latitude, longitude, loading, error } = useGeoLocation();

  const state = useAsync(async () => {
    if (loading) return { loading: true };
    if (error) return { error, loading: false };
    const url = 'https://api.openweathermap.org/data/2.5/onecall?' +
      `lat=${latitude}` +
      `&lon=${longitude}` +
      `${units ? `&units=${units}` : ''}` +
      `${exclude ? `&exclude=${exclude.join(',')}` : ''}` +
      `&appid=${key}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }, [latitude, longitude, loading, error]);

  const errorMsg: string | undefined
    = state.value?.error?.message
    || state.error?.message;

  /** there is a hack to check if it is currently loading geo or weather data
    * if loading is true then geo is loading.
    * if geo loaded, and if there is no error and no timezone 
    * then weather is loading.
    */
  let loadingMsg: string | null = null;
  if (loading) {
    loadingMsg = 'Geo Locating ...';
  } else if (!state.value.timezone && !errorMsg) {
    loadingMsg = 'Fetching Weather Data ...';
  }

  const weatherData: WeatherData | null
    = state.value
      ? state.value
      : null;

  return [errorMsg, loadingMsg, weatherData];
}