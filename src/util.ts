
import { TempChartProps } from './tempChart';
import { WeatherData } from './types/weatherWidget';

const ICON_BASE_URL = 'http://openweathermap.org/img/wn/';

const getHourlyData = (hourlyData: WeatherData['hourly']): TempChartProps['data'] => {
  const data: TempChartProps['data'] = [];
  hourlyData.slice(1, 6).forEach(d => {
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
  ICON_BASE_URL
};