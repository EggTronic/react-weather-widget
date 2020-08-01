import React, {
  useRef, useEffect
} from 'react';
import styled from 'styled-components';
import { LineChartData } from './types/weatherWidget';

const LineChartWrapper = styled.div`
  height: 200px;
  width: 500px;
`;

const data: LineChartData = {
  '1:00': 1,
  '2:00': 15,
  '3:00': 3,
  '4:00': 4,
  '5:00': 4,
  '6:00': 20,
};

const padding = [20, 50];
const labelPadding = [-9, -10];
const customLabel = (val: number) => {
  return `${val} %`;
};
const lineWidth = 2;
const lineColor = '#333';
const labelSize = 1;
const labelColor = '#333';

function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawGrids = (ctx: CanvasRenderingContext2D) => {
    const canvasElm = canvasRef.current as HTMLCanvasElement;
    const r = window.devicePixelRatio || 1;
    canvasElm.width *= r;
    canvasElm.height *= r;
    ctx.scale(r, r);
    ctx.translate(0.5, 0.5);
    const k = Object.keys(data);
    const v = Object.values(data);
    const xStep = canvasElm.width / k.length;
    const yStep = canvasElm.height /
      (Math.max(...v) -
        Math.min(...v)) * 0.5;

    let x = padding[0];
    let y = (canvasRef.current as HTMLCanvasElement).height - v[0] * yStep - padding[1] + 0.5;

    ctx.moveTo(x, y);

    for (let i = 0; i < k.length; i++) {
      ctx.lineWidth = labelSize;
      ctx.strokeStyle = labelColor;
      ctx.strokeText(customLabel(v[i]), x + labelPadding[0], y + labelPadding[1]);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.lineTo(x, y + 0.5);
      x += xStep;
      y = (canvasRef.current as HTMLCanvasElement).height - v[i + 1] * yStep - padding[1];
    }

    ctx.stroke();
  };

  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext('2d');
      drawGrids(ctx as CanvasRenderingContext2D);
    }

  }, []);
  return (
    <LineChartWrapper>
      <canvas
        ref={canvasRef}
        height={200}
        width={500}
        style={{ 
          border: 'solid 1px',
          zoom: 0.7
        }}
      >
        <p>Your Browser Does Not Support Canvas</p>
      </canvas>
    </LineChartWrapper>
  );
}

export default LineChart;
