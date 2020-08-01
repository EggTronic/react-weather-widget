import React from 'react';
import { Chart, Line } from 'bizcharts';
import { WeatherWidgetTheme } from './types/weatherWidget';

export interface TempChartProps {
  data: {
    hour: string; 
    value: number;
  }[],
  pure: boolean;
  theme: WeatherWidgetTheme;
}

function TempChart({
  data,
  pure,
  theme
}:TempChartProps) {
  return (
    <div>
      <Chart
        padding={theme.lineChartPadding}
        autoFit
        height={theme.lineChartHeight}
        width={theme.width}
        data={data}
        pure={pure}
      >
        <Line 
          position="hour*value" 
          color={theme.lineChartColor}
          label={[
            'value',
            (v) => {
              return {
                content: `${v  }°C`,
                style: {
                  fill: theme.lineChartFontColor,
                  fontSize: theme.lineChartFontSize
                }
              };
            }
          ]}
        />
      </Chart>
    </div>
  );
}

export default TempChart;
