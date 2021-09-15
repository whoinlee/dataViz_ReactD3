import React from 'react';

const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat}) => {
    return (
        data.map(d=> <rect className="mark"
            // key={d.Country}
            // y={yScale(d.Country)}
            // width={xScale(d.Population)}
            key={yValue(d)}
            x={0}
            y={yScale(yValue(d))}
            width={xScale(xValue(d))}
            height={yScale.bandwidth()}>
                <title>{tooltipFormat(xValue(d))}</title>
            </rect>
        )
    )
}

export default Marks;