import React from 'react';
import ReactDOM from 'react-dom';
//-- Components
// import DonutChart from './components/DonutChart';
// import BarChart from './components/BarChart';
import ScatterPlot from './components/ScatterPlot';
//-- Styles
import "./style.css";


ReactDOM.render(
  <React.StrictMode>
    <ScatterPlot />
  </React.StrictMode>,
  document.getElementById('root')
);