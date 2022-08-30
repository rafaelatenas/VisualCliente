import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import DataReport from './componentes/Data/data';
import Home from './componentes/Home/Home'
import Login from './componentes/login/login'
import ActivarUsuario from './componentes/gestionClaves/activarUsuario';
import { AuthContextProvider, useAuthContext } from './componentes/context/authContext';
import Public from './componentes/context/publico';
import Privado from './componentes/context/privado';
import RecuperarClave from './componentes/gestionClaves/recuperarclave';
import CambiarClave from './componentes/gestionClaves/cambiarClave';
import NotFound from './componentes/notfount';
import Admin from './componentes/Admin/admin';
import Usuario from './componentes/Admin/componentesAdmin/usuario/Usuario';
import Report from './componentes/Data/VisualizarData';
import Perfiles from './componentes/Admin/componentesAdmin/perfil/Perfiles';
import Administrator from './componentes/context/administrator';

function App() {
  const {IdUser} = useAuthContext();

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
              <Route path='/retailservices/home/data/'  element={<DataReport/>} />
              <Route exact path='/retailservices/home/report' element={<Report/>}/>
              <Route exact path="/retailservices/home/changepassword/:email" element={<CambiarClave/>}/>
              
              {/* 
              <Route exact path='/retailservices/home/management/panel' element={<Admin/>}/>
              <Route exact path='/retailservices/home/management/panel/user' element={<Usuario/>}/>
              <Route exact path='/retailservices/home/management/panel/perfil' element={<Perfiles/>}/> */}
            </Route>

            {/* Componentes de Gestión Administrativa */}
            <Route path='/retailservices/management/panel/' element={<Administrator/>}>
              <Route index element={<Admin/>}/>
              <Route exact path='/retailservices/management/panel/user' element={<Usuario/>}/>
              <Route exact path='/retailservices/management/panel/perfil' element={<Perfiles/>}/>
            </Route>

            {/*Ruta No Encontrada*/}
            <Route exact path="*" element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
export default App;
