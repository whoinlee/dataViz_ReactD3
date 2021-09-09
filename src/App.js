import {arc} from 'd3';



const App = () => {
  const width = 960;
  const height = 500;
  const strokeW = 10;
  const centerX = width/2;
  const centerY = (height-strokeW)/2;
  const offsetX = 85;
  const offsetY = 55;

  console.log(arc);
  return (
    <div className="App">
      <svg width={width} height={height}>
        <circle r="200" 
                cx={centerX}
                cy={centerY}
                fill="yellow" stroke="black" strokeWidth={strokeW}>
        </circle>
        <circle r="40" 
                    cx={centerX-offsetX}
                    cy={centerY-offsetY}
                    fill="black">
        </circle>
        <circle r="40" 
                cx={centerX+offsetX}
                cy={centerY-offsetY}
                fill="black" >
        </circle>
      </svg>
    </div>
  );
};

export default App;
