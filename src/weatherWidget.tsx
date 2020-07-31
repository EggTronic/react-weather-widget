/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import { 
  WeatherData, 
  WeatherWidgetTheme,
  OpenWeatherMapExclude
} from './types/weatherWidget';
import useFetchWeather from './hooks/useFetchWeather';
import WeatherHeader from './weatherHeader';
import WeatherHourly from './weatherHourly';
import WeatherDaily from './weatherDaily';

const WeatherWrapper = styled.div`
  background-color: ${props => props.theme.color[0]};
  background-image: linear-gradient(
    19deg, 
    ${props => props.theme.color[0]} 0%, 
    ${props => props.theme.color[1]} 99%
  );
  width: ${props => props.theme.width};
  height: ${props => props.theme.height};
  border-radius: 4%;
  flex-direction: column;
  align-items: center;
  display: flex;
  top: 3vh;
  position: relative;
`;

const Hr = styled.div`
  width: 90%;
  height: 0;
  border-bottom: solid 1px ${props => props.theme.hrColor};
  opacity: 0.4;
  margin: 10px 0;
`;

export interface WeatherWidgetPorps {
  apiKey: string;
  geo?: {
    lat: string,
    lon: string
  } | string | null | undefined;
  theme?: WeatherWidgetTheme;
  exclude?: OpenWeatherMapExclude;
  dayRange?: [number, number];
  hourRange?: [number, number];
}

function WeatherWidget({
  apiKey,
  geo = null,
  theme = {
    color: ['#fff', '#fff'],
    width: '500px',
    height: '650px',
    mainFontSize: '24px',
    subFontSize: '18px',
    mainFontColor: '#000',
    subFontColor: '#000',
    hrColor: '#000'
  },
  exclude = null,
  dayRange = [1, 6],
  hourRange = [1, 6]
}: WeatherWidgetPorps) {
  const [
    errorMsg,
    loadingMsg,
    weatherData
  ] = useFetchWeather(apiKey, 'metric', exclude);

  const renderWediget = () => {
    if (loadingMsg) {
      return (
        <p style={{ fontSize: '30px', marginTop: '300px' }}>
          {loadingMsg}
        </p>
      );
    }

    if (errorMsg) {
      return (
        <p style={{ fontSize: '30px', marginTop: '300px' }}>
          {errorMsg}
        </p>
      );
    }

    return (
      <>
        <WeatherHeader
          today={(weatherData as WeatherData).daily[0]}
          current={(weatherData as WeatherData).current}
          timezone={(weatherData as WeatherData).timezone}
          theme={theme}
        />
        <Hr />
        <WeatherHourly
          hourly={(weatherData as WeatherData).hourly}
          theme={theme}
          range={hourRange}
        />
        <Hr />
        <WeatherDaily
          daily={(weatherData as WeatherData).daily}
          range={dayRange}
        />
      </>
    );
  };

  return (
    <WeatherWrapper 
      theme={theme}
    >
      {renderWediget()}
    </WeatherWrapper>
  );
}

export default WeatherWidget;
