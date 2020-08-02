import React from 'react';
import styled from 'styled-components';
import { WeatherData, WeatherWidgetTheme } from './types/weatherWidget';
import LineChart from './lineChart';
import { getHourlyData, ICON_BASE_URL } from './utils/index';

const WeatherHourlyWrapper = styled.div`
  width: ${(props: { theme: WeatherWidgetTheme }) => props.theme.width};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const WeatherHourlySection = styled.div`
  width: ${(props: { theme: WeatherWidgetTheme }) => props.theme.width};
  height: 50px;
  display: flex;
  justify-content: space-between;
  h2 {
    margin: 0;
    font-size: ${(props: { theme: WeatherWidgetTheme }) => props.theme.mainFontSize};
    color: ${(props: { theme: WeatherWidgetTheme }) => props.theme.mainFontColor};
  }
`;

const HourlyCard = styled.div`
  width: 100px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

interface WeatherHourlyProps {
  hourly: WeatherData['hourly'];
  from: number;
  to: number;
  theme: WeatherWidgetTheme;
}

function WeatherHourly({
  hourly,
  from = 1,
  to = 6,
  theme
}: WeatherHourlyProps) {
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
      <LineChart
        data={getHourlyData(hourly, from, to)}
        height={theme.lineChartHeight}
        width={theme.width}
        lineColor={theme.lineChartColor}
        labelColor={theme.lineChartLabelColor}
        labelPadding={theme.lineChartLabelPadding}
        labelSize={theme.lineChartLabelSize}
        padding={theme.lineChartPadding}
      />
      <WeatherHourlySection>
        {hourlyData.map(hourData =>
          <HourlyCard key={hourData.dt}>
            <img src={`${ICON_BASE_URL + hourData.weather[0].icon}.png`} alt='weather-info' />
          </HourlyCard>
        )}
      </WeatherHourlySection>
    </WeatherHourlyWrapper>
  );
}

export default WeatherHourly;
