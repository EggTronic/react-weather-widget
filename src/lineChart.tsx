import React, {
  useRef, useEffect
} from 'react';
import styled from 'styled-components';
import { LineChartData, WeatherWidgetTheme } from './types/weatherWidget';

const LineChartWrapper = styled.div`
  height: 120px;
  width: ${(props: { theme: WeatherWidgetTheme }) => props.theme.width};
`;

export interface LineChartProps {
  data: LineChartData;
  width: string;
  height: string;
  padding?: [number, number];
  labelPadding?: [number, number];
  customLabel?: (val: number) => string;
  lineWidth?: number;
  labelSize?: number;
  labelColor?: string;
  lineColor?: string;
}

function LineChart({
  data,
  width,
  height,
  padding = [40, 40],
  labelPadding = [-9, -10],
  customLabel = (val: number) => {
    return `${val} %`;
  },
  lineWidth = 2,
  lineColor = '#000',
  labelSize = 1,
  labelColor = '#000'
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawGrids = (canvas: HTMLCanvasElement) => {
      const canvasElm = canvasRef.current as HTMLCanvasElement;

      // fix pixel
      const r = window.devicePixelRatio || 1;
      canvasElm.width *= r;
      canvasElm.height *= r;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.scale(r, r);
      ctx.translate(0.5, 0.5);

      // setup step
      const k = Object.keys(data);
      const v = Object.values(data);
      const max = Math.max(...v);
      const min = Math.min(...v);
      const xStep = canvasElm.width / (k.length * r);
      const yStep = canvasElm.height / (max - min) * 0.5;

      // start point (x, y)
      let x = padding[0];
      let y = canvasElm.height -
        (v[0] - min) * yStep - padding[1];

      ctx.moveTo(x, y);

      for (let i = 0; i < k.length; i++) {
        ctx.lineWidth = labelSize;
        ctx.strokeStyle = labelColor;
        ctx.strokeText(
          customLabel(v[i]),
          x + labelPadding[0],
          y + labelPadding[1]
        );
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.lineTo(x, y);
        x += xStep;
        y = canvasElm.height -
          (v[i + 1] - min) * yStep - padding[1];
      }

      ctx.stroke();
      canvasElm.style.zoom = `${1 / r}`;
    };

    if (canvasRef.current !== null) {
      drawGrids(canvasRef.current);
    }
  }, 
  [ data, 
    width, 
    height, 
    padding, 
    lineColor,
    lineWidth,
    labelColor,
    labelPadding,
    labelSize,
    customLabel
  ]);

  return (
    <LineChartWrapper>
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
      >
        <p>Your Browser Does Not Support Canvas</p>
      </canvas>
    </LineChartWrapper>
  );
}

export default LineChart;
