import React from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';


const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const MapMarks = ({data, colorData}) => {
    const colorLength = colorData.length;
    return (
        <g className="marks" >
            <path className="sphere" d={path({type: 'Shpere'})} />
            <path className="graticule" d={path(graticule())} />
            {data.features.map((feature, i) => 
                    <path key={i} d={path(feature)} fill={colorData[Math.floor(Math.random()*colorLength)]}>
                        <title key={feature.properties.name}>{feature.properties.name}</title>
                    </path>
            )}
        </g>
    )
}

/*fill={d.data['RGB hex value']}*/
export default MapMarks;