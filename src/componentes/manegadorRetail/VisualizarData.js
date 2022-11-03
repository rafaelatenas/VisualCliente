import React, { useEffect, useMemo,useCallback, useRef } from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box} from '@material-ui/core';
import './visualizar.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import axios from 'axios';
  /*Data Global de Grilla*/

export default function Report(params){
  const {datos} =params
  console.log(params)
  const [gridApi, setGridApi] = useState(null);
  const [gridData, setGridData] = useState([]);
  const gridRef = useRef();
  const columns = [
    // { headerName:"Areas",field:"Areas", filter: "agTextColumnFilter" ,chartDataType: 'category', rowGroup: true, hidden:true},
    // { headerName:"Zona",field:"Zona", filter: "agTextColumnFilter" ,chartDataType: 'category', rowGroup: true, hidden:true},
    
    { headerName:"Canal", field: "Canal"},
    { headerName:"Area", field: "Areas"},
    { headerName:"Zona", field: "Zona"},
    { headerName:'Cesta', field: "Cesta"},
    { headerName:'Categoria', field: "Categoria"},
    { headerName:'Fabricante', field: 'Fabricante'},
    { headerName:'Marca', field: 'Marca'},
    { headerName:'Indicador', field: 'Indicador'},
    { headerName:'Semana', field: 'Semana'},
    // { headerName:'Producto', field: 'Producto'},
    // { headerName:'Producto', field: 'Producto'},
    // { headerName:'Producto', field: 'Producto'},
    // { headerName:'Producto', field: 'Producto'},
    // { headerName:'Producto', field: 'Producto'},

  ]
  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      axios.post('http://localhost:3005/VisorCliente_Api/GenerarDataSemanal/', {
        IdValor: 71,
        IdCanal: 1,
        IdArea: 3,
        IdZona: "",
        IdCesta: 2,
        IdCategoria: 86,
        IdIndicador: ""
      })
        .then(response => { console.log(response)
          params.successCallback(response.data.data);
        })
        .catch(error => {
          console.error(error);
          params.failCallback();
        })
    }
  };

  const onGridReady = (params) => {
    setGridApi(params);
    // register datasource with the grid
    params.api.setServerSideDatasource(datasource);
    console.log(params)
  }

  return (
    <div style={{width:'100%', height:'100vh'}}>
      <div className="ag-theme-alpine" style={{width:'100%', height:'90%'}}>
      <div className="ag-theme-alpine" style={ {height: '100%'} }>
      <AgGridReact
          groupDisplayType = {'groupRows'}
          columnDefs={columns}
          // autoGroupColumnDef={true}
          rowGroupPanelShow='always'
          sideBar={true}
          enableCharts={true}
          animateRows={true}
          enableRangeSelection={true}
          enableRangeHandle={true}
          domLayout='normal'
          rowModelType="serverSide"
          onGridReady={onGridReady}
          // defaultColDef={{ filter: true, floatingFilter: true, sortable: true , enableRowGroup: true, resizable:true}}
        />
      </div>
      </div>
    </div>

  );
}
