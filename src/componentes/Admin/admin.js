import { Box } from "@mui/material";
import React from "react";
import './admin.css';
import MenuAdmin from "./componentesAdmin/menuAdmin";

class Admin extends React.Component {
    render(){
        return(
            <Box className="BOX">
                <section className="cuerpo-modificable"></section>
                <MenuAdmin/>
            </Box>
        )
    }
}
export default Admin

