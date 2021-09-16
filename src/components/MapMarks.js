import React from 'react';
import { geoEqualEarth, geoPath } from 'd3';


const projection = geoEqualEarth();
const path = geoPath(projection);

const MapMarks = ({data}) => {
    return (
        data.features.map(feature => 
            <path d={path(feature)} />
        )
    )
}

export default MapMarks;