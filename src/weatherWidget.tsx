/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import useFetchWeather from './hooks/useFetchWeather';
import WeatherHeader from './weatherHeader';
import WeatherHourly from './weatherHourly';
import WeatherDaily from './weatherDaily';

const WeatherWrapper = styled.div`
  background-color: #21D4FD;
  background-image: linear-gradient(19deg, #21D4FD 0%, #3260a8 99%);
  width: 500px;
  height: 700px;
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
  border-bottom: solid 1px #fff;
  opacity: 0.4;
  margin: 10px 0;
`;

function WeatherWidget({
  apiKey, 
  width = 500,
  height = 700,
  geo = null,
  theme = null, 
  exclude = null,
  dayRange = null,
  hourRange = null
} : WeatherWidgetPorps) {
  const [
    errorMsg,
    loadingMsg,
    weatherData
  ] = useFetchWeather(apiKey, 'metric');

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
        />
        <Hr />
        <WeatherHourly
          hourly={(weatherData as WeatherData).hourly}
        />
        <Hr />
        <WeatherDaily
          daily={(weatherData as WeatherData).daily}
        />
      </>
    );
  };
  
  return (
    <WeatherWrapper>
      {renderWediget()}
    </WeatherWrapper>
  );
}

export default WeatherWidget;
