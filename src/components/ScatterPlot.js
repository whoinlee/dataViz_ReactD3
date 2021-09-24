import { scaleLinear, extent, format } from 'd3';
import { useIrisData } from '../utils/useIrisData';
//-- Components
import AxisBottom from './axis/AxisBottom';
import AxisLeftS from './axis/AxisLeftS';
import ScatterMarks from './marks/ScatterMarks';
//-- Styles
import "../styles/ScatterPlot.css";


const width=980;
const height=560;
const margin = {
  top:20,
  right:20,
  bottom:60,
  left:75
}

const ScatterPlot = () => {
  const data = useIrisData();
  if (!data) {
    return <pre>Loading ... </pre>
  } 

  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.right - margin.left;

  //-- accessors
  const xValue = d => d.sepal_length;
  const yValue = d => d.sepal_width;
  /*
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  */

  const xScale = scaleLinear()
    // .domain([min(data, xValue), max(data, xValue)])
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();  //*****/

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
  
  const xAxisTickFormat = tickValue => format(".2s")(tickValue).replace("G", "B");
  const xAxisLabel = "Sepal Length";
  const yAxisLabel = "Sepal Width";
  const yAxisLabelOffset = 45;

  return ( 
  <div className="container">
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} 
                      tickFormat={xAxisTickFormat} tickOffset={5}/>
          <text x={innerWidth/2} y={innerHeight+45} 
                textAnchor="middle">{xAxisLabel}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
          <AxisLeftS yScale={yScale} innerWidth={innerWidth}/>
          <text transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`}
                textAnchor="middle">{yAxisLabel}</text>
          <ScatterMarks data={data}  
                        xScale={xScale} yScale={yScale} 
                        xValue={xValue} yValue={yValue}
                        tooltipFormat={xAxisTickFormat} cRadius={8}/>
      </g>
    </svg>
  </div>)
};

export default ScatterPlot;
