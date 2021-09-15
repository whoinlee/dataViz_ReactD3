import { scaleBand, scaleLinear, max } from 'd3';
import { useData } from '../utils/useData';
//-- Components
import AxisBottom from './AxisBottom';
import AxisLeft from './AxisLeft';
import Marks from './Marks';
//-- Styles
import "../styles/BarChart.css";

const width=960;
const height=500;
const margin = {
  top:20,
  right:20,
  bottom:20,
  left:200
}

const BarChart = () => {
  const data = useData();
  if (!data) {
    return <pre>Loading ... </pre>
  } 

  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.right - margin.left;
  //
  //-- accessors
  const yValue = d => d.Country;
  const xValue = d => d.Population;
  //
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight]);
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  console.log("xScale.ticks()??\n", xScale.ticks())

  return ( 
  <div className="container">
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale} />
          <Marks data={data}  xScale={xScale} yScale={yScale} 
                              xValue={xValue} yValue={yValue}/>
      </g>
    </svg>
  </div>)
};

export default BarChart;
