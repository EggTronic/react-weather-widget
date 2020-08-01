
/* eslint-disable */
import { TempChartProps } from '../tempChart';
import { WeatherData } from '../types/weatherWidget';


export type FnReturningPromise = (...args: any[]) => Promise<any>;
export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;

const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const ICON_BASE_URL = 'http://openweathermap.org/img/wn/';

const getHourlyData = (
  hourlyData: WeatherData['hourly'], 
  from: number, 
  to: number
): TempChartProps['data'] => {
  const data: TempChartProps['data'] = [];
  hourlyData.slice(from, to).forEach(d => {
    data.push({
      hour: `${new Date(d.dt * 1000).getHours()  }:00`,
      value: Math.round(d.temp)
    });
  });
  return data;
};

// const getExclude = (exclude: ): string[] => {
//   const exclude = [];

//   return 
// }

export {
  getHourlyData,
  ICON_BASE_URL,
  BASE_API_URL
};