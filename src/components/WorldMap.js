
import { useGeoData } from '../utils/useGeoData';
import { useColorData } from '../utils/useColorData';
//-- Components
import MapMarks from './MapMarks';
//-- Styles
import "../styles/WorldMap.css";


const width=980;
const height=560;

const WorldMap = () => {
  const data = useGeoData();
  const colorData = useColorData();
  // console.log("data\n", data);
  // console.log("colorData\n", colorData);

  if (!data || !colorData) {
    return <pre>Loading ... </pre>
  } 

  return ( 
    <div className="container">
      <svg width={width} height={height}>   
          <MapMarks data={data} colorData={colorData}/>
      </svg>
    </div>)
};

export default WorldMap;
