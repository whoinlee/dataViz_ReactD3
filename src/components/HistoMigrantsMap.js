import React from 'react';
import { useGeoDataII } from '../utils/useGeoDataII';
import { useMigrantsData3 } from '../utils/useMigrantsData3';
//-- Components
import BubbleMap from './maps/BubbleMap';
import DateHistogram from './DateHistogram';
//-- Styles
import "../styles/HistoMigrantsMap.css";


const width=980;
const height=500;
const dateHistogramSize=.2; //20%

const HistoMigrantsMap = () => {
  const data = useMigrantsData3();
  const geoData = useGeoDataII();
  
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

export default HistoMigrantsMap;