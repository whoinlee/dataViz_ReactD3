import React from 'react';
import { line, curveNatural } from 'd3';


const LineMarks = ({data, xScale, yScale, xValue, yValue, tooltipFormat, cRadius}) => 
(
    <g className="marks">
        <path   d={line().x(d => xScale(xValue(d)))
                         .y(d => yScale(yValue(d)))
                         .curve(curveNatural)(data)} 
                fill="none" stroke="black" />
        {(cRadius != null)? data.map(d=> 
            <circle cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    r={cRadius}>
                <title>{tooltipFormat(xValue(d))}</title>
            </circle> 
        ) : null}
    </g>
);


export default LineMarks;