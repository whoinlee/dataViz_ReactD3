import React from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';


const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const MapMarks2 = ({data: {land, interiors}, cities, 
                    sizeScale, sizeValue}) => {
    console.log("cityData: ", cities)
    return (
        <g className="marks" >
            <path className="sphere" d={path({type: 'Shpere'})} />
            <path className="graticules" d={path(graticule())} />
            {land.features.map((feature, i) => 
                <path className="land" key={i} d={path(feature)} />
            )}
            <path className="interiors" d={path(interiors)} />
            {cities.map((data, i) => {
                const [x, y] = projection([data.lng, data.lat]);
                const {city, country, population} = data;
                return (
                <circle key={i} className="city" cx={x} cy={y} r={sizeScale(sizeValue(data))} >
                    <title>{`${city}, ${country}\n${population}`}</title>
                </circle>
                )
            })}
        </g>
    )
}
/*{city: 'Seoul', lat: 37.5663, lng: 126.9997, country: 'Korea, South', population: 9796000*/
export default MapMarks2;