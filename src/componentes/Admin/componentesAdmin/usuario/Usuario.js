import React from "react";
import './Usuario.css';
import MenuAdmin from "../menuAdmin";
import ListarUsuarios from "./ListarUsuarios";
import CrearUsuario from "./crearUsuario";
import {PersonAdd, RecentActorsOutlined } from "@material-ui/icons";
import { Stack } from "@mui/material";

class Usuario extends React.Component{
  componentDidMount(){
// Inicio de animación y efecto de despliegue de las opciones de administrador
    const botones = document.querySelectorAll('.boton');
    const contenedores = document.querySelectorAll('.contenedor')
      for (let j = 0; j < botones.length; j++) {
        botones[j].addEventListener('click',()=>{
        const HeightCreacion = contenedores[j].clientHeight === 0
        switch (HeightCreacion) {
          case true:
            setTimeout(() => {
              botones[j].style.borderBottomRightRadius= '0em';
              botones[j].style.borderBottomLeftRadius= '0em';
            }, 100);
            contenedores[j].style.borderTopRightRadius= '0em'
            contenedores[j].style.borderTopLeftRadius= '0em'
            contenedores[j].style.borderBottomRightRadius= '0.3em'
            contenedores[j].style.borderBottomLeftRadius= '0.3em'
            contenedores[j].animate([
              {height:'75%'},
            ],{fill:'forwards',duration: 1400});
            break;
          case false:
            setTimeout(() => {
              botones[j].style.borderBottomRightRadius= '0.3em';
              botones[j].style.borderBottomLeftRadius= '0.3em';
            }, 1400);
            contenedores[j].animate([
              {height:'0%'},
            ],{fill:'forwards',duration: 1400});
            break;
          default:
          break;
        }
        const contenedorConsulta = document.querySelector('.contenedor-consultas')
        const botonConsulta = document.querySelector('.consultar')
        const contenedorCreacion = document.querySelector('.contenedor-creacion')
        const botonCreacion = document.querySelector('.crear')
          if (contenedorCreacion.clientHeight > 0) {
            setTimeout(() => {
              botonCreacion.style.borderBottomRightRadius= '0.3em';
              botonCreacion.style.borderBottomLeftRadius= '0.3em';
            }, 1400);
            contenedorCreacion.animate([
              {height:'0%'},
            ],{fill:'forwards',duration: 1400});
          }
          if (contenedorConsulta.clientHeight > 0) {
            setTimeout(() => {
              botonConsulta.style.borderBottomRightRadius= '0.3em';
              botonConsulta.style.borderBottomLeftRadius= '0.3em';
                        }, 1400);
              contenedorConsulta.animate([
                {height:'0%'},
              ],{fill:'forwards',duration: 1400});
          }
        })
      }
  }    
  render(){
    return(
      <div className="Contenedorcompleto">
        <aside style={{display:"none"} } id="BoxActualizar"></aside>
        <MenuAdmin/>
        <section id="pantalla" className="contenedor-opciones">

          <article className="boton crear" style={{display:'inline-flex',alignItems:'center'}}>
            <Stack style={{flexDirection:'row', alignItems:'center',width:'20%', justifyContent:'space-evenly'}}>
              <PersonAdd style={{fontSize:"2.5em"}}/>Crear Nuevo Usuario
            </Stack>
          </article>
          <aside id="boxCrear" className="contenedor contenedor-creacion">
            <CrearUsuario></CrearUsuario>
          </aside>

          <article id="consulta" className="boton consultar" style={{display:'inline-flex',alignItems:'center'}}>
            <Stack style={{flexDirection:'row', alignItems:'center',width:'20%', justifyContent:'space-evenly'}}>
              <RecentActorsOutlined style={{fontSize:"2.5em"}}/>Lista de Usuarios
            </Stack>
          </article>
          <aside className="contenedor contenedor-consultas">
            <ListarUsuarios/>
          </aside>
        </section>
      </div>
    )
  }
}

export default Usuario;
