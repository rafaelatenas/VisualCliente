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
  return (  
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="home" element={<Home/>} />
            <Route exact path="data" element={<DataReport/>} />
            <Route exact path="/activar/usuario" element={<ActivarUsuario/>}  />
            {/* Componentes de Gestión de Usuario */}
            <Route exact path="home/CambiarC/CambiarC" element={<CambiarC/>}/>
            <Route exact path="management/panel" element={<Admin/>}/>
            <Route exact path='/management/panel/createUser' element={<Usuario/>}/>
            <Route exact path='/management/panel/createPerfil' element={<Perfiles/>}/>
            <Route exact path='data/dataTable' element={<VisualizarData/>}/>
        </Routes>
    </BrowserRouter>  
  );
}
export default App;
