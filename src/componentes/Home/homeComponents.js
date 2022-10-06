import React, { useState } from "react";
import { ManageAccounts, ExitToApp, Settings, AdminPanelSettings } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Container, IconButton, Paper, Popover, SpeedDial, SpeedDialAction, Typography} from "@mui/material";
import eliseAtenas from '../../landing/Images/ats_logo-elise-blanca.png'
import logoAtenas from '../../landing/Images/ats_logo-blanco-elises.png'
import { makeStyles } from "@material-ui/styles";
import KeyboardArrowDown from '../../landing/favicon/angle-down.svg';
import { Link, NavLink } from "react-router-dom";
//Imagenes Reportes
import RServices from '../../landing/Images/logo_RetailServices.png'
import RScanning from '../../landing/Images/ATSLogoRScanning.png'
import HPantry from '../../landing/Images/ATSLogoHP.png'
import Excecution from '../../landing/Images/ATSLogoExecution.png'
import CI from '../../landing/Images/ATSLogoCI.png'
// Iconos Reportes
import NSE from '../../landing/Images/IconATSNSE.jpg'
import CanalesCadenas from '../../landing/Images/IconATSCanalesCadenas.jpg'
import Categorias from '../../landing/Images/IconATSCategorias.png'
import Omnibus from '../../landing/Images/IconATSOmnibus.png'
import RankingCategorias from '../../landing/Images/IconATSRankingCategorias.png'
import TopProveedores from '../../landing/Images/IconATSTopProveedores.jpg'
import TopSkus from '../../landing/Images/IconATSTopSkus.png'
//------//
import WOP from '../../landing/Images/ATSLogoWop.png'
import MoneyMarket from '../../landing/Images/ATSLogoMoneyMarket.png'
import { useAuthContext } from "../context/authContext";

import temporal from "../../landing/Images/provisional.png"
import SwipeableViews from "react-swipeable-views";
import {virtualize} from "react-swipeable-views-utils"
import {mod} from "react-swipeable-views-core"

const reports = [
    {key: 1 , name:'WOP', icon:WOP, style:{height:'90%'}},
    {key: 2 , name:'Retail Scanning', icon:RScanning, style:{height:'80%', width:'80%'}},
    {key: 3 , name:'Home Pantry', icon:HPantry, style:{height:'85%'}},
    {key: 4 , name:'CI', icon:CI, style:{height:'90%', minWidth:100, minHeight:120, padding:'5%'}},
    {key: 5 , name:'Execution', icon:Excecution, style:{height:'80%', width:'80%'}},
    
]

/* -- Modulos Header -- */
export function HeaderMovile(){
    const styles = useStylesMoViles();
    const withdScreen=window.innerWidth;
    const heightScreen=window.innerHeight;
    return(
        <Box className={styles.Box}>
            <img className={styles.ImgLogo} src={logoAtenas} alt='Logo Atenas Grupo Consulto. Elise Blanca' title=""/>
        </Box>
    )
}
const useStylesMoViles = makeStyles((withdScreen, heightScreen)=>({
    Box:{
        width:'100%',
        height:'15%',
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    ImgLogo:{
        width:'auto',
        height:'100%',
    }
}))
export function HeaderDesktop(props){
    const {logout, isAuthenticated}=useAuthContext();

    const styles = useStyles();
    const actions = [
        { icon: <ExitToApp className='IconsSpeedDial' onClick={()=>logout()}/>, name: 'Salir', admin:0 },
        { icon: <NavLink className='LinkIcons' to={`/retailservices/home/changepassword/${sessionStorage.getItem('user')}`} ><Settings className='IconsSpeedDial'/></NavLink>, name: 'Configuraciones', admin:0 },
    ];
    const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
    const handleOpenSpeedDial = () => setOpenSpeedDial(true);
    const handleCloseSpeedDial = () => setOpenSpeedDial(false);
    return(
        <Container className={styles.ContainerBox}>
            <Box className={`${styles.BoxPrimary} BoxTainer`}>
                <Link to={'/retailservices/home'}>
                    <img className='eliseAtenas' src={eliseAtenas} alt='Logo Atenas Grupo Consulto. Elise Blanca' title=""/>
                </Link>
                <Box className={styles.boxSecundary}>
                    <SpeedDial
                        ariaLabel="SpeedDial controlled open example"
                        icon={<ManageAccounts className="IconsSpeedDial" style={{fill:'#fff !important'}}/>}
                        onClose={handleCloseSpeedDial}
                        onOpen={handleOpenSpeedDial}
                        open={openSpeedDial}
                        direction={'left'}
                        className='speddialCSS'
                    >
                        {actions.map((action) =>{ 
                            //Validación de Tipos de Usuario (Administrador y Cliente)
                            // switch (key) {
                            //     case value:
                                    
                            //         break;
                            
                            //     default:

                            //         break;
                            // }
                        return(<SpeedDialAction
                            id={action.id}
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />)
                        })}
                    </SpeedDial>
                </Box>
            </Box>    
            <Paper className={`paperUser boxSecundaryLogo`}>
                <div>
                    <img src={temporal} alt="Logo de Usuario" title=""/>
                    <Typography>Nombre de Usuario</Typography>
                </div>
            </Paper>
        </Container>
    )
}
const useStyles = makeStyles(()=>({
    ContainerBox:{
        width:'100%',
        height: '15%',
        overflow:'visible',
        margin:'2% 0% 0% !important',
        //display:'flex',
        alignItems:'center',
        padding:'0 !important',
        maxWidth:'none'
    },
    BoxPrimary:{
        width:'100%',
        height: '100%',
        overflow:'visible',
        display:'inline-flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    boxSecundary:{
        width:'auto',
        height:'60%',
        overflow:'visible',
        '& div button':{
            boxShadow:'none',
            backgroundColor:'#1976d2',
            borderRadius:'50%'
        },
        '& div button svg':{
            fill:'#fff'
        }
    },
}))

/* -- Modulos Tarjetas de Reportes -- */
export function CardMovile(){
    const VirtualizeSwipeableViews = virtualize(SwipeableViews)
    const styles = {
        slide: {
          padding: 15,
          minHeight: 100,
          color: '#fff',
        },
        slide1: {
          backgroundColor: '#FEA900',
        },
        slide2: {
          backgroundColor: '#B3DC4A',
        },
        slide3: {
          backgroundColor: '#6AC0FF',
        },
      };
    const slideRenderer =(params)=>{
        const { index, key } = params;
        console.log(mod(index, 3))
        switch (mod(index, 3)) {
            case 0:
              return (
                <Box key={key} style={Object.assign({}, styles.slide, styles.slide1)}>
                  slide n°1
                </Box>
              );
        
            case 1:
              return (
                <Box key={key} style={Object.assign({}, styles.slide, styles.slide2)}>
                  slide n°2
                </Box>
              );
        
            case 2:
              return (
                <Box key={key} style={Object.assign({}, styles.slide, styles.slide3)}>
                  slide n°3
                </Box>
              );
        
            default:
              return null;
          }
        }

    

    return(
        <Container className="algo" style={{width:'100%',height:'100%'}}>
            <Box className="algo" style={{width:'100%',height:'100%'}}>
                <VirtualizeSwipeableViews slideRenderer={slideRenderer} style={{width:'100%',height:'100%', 'div':{width:'100%',height:'100%',}}}/>
                {/* {reports.map((report)=>{
                    <Card>
                        <CardContent>{report.name}</CardContent>
                    </Card>
                })} */}
            </Box>
        </Container>
    )
}
const useStylesCardMovile = makeStyles(()=>({

}))

export function CardDesktop(props){
    const{PropsCardPopover,PropsCardPopoverClose,PropsIdPopover}=props
    const styles = useStylesCard();
    return(
        <Box className={styles.Boxcards}>
            {reports.map((report)=>(
                <Card className={styles.Card} key={report.key}>
                    <CardContent className='CardContent'>
                        <img style={report.style} src={report.icon} alt={`Logo Atenas Grupo Consultor. Repote ${report.name}`} title=""/>  
                    </CardContent>
                    
                    <IconButton className={styles.Arrow} onClick={(e)=>PropsCardPopoverClose(e)} style={{padding:0}}>
                        <img id={report.key} src={KeyboardArrowDown} alt="Desplegar Menú" title=""/>
                    </IconButton>
                </Card>
            ))}
        </Box>
    )
}
const useStylesCard = makeStyles(()=>({
    Boxcards:{
        display:'flex',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'space-around',
    },
    Card:{
        backgroundColor:'transparent !important',
        width:'15%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        boxShadow:'none !important',
    },
    Arrow:{
        width:'15%',
        height:'auto',
        maxWidth:50
    }
}))
/* -- Modulo Carousel -- */
export function footerMovile() {
    const styles = usefooterMovile();
}
const usefooterMovile = makeStyles (()=>({

}))

export function CarouselFooter(props){
    const {PropsFooterdata}= props

    const reports = [
        {name:'Home Pantry', descripcion:'', fondo:'', key:1, icon:HPantry, style:{height:'85%', width:'auto'}},
        {name:"Scanning", descripcion:'', fondo:'', key:2, icon:RScanning, style:{height:'80%', width:'auto'}},
        {name:'Money Market', descripcion:'', fondo:'', key:3, icon:MoneyMarket, style:{height:'90%', minWidth:100, minHeight:120, padding:'5%'}},
        {name:'Medicinas', descripcion:'', fondo:'', key:4, icon:Categorias, style:{height:'90%', width:'auto'}},
        {name:'WOP', descripcion:'', fondo:'', key:5, icon:WOP, style:{height:'90%'}},
        {name:'CI', descripcion:'', fondo:'', key:6, icon:CI, style:{height:'85%', width:'auto'}},
        {name:'Omnibus', descripcion:'', fondo:'', key:7, icon:Omnibus, style:{height:'85%', width:'auto'}},
        {name:'CENSO', descripcion:'', fondo:'', key:8, icon:CanalesCadenas, style:{height:'85%', width:'auto'}},
    ]
    const valor = reports.length
    const styles = useStylesCarousel({valor}) 
    const [paused, setPaused]=useState(false)
 
    return(
        <Box className={`CardsCarousel ${styles.CardsCarousel}`} style={paused ? {animationPlayState: 'paused'}:{animationPlayState:'running'}} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
            {reports.map((report)=>(
                <IconButton className="slide" key={report.key}  onClick={()=>props.PropsFooterOpenModal(report.icon)}>
                    <Card className={styles.Card}>
                        <CardContent className={styles.containerCard}>
                            <img style={report.style} src={report.icon} alt={`Icono Atenas Grupo Consultor. Reporte ${report.name}`} title=""/>    
                        </CardContent>
                    </Card>
                </IconButton>
            ))}
        </Box>
    )
}

const useStylesCarousel = makeStyles({
    Card:{
        width:'100%',
        height:'100%',
    },
    containerCard:{
        width:'100%',
        height:'100%',
        padding:'0% !important',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    '@keyframes scroll': {
        from: { transform: 'translateX(0)' },
        to: { transform: ({ valor }) => `translateX(calc(-180px*${valor*1.063}))` },
      },
      '@media(maxWidth: 1500px)' : {
        CardsCarousel: {
            animation:({ valor }) =>`$scroll ${valor*2.25}s linear infinite`,
        },
    },
    // CardsCarousel: {
    //     animation:({ valor }) =>`$scroll ${valor*2.25}s linear infinite`,
    // },
        CardsCarousel: {
            animation:({ valor }) =>`$scroll ${valor*1.15}s linear infinite`,
        },
 }); 
