import React from "react";
import { Link } from "react-router-dom";
import Logoatenas from "../../../landing/Images/ats_logo.png";
import '../admin.css';
import Tooltip from '@material-ui/core/Tooltip';
import { Person,Group } from "@material-ui/icons";
import { ExitToApp } from "@material-ui/icons";
import { useAuthContext } from "../../context/authContext";
export default function MenuAdmin (){
    const {logout}=useAuthContext();
        return(
            <nav className="sidebar-navigation">
                <div className="header-logo">
                    <Tooltip title={sessionStorage.getItem('nombres')+' '+sessionStorage.getItem('apellidos')} arrow placement="right">
                        <img src={Logoatenas} alt="Logo Atenas"></img> 
                    </Tooltip>
                </div>
                <ul id="lista" className="lista">
                    <li>
                        <Tooltip title="Gestión de Usuarios" arrow placement="right">
                            <Link to={'/retailservices/home/management/panel/createUser'}>
                                <Person style={{fill:'#000000'}}></Person>
                            </Link>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="Gestión de Perfiles" arrow placement="right">
                            <Link to={'/retailservices/home/management/panel/createPerfil'}>
                                <Group style={{fill:'#000000'}}></Group>
                            </Link>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="Salir" arrow placement="right">
                            <Link to={'/retailservices/management/panel/createUser'}><ExitToApp style={{fill:'#000000'}}></ExitToApp></Link>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="Salir" arrow placement="right">
                            <Link to={'/retailservices/data'}><ExitToApp style={{fill:'#000000'}}></ExitToApp></Link>
                        </Tooltip>
                    </li>
                    <li onClick={()=>logout()}>
                        <Tooltip title="Salir" arrow placement="right">
                            <ExitToApp style={{fill:'#000000'}}></ExitToApp>
                        </Tooltip>
                    </li>
                </ul>
            </nav>
        )
}

