import React, { useEffect, useRef } from 'react';
import {
  bin, extent, 
  scaleLinear, scaleTime, 
  timeFormat, timeMonths,
  sum, max,
  brushX, select,
  // event
} from 'd3';
//-- Components
import AxisBottom from './axis/AxisBottom';
import AxisLeftS from './axis/AxisLeftS';
import BinnedMarks from './marks/BinnedMarks';


// const width=980;
const margin = {
  top:0,
  right:30,
  bottom:20,
  left:50
};

const xAxisLabelOffset = 54;
const yAxisLabelOffset = 35;

const DateHistogramWithBrushing = ({ data, width, height, setBrushExtent, xValue }) => {
  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.right - margin.left;

  // const xValue = d => d["Reported Date"]; //==> moved to the parent
  const yValue = d => d["Total Dead and Missing"];
  const xAxisLabel = 'Time';
  const yAxisLabel = 'Total Dead and Missing';

  const xScale = scaleTime()
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

  const brushRef = useRef();
  useEffect(() => {
    const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]]);
    brush(select(brushRef.current));
    brush.on('brush end', ({selection}) => { 
      setBrushExtent(selection && selection.map(xScale.invert));
      //console.log("selection:", selection); //-- == event.selection (brush selection's x,y coordinates)
    })
  }, [innerWidth, innerHeight, xScale, setBrushExtent]);

  return (
    <>
      <rect width={width} height={height} fill='white' opacity='.75' />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={xAxisTickFormat}
                    tickOffset={5} />
        <text className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle" >{xAxisLabel}</text>
        <AxisLeftS yScale={yScale} 
                   innerWidth={innerWidth} 
                   tickOffset={5} />
        <text className="axis-label"
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${innerHeight/2}) rotate(-90)`} >
          {yAxisLabel}
        </text>
        <BinnedMarks  data={binnedData}  
                      xScale={xScale} yScale={yScale} 
                      tooltipFormat={d => d} 
                      innerHeight={innerHeight} />
        <g ref={brushRef} />
      </g>
    </>
  )
};

export default DateHistogramWithBrushing;
