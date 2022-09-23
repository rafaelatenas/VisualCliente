import React from "react";
import open from '../../landing/favicon/bars-solid-movile.svg';
import close from '../../landing/favicon/times-solid.svg';
import './componentes.css';

class botonmenu extends React.Component{

    componentDidMount(){
        var menu = document.getElementById('menu');
        var cancel_menu = document.getElementById('cancel-menu');
        var menu_desplegable = document.getElementById('menu-des');
        
        if (menu.style.visibility === 'visible') {
            menu.addEventListener('click', () => {
    
                cancel_menu.style.visibility = "visible";
                menu.style.visibility = "hidden";
            
                menu_desplegable.animate([
                    //{transform: 'translateX(-100%)'},
                    {transform: 'translateX(98%)'}
                
                ],{
                    fill:'forwards',
                    duration:2400,
                })
                
            });
            cancel_menu.addEventListener('click', () => {
                menu_desplegable.animate([
                    {transform: 'translateX(-100%)'}
                ],{
                    fill:'forwards',
                    duration:2400
                })
    
                cancel_menu.style.visibility = "hidden";
                menu.style.visibility = "visible"
            });
        }
    
    }

    render(){
        return(
            <div className="user">
                <div className="content-user">
                    <img id="user-logo" src="./landing/Images/provisional.png" alt="User Logo"></img>
                    <p id="user-name">Usermane</p>
                </div>

                <div className="content-modi">
                    <div className="bottons-menu">
                        <img style={{visibility: "hidden"}} id="cancel-menu" src={close} alt="Cancel Menu Icon"></img>
                        <img style={{visibility: "visible"}} id="menu" src={open} alt="Menu Icon"></img>
                    </div>
                </div>
            </div>
        );
    }

}

export default botonmenu;