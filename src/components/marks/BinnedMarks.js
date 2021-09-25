import React from 'react';

const BinnedMarks = ({  data, 
                        xScale, yScale, 
                        tooltipFormat, innerHeight}) => {
    return (
        data.map((d, i) => 
            <rect className="mark"
                    key={i}
                    x={xScale(d.x0)}
                    y={yScale(d.y)}
                    width={xScale(d.x1) - xScale(d.x0)}
                    height={innerHeight - yScale(d.y)}>
                <title>{tooltipFormat(d.y)}</title>
            </rect>
        )
    )
}

export default BinnedMarks;