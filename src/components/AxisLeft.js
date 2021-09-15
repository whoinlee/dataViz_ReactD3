import React from 'react';

const AxisLeft = ({yScale}) => {
    return (
      yScale.domain().map(tickValue => 
        <text key={tickValue} dy=".32em" 
        x={-4} 
        y={yScale(tickValue) + yScale.bandwidth()/2}
        style={{textAnchor:'end'}}>{tickValue}</text>
      )
    );
};

export default AxisLeft;
