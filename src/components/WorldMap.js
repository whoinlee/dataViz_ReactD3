import React from 'react';
import { max } from 'd3';
import { scaleSqrt } from 'd3-scale';
import { useGeoData1 } from '../utils/useGeoData1';
import { useColorData } from '../utils/useColorData';
import { useCityData } from '../utils/useCityData';
//-- Components
import MapMarks1 from './marks/MapMarks1';
//-- Styles
import "../styles/WorldMap.css";


const width=980;
const height=560;

const WorldMap = () => {
  const data = useGeoData1();
  const colorData = useColorData();
  const cityData = useCityData();

  if (!data || !colorData || !cityData) {
    return <pre>Loading ... </pre>
  } 
  // console.log("data\n", data);
  // console.log("colorData\n", colorData);
  const sizeValue = d => d.population;
  const maxRadius = 15;
  const sizeScale = scaleSqrt()
                    .domain([0, max(cityData, sizeValue)])
                    .range([0, maxRadius]);
  return ( 
    <div className="container">
      <svg width={width} height={height}>   
          <MapMarks1 data={data} colors={colorData} cities={null}
                    sizeScale={sizeScale} sizeValue={sizeValue}/>
      </svg>
    </div>)
};

export default WorldMap;
