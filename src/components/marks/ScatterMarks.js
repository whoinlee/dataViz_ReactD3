import React from 'react';


const ScatterMarks = ({ data, 
                        xScale, yScale, 
                        xValue, yValue, 
                        tooltipFormat, cRadius}) => {
    return (
        data.map((d, i) => <circle className="mark"
            key={i}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={cRadius}>
                <title>{tooltipFormat(xValue(d))}</title>
            </circle>
        )
    )
}

export default ScatterMarks;