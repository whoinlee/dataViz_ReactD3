import React from 'react';
import ReactDOM from 'react-dom';
//-- Components
// import DonutChart from './components/DonutChart';
// import BarChart from './components/BarChart';
// import ScatterPlot from './components/ScatterPlot';
// import LineChart from './components/LineChart';
import WorldMap from './components/WorldMap';
//-- Styles
import "./style.css";


ReactDOM.render(
  <React.StrictMode>
    <WorldMap />
  </React.StrictMode>,
  document.getElementById('root')
);