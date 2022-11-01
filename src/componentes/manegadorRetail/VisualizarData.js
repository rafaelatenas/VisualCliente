import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box,CssBaseline,Button } from '@material-ui/core';
import { BotonUsuario, DrawerComponentView } from './components/Components';
import { ArrowBack } from '@material-ui/icons';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
  /*Data Global de Grilla*/

export default function Report(params){
  console.log(params)
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
          <p>hola</p>
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