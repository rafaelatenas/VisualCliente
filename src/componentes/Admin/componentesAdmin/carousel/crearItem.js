
import { AddPhotoAlternateRounded, CloseRounded, ExpandMoreRounded, WallpaperRounded } from "@material-ui/icons";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Container, Button, TextField, Tooltip, Stack, Modal, Box, Card, CardContent, IconButton } from "@mui/material";
import React, { useState } from "react";
import { CarouselFooter } from "../../../Home/homeComponents";
import MenuAdmin from "../menuAdmin";
import './items.css'

export default function ItemCarousel(){

    const [nombre, setNombre]=useState('')
    const [descripcion, setDescripcion]=useState('')
    const [imagen, setImagen]=useState('')
    const [fondo, setFondo]=useState('')
    const [openModal, setOpenModal]=useState(false)
    const [textModal, setTextModal]=useState('')



    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handleOpenModal=(datos)=>{
        setTextModal(datos)
        setOpenModal(true)
    }
    const handleCloseModal=()=>{
        setOpenModal(false)
    }

    const handlePhoto =(e)=>{
        console.log(e)
        const {name, files}=e.target
        console.log(files)
        switch (name) {
            case 'imagen':
                setImagen(window.URL.createObjectURL(files[0]))
                break;
            case 'fondo':
                setFondo(window.URL.createObjectURL(files[0]))
                break;
            default:
                break;
        }
    }
    const handleText=(e)=>{
        const {name, value}=e.target
        switch (name) {
            case 'nombre':
                setNombre(value)
                break;
            case 'descripcion':
                setDescripcion(value)
                break;
            default:
                break;
        }
    }
    const handleCancel=()=>{
        setFondo('')
        setImagen('')
        setNombre('')
        setDescripcion('')
        setExpanded(false)
    }
    return(
        <div className="Contenedorcompleto">
            <aside style={{display:"none"} } id="BoxActualizar"></aside>
            <MenuAdmin/>
            <section id="pantalla" className="contenedor-opciones">
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                        className="accordion" sx={{'& .MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-pwcg7p-MuiCollapse-root':{overflowY:'auto !important'},
                        '& .css-smkl36-MuiCollapse-wrapper':{
                            height: 210
                        }, '& .MuiAccordion-region':{height:'100%', display:'flex', justifyContent:'center'}}}
                    >
                        <AccordionSummary
                        expandIcon={<ExpandMoreRounded/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Nuevo Elemento del Carrusel
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{display: 'flex',justifyContent:'space-evenly', flexWrap: 'wrap', aligItems:'flex-start'}}>
                            <Tooltip title='Agregar Imagen al Carrusel'>
                                <Button variant="contained" component="label" sx={{height:'25%'}}>
                                    <AddPhotoAlternateRounded/>
                                    <input type="file" accept='image/png, image/jpeg' name='imagen' hidden onChange={(e)=>handlePhoto(e)}/>
                                </Button>
                            </Tooltip>
                            <Tooltip title='Agregar Imagen de Fondo'>
                                <Button variant="contained" component="label" sx={{height:'25%'}}>
                                    <WallpaperRounded/>
                                    <input type="file" accept='image/png, image/jpeg' name='fondo' hidden onChange={(e)=>handlePhoto(e)}/>
                                </Button>
                            </Tooltip>
                            <TextField id="outlined-required" label="Nombre" type='text' name='nombre' value={nombre} onChange={(e)=>handleText(e)}/>
                            <TextField id="outlined-required" label="Descripción" type='text' name='descripcion'
                                multiline maxRows={4} value={descripcion} onChange={(e)=>handleText(e)} sx={{'& div textarea':{minHeight:128,minWidth:217}}}/>
                            <Stack className="stackButtons">
                                <Button variant="outlined" color="error" onClick={handleCancel}>Cancelar</Button>
                                <Button variant="contained" color="success">Crear</Button>
                            </Stack>
                        </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
                        className="accordion" sx={{'& .MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-pwcg7p-MuiCollapse-root':{overflowY:'auto !important'},
                        '& .css-smkl36-MuiCollapse-wrapper':{
                            height: 210
                        }, '& .MuiAccordion-region':{height:'100%', display:'flex', justifyContent:'center'}}}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Listar elementos del Carrusel</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                laoreet.
                            </Typography>
                        </AccordionDetails>
                </Accordion>

                <Container class='BoxCarousel containerCarousel' style={{position:'absolute', top:'82%', left:0}}>
                    <CarouselFooter PropsFooterOpenModal={handleOpenModal}/>
                </Container>
            </section>
            <Modal
                className='Modal'
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="Modal de Presentacion a Descripcion de Reportes"
                aria-describedby="Muestra una Descripcion del contenido de los reportes"
            >
                <Box className='boxModal'>
                    <Card className='cardModal'>
                        <CardContent className='cardModal' sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <IconButton onClick={handleCloseModal} title='Cerrar Modal' sx={{position: 'absolute',top: '5%',left: '90%'}}>
                                <CloseRounded/>
                            </IconButton>
                            <img src={textModal} alt={textModal} title='' style={{width:'50%',height:'auto'}}/>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </div>
    )
}