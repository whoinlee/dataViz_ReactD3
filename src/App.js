import { useState, useEffect } from 'react';
import { csv } from 'd3';


const App = () => {
  const [data, setData] = useState(null);
  const csv_url = "https://gist.githubusercontent.com/whoinlee/3000d2a926de7fb1697ba1fd5500af8e/raw/2a4025eaa8cbb51fe801cf290609d77151509347/cssNamedColors.csv";

  useEffect(() => {
    const getData = async () => {
      const result = await(csv(csv_url));
      // console.log("data:\n", result);
      setData(result);
    }
    getData();
  }, []);


  return (
    <>
      <div>Data is {data? "loaded" : 'loading data...'}</div>
    </>
  );
};

export default App;
