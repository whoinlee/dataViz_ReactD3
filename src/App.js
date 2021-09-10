import {arc} from 'd3';


const App = () => {
  const width = 960;
  const height = 500;
  const strokeW = 10;
  const centerX = width/2;
  const centerY = (height-strokeW)/2;
  const offsetX = 85;
  const offsetY = 55;
  const mouthArc = arc()
    .innerRadius(140)
    .outerRadius(150)
    .startAngle(Math.PI/2 + Math.PI/6)
    .endAngle(Math.PI + Math.PI/2 - Math.PI/6);

  return (
        <svg width={width} height={height}>
          <g transform={`translate(${centerX}, ${centerY})`}>
            <circle r="200" fill="yellow" stroke="black" strokeWidth={strokeW} />
            <circle r="40" fill="black"
                    cx={-offsetX}
                    cy={-offsetY} />
            <circle r="40" fill="black"
                    cx={offsetX}
                    cy={-offsetY} />
            <path d={mouthArc()} />
          </g>
        </svg>
  );
};

export default App;
