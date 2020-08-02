import React from 'react';
import WeatherWidget,
{
  nightTheme,
  dayTheme,
  defaultTheme
} from './index';
import LineChart from './lineChart';
import { LineChartData } from './types/weatherWidget';

export default {
  title: 'WeatherWidget'
};

// this key is for demo only
const DEMO_KEY = '30144e247241962034bf8e683f76406b';

export const DefaultTheme = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}
  >
    <WeatherWidget apiKey={DEMO_KEY} theme={defaultTheme} />
  </div>
);

export const LightTheme = () => (
  <div style={{
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}
  >
    <WeatherWidget apiKey={DEMO_KEY} theme={dayTheme} />
  </div>
);

export const DarkTheme = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}
  >
    <WeatherWidget apiKey={DEMO_KEY} theme={nightTheme} />
  </div>
);

const data: LineChartData = {
  '1:00': 1,
  '2:00': 15,
  '3:00': 15,
  '4:00': 15,
  '5:00': 15,
  '6:00': 14,
};

export const Chart = () => (
  <div>
    <LineChart
      data={data}
      height='120px'
      width='500px'
      lineColor='#000'
      labelColor='#000'
    />
  </div>
);