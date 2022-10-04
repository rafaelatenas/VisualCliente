
import { AddPhotoAlternateRounded, CloseRounded, ExpandMoreRounded, WallpaperRounded } from "@material-ui/icons";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Container, Button, TextField, Tooltip, Stack, Modal, Box, Card, CardContent, IconButton } from "@mui/material";
import React, { useState } from "react";
import { CarouselFooter } from "../../../Home/homeComponents";
import MenuAdmin from "../menuAdmin";
import './items.css'

export default function ItemCarousel(){

    const handleChange =(e)=>{
        const boton = e.currentTarget 
        const container = e.target.nextElementSibling
        const HeightCreacion = container.clientHeight === 0
        switch (HeightCreacion) {
            case true:
                setTimeout(() => {
                    boton.style.borderBottomRightRadius= '0em';
                    boton.style.borderBottomLeftRadius= '0em';
                }, 100);
                container.style.borderTopRightRadius= '0em'
                container.style.borderTopLeftRadius= '0em'
                container.style.borderBottomRightRadius= '0.3em'
                container.style.borderBottomLeftRadius= '0.3em'
                container.animate([
                    {height:'75%'},
                    ],{fill:'forwards',duration: 1400});
                break;
            case false:
                setTimeout(() => {
                    boton.style.borderBottomRightRadius= '0.3em';
                    boton.style.borderBottomLeftRadius= '0.3em';
                }, 1400);
                container.animate([
                {height:'0%'},
                ],{fill:'forwards',duration: 1400});
                break;
            default:
                break;
        }
        const contenedorConsulta = document.querySelector('.contenedor-consultas')
        const botonConsulta = document.querySelector('.consultar')
        const contenedorCreacion = document.querySelector('.contenedor-creacion')
        const botonCreacion = document.querySelector('.crear')
        if (contenedorCreacion.clientHeight > 0) {
            setTimeout(() => {
                botonCreacion.style.borderBottomRightRadius= '0.3em';
                botonCreacion.style.borderBottomLeftRadius= '0.3em';
            }, 1400);
            contenedorCreacion.animate([
                {height:'0%'},
                ],{fill:'forwards',duration: 1400});
            }
        if (contenedorConsulta.clientHeight > 0) {
            setTimeout(() => {
                botonConsulta.style.borderBottomRightRadius= '0.3em';
                botonConsulta.style.borderBottomLeftRadius= '0.3em';
            }, 1400);
            contenedorConsulta.animate([
                {height:'0%'},
            ],{fill:'forwards',duration: 1400});
        }
    }

    const [nombre, setNombre]=useState('')
    const [descripcion, setDescripcion]=useState('')
    const [imagen, setImagen]=useState('')
    const [fondo, setFondo]=useState('')
    const [openModal, setOpenModal]=useState(false)
    const [textModal, setTextModal]=useState()
    const [data, setData]=useState([])

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
    const hadleEnviar=()=>{
        setData({nombre, descripcion, imagen, fondo})
    }
    const handleCancel=(e)=>{
        handleChange(e)
        setFondo('')
        setImagen('')
        setNombre('')
        setDescripcion('')
    }
    return(
        <div className="Contenedorcompleto">
            <aside style={{display:"none"} } id="BoxActualizar"></aside>
            <MenuAdmin/>
            <section id="pantalla" className="contenedor-opciones" style={{height:'70%'}}>
                <Box className="accordion">
                    <Box className="boton crear" onClick={(e)=>handleChange(e)} sx={{width:'80%', height:'13%'}}></Box>
                    <Box id="boxCrear" className="contenedor boxContentItem contenedor-creacion" sx={{width:'80%'}}>
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
                        <Stack className="stackButtons" >
                            <Button variant="outlined" color="error" onClick={(e)=>handleCancel(e)}>Cancelar</Button>
                            <Button variant="contained" color="success" onClick={hadleEnviar}>Crear</Button>
                        </Stack>
                    </Box>
                    <Box id="consulta" className="boton consultar" onClick={(e)=>handleChange(e)} sx={{width:'80%', height:'13%'}}></Box>
                    <Box className="contenedor boxContentItem contenedor-consultas" sx={{width:'80%'}}>
                        <Box className="ListarElementos"></Box>
                        <Box className="EditarCarousel"></Box>
                    </Box>
                </Box>
                <Container class='BoxCarousel containerCarousel' style={{position:'absolute', top:'82%', left:0}}>
                    <CarouselFooter 
                        PropsFooterOpenModal={handleOpenModal}
                        PropsFooterdata={data}
                    />
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