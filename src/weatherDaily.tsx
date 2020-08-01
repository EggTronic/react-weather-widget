import React from 'react';
import styled from 'styled-components';
import { DailyWeatherData, WeatherWidgetTheme } from './types/weatherWidget';
import { ICON_BASE_URL } from './utils/index';

const WeatherDailyWrapper = styled.div`
  width: ${(props: { theme: WeatherWidgetTheme }) => props.theme.width};
  display: flex;
  justify-content: space-between;
  font-size: ${(props: {theme:WeatherWidgetTheme}) => props.theme.subFontSize};
  color: ${(props: {theme:WeatherWidgetTheme}) => props.theme.subFontColor};
  h2 {
    margin: 0;
    font-size: ${(props: {theme:WeatherWidgetTheme}) => props.theme.mainFontSize};
  }
`;

const DailyCard = styled.div`
  width: 100px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface WeatherDailyProps {
  daily: DailyWeatherData[];
  from: number;
  to: number;
}

function WeatherDaily({ daily, from = 1, to = 6 }: WeatherDailyProps) {
  const dailyData = daily.slice(from, to);

  return (
    <WeatherDailyWrapper>
      {dailyData.map(dayData =>
        <DailyCard key={dayData.dt}>
          <h2>{days[new Date(dayData.dt * 1000).getDay()]}</h2>
          <img
            src={`${ICON_BASE_URL + dayData.weather[0].icon}.png`}
            alt='weather-info'
          />
          <p>
            {Math.round(dayData.temp.max)} - {Math.round(dayData.temp.min)}°C
          </p>
          <span role="img" aria-label="drop">💧 </span>
          <p>{dayData.humidity}%</p>
        </DailyCard>
      )}
    </WeatherDailyWrapper>
  );
}

export default WeatherDaily;
