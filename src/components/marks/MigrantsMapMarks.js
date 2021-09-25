import React, {useMemo} from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';


const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const MigrantsMapMarks = ({ 
    worldAtlas: { land, interiors },
    data,
    sizeScale,
    sizeValue}) => (
        <g className="marks">
        { useMemo(() => 
        <>
            <path className="sphere" d={path({ type: 'Sphere' })} />
            <path className="graticules" d={path(graticule())} />
            {land.features.map((feature, i) => (
                <path key={i} className="land" d={path(feature)} />
            ))}
            <path className="interiors" d={path(interiors)} />
        </>, [land, interiors])}
            {data.map((d, i) => {
                const [x, y] = projection(d.coords);
                // console.log("d:", d);
                return (
                    (x && y) ?
                    <circle key={i} cx={x} cy={y} r={sizeScale(sizeValue(d))}>
                        <title>{d["Total Dead and Missing"]}</title>
                    </circle> : null);
            })}
        </g>
    );

export default MigrantsMapMarks;