import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box,CssBaseline,Button } from '@material-ui/core';
import { BotonUsuario, DrawerComponentView} from "../componentes_data/Components";
import { ArrowBack } from '@material-ui/icons';

export default function VisualizarData(){
        const [open, setOpen] = React.useState(false);
        const handleDrawerOpen = () => {
            setOpen(true);
        };
        const handleDrawerClose = () => {
            setOpen(false);
        };
    /*Elementos de Control Menu Desplegable*/
        const [anchorEl, setAnchorEl] = React.useState(null);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const openo = Boolean(anchorEl);
        const id = openo ? 'simple-popover' : undefined;
    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
            <BotonUsuario
              handleDrawerOpen={handleDrawerOpen}
              open={open}
            />
                <DrawerComponentView
                    open={open}
                    id={id}
                    openo={openo}
                    anchorEl={anchorEl}
                    handleClick={handleClick}
                    handleDrawerClose={handleDrawerClose}
                    handleClose={handleClose}
                />
           <Main open={open}>
             <div className="Contenedordata">
               {/* <section className="container-of-table">
                <HeaderComponent/>
                   <Stack direction="row" className={styles.buttons}>
                     <button id='save' style={{width:'35%'}} variant="contained" onClick={abrirCerrarModalSelect}>Guardar</button>
                     <button id='process' style={{width:'35%'}} variant="contained" onClick={comprobarCombos}>Procesar</button>
                   </Stack>
               </section> */}
             </div>
           </Main>
           <Button className='atras'
             style={{background: 'transparent',position:'fixed',border:'0.2em solid #fff',minWidth:'50px', borderRadius:'50%'}}
             variant="contained" href='./Home'>
               <ArrowBack style={{fontSize:'2.5em', fill:'#fff'}}></ArrowBack>
           </Button>
        </Box>
      );
}
const drawerWidth = 15;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      width:'80%',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft:0 ,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft:`${drawerWidth-10}%` ,
      }),
    }),
  );