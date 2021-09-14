import { csv } from 'd3';

//const csvUrl = "https://gist.githubusercontent.com/whoinlee/3000d2a926de7fb1697ba1fd5500af8e/raw/2a4025eaa8cbb51fe801cf290609d77151509347/cssNamedColors.csv";

export const getData = async(pUrl) => {
    const data = await csv(pUrl);
    console.log('getData :: data[0],\n', data[0]);
    return data;
};