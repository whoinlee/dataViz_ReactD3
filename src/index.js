import React from "react";
import ReactDOM from "react-dom";
//-- Components
// import HistoMapWithBrushing from './components/HistoMapWithBrushing';
import DonutChart from "./components/DonutChart";
//-- Styles
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <DonutChart />
  </React.StrictMode>,
  document.getElementById("root")
);
