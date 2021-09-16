
import { useGeoData } from '../utils/useGeoData';
//-- Components
import MapMarks from './MapMarks';
//-- Styles
import "../styles/WorldMap.css";


const width=980;
const height=560;

const WorldMap = () => {
  const data = useGeoData();
  if (!data) {
    return <pre>Loading ... </pre>
  } 

  return ( 
  <div className="container">
    <svg width={width} height={height}>   
         <MapMarks data={data}/>
    </svg>
  </div>)
};

export default WorldMap;
