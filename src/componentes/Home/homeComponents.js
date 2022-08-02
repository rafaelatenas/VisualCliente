import React, { useState } from "react";
import { ManageAccounts, ExitToApp, Settings, AdminPanelSettings } from "@mui/icons-material";
import { Box, Card, CardContent, Link, Container, getNativeSelectUtilityClasses, IconButton, Paper, Popover, SpeedDial, SpeedDialAction, Typography} from "@mui/material";
import eliseAtenas from '../../landing/Images/ats_logo-elise-blanca.png'
import logoAtenas from '../../landing/Images/ats_logo-blanco-elises.png'
import { makeStyles } from "@material-ui/styles";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { NavLink } from "react-router-dom";

const reports = [
    {key: 1 , name:'WOP'},
    {key: 2 , name:'Retail Scanning'},
    {key: 3 , name:'Home Pantry'},
    {key: 4 , name:'Excecution'},
    {key: 5 , name:'CI'},
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
export function HeaderDesktop(){
    const styles = useStyles();
    const actions = [
        { icon: <NavLink className={styles.LinkIcons} to={'/'} ><ExitToApp className={styles.IconsSpeedDial}/></NavLink> , name: 'Salir', admin:0 },
        { icon: <NavLink className={styles.LinkIcons} to={'home/CambiarC/CambiarC'} ><Settings className={styles.IconsSpeedDial}/></NavLink>, name: 'Configuraciones', admin:0 },
        { icon: <NavLink className={styles.LinkIcons} to={'management/panel'} ><AdminPanelSettings className={styles.IconsSpeedDial}/></NavLink>, name: 'Panel Administrativo', admin:1 },

    ];
    const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
    const handleOpenSpeedDial = () => setOpenSpeedDial(true);
    const handleCloseSpeedDial = () => setOpenSpeedDial(false);
    return(
        <Container className={styles.ContainerBox}>
            <Box className={`${styles.BoxPrimary} BoxTainer`}>
                <img className={styles.eliseAtenas} src={eliseAtenas} alt='Logo Atenas Grupo Consulto. Elise Blanca' title=""/>
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
                        <Typography>{report.name}</Typography>   
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
        backgroundColor:'transparent',
        width:'15%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        boxShadow:'none'
    },
    CardContent:{
        backgroundColor:'#fff',
        width:'80%',
        height:'40%',
        borderRadius:'1.2em',
        minWidth:160,
        maxWidth:250,
        minHeight:115,
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
        {name:1, key:1},
        {name:2, key:2},
        {name:3, key:3},
        {name:4, key:4},
        {name:5, key:5},
        {name:6, key:6},
        {name:7, key:7},
        {name:8, key:8},
        {name:9, key:9},
        {name:10, key:10},
        {name:1, key:11},
        {name:2, key:12},
        {name:3, key:13},
        {name:4, key:14},
        {name:5, key:15},
        {name:6, key:16},
        {name:7, key:17},
        {name:8, key:18},
        {name:9, key:19},
        {name:10, key:20},
    ]
    const [paused, setPaused]=useState(false)
    return(
        <Box className="CardsCarousel" style={paused ? {animationPlayState: 'paused'}:{animationPlayState:'running'}} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
            {reports.map((report)=>(
                <IconButton className="slide" key={report.key}  onClick={(e)=>props.PropsFooterOpenModal(report.key, e)}>
                    <Card className={styles.Card}>
                        <CardContent>{report.name}</CardContent>
                    </Card>
                </IconButton>
            ))}
        </Box>
    )
}

const useStylesCarousel = makeStyles (()=>({
    Card:{
        width:'100%',
        height:'100%'
    }
}))