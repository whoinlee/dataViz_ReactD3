
import { useState, useEffect } from 'react';
import { csv } from 'd3';


const csv_url = "https://gist.githubusercontent.com/whoinlee/9635d30312c4523fcbe1eab8bea69cb3/raw/MissingMigrants-Global-2019-10-08T09-47-14.csv";


export const useMigrantsDataII = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            const col = d => {
                d["Total Dead and Missing"] = +d["Total Dead and Missing"];
                d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
                return d;
            }
            const data = await csv(csv_url, col);
            setData(data);
        }
        getData();
    }, []);

    return data;
}
