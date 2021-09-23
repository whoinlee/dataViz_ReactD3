import { scaleLinear, scaleTime, extent, timeFormat } from 'd3';
import { useTemperatureData } from '../utils/useTemperatureData';
//-- Components
import AxisBottom from './axis/AxisBottom';
import AxisLeftS from './axis/AxisLeftS';
import LineMarks from './marks/LineMarks';
//-- Styles
import "../styles/LineChart.css";


const width=980;
const height=560;
const margin = {
  top:20,
  right:20,
  bottom:60,
  left:75
}

const LineChart = () => {
  const data = useTemperatureData();
  if (!data) {
    return <pre>Loading ... </pre>
  } 

  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.right - margin.left;

  //-- accessors
  const xValue = d => d.timestamp;
  const yValue = d => d.temperature;

  //-- labels
  const xAxisLabel = "Time";
  const yAxisLabel = "Temperature";
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 45;

  //-- scales
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();
  
  //-- misc
  const xAxisTickFormat = timeFormat("%a");

  return ( 
  <div className="container">
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} 
                      tickFormat={xAxisTickFormat} tickOffset={8}/>
          <text x={innerWidth/2} y={innerHeight+xAxisLabelOffset} 
                textAnchor="middle">{xAxisLabel}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
          <AxisLeftS yScale={yScale} innerWidth={innerWidth}/>
          <text transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`}
                textAnchor="middle">{yAxisLabel}</text>
          <LineMarks  data={data}  
                      xScale={xScale} yScale={yScale} 
                      xValue={xValue} yValue={yValue}
                      tooltipFormat={xAxisTickFormat} cRadius={null}/>
      </g>
    </svg>
  </div>)
};

export default LineChart;
