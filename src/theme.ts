import { WeatherWidgetTheme } from './types/weatherWidget';

export const defaultTheme: WeatherWidgetTheme = {
  color: ['#b92b27', '#1565C0'],
  width: '500px',
  height: '650px',
  mainFontSize: '24px',
  subFontSize: '14px',
  mainFontColor: '#fff',
  subFontColor: '#fff',
  hrColor: '#fff',
  lineChartPadding: [20, 0, 10, -10],
  lineChartColor: '#fff',
  lineChartFontColor: '#fff',
  lineChartFontSize: 12,
  lineChartHeight: '100px'
};

export const nightTheme: WeatherWidgetTheme = {
  color: ['#1F1B24', '#1F1B24'],
  width: '500px',
  height: '650px',
  mainFontSize: '24px',
  subFontSize: '14px',
  mainFontColor: '#fff',
  subFontColor: '#fff',
  hrColor: '#fff',
  lineChartPadding: [20, 0, 10, -10],
  lineChartColor: '#fff',
  lineChartFontColor: '#fff',
  lineChartFontSize: 12,
  lineChartHeight: '100px'
};

export const dayTheme: WeatherWidgetTheme = {
  color: ['#fff', '#fff'],
  width: '500px',
  height: '650px',
  mainFontSize: '24px',
  subFontSize: '14px',
  mainFontColor: '#000',
  subFontColor: '#000',
  hrColor: '#000',
  lineChartPadding: [20, 0, 10, -10],
  lineChartColor: '#000',
  lineChartFontColor: '#000',
  lineChartFontSize: 12,
  lineChartHeight: '100px'
};