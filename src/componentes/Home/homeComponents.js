import React, { useState } from "react";
import { ManageAccounts, ExitToApp, Settings, AdminPanelSettings } from "@mui/icons-material";
import { Box, Card, CardContent, Collapse, Container, IconButton, Paper, Popover, SpeedDial, SpeedDialAction, Typography} from "@mui/material";
import logoAtenas from '../../landing/Images/ats_logo-elise-blanca.png'
import { makeStyles } from "@material-ui/styles";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
/* -- Modulos Header -- */
export function HeaderMovile(){
}
export function HeaderDesktop(){
    const styles = useStyles();
    const actions = [
        { icon: <ExitToApp />, name: 'Salir' },
        { icon: <Settings />, name: 'Configuraciones' },
        { icon: <AdminPanelSettings />, name: 'Panel Administrativo' },

    ];
    const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
    const handleOpenSpeedDial = () => setOpenSpeedDial(true);
    const handleCloseSpeedDial = () => setOpenSpeedDial(false);
    return(
        <Container className={styles.ContainerBox}>
            <Box className={`${styles.BoxPrimary} BoxTainer`}>
                <img className={styles.logoAtenas} src={logoAtenas} alt='Logo Atenas Grupo Consulto. Elise Blanca' title=""/>
                <Box className={styles.boxSecundary}>
                    <SpeedDial
                        ariaLabel="SpeedDial controlled open example"
                        icon={<ManageAccounts/>}
                        onClose={handleCloseSpeedDial}
                        onOpen={handleOpenSpeedDial}
                        open={openSpeedDial}
                        direction={'left'}
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleCloseSpeedDial}
                        />
                        ))}
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
    logoAtenas:{
        minWidth:75,
        minHeight:79,
        maxHeight:100,
        maxWidth:95
    },
    paperUser:{
        position:'relative',
        left:'100%',
        top:'-90%',
        background:'red',
        width:'20%',
        height:'65%',
        borderTopLeftRadius:'1.5em',
        borderBottomLeftRadius:'1.5em',
        borderRadius:0,
    }
}))

/* -- Modulos Tarjetas de Reportes -- */

export function CardDesktop(props){
    const size = 40
    const styles = useStylesCard();
    const reports = [
        {key: 1 , name:'WOP'},
        {key: 2 , name:'Retail Scanning'},
        {key: 3 , name:'Home Pantry'},
        {key: 4 , name:'Excecution'},
        {key: 5 , name:'CI'},
    ]

    

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
    return(
        <Box className="CardsCarousel">
            {reports.map((report)=>(
                <IconButton className="slide" key={report.key} onMouseEnter={} onClick={(e)=>props.PropsFooterDesktop(report.key, e)}>
                    <Card className={styles.Card}>
                        <CardContent>{report.name}</CardContent>
                    </Card>
                </IconButton>
            ))}
        </Box>
    )
}

const useStylesCarousel = makeStyles (()=>({
    CardsCarousel:{

    },
    Card:{
        width:'100%',
        height:'100%'
    }
}))