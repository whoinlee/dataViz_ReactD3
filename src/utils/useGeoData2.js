import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson-client';


const data_url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useGeoData2 = () => {
    const [data, setData] = useState(null);

    // console.log("data,\n", data);
    useEffect(() => {
        const getData = async() => {
            const data = await json(data_url);
            const {countries, land} = data.objects;
            // setData(feature(data, countries));  //--topojson to geojson
            setData({
                land: feature(data, land),
                interiors: mesh(data, countries, (a, b) => a !== b)
              });
        }
        getData();
    }, []);

    return data;
}
