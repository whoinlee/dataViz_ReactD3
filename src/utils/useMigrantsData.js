// import React from 'react';
import { useState, useEffect } from 'react';
import { csv } from 'd3';


// const csv_url = "https://gist.githubusercontent.com/whoinlee/caabfd3869e756e10caacd28c012b686/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";
// const csv_url = "https://gist.githubusercontent.com/whoinlee/9635d30312c4523fcbe1eab8bea69cb3/raw/MissingMigrants-Global-2019-10-08T09-47-14.csv";
const csv_url =
  'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';


export const useMigrantsData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            const col = d => {
                d["Total Dead and Missing"] = +d["Total Dead and Missing"];
                d["Reported Date"] = new Date(d["Reported Date"]);
                // d["Temperature"] = +d["Temperature"];
                // d["Location Coordinates"] = +d["Location Coordinates"];
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
