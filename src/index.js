import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';


import {LicenseManager} from "@ag-grid-enterprise/core";
LicenseManager.setLicenseKey("CompanyName=Atenas Consulting Group, LLC,LicensedApplication=atenasweb,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-033829,SupportServicesEnd=12_October_2023_[v2]_MTY5NzA2NTIwMDAwMA==36faf920fe9e343e078c06ab69b78dd2");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
