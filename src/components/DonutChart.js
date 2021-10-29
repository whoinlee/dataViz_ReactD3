import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { csv, arc, pie } from 'd3';
//-- Styles
import "../styles/DonutChart.css";


const width=600;
const height=600;
const radius=width/2;
const donutThickness = 85;
const csvUrl = "https://gist.githubusercontent.com/whoinlee/3000d2a926de7fb1697ba1fd5500af8e/raw/cssNamedColors.csv";

const DonutChart = () => {
  const [data, setData] = useState(null);
  const colorNameRef = useRef(null);
  const colorCodeRef = useRef(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading ... </pre>
  } 
  //-- "d3.arc"
  const pieArc = arc()
              .innerRadius(radius - donutThickness)
              .outerRadius(radius);
  //-- "d3.pie"
  //-- generate an array of objects w. startAngle, endAngle, padAngle, index, data, and value
  const colorPie = pie().value(1);  

  // const elt = document.getElementById('color-code');

  const onMouseOver = (e) => {
    e.preventDefault();
    colorNameRef.current.innerText = e.target.attributes.colorname.nodeValue;
    colorCodeRef.current.innerText = e.target.attributes.colorcode.nodeValue;
  }

  const onMouseOut = (e) => {
    e.preventDefault();
    colorNameRef.current.innerText = "";
    colorCodeRef.current.innerText = "";
  }

  return (
    <div className="container">
      <p id="color-name" ref={colorNameRef}></p>
      <p id="color-code"ref={colorCodeRef} ></p>
      <svg width={width} height={height}>
        <g transform={`translate(${width/2}, ${height/2})`}>
          <text dx="-80" dy="-5">CSS Color Chart</text>
          {colorPie(data).map((d, i) => (
            <g key={i}>
              <path className="color-pie"
                    onMouseOver={onMouseOver} 
                    onMouseOut={onMouseOut} 
                    fill={d.data['RGB hex value']}
                    d={pieArc(d)} 
                    colorname={d.data['Keyword']}
                    colorcode={d.data['RGB hex value']}> 
                <title >{`${d.data['Keyword']}\n${d.data['RGB hex value']}`}</title>
              </path>
              {/* {(i === 1)? 
              <text className="hex-label" dx="-28" dy="25" >{d.data['RGB hex value']}</text>
               : null } */}
            </g>
            )
          )}
        </g>
      </svg>
    </div>)
};

export default DonutChart;