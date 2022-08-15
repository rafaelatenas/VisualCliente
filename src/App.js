import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Admin from './componentes/Admin/admin';
import Perfiles from './componentes/Admin/componentesAdmin/perfil/Perfiles'
import Usuario from './componentes/Admin/componentesAdmin/usuario/Usuario';
import CambiarC from './componentes/CambiarC/CambiarC';
import DataReport from './componentes/Data/data';
import Home from './componentes/Home/Home'
import Login from './componentes/login/login'
import ActivarUsuario from './componentes/ActivarUsuario/activarUsuario';
import VisualizarData from './componentes/Data/VisualizarData';
import { AuthContextProvider } from './componentes/context/authContext';
import Public from './componentes/context/publico';
import Privado from './componentes/context/privado';

function App() {
  const urlProduccion = 'retailservices/';
  return (
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
            {/*Rutas Públicas*/}
            <Route path='/retailservices/' element={<Public/>}>
              <Route index element={<Login/>} />
              <Route exact path="/retailservices/activar/usuario" element={<ActivarUsuario/>}  />
             {/* <Route exact path="home/CambiarC/CambiarC" element={<CambiarC/>}/> */}
            </Route>

            {/*Rutas Privadas*/}
            <Route path='/retailservices/home/' element={<Privado/>}>
              <Route index element={<Home/>} />
              <Route path='/retailservices/home/data'  element={<DataReport/>} />
              {/* <Route exact path="/activar/usuario" element={<ActivarUsuario/>}  />
              <Route exact path={urlProduccion+'reporte'} element={<VisualizarData/>}/>
              {/* Componentes de Gestión de Usuario */}
              {/* <Route exact path={urlProduccion+"management/panel"} element={<Admin/>}/>
              <Route exact path={urlProduccion+'management/panel/createUser'} element={<Usuario/>}/>
              <Route exact path={urlProduccion+'management/panel/createPerfil'} element={<Perfiles/>}/> */}
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
export default App;
