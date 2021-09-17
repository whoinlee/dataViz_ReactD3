import React from 'react';

const ColorLegend = ({ colorScale, 
    tickSpacing=20, 
    tickSize=10,
    tickTextOffset=20 }) => 
colorScale.domain().map((val, i) => (
        <g key={i} className="tick" transform={`translate(0, ${i*tickSpacing})`}>
            <circle fill={colorScale(val)} r={tickSize}/>
            <text x={tickTextOffset} dy=".32em">{val}</text>
        </g>
    )
);

export default ColorLegend;