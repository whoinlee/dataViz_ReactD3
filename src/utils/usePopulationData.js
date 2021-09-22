import { useState, useEffect } from 'react';
import { csv } from 'd3';


const csv_url = "https://gist.githubusercontent.com/whoinlee/c1edf502cd2c7918ada32c63d43870f8/raw/UN_Population_2019.csv";

export const usePopulationData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            const col = d => {
                // d.Population = parseFloat(d['2020']);  //string to number
                d.Population = +d['2020']*1000;           //string to number
                return d;
            }
            const data = await csv(csv_url, col);
            setData(data.slice(0,15));
            // console.log('getData :: data[0],\n', data[0]);
            // console.log("response:\n", data);
        }
        getData();
    }, []);

    return data;
}
