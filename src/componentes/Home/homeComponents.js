import React from "react";
import { ManageAccounts, ExitToApp, Settings, AdminPanelSettings } from "@mui/icons-material";
import { Box, Card, CardContent, Paper, SpeedDial, SpeedDialAction, Typography} from "@mui/material";
import logoAtenas from '../../landing/Images/ats_logo-elise-blanca.png'
import { makeStyles } from "@material-ui/styles";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
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

export function CardDesktop(){

    const reports = [
        {name:'WOP'},
        {name:'Retail Scanning'},
        {name:'Home Pantry'},
        {name:'Excecution'},
        {name:'CI'},
    ]

    return(
        <Box>
            {reports.map((report)=>(
                <Card>
                    <CardContent>
                        <Typography>{report.name}</Typography>   
                    </CardContent>
                    <KeyboardArrowDownRoundedIcon/>
                    <Paper></Paper>
                </Card>
            ))}
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