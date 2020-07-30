/* eslint-disable import/no-extraneous-dependencies, react/require-default-props */
import React from 'react';
import styled from 'styled-components';
import TempChart from './tempChart';
import { getHourlyData, ICON_BASE_URL } from './util';

const WeatherHourlyWrapper = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const WeatherHourlySection = styled.div`
  width: 500px;
  height: 4vh;
  display: flex;
  justify-content: space-evenly;
`;

const HourlyCard = styled.div`
  width: 100px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

interface WeatherHourlyProps {
  hourly: WeatherData['hourly'];
  from?: number;
  to?: number;
}

function WeatherHourly({ hourly, from = 1, to = 6 }: WeatherHourlyProps) {
  const hourlyData = hourly.slice(from, to);

  return (
    <WeatherHourlyWrapper>
      <WeatherHourlySection>
        {hourlyData.map(hourData =>
          <HourlyCard key={hourData.dt}>
            <h2>{new Date(hourData.dt * 1000).getHours()}:00</h2>
          </HourlyCard>
        )}

      </WeatherHourlySection>
      <TempChart 
        data={getHourlyData(hourly)} 
        height="100px"
        width="530px"
        padding={[20, 30, 10, -10]}
        pure={true}
      />
      <WeatherHourlySection>
        {hourlyData.map(hourData =>
          <HourlyCard key={hourData.dt}>
            <img src={`${ICON_BASE_URL + hourData.weather[0].icon  }.png`} alt='weather-info' />
          </HourlyCard>
        )}
      </WeatherHourlySection>
    </WeatherHourlyWrapper>
  );
}

export default WeatherHourly;
