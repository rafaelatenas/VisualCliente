import React from 'react';
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

function App() {
  // const urlPrueba = ""
  const urlProduccion = 'retailservices/';
  return (  
    <BrowserRouter>
        <Routes>
            <Route exact path={urlProduccion} element={<Login/>} />
            <Route exact path={urlProduccion+"home/:id"} element={<Home/>} />
            <Route exact path={urlProduccion+"data"} element={<DataReport/>} />
            <Route exact path="/activar/usuario" element={<ActivarUsuario/>}  />
            {/* Componentes de Gestión de Usuario */}
            <Route exact path="home/CambiarC/CambiarC" element={<CambiarC/>}/>
            <Route exact path={urlProduccion+"management/panel"} element={<Admin/>}/>
            <Route exact path={urlProduccion+'management/panel/createUser'} element={<Usuario/>}/>
            <Route exact path={urlProduccion+'management/panel/createPerfil'} element={<Perfiles/>}/>
            <Route exact path='data/dataTable' element={<VisualizarData/>}/>
        </Routes>
    </BrowserRouter>  
  );
}
export default App;
