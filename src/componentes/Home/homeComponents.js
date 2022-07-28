import React from "react";
import { ManageAccounts, ExitToApp, Settings, AdminPanelSettings } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Paper, Popover, SpeedDial, SpeedDialAction, Typography} from "@mui/material";
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
        <Box className={styles.BoxPrimary}>
            <img className={styles.logoAtenas} src={logoAtenas} alt='Logo Atenas Grupo Consulto. Elise Blanca' title=""/>
            <Box className={styles.boxSecundary} sx={{transform: 'translateZ(0px)'}}>
                <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    icon={<ManageAccounts />}
                    onClose={handleCloseSpeedDial}
                    onOpen={handleOpenSpeedDial}
                    open={openSpeedDial}
                    direction={"down"}
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
            <Paper className={styles.paperUser}></Paper>
        </Box>
    )
}
const useStyles = makeStyles(()=>({
    BoxPrimary:{
        width:'90%',
        height: '15%',
        display:'inline-flex',
        overflow:'visible',
        margin:'2% 5% 0 5%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    boxSecundary:{
        width:'10%',
        height:'60%',
        overflow:'visible'
    },
    logoAtenas:{
        minWidth:75,
        minHeight:79,
        maxHeight:100,
        maxWidth:95
    },
    paperUser:{
        position:'absolute',
        right:'-10%',
        background:'red',
        width:'15%',
        height:'10%',
        borderTopLeftRadius:'1.5em',
        borderBottomLeftRadius:'1.5em'
    }
}))

/* -- Modulos Tarjetas de Reportes -- */
export function CardDesktop(){
    const styles = useStylesCard();
    const reports = [
        {name:'WOP'},
        {name:'Retail Scanning'},
        {name:'Home Pantry'},
        {name:'Excecution'},
        {name:'CI'},
    ]

    return(
        <Box className={styles.Boxcards}>
            {reports.map((report)=>(
                <Card className={styles.Card}>
                    <CardContent className={styles.CardContent}>
                        <Typography>{report.name}</Typography>   
                    </CardContent>
                    <IconButton>
                       <KeyboardArrowDownRoundedIcon/> 
                    </IconButton>
                    <Popover><Typography sx={{ p: 1 }}>I use Popover.</Typography></Popover>
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
        width:'10%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column'
    },
    CardContent:{
        backgroundColor:'#fff',
        width:'100%',
        height:'50%',
        borderRadius:'1em'
    },
    PaperCards:{
        width:'100%',
        height:'auto',
        backgroundColor:'#fff',

    }
}))
/* -- Modulo Carousel -- */
export function CarouselFooter(){
    const styles = useStylesCarousel();
    const reports = [
        {name:1},
        {name:2},
        {name:3},
        {name:4},
        {name:5},
        {name:6},
        {name:7},
        {name:8},
        {name:9},
        {name:10},
    ]
    return(
        <Box className={styles.BoxCarousel}>
            {reports.map((report)=>(
                <IconButton className={styles.CardsCarousel}>
                    <Card>
                        <CardContent>{report.name}</CardContent>
                    </Card>
                </IconButton>
            ))}
        </Box>
    )
}

const useStylesCarousel = makeStyles (()=>({
    BoxCarousel:{
        backgroundColor:'#fff',
        width:'100%',
        height:'85%',
        display:'inline-flex',
        justifyContent:'space-around',
        "&:before, &:after": {
            background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
            content: '""',
            height: '20%',
            width:200,
            position: 'absolute',
            zIndex: 2,
        },
        '&::after': {
            right: 0,
            top: '80%',
            transform:'rotateZ(180deg)'
        },
    
        '&::before' :{
            left: 0,
            top: '80%'
        }
    },
    CardsCarousel:{
        
    }
}))