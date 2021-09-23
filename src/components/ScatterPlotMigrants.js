import React from 'react';
import { scaleLinear, extent, timeFormat } from 'd3';
import { useMigrantsData } from '../utils/useMigrantsData';
//-- Components
import AxisBottom from './AxisBottom';
import AxisLeftScatter from './AxisLeftScatter';
import ScatterMarks from './ScatterMarks';
//-- Styles
import "../styles/ScatterPlotMigrants.css"; //-- custom style later


const width=960;
const height=500;
const margin = {
  top:20,
  right:30,
  bottom:65,
  left:90
};
// const xAxisLabelOffset = 54;
const yAxisLabelOffset = 45;


const ScatterPlotMigrants = () => {
  const data = useMigrantsData();

  if (!data) {
    return <pre>Loading ... </pre>
  } 
  console.log("data\n", data);

  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.right - margin.left;

  const xValue = d => d["Reported Date"];
  const xAxisLabel =  'Time';
  const yValue = d => d["Total Dead and Missing"];
  const yAxisLabel =  "Total Dead and Missing";

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();  //*****/
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
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
          {/* <g transform={`translate(${innerWidth + 60}, ${innerHeight - 100})`}>
            <text
              x={35}
              y={-25}
              className="axis-label"
              textAnchor="middle"
            >Species</text>
            <ColorLegend colorScale={colorScale} 
                         tickSpacing={20} 
                         tickSize={7}
                         tickTextOffset={20}
                         onHover={setHoveredValue}
                         hoveredValue={hoveredValue}
                         fadeOpacity={fadeOpacity}/>
          </g> */}
          <g >
            <ScatterMarks data={data}  
                          xScale={xScale} yScale={yScale} 
                          xValue={xValue} yValue={yValue}
                          // colorScale={colorScale}
                          // colorValue={colorValue}
                          tooltipFormat={xAxisTickFormat} 
                          cRadius={3}/>
          </g>
          {/* <ScatterMarks data={filteredData}  xScale={xScale} yScale={yScale} 
                        xValue={xValue} 
                        yValue={yValue}
                        // colorScale={colorScale}
                        // colorValue={colorValue}
                        tooltipFormat={xAxisTickFormat} cRadius={7}/> */}
      </g>
    </svg> )
};

export default ScatterPlotMigrants;
