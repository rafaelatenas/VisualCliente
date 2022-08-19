import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import DataReport from './componentes/Data/data';
import Home from './componentes/Home/Home'
import Login from './componentes/login/login'
import ActivarUsuario from './componentes/gestionClaves/activarUsuario';
import { AuthContextProvider } from './componentes/context/authContext';
import Public from './componentes/context/publico';
import Privado from './componentes/context/privado';
import RecuperarClave from './componentes/gestionClaves/recuperarclave';
import CambiarClave from './componentes/gestionClaves/cambiarClave';
import NotFound from './componentes/notfount';
import Admin from './componentes/Admin/admin';
import Usuario from './componentes/Admin/componentesAdmin/usuario/Usuario';

function App() {
  const urlProduccion = 'retailservices/';
  return (
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
            {/*Rutas Públicas*/}
            <Route path='/retailservices/' element={<Public/>}>
              <Route index element={<Login/>} />
              {/* <Route exact path="/retailservices/activar/usuario" element={<ActivarUsuario/>}  /> */}
              <Route exact path="/retailservices/enableuser/:email" element={<ActivarUsuario/>}  />
              <Route exact path="/retailservices/recoverypassword/:email/:token" element={<RecuperarClave/>}/>
              

            </Route>
            {/*Rutas Privadas*/}
            <Route path='/retailservices/home/' element={<Privado/>}>
              <Route index element={<Home/>} />
              <Route path='/retailservices/home/data'  element={<DataReport/>} />
              <Route exact path="/retailservices/home/changepassword/:email" element={<CambiarClave/>}/>
              <Route exact path={'/retailservices/home/management/panel'} element={<Admin/>}/>
              <Route exact path={'/retailservices/home/management/panel/createUser'} element={<Usuario/>}/>
              {/* <Route exact path={urlProduccion+'reporte'} element={<VisualizarData/>}/>
              {/* Componentes de Gestión de Usuario */}
              {/* 
              <Route exact path={urlProduccion+'management/panel/createUser'} element={<Usuario/>}/>
              <Route exact path={urlProduccion+'management/panel/createPerfil'} element={<Perfiles/>}/> */}
            </Route>
            {/*Ruta No Encontrada*/}
            <Route exact path="*" element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
export default App;
