import { Container, Box, Button } from "@mui/material"
import { Navigate } from "react-router-dom";
import elise from '../landing/Images/ats_logo.png'
import notfound from '../landing/Images/notfound.png'
import { useAuthContext } from "./context/authContext";

import './notfount.css'
export default function NotFound(){
    const {isAuthenticated,login,logout,IdUser}=useAuthContext();
    const admin = IdUser===2
    return(
        <Container className="ContainerNotFound">
            <Box className="boxNotFound">
                <div style={{textAlign:'center', color:'#575756'}}>
                    <h1 style={{fontSize:'xxx-large'}}>404</h1>
                    <h2>Page Not Found</h2> 
                </div>
                <img className="rotate" src={elise} alt="ELISE ATENAS" title=""/>
                
            </Box>
            <Button className="volver" variant="contained" href={isAuthenticated? admin?'/retailservices/home/management/panel':'/retailservices/home':'/retailservices/'}>Volver</Button>
        </Container>   
    );
}