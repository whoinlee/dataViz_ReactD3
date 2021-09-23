import { useState, useEffect } from 'react';
import { csv } from 'd3';


const csv_url = "https://gist.githubusercontent.com/whoinlee/b510612c3891dc50fca48abe7768d58c/raw/worldcities_clean.csv";
const row = d => {
    d.lat = +d.lat;
    d.lng = +d.lng;
    d.population = +d.population;
    return d;
}

export const useCityData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        /* city,lat,lng,country,population */
        const getData = async() => {
            const data = await csv(csv_url, row);
            // setData(data);
            setData(data.slice(0,500));
            // console.log('getData :: city data[0],\n', data[0]);
            // console.log("response:\n", data);
        }
        getData();
    }, []);

    return data;
}
