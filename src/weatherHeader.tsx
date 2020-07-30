/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import { ICON_BASE_URL } from './util';

const WeatherHeaderWrapper = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  justify-content: space-evenly;
`;

const HeaderLeft = styled.div`
  width: 130px;
  text-align: right;
`;

const HeaderCenter = styled.div`
  height: 200px;
`;

const HeaderRight = styled.div`
  width: 130px;
  text-align: left;
`;
const WeatherIcon = styled.img`
  width: 130px;
  transform: translateY(-20%);
`;

interface WeatherHeaderProps {
  today: DailyWeatherData;
  current: CurrentWeatherData;
  timezone: WeatherData['timezone'];
}

function WeatherHeader({ today, current, timezone }: WeatherHeaderProps) {
  return (
    <WeatherHeaderWrapper>
      <HeaderLeft>
        <br />
        <br />
        <br />
        <p>
          <span role="img" aria-label="sun">☀️</span>
          {Math.round(today.temp.max)}°C
        </p>
        <br />
        <p>
          <span role="img" aria-label="ice">❄️</span>
          {Math.round(today.temp.min)}°C
        </p>
      </HeaderLeft>
      <HeaderCenter>
        <h1> {timezone.split('/')[1]} </h1>
        <h1>{Math.round(current.temp)}°C</h1>
        <WeatherIcon src={`${ICON_BASE_URL + current.weather[0].icon  }@2x.png`} />
        <p style={{ transform: 'translateY(-180%)' }}>{current.weather[0].description}</p>
      </HeaderCenter>
      <HeaderRight>
        <br />
        <br />
        <br />
        <p>
          <span role="img" aria-label="wind">💨</span>
          {current.wind_speed} m/sec
        </p>
        <br />
        <p>
          <span role="img" aria-label="drop">💧 </span>
          {current.humidity} %
        </p>
      </HeaderRight>
    </WeatherHeaderWrapper>
  );
}

export default WeatherHeader;
