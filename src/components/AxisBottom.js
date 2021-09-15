import React from 'react';

const AxisBottom = ({xScale, innerHeight}) => {
    return (
        xScale.ticks().map(tickValue => 
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
              <line 
                x1={0} y1={0}
                x2={0} y2={innerHeight} 
                stroke="black"
              />
              <text dy=".71em" y={innerHeight+3} style={{textAnchor:'middle'}}>{tickValue}</text>
            </g>
        )
    );
};

export default AxisBottom;
