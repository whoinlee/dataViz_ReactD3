import { scaleBand, scaleLinear, max, format } from 'd3';
import { usePopulationData } from '../utils/usePopulationData';
//-- Components
import AxisBottom from './axis/AxisBottom';
import AxisLeft from './axis/AxisLeft';
import BarMarks from './marks/BarMarks';
//-- Styles
import "../styles/BarChart.css";


const width=960;
const height=560;
const margin = {
  top:20,
  right:20,
  bottom:60,
  left:200
}

const BarChart = () => {
  const data = usePopulationData();
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
    .range([0, innerHeight])
    .paddingInner(0.15)
    .paddingOuter(0);
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const xAxisTickFormat = tickValue => format(".2s")(tickValue).replace("G", "B");
  // console.log("xScale.ticks()??\n", xScale.ticks())

  return ( 
  <div className="container">
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} 
                      tickFormat={xAxisTickFormat} />
          <AxisLeft yScale={yScale} />
          <text x={innerWidth/2} y={innerHeight+45} textAnchor="middle"
          >Population&nbsp;&nbsp;&nbsp;&nbsp;</text>
          <BarMarks data={data}  xScale={xScale} yScale={yScale} 
                              xValue={xValue} yValue={yValue}
                              tooltipFormat={xAxisTickFormat} />
      </g>
    </svg>
  </div>)
};

export default BarChart;
