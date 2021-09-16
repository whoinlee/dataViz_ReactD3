// import React from 'react';
import { useState, useEffect } from 'react';
import { csv } from 'd3';


const csv_url = "https://gist.githubusercontent.com/whoinlee/3000d2a926de7fb1697ba1fd5500af8e/raw/cssNamedColors.csv";

export const useColorData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            let colorDataArr = [];
            const data = await csv(csv_url);
            data.forEach(d => {
                if (d['RGB hex value'])
                colorDataArr.push(d['RGB hex value']);
            })
            setData(colorDataArr);
        }
        getData();
    }, []);

    return data;
}
