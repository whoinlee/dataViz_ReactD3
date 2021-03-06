// import React from 'react';
import { useState, useEffect } from 'react';
import { csv } from 'd3';


const csv_url = "https://gist.githubusercontent.com/whoinlee/90f6546b4b83d053c37d67aeaca66c78/raw/iris.csv";

export const useIrisData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            const col = d => {
                d.sepal_length = +d.sepal_length;
                d.sepal_width = +d.sepal_width;
                d.petal_length = +d.petal_length;
                d.petal_width = +d.petal_width;
                return d;
            }
            const data = await csv(csv_url, col);
            setData(data);
            console.log('getData :: data,\n', data);
            console.log('getData :: data[0],\n', data[0]);
        }
        getData();
    }, []);

    return data;
}
