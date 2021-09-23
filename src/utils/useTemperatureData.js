import { useState, useEffect } from 'react';
import { csv } from 'd3';


const csv_url = "https://gist.githubusercontent.com/whoinlee/f8d0453cb140da2d1b1d474fe1fa3cd6/raw/week_temperature_sf.csv";

export const useTemperatureData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            const col = d => {
                d.temperature = +d.temperature;
                d.timestamp = new Date(d.timestamp);
                return d;
            }
            const data = await csv(csv_url, col);
            setData(data);
            // console.log('getData :: data[0],\n', data[0]);
        }
        getData();
    }, []);

    return data;
}
