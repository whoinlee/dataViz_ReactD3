import { useState, useEffect } from 'react';
import { csv, scaleBand, scaleLinear, max } from 'd3';
//-- Styles
import "../styles/BarChart.css";


const csv_url = "https://gist.githubusercontent.com/whoinlee/c1edf502cd2c7918ada32c63d43870f8/raw/UN_Population_2019.csv";
const width=960;
const height=500;
const margin = {
  top:20,
  right:20,
  bottom:20,
  left:200
}

const BarChart = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async() => {
      const col = d => {
        // d.Population = parseFloat(d['2020']);  //string to number
        d.Population = +d['2020'];                //string to number
        return d;
      }
      const data = await csv(csv_url, col);
      setData(data.slice(0,10));
      console.log('getData :: data[0],\n', data[0]);
      // console.log("response:\n", data);
    }
    getData();
  }, []);

  if (!data) {
    return <pre>Loading ... </pre>
  } 

  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.right - margin.left;
  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight]);
  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, innerWidth]);

  console.log("xScale.ticks()??\n", xScale.ticks())

  return ( 
  <div className="container">
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map(tickValue => 
          (<g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line 
              x1={0} y1={0}
              x2={0} y2={innerHeight} 
              stroke="black"
            />
            <text dy=".71em" y={innerHeight+3} style={{textAnchor:'middle'}}>{tickValue}</text>
          </g>))}
          {yScale.domain().map(tickValue => 
            <text key={tickValue} dy=".32em" 
            x={-4} 
            y={yScale(tickValue) + yScale.bandwidth()/2}
            style={{textAnchor:'end'}}>{tickValue}</text>
          )}
        {data.map(d=> <rect key={d.Country}
        x={0}
        y={yScale(d.Country)}
        width={xScale(d.Population)}
        height={yScale.bandwidth()}
        />)}
      </g>
    </svg>
  </div>)
};

export default BarChart;
