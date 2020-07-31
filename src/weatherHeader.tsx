/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import {
  WeatherData,
  DailyWeatherData,
  CurrentWeatherData,
  WeatherWidgetTheme
} from './types/weatherWidget';
import { ICON_BASE_URL } from './util';

const WeatherHeaderWrapper = styled.div`
  width: ${(props: {theme:WeatherWidgetTheme}) => props.theme.width};
  height: 200px;
  display: flex;
  justify-content: space-evenly;
  h1 {
    margin: 2px;
  }
  p {
    color: ${(props: {theme:WeatherWidgetTheme}) => props.theme.subFontColor};
    font-size: ${(props: {theme:WeatherWidgetTheme}) => props.theme.subFontSize};
    padding-right: 8px;
    padding-left: 8px;
    text-align: center;
  }
`;

const HeaderLeft = styled.div`
  width: 130px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin-top: 2em;
  }
`;

const HeaderCenter = styled.div`
  height: 200px;
  text-align: center;
`;

const HeaderRight = styled.div`
  width: 130px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin-top: 2em;
  }
`;

const WeatherIcon = styled.img`
  width: 130px;
  transform: translateY(-20%);
`;

interface WeatherHeaderProps {
  today: DailyWeatherData;
  current: CurrentWeatherData;
  timezone: WeatherData['timezone'];
  theme: WeatherWidgetTheme;
}

function WeatherHeader(
  { today,
    current,
    timezone,
    theme
  }: WeatherHeaderProps) {
  return (
    <WeatherHeaderWrapper theme={theme}>
      <HeaderLeft theme={theme}>
        <br />
        <br />
        <br />
        <p>
          <span role="img" aria-label="sun">☀️</span>
          <br />
          {Math.round(today.temp.max)}°C
        </p>
        <br />
        <p>
          <span role="img" aria-label="ice">❄️</span>
          <br />
          {Math.round(today.temp.min)}°C
        </p>
      </HeaderLeft>
      <HeaderCenter theme={theme}>
        <h1> {timezone.split('/')[1]} </h1>
        <h1>{Math.round(current.temp)}°C</h1>
        <WeatherIcon src={`${ICON_BASE_URL + current.weather[0].icon}@2x.png`} />
        <p style={{ transform: 'translateY(-280%)' }}>{current.weather[0].description}</p>
      </HeaderCenter>
      <HeaderRight theme={theme}>
        <br />
        <br />
        <br />
        <p>
          <span role="img" aria-label="wind">💨</span>
          <br />
          {current.wind_speed} m/s
        </p>
        <br />
        <p>
          <span role="img" aria-label="drop">💧</span>
          <br />
          {current.humidity} %
        </p>
      </HeaderRight>
    </WeatherHeaderWrapper>
  );
}

export default WeatherHeader;
