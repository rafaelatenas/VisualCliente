import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


import {LicenseManager} from "@ag-grid-enterprise/core";
LicenseManager.setLicenseKey("CompanyName=Atenas Consulting Group, LLC,LicensedApplication=atenasweb,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-033829,SupportServicesEnd=12_octubre_2023_[v2]_MTY5NzA2NTIwMDAwMA==36faf30320fe096967ab09");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
