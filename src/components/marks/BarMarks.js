import React from 'react';


const BarMarks = ({data, xScale, yScale, xValue, yValue, tooltipFormat}) => {
    return (
        data.map((d, i) => 
            <rect className="mark"
            // key={d.Country}
            // y={yScale(d.Country)}
            // width={xScale(d.Population)}
                key={i}
                x={0}
                y={yScale(yValue(d))}
                width={xScale(xValue(d))}
                height={yScale.bandwidth()}>
              <title>{tooltipFormat(xValue(d))}</title>
            </rect>
        )
    )
}

export default BarMarks;