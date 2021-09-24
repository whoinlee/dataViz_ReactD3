import React from 'react';
import { scaleSqrt, max } from 'd3';
import { useGeoData2 } from '../utils/useGeoData2';
import { useMigrantsData2 } from '../utils/useMigrantsData2';
//-- Components
import MigrantsMapMarks from './marks/MigrantsMapMarks';
//-- Styles
import "../styles/WorldMapMissingMigrants.css";


const width=980;
const height=500;

const WorldMapMissingMigrants = () => {
  const data = useMigrantsData2();
  const geoData = useGeoData2();
  
  if (!data || !geoData) {
    return <pre>Loading ... </pre>
  } 
  // console.log("migrantsData\n", data);
  // console.log("geoData\n", geoData);

  const sizeValue = d => d['Total Dead and Missing'];
  const maxRadius = 15;
  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);

  return ( 
    <div className="container">
      <svg width={width} height={height}>   
          <MigrantsMapMarks data={data} 
                            worldAtlas={geoData}
                            sizeScale={sizeScale}
                            sizeValue={sizeValue}/>
      </svg>
    </div>)
};

export default WorldMapMissingMigrants;
