import React from 'react';
import { bin, scaleLinear, extent, timeFormat, timeMonths, sum, max } from 'd3';
import { useMigrantsData } from '../utils/useMigrantsData';
//-- Components
import AxisBottom from './AxisBottom';
import AxisLeftScatter from './AxisLeftScatter';
import BinnedMarks from './BinnedMarks';
//-- Styles
import "../styles/HistogramMigrants.css"; //-- custom style later


const width=960;
const height=500;
const margin = {
  top:20,
  right:30,
  bottom:65,
  left:90
};
const yAxisLabelOffset = 45;
const innerHeight = height - margin.bottom - margin.top;
const innerWidth = width - margin.right - margin.left;


const HistogramMigrants = () => {
  const data = useMigrantsData();

  if (!data) {
    return <pre>Loading ... </pre>
  } 
  // console.log("data\n", data);

  const xValue = d => d["Reported Date"];
  const xAxisLabel =  'Time';
  const yValue = d => d["Total Dead and Missing"];
  const yAxisLabel =  "Total Dead and Missing";

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();  //*****/

  const [start, stop] = xScale.domain();
  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));
  // console.log("binnedData, \n", binnedData)

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d=>d.y)])
    .range([innerHeight, 0])
    .nice();

  const xAxisTickFormat = timeFormat('%m/%d/%Y');

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
          
          <AxisBottom xScale={xScale} 
                      innerHeight={innerHeight} 
                      tickFormat={xAxisTickFormat} 
                      tickOffset={7}/>
          <text transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`}
                textAnchor="middle">{yAxisLabel}</text>
          <AxisLeftScatter yScale={yScale} innerWidth={innerWidth}/>
          <text x={innerWidth/2} y={innerHeight+45} 
                textAnchor="middle">{xAxisLabel}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
          <g >
            <BinnedMarks  data={binnedData}  
                          xScale={xScale} yScale={yScale} 
                          tooltipFormat={d => d} 
                          innerHeight={innerHeight} />
          </g>
      </g>
    </svg> )
};

export default HistogramMigrants;
