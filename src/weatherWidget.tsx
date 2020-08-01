import React, { ReactElement } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  WeatherData,
  WeatherWidgetTheme,
  OpenWeatherMapExclude
} from './types/weatherWidget';
import { defaultTheme } from './theme';
import useFetchWeather from './hooks/useFetchWeather';
import WeatherHeader from './weatherHeader';
import WeatherHourly from './weatherHourly';
import WeatherDaily from './weatherDaily';

const WeatherWrapper = styled.div`
  background-color: ${(props: { theme: WeatherWidgetTheme }) => props.theme.color[0]};
  background-image: linear-gradient(
    19deg, 
    ${(props: { theme: WeatherWidgetTheme }) => props.theme.color[0]} 0%, 
    ${(props: { theme: WeatherWidgetTheme }) => props.theme.color[1]} 99%
  );
  width: ${(props: { theme: WeatherWidgetTheme }) => props.theme.width};
  height: ${(props: { theme: WeatherWidgetTheme }) => props.theme.height};
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
  border-bottom: solid 1px ${(props: { theme: WeatherWidgetTheme }) => props.theme.hrColor};
  opacity: 0.4;
  margin: 10px 0;
`;

export interface WeatherWidgetPorps {
  apiKey: string;
  geo?: {
    lat: string,
    lon: string
  } | undefined;
  theme?: WeatherWidgetTheme;
  exclude?: OpenWeatherMapExclude;
  dayRange?: [number, number];
  hourRange?: [number, number];
  className?: string;
  children?: ReactElement[];
}

function WeatherWidget({
  apiKey,
  geo = undefined,
  theme,
  exclude = null,
  dayRange = [1, 6],
  hourRange = [1, 6],
  className,
  children
}: WeatherWidgetPorps) {
  const [
    errorMsg,
    loadingMsg,
    weatherData
  ] = useFetchWeather(apiKey, 'metric', exclude, geo);

  let assignedTheme: WeatherWidgetTheme;

  if (theme) {
    assignedTheme = {
      ...defaultTheme,
      ...theme
    };
  } else {
    assignedTheme = defaultTheme;
  }

  const renderWediget = () => {
    if (loadingMsg) {
      return (
        <p style={{ color: theme?.mainFontColor, fontSize: '30px', marginTop: '50%' }}>
          {loadingMsg}
        </p>
      );
    }

    if (errorMsg) {
      return (
        <p style={{ color: theme?.mainFontColor, fontSize: '30px', marginTop: '50%' }}>
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
        <Hr theme={theme} />
        <WeatherHourly
          hourly={(weatherData as WeatherData).hourly}
          theme={assignedTheme}
          from={hourRange[0]}
          to={hourRange[1]}
        />
        <Hr theme={theme} />
        <WeatherDaily
          daily={(weatherData as WeatherData).daily}
          from={dayRange[0]}
          to={dayRange[1]}
        />
      </>
    );
  };
  
  return (
    <ThemeProvider theme={assignedTheme}>
      <WeatherWrapper className={className}>
        {renderWediget()}
      </WeatherWrapper>
      {children}
    </ThemeProvider>
  );
}

export default WeatherWidget;
