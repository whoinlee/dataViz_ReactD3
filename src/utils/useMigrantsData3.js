
import { useState, useEffect } from 'react';
import { csv } from 'd3';


const csv_url = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

export const useMigrantsData3 = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            const col = d => {
                d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
                d['Total Dead and Missing'] = + d['Total Dead and Missing'];
                d['Reported Date'] = new Date(d['Reported Date']);
                return d;
            }
            const data = await csv(csv_url, col);
            setData(data);
        }
        getData();
    }, []);

    return data;
}
