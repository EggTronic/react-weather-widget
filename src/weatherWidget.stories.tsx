import React from 'react';
import { WeatherWidget } from './index';

export default {
  title: 'WeatherWidget'
};

// this key is for demo only
const DEMO_KEY = '30144e247241962034bf8e683f76406b';

export const Default = () => (
  <WeatherWidget apiKey={DEMO_KEY} />
);
