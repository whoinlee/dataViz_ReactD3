import React from 'react';

const ScatterMarks = ({ data, 
                        xScale, yScale, 
                        xValue, yValue, 
                        colorScale, colorValue, 
                        tooltipFormat, cRadius}) => {
    return (
        data.map((d, i) => <circle className="mark"
            // key={yValue(d)}
            key={i}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            fill={colorScale(colorValue(d))}
            r={cRadius}>
                <title>{tooltipFormat(xValue(d))}</title>
            </circle>
        )
    )
}

export default ScatterMarks;