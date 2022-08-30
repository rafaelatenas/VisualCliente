import React, { useState } from "react";
import { ManageAccounts, ExitToApp, Settings, AdminPanelSettings } from "@mui/icons-material";
import { Box, Card, CardContent, Container, IconButton, Paper, Popover, SpeedDial, SpeedDialAction, Typography} from "@mui/material";
import eliseAtenas from '../../landing/Images/ats_logo-elise-blanca.png'
import logoAtenas from '../../landing/Images/ats_logo-blanco-elises.png'
import { makeStyles } from "@material-ui/styles";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Link, NavLink } from "react-router-dom";
//Imagenes Reportes
import WOP from '../../landing/Images/ATSLogoWop.png'
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
import { useAuthContext } from "../context/authContext";


const urlProduccion = 'retailservices/';

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
        height:'25%',
        display:'inline-flex',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    ImgLogo:{
        width:'auto',
        height:'90%',
    }
}))
export function HeaderDesktop(props){
    const {logout, isAuthenticated}=useAuthContext();

    const styles = useStyles();
    const actions = [
        { icon: <ExitToApp className={styles.IconsSpeedDial} onClick={()=>logout()}/>, name: 'Salir', admin:0 },
        { icon: <NavLink className={styles.LinkIcons} to={`/retailservices/home/changepassword/${sessionStorage.getItem('user')}`} ><Settings className={styles.IconsSpeedDial}/></NavLink>, name: 'Configuraciones', admin:0 },
    ];
    const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
    const handleOpenSpeedDial = () => setOpenSpeedDial(true);
    const handleCloseSpeedDial = () => setOpenSpeedDial(false);
    return(
        <Container className={styles.ContainerBox}>
            <Box className={`${styles.BoxPrimary} BoxTainer`}>
                <Link to={'/retailservices/home'}>
                    <img className={styles.eliseAtenas} src={eliseAtenas} alt='Logo Atenas Grupo Consulto. Elise Blanca' title=""/>
                </Link>
                <Box className={styles.boxSecundary}>
                    <SpeedDial
                        ariaLabel="SpeedDial controlled open example"
                        icon={<ManageAccounts/>}
                        onClose={handleCloseSpeedDial}
                        onOpen={handleOpenSpeedDial}
                        open={openSpeedDial}
                        direction={'left'}
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
            <Paper className={`${styles.paperUser} boxSecundaryLogo`}></Paper>
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
            boxShadow:'none'
        }
    },
    eliseAtenas:{
        minWidth:75,
        minHeight:79,
        maxHeight:100,
        maxWidth:95
    },
    paperUser:{
        position:'relative',
        left:'100%',
        top:'-90%',
        width:'20%',
        height:'65%',
        borderTopLeftRadius:'1.5em',
        borderBottomLeftRadius:'1.5em',
        borderRadius:0,
    },
    LinkIcons:{
        display: 'flex',
        alignItems: 'flex-start',
    },
    IconsSpeedDial:{
        width:'100%',
        height:'100%',
        padding:'10%',
        fill:'#575756'
    }
}))

/* -- Modulos Tarjetas de Reportes -- */
export function CardMovile(){
    const styles = useStylesCardMovile()
    return(
        <Container>
            <Box>
                {reports.map((report)=>{
                    <Card>
                        <CardContent></CardContent>
                    </Card>
                })}
            </Box>
        </Container>
    )
}
const useStylesCardMovile = makeStyles(()=>({

}))

export function CardDesktop(props){
    const styles = useStylesCard();

    return(
        <Box className={styles.Boxcards}>
            {reports.map((report)=>(
                <Card className={styles.Card} key={report.key}>
                    <CardContent className={styles.CardContent}>
                        <img style={report.style} src={report.icon} alt={`Logo Atenas Grupo Consultor. Repote ${report.name}`} title=""/>  
                    </CardContent>
                    <IconButton onClick={(e)=>props.PropsCardPopoverClose(e)} style={{padding:0}}>
                       <KeyboardArrowDownRoundedIcon style={{fill:'#fff', fontSize:'50px' }} id={report.key}></KeyboardArrowDownRoundedIcon>
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
        boxShadow:'none'
    },
    CardContent:{
        backgroundColor:'#fff',
        width:'90%',
        height:'45%',
        borderRadius:'1em',
        minWidth:160,
        maxWidth:250,
        minHeight:120,
        padding:'0% !important',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent:'center'
    },
    PaperCards:{
        width:'100%',
        height:'auto',
        backgroundColor:'#fff',

    },
    Collapse:{
        width:'100%',
        height:'100% !important',
        borderRadius:'1.2em',
        background:'#04172b73',
        overflowY:'visible !important'
    }

}))
/* -- Modulo Carousel -- */
export function footerMovile() {
    const styles = usefooterMovile();
}
const usefooterMovile = makeStyles (()=>({

}))
export function CarouselFooter(props){
    const styles = useStylesCarousel();
    const reports = [
        {name:'NSE', key:1, icon:NSE},
        {name:"Top Sku's", key:2, icon:TopSkus},
        {name:'Top Proveedores', key:3, icon:TopProveedores},
        {name:'Categorías', key:4, icon:Categorias},
        {name:'Ranking Categorías', key:5, icon:RankingCategorias},
        {name:'Omnibus', key:6, icon:Omnibus},
        {name:'Canales y Cadenas', key:7, icon:CanalesCadenas},
        {name:'NSE', key:8, icon:NSE},
        {name:"Top Sku's", key:9, icon:TopSkus},
        {name:'Top Proveedores', key:10, icon:TopProveedores},
        {name:'Categorías', key:11, icon:Categorias},
        {name:'Ranking Categorías', key:12, icon:RankingCategorias},
        {name:'Omnibus', key:13, icon:Omnibus},
        {name:'Canales y Cadenas', key:14, icon:CanalesCadenas},
    ]
    const [paused, setPaused]=useState(false)
    return(
        <Box className="CardsCarousel" style={paused ? {animationPlayState: 'paused'}:{animationPlayState:'running'}} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
            {reports.map((report)=>(
                <IconButton className="slide" key={report.key}  onClick={(e)=>props.PropsFooterOpenModal(report.key, e)}>
                    <Card className={styles.Card}>
                        <CardContent className={styles.containerCard}>
                            <img style={{width:'auto', height:'100%'}} src={report.icon} alt={`Icono Atenas Grupo Consultor. Reporte ${report.name}`} title=""/>    
                        </CardContent>
                    </Card>
                </IconButton>
            ))}
        </Box>
    )
}

const useStylesCarousel = makeStyles (()=>({
    Card:{
        width:'100%',
        height:'100%',
    },
    containerCard:{
        width:'100%',
        height:'100%',
        padding:'0% !important'
    }
}))