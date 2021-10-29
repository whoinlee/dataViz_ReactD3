import React from 'react';
import ReactDOM from 'react-dom';
//-- Components
// import HistoMapWithBrushing from './components/HistoMapWithBrushing';
import ScatterPlotWithColor from './components/ScatterPlotWithColor';
//-- Styles
import "./style.css";


ReactDOM.render(
  <React.StrictMode>
    <ScatterPlotWithColor />
  </React.StrictMode>,
  document.getElementById('root')
);