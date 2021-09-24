import React from 'react';
import { useGeoData2 } from '../utils/useGeoData2';
import { useMigrantsData3 } from '../utils/useMigrantsData3';
//-- Components
import BubbleMap from './maps/BubbleMap';
import DateHistogram from './DateHistogram';
//-- Styles
import "../styles/HistoMapMissingMigrants.css";


const width=980;
const height=500;
const dateHistogramSize=.2; //20%

const HistoMapMissingMigrants = () => {
  const data = useMigrantsData3();
  const geoData = useGeoData2();
  
  if (!data || !geoData) {
    return <pre>Loading ... </pre>
  } 
  // console.log("migrantsData\n", data);
  // console.log("geoData\n", geoData);

  return ( 
    <div className="container">
      <svg width={width} height={height}>   
          <BubbleMap data={data} worldAtlas={geoData}/>
          <g transform={`translate(0, ${height - dateHistogramSize*height})`}>
            <DateHistogram data={data} height={dateHistogramSize*height}/>
          </g>
      </svg>
    </div>)
};

export default HistoMapMissingMigrants;