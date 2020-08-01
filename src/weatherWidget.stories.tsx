import React from 'react';
import WeatherWidget,
{
  nightTheme,
  dayTheme,
  defaultTheme
} from './index';

export default {
  title: 'WeatherWidget'
};

// this key is for demo only
const DEMO_KEY = '30144e247241962034bf8e683f76406b';

export const DefaultTheme = () => (
  <div>
    <WeatherWidget apiKey={DEMO_KEY} theme={defaultTheme} />
  </div>
);

export const LightTheme = () => (
  <div>
    <WeatherWidget apiKey={DEMO_KEY} theme={dayTheme} />
  </div>
);

export const DarkTheme = () => (
  <div>
    <WeatherWidget apiKey={DEMO_KEY} theme={nightTheme} />
  </div>
);