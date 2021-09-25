import React from 'react';
import ReactDOM from 'react-dom';
//-- Components
import HistoMapWithBrushing from './components/HistoMapWithBrushing';
//-- Styles
import "./style.css";


ReactDOM.render(
  <React.StrictMode>
    <HistoMapWithBrushing />
  </React.StrictMode>,
  document.getElementById('root')
);