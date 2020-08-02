
/* eslint-disable */
import { LineChartData } from '../types/weatherWidget';
import { WeatherData } from '../types/weatherWidget';

export type FnReturningPromise = (...args: any[]) => Promise<any>;
export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;

const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const ICON_BASE_URL = 'http://openweathermap.org/img/wn/';

const getHourlyData = (
  hourlyData: WeatherData['hourly'], 
  from: number, 
  to: number
): LineChartData => {
  const data: LineChartData = {};
  hourlyData.slice(from, to).forEach(d => {
    data[`${new Date(d.dt * 1000).getHours()  }:00`] = Math.round(d.temp);
  });
  return data;
};

export {
  getHourlyData,
  ICON_BASE_URL,
  BASE_API_URL
};