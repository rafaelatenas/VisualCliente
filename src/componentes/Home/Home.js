import { Close, CloseRounded, ExitToApp, HomeOutlined, Settings } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import angle_down from '../../landing/favicon/angle-down-solid.svg';
import gear from '../../landing/favicon/gear-solid.svg';
import user from '../../landing/favicon/user-solid.svg';
import atenas_logo from '../../landing/Images/ats_logo-blanco-elises-.png';
import logo_atenas from '../../landing/Images/ats_logo-elise-blanca.png';
import { Button, Container } from '@mui/material';
import Carousel from './carrusel';
import './home.css';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

class Home extends React.Component {
    
    componentDidMount(){
        var elements_menu = [
            0,
            1,
            2,
            3,
            4,
        ]
        var boton = [
            document.getElementById('menu_1'),
            document.getElementById('menu_2'),
            document.getElementById('menu_3'),
            document.getElementById('menu_4'),
            document.getElementById('menu_5')
        ]
        const elemento_desplegable = document.getElementsByClassName("deplegable");
        boton.forEach(item => {
            item.addEventListener('click',()=>{
                for (const j of elements_menu) {
                    var valor_boton = Array.from(item.id);
                    var valor_desplegable = Array.from(elemento_desplegable[j].id)
                    var comparador = valor_boton[5] === valor_desplegable[12];
                    var valor_elemento = elemento_desplegable[j].style.display;
                    if (valor_elemento === "none" & comparador === true) {
                        elemento_desplegable[j].style.display = "block"
                        const image_container = document.querySelectorAll('.image-container');
                        for (let w = 0; w < image_container.length; w++) {
                            if (w===j) {
                                elemento_desplegable[j].style.width=`${image_container[w].clientWidth}px`
                                elemento_desplegable[j].style.left =`${image_container[w].getBoundingClientRect().left}px`  
                            }
                        }
                        elemento_desplegable[j].animate([
                            { opacity: '0' },
                            { opacity: '1' }
                        ], {
                            duration: 1000,
                            fill: 'forwards',
                        });
                        boton[j].animate(
                            [
                                { transform: 'rotate(0deg)' },
                                { transform: 'rotate(180deg)' }
                            ], {
                                duration: 700,
                                fill: 'forwards'
                            });
                    }else if (valor_elemento === "block") {
                        boton[j].animate(
                            [
                                { transform: 'rotate(180deg)' },
                                { transform: 'rotate(0deg)' }
                            ], {
                                duration: 700,
                                fill: 'forwards'
                            });
                        elemento_desplegable[j].animate([
                            { opacity: '1' },
                            { opacity: '0' }
                        ], {
                            duration: 1000,
                            fill: 'forwards',
                        })
                        setTimeout(() => {
                            elemento_desplegable[j].style.display = 'none'
                        }, 1000);
                    }
                }
            })
        });
        
        const opciones_usuario = document.getElementById('opciones_usuario');
        const contenedoropciones = document.getElementById('contenedoropciones');
        var contadorClick;
        var acumuladorClik = 0;
        opciones_usuario.addEventListener('click',()=>{
            acumuladorClik = acumuladorClik +1;
            contadorClick = contadorClick++;
            let iterador = acumuladorClik%2
            switch (iterador) {
                case 1:
                    contenedoropciones.animate([
                        {transform: 'scale(1)'}
                    ],
                    {
                        fill:'forwards',
                        duration:1200
                    }
                    )
                    document.querySelector('section').addEventListener('click', () => {
                        contenedoropciones.animate([
                            {transform: 'scale(0)'}
                        ],
                            {
                                fill:'forwards',
                                duration:1200
                            }
                        )
                    });
                    document.querySelector('footer').addEventListener('click', () => {
                        contenedoropciones.animate([
                            {transform: 'scale(0)'}
                        ],
                            {
                                fill:'forwards',
                                duration:1200
                            }
                        )
                    })
                    break;
                case 0:
                    contenedoropciones.animate([
                        {transform: 'scale(0)'}
                    ],
                    {
                        fill:'forwards',
                        duration:1200
                    }
                    )
                    break;
                default:
                    break;   
            }
            document.querySelector('section').addEventListener('click', () => {
                contenedoropciones.animate([
                    {transform: 'scale(0)'}
                ],
                    {
                        fill:'forwards',
                        duration:1200
                    }
                )
            });
            document.querySelector('footer').addEventListener('click', () => {
                contenedoropciones.animate([
                    {transform: 'scale(0)'}
                ],
                    {
                        fill:'forwards',
                        duration:1200
                    }
                )
            })
        });

        //--- Redireccionar a información de los servicios---//

        var prueba = [
            "Canales y Cadenas",
            "NSE",
            "Top Sku`s ",
            "Top Proveedores",
            "Categoría",
            "Ranking Categorías",
            "Omnibus",
            "valor 8",
            "valor 9",
        ]
        
        const slide = document.querySelectorAll(".slide")
        var texto_modal = document.getElementById('texto_modal')
        var modal = document.getElementById('modal')
        for (const iterador_slide of slide) {
            iterador_slide.addEventListener('click', () => {
                setTimeout(() => {
                    modal.style.display = "block"
                }, 500);
                for (const j of elements_menu) {
                    const elemento_desplegable = document.getElementsByClassName("deplegable");
                    var valor_elemento = elemento_desplegable[j].style.display;
                    if (valor_elemento === "block") {
                        boton[j].animate(
                            [
                                { transform: 'rotate(180deg)' },
                                { transform: 'rotate(0deg)' }
                            ], {
                                duration: 700,
                                fill: 'forwards'
                            });
                        elemento_desplegable[j].animate([
                            { opacity: '1' },
                            { opacity: '0' }
                        ], {
                            duration: 1000,
                            fill: 'forwards',
                        })
                        setTimeout(() => {
                            elemento_desplegable[j].style.display = 'none'
                        }, 1000);
                    }
                }
                for (let n = 0; n < prueba.length; n++) {
                    const elemento = n + 1;
                    var valor_imagen = iterador_slide.children[0].dataset.icon
                    if (`${valor_imagen}` === `${elemento}`) {
                        var p;
                        p = document.createElement('p');
                        p.id = "prueba";
                        p.innerHTML = prueba[n];
                        texto_modal.appendChild(p);
                    }
                    const numero_hijo = texto_modal.childElementCount;
                    if ((numero_hijo > 1)) {
                        texto_modal.removeChild(texto_modal.children[0]);
                    }
                }
            })
            
            document.querySelector('section').addEventListener('click', () => {
                modal.style.display = "none"
            })
            document.querySelector('header').addEventListener('click', () => {
                modal.style.display = "none"
            });
        }

      //-- -- --carousel de animación footer-- -- -- //
        const pausa = document.querySelector(".slider");
        const slide_track = document.getElementById("slide-track");
        slide_track.style.width = `${window.screen.width*3}px`
        pausa.addEventListener('mouseover', () => {
            slide_track.style.animationPlayState = "paused"
        });
        pausa.addEventListener('mouseout', () => {
            slide_track.style.animationPlayState = "running"
        });  

    }
    PowerBi=(e)=>{
        var modal = document.getElementById('modal');
        var texto_modal = document.getElementById('texto_modal')
        modal.style.display='block'
        console.log(window)
        let iframe = '';
        switch (e.target.id) {
            case 'wopBi':
                iframe +='<iframe id="iframeWOP" width="800px" height="600px" title="Frame WOP Url" frameborder="0" src="https://app.powerbi.com/reportEmbed?reportId=593bcb73-4e32-4982-9a0e-ece34c4bcca6&autoAuth=true&ctid=60d43e61-27f8-4543-b6ff-2b0d08f50018&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXBhYXMtMS1zY3VzLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9"> </iframe>'
                break;
            case 'manejadorBi':
                iframe +='<iframe id="iframeWOP" width="800px" height="600px" title="Frame WOP Url" frameborder="0" src="https://app.powerbi.com/reportEmbed?reportId=593bcb73-4e32-4982-9a0e-ece34c4bcca6&autoAuth=true&ctid=60d43e61-27f8-4543-b6ff-2b0d08f50018&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXBhYXMtMS1zY3VzLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9"> </iframe>'
                break
            default:
                break;
        }
        console.dir(modal)

        texto_modal.innerHTML = iframe;
    }
    
	render() {
		return(
            <Container className='containerBox'>
                <header>
                    <div className='components-header'>
                        <img className='logo-atenas' src={logo_atenas} alt="Logo Atenas"></img>
                        <img className='Logo-atenas' src={atenas_logo} alt="Logo Atenas"></img>
                        <div id="opciones_usuario" className='opcionesUsuario'>
                            <Button className='union' startIcon={<ManageAccountsIcon style={{fill:'#575756', fontSize:'2em', width:'auto', minHeight:'28px', flexShrink:'initial'}}/>}></Button>
                        </div>
                        <div id="contenedoropciones" className="contenedoropcionesUsuario">
                            <Button startIcon={<ExitToApp style={{fill:'#575756', fontSize:'2em', width:'auto', minHeight:'28px', flexShrink:'initial'}}/>} style={{display:'flex',width: '90%', height:'auto', alignItems:'center'}}>
                                <Link style={{fontSize:'.8em'}} to={"/"}>Salir</Link>
                            </Button>
                            <Button startIcon={<Settings style={{fill:'#575756', fontSize:'2em', width:'auto', minHeight:'28px', flexShrink:'initial'}}/>} style={{display:'flex',width: '90%', height:'auto',alignItems:'center'}}>
                                <Link style={{fontSize:'.8em'}} to={"CambiarC/CambiarC"}>Contraseña</Link>
                            </Button>
                        </div>
                            
                        <div className='content-usuario'>
                        </div>
                    </div>
                </header>

                <section className="container">
                    <article className="gallery">
                        <div className="gallery-container">
                            <div className="gallery-item gallery-item-1" data-index="1" id="wop">
                                <button id="img_1" className="image-container"></button>
                                <img id="menu_1" src={angle_down} alt="Show Menu"></img>
                            </div>
                            <div className="gallery-item gallery-item-2" data-index="2" id="scanning">
                                <button id="img_2" className="image-container"></button>
                                <img id="menu_2" src={angle_down} alt="Show Menu"></img>
                            </div>
                            <div className="gallery-item gallery-item-3" data-index="3" id="home_pantry">
                                <button id="img_3" className="image-container"></button>
                                <img id="menu_3" src={angle_down} alt="Show Menu"></img>
                            </div>
                            <div className="gallery-item gallery-item-4" data-index="4" id="execution">
                                <button id="img_4" className="image-container"></button>
                                <img id="menu_4" src={angle_down} alt="Show Menu"></img>
                            </div>
                            <div className="gallery-item gallery-item-5" data-index="5" id="CI">
                                <button id="img_5" className="image-container"></button>
                                <img id="menu_5" src={angle_down} alt="Show Menu"></img>
                            </div>
                        </div>
                        <div className="gallery-controls"></div>
                    </article>
                    <aside style={{display:'none'}} className="deplegable" id="despelgable_1">
                        <div className="container-desplegable">
                            <div className="content-desplegable">
                                <div id="elementsWOP">
                                    <Link to={'/data'}>data</Link>
                                    <Link to={'/management/panel'}>admin</Link>
                                    <button id='wopBi' onClick={this.PowerBi}>WOP</button>
                                    <button id='manejadorBi' onClick={this.PowerBi}>WOP</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <aside style={{display:'none'}} className="deplegable" id="despelgable_2">
                        <div className="container-desplegable">
                            <div className="content-desplegable">
                                <div id="elementsRSc"></div>
                            </div>
                        </div>
                    </aside>
                    <aside style={{display:'none'}} className="deplegable" id="despelgable_3">
                        <div className="container-desplegable">
                            <div className="content-desplegable">
                                <div id="elementsHP"></div>
                            </div>
                        </div>
                    </aside>
                    <aside style={{display:'none'}} className="deplegable" id="despelgable_4">
                        <div className="container-desplegable">
                            <div className="content-desplegable">
                                <div id="elementsExc"></div>
                            </div>
                        </div>
                    </aside>
                    <aside style={{display:'none'}} className="deplegable" id="despelgable_5">
                        <div className="container-desplegable">
                            <div className="content-desplegable">
                                <div id="elementsCI"></div>
                            </div>
                        </div>
                    </aside>
                </section>
                
                <aside id="modal"  style={{display:'none'}}>
                    <section id="texto_modal"></section>
                </aside> 

                <footer>
                    <div id="barUser" className="bar-user">
                        <img src="" alt=""></img>
                    </div>
                    <div className="modificables">
                        <ExitToApp className="log_out"></ExitToApp>
                        <HomeOutlined className="home"></HomeOutlined>
                        <Settings className="config"></Settings>
                    </div>
                    <div className="complementary-buttons">
                        <Carousel/>
                    </div>
                </footer>
            </Container>
            
                
            
        )
    }
}

export default Home;

