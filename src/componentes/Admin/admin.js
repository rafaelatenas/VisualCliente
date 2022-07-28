import React from "react";
import './admin.css';
import MenuAdmin from "./componentesAdmin/menuAdmin";

class Admin extends React.Component {
    render(){
        return(<>
                <section className="cuerpo-modificable"></section>
                <MenuAdmin/>
            </>
        )
    }
}
export default Admin

