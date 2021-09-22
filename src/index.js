import React from 'react';
import ReactDOM from 'react-dom';
//-- Components
// import DonutChart from './components/DonutChart';
import BarChart from './components/BarChart';
//-- Styles
import "./style.css";


ReactDOM.render(
  <React.StrictMode>
    <BarChart />
  </React.StrictMode>,
  document.getElementById('root')
);