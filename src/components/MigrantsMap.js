import React from 'react';
import { useGeoDataII } from '../utils/useGeoDataII';
import { useMigrantsDataII } from '../utils/useMigrantsDataII';
import { scaleSqrt, max } from 'd3';
//-- Components
import MigrantsMapMarks from './MigrantsMapMarks';
//-- Styles
import "../styles/MigrantsMap.css";


const width=980;
const height=500;

const MigrantsMap = () => {
  const data = useMigrantsDataII();
  const geoData = useGeoDataII();
  
  if (!data || !geoData) {
    return <pre>Loading ... </pre>
  } 

  console.log("migrantsData\n", data);
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

export default MigrantsMap;
