import React from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';


const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const MapMarks2 = ({data, colors, cities, sizeScale, sizeValue}) => {
    const colorLength = colors.length;
    return (
        <g className="marks" >
            <path className="sphere" d={path({type: 'Shpere'})} />
            <path className="graticules" d={path(graticule())} />
            {data.features.map((feature, i) => 
                <path key={i} d={path(feature)} 
                fill={(feature.properties.name==="Antarctica") ? "black" : colors[Math.floor(Math.random()*colorLength)]}>
                    <title key={feature.properties.name}>{feature.properties.name}</title>
                </path>
            )}
            {(cities != null)? cities.map((city, i) => {
                const [x, y] = projection([city.lng, city.lat]);
                return <circle key={i} className="city" cx={x} cy={y} r={sizeScale(sizeValue(city))} />
            }) : null}
        </g>
    )
}

export default MapMarks2;