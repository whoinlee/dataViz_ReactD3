import { useState, useEffect } from 'react';
import { csv, arc, pie } from 'd3';
//-- Styles
import "../styles/DonutChart.css";


const DonutChart = () => {
  const [data, setData] = useState(null);
  //
  const csv_url = "https://gist.githubusercontent.com/whoinlee/3000d2a926de7fb1697ba1fd5500af8e/raw/2a4025eaa8cbb51fe801cf290609d77151509347/cssNamedColors.csv";
  //
  const width=600;
  const height=600;
  const centerX=width/2;
  const centerY=height/2;
  //
  const pieArc = arc()
    .innerRadius(width/2 - 80)
    .outerRadius(width/2);
  const colorPie = pie().value(1);

  useEffect(() => {
    const getData = async() => {
      const data = await csv(csv_url);
      setData(data);
      console.log('getData :: data[0],\n', data[0]);
      // console.log("response:\n", data);
    }
    getData();
  }, []);

  if (!data) {
    return <pre>Loading ... </pre>
  } 

  return ( 
  <div className="container">
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(data).map((d, i) => <path 
                                  key={`${i} + ${d.data['Keyword']}`}
                                  fill={d.data['RGB hex value']}
                                  d={pieArc(d)} /> 
        /*d={pieArc({
                                    startAngle: (i/data.length)*2*Math.PI,
                                    endAngle: ((i+1)/data.length)*2*Math.PI
                                  })} 
        */
        )}
      </g>
    </svg>
  </div>)
};

export default DonutChart;