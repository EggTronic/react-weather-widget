import React from 'react';
import { Chart, Line } from 'bizcharts';

export interface TempChartProps {
  data: {
    hour: string; 
    value: number;
  }[],
  width: number | string;
  height: number | string;
  padding?: number[];
  pure: boolean;
}

function TempChart({
  data,
  width,
  height,
  padding,
  pure
}:TempChartProps) {
  return (
    <div>
      <Chart
        padding={padding}
        autoFit
        height={height}
        width={width}
        data={data}
        pure={pure}
      >
        <Line 
          position="hour*value" 
          color='black'
          label={[
            'value',
            (v) => {
              return {
                content: `${v  }°C`,
                style: {
                  fill: 'black',
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
