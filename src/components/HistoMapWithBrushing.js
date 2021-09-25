import React, { useState } from 'react';
import { useGeoData2 } from '../utils/useGeoData2';
import { useMigrantsData3 } from '../utils/useMigrantsData3';
//-- Components
import BubbleMap from './maps/BubbleMap';
import DateHistogramWithBrushing from './DateHistogramWithBrushing';
//-- Styles
import "../styles/HistoMapMissingMigrants.css";


const width=980;
const height=500;
const dateHistogramSize=.2; //20%
const xValue = d => d["Reported Date"];

const HistoMapWithBrushing = () => {
  const data = useMigrantsData3();
  const geoData = useGeoData2();
  const [brushExtent, setBrushExtent] = useState();
  
  if (!data || !geoData) return <pre>Loading ... </pre>
  // console.log("migrantsData::\n", data);
  // console.log("geoData::\n", geoData);

  const filteredData = brushExtent ? 
    data.filter( d => {
      const date = xValue(d);
      return date > brushExtent[0] && date < brushExtent[1]
    }) : data;

  return ( 
    <div className="container">
      <svg width={width} height={height}>   
          <BubbleMap data={data} filteredData={filteredData} worldAtlas={geoData}/>
          <g transform={`translate(0, ${height - dateHistogramSize*height})`}>
            <DateHistogramWithBrushing 
              data={data} 
              width={width} 
              height={dateHistogramSize*height}
              setBrushExtent={setBrushExtent}
              xValue={xValue} />
          </g>
      </svg>
    </div>)
};

export default HistoMapWithBrushing;