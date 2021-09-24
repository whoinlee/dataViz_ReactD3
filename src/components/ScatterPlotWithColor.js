import React, { useState }  from 'react';
import { scaleLinear, scaleOrdinal, extent, format } from 'd3';
import { useIrisData } from '../utils/useIrisData';
import ReactDropdown from 'react-dropdown';
//-- Components
import AxisBottom from './axis/AxisBottom';
import AxisLeftS from './axis/AxisLeftS';
import ScatterMarksWithColor from './marks/ScatterMarksWithColor';
import ColorLegend from './ColorLegend';
//-- Styles
import "react-dropdown/style.css";
import "../styles/ScatterPlotWithColor.css";


const width=980;
const height=560;
const margin = {
  top:20,
  right:200,
  bottom:60,
  left:75
}

const attributes = [
  { value: 'sepal_length', label: 'Sepal Length' },
  { value: 'sepal_width', label: 'Sepal Width' },
  { value: 'petal_length', label: 'Petal Length' },
  { value: 'petal_width', label: 'Petal Width' },
  { value: 'species', label: 'Species' }
];

const getLabel = value => {
  for(let i = 0; i < attributes.length; i++){
    if(attributes[i].value === value){
      return attributes[i].label;
    }
  }
};

const ScatterPlotWithColor = () => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel =  getLabel(xAttribute);
  //
  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel =  getLabel(yAttribute);
  //
  const colorValue = d => d.species;

  const data = useIrisData();

  if (!data) {
    return <pre>Loading ... </pre>
  } 
  // console.log("data\n", data);
  // console.log("data.columns\n", data.columns);

  const filteredData = data.filter( d => (hoveredValue === colorValue(d)) );
  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.right - margin.left;
  const fadeOpacity = 0.2;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();  //*****/
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();
  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  const xAxisTickFormat = tickValue => format(".2s")(tickValue).replace("G", "B");
  const yAxisLabelOffset = 45;

  return (
  <div>
    <div className="menus-container">
      <span className="dropdown-label">X</span>
      <ReactDropdown  options={attributes}
                      value={xAttribute}
                      onChange={({value}) => setXAttribute(value)} />
      <span className="dropdown-label">Y</span>
      <ReactDropdown  options={attributes}
                      value={yAttribute}
                      onChange={({value}) => setYAttribute(value)} />
    </div>
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} 
                      tickFormat={xAxisTickFormat} tickOffset={5}/>
          <text x={innerWidth/2} y={innerHeight+45} 
                textAnchor="middle">{xAxisLabel}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
          <AxisLeftS yScale={yScale} innerWidth={innerWidth}/>
          <text transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`}
                textAnchor="middle">{yAxisLabel}</text>
          <g transform={`translate(${innerWidth + 60}, ${innerHeight - 100})`}>
            <text x={35} y={-25}
                  className="axis-label" textAnchor="middle">Species</text>
            <ColorLegend colorScale={colorScale} 
                         tickSpacing={20} 
                         tickSize={7}
                         tickTextOffset={20}
                         onHover={setHoveredValue}
                         hoveredValue={hoveredValue}
                         fadeOpacity={fadeOpacity}/>
          </g>
          <g opacity={hoveredValue?.2:1}>
            <ScatterMarksWithColor data={data}  xScale={xScale} yScale={yScale} 
                          xValue={xValue} 
                          yValue={yValue}
                          colorScale={colorScale}
                          colorValue={colorValue}
                          tooltipFormat={xAxisTickFormat} cRadius={7}/>
          </g>
          <ScatterMarksWithColor data={filteredData}  xScale={xScale} yScale={yScale} 
                        xValue={xValue} 
                        yValue={yValue}
                        colorScale={colorScale}
                        colorValue={colorValue}
                        tooltipFormat={xAxisTickFormat} cRadius={7}/>
      </g>
    </svg>
  </div>)
};

export default ScatterPlotWithColor;
