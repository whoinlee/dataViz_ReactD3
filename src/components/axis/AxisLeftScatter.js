import React from 'react';

const AxisLeftScatter = ({yScale, innerWidth}) => {
    return (
      //domain() --> ticks()
      yScale.ticks().map(tickValue => 
        <g className="tick left" key={tickValue} 
        transform={`translate(0, ${yScale(tickValue)})`}>
          <line x2={innerWidth} />
          <text key={tickValue} dy=".32em" 
          x={-6} 
          // y={yScale(tickValue)}
          style={{textAnchor:'end'}}>{tickValue}</text>
        </g>
      )
    );
};

export default AxisLeftScatter;
