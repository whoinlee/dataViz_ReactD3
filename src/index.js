import React from 'react';
import ReactDOM from 'react-dom';
//-- Components
// import DonutChart from './components/DonutChart';
// import BarChart from './components/BarChart';
// import ScatterPlot from './components/ScatterPlot';
// import ScatterPlotWithMenu from './components/ScatterPlotWithMenu';
// import ScatterPlotWithColor from './components/ScatterPlotWithColor';
// import LineChart from './components/LineChart';
// import WorldMap from './components/WorldMap';
// import WorldMapWithCities from './components/WorldMapWithCities';
// import WorldMapMissingMigrants from './components/WorldMapMissingMigrants';
// import HistogramMissingMigrants from './components/HistogramMissingMigrants';
import HistoMapMissingMigrants from './components/HistoMapMissingMigrants';
//-- Styles
import "./style.css";


ReactDOM.render(
  <React.StrictMode>
    <HistoMapMissingMigrants />
  </React.StrictMode>,
  document.getElementById('root')
);