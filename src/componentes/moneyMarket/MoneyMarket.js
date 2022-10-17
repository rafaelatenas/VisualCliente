import * as React from 'react';
import '../manegadorRetail/data.css'
import './moneyMarket.css'
import { styled } from '@mui/material/styles';
import { Box,CssBaseline, ListItemText, IconButton, AccordionSummary, InputLabel} from '@material-ui/core';
import {Add, ArrowBack, ExpandMore, Minimize} from '@material-ui/icons';
import { MenuItem, Stack, Button, TextField,  Checkbox, Accordion, AccordionDetails, Typography, AccordionActions, FormControl, Select } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { DrawerComponent, BotonUsuario, CardComponents, HeaderComponent } from '../manegadorRetail/components/Components';
import { SelectCanales, SelectAtributos, SelectIndicadores, SelectPeriodos, SelectRegiones,  } from '../manegadorRetail/components/Selects';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
const MySwal = withReactContent(Swal)
const toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
export default function DATA(){

  const styles= useStyles();
  var token=sessionStorage.getItem('token');

  /*Control del ComponetDrawer*/
  const [alert, setAlert] = React.useState(false);
  const alerta =
      <Box className={styles.Collapse} style={{display: alert ? 'block': 'none'}}>
        <Alert 
          severity="error" variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {setAlert(false);}}
              >Ok
              </IconButton>
            }
          >Debe Selecionar un Reporte</Alert>
      </Box>
    

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

  /*Data Periodo y Tiempo del Reporte*/
    const [tiempoReporte, setTiempoReporte] = React.useState([]);
    const seleccionarPeriodo=(parametro)=>{
      setTiempoReporte(parametro)
      setAlert(false)
      handleDrawerClose()
    }

    const [data, setData]=useState([]);
    const [selectedOptions1, setSelectedOptions1] = useState([]);

  /*Data Canales*/
    const [canal, setCanal]=useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);

  /*Data Regiones*/
    const [region, setRegion]=useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);

    /*Data SubRegionres*/
      const [selectedSubregiones, setSelectedSubregiones] = useState([]);

  /*Data Cestas*/
    const [Cesta, setCesta]=useState([]);
    const [selectedOptions4, setSelectedOptions4] = useState([]);

  /*Data Categorias*/
    const [Categorias, setCategorias]=useState([]);
    const [selectedOptions5, setSelectedOptions5] = useState([]);
  /*Data Fabricantes*/
    const [Fabricante, setFabricante]=useState([]);
    const [selectedOptions6, setSelectedOptions6] = useState([]);

  /*Data Marcas*/
  const [Marcas, setMarcas]=useState([]);
  const [selectedOptions7, setSelectedOptions7] = useState([]);

  /*Data Segmentos*/
    const [Segmentos, setSegmentos]=useState([]);
    const [selectedOptions8, setSelectedOptions8] = useState([]);

  /*Data Tamaño*/
  const [Tamanno, setTamanno]=useState([]);
  const [selectedOptions9, setSelectedOptions9] = useState([]);

  /*Data Rango de Tamaño*/
  const [RTamanno, setRTamanno]=useState([]);
  const [selectedOptions10, setSelectedOptions10] = useState([]);

  /*Data Productos*/
  const [Productos, setProductos]=useState([]);
  const [selectedOptions11, setSelectedOptions11] = useState([]);

  /*Data Codigo de Barras*/
  const [CBarras, setCBarras]=useState([]);
  const [selectedOptions12, setSelectedOptions12] = useState([]);

  /*Data Nacionalidad*/
  const [Nacionalidad, setNacionalidad]=useState([]);
  const [selectedOptions13, setSelectedOptions13] = useState([]);

  /*Data Indicadores*/
  const [Indicadores, setIndicadores]=useState([]);
  const [selectedOptions14, setSelectedOptions14] = useState([]);
  
  /*Funciones de Listar PERÍODOS 😄*/
    const peticionSemanas=async()=>{
      setBotonreporte({semanas:true})
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarSemana',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setData(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }

    const peticionMeses=async()=>{
      setBotonreporte({meses:true})
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarPeriodo',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setData(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const PeticionTrimestres=async()=>{
      setBotonreporte({trimestres:true})
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarTrimestre',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setData(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const PeticionSemestres=async()=>{
      setBotonreporte({semestres:true})
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarSemestre',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setData(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const [openPeriodo, setOpenPeriodo] = React.useState(false);
    const handleClosePeriodo = () => {
      setOpenPeriodo(false);
      if(selectedOptions1.length >= 1){
        peticionCanales()
      }
    };
    const handleOpenPeriodo = () => {
      controladorAll();
      if(selectedOptions2.length>=1){
        setSelectedOptions2([]); setSelectedOptions3([]); setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
      }
      if(tiempoReporte.length === 0 ){
        setOpen(true);
        setOpenPeriodo(false);
        setAlert(true)
      }else{
        setOpenPeriodo(true);
        setAlert(false)
      }
    };
    const handlePeriodos = (event) => {
      const value = event.target.value;
      if (value[value.length - 1] === "all") {
        setSelectedOptions1(selectedOptions1.length === data.length ? [] : render);
        return;
      }
      setSelectedOptions1(value);
    };

   /*Funciones de Listar CANALES 😄*/
    const peticionCanales=async()=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarCanal',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setCanal(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }

    const [openCanales, setOpenCanales] = React.useState(false);
    const handleCanales = (event) => {
      const value =event.target.value;
      setSelectedOptions2(value);
    };
    const handleCloseCanal =()=>{
      setOpenCanales(false);
      if(selectedOptions2.length >= 1){
        peticionRegiones()
      }
    }
    const handleOpenCanales = () => {
      setOpenCanales(true);
      controladorMiCadena()
      if(selectedOptions3.length>=1){
        setSelectedOptions3([]); setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
      }
    };
    const controladorMiCadena =()=>{
      switch (true) {
        case canal.length === 0:
            setShowMenuItem({canal:false})
          break;
        default:
          setShowMenuItem({canal:true})
          break;
       }
    }

   /*Funciones de Listar REGIONES 😄*/
    const [openRegiones, setOpenRegiones] = React.useState(false);
    const peticionRegiones=async()=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarRegion',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setRegion(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const handleRegiones = (event) => {
      const value =event.target.value;
      setSelectedOptions3(value);
    };

    const handleOpenRegiones = () => {
      setOpenRegiones(true);
      //temporal
      // peticionCategorias()
      if(selectedOptions4.length>=1){
        setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
      }
    };
    const handleCloseRegion = () => {
      setOpenRegiones(false);
      setShowMenuItem({categoria:true})
    };
    
  /*Funciones de Listar Cestas 😄*/
    const [openCesta, setOpenCesta] = React.useState(false);
    const handleCesta = (event) => {
      const value =event.target.value;
      if (value[value.length - 1] === "all") {
        setSelectedOptions4(selectedOptions4.length === Cesta.length ? [] : Cesta);
        return;
      }else{
        setSelectedOptions4(value);  
      }
    };
    
    const handleCloseCesta =()=>{
      setOpenCesta(false);
      if(selectedOptions4.length>=1){
        peticionFabricantes();
      }
    }
    const handleOpenCesta = () => {
      setOpenCesta(true);
      if(selectedOptions5.length>=1){
        setSelectedOptions5([]); setSelectedOptions6([])
      }
    };
    const peticionCestas=async()=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarCesta',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setCesta(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
  /*Funciones de Listar Categorias 😄*/
  const [openCategoria, setOpenCategoria] = React.useState(false);
  const handleCategoria = (event) => {
    const value =event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedOptions4(selectedOptions4.length === Categorias.length ? [] : Categorias);
      return;
    }else{
      setSelectedOptions4(value);  
    }
  };
  
  const handleCloseCategoria =()=>{
    setOpenCategoria(false);
    if(selectedOptions4.length>=1){
      peticionFabricantes();
    }
  }
  const handleOpenCategoria = () => {
    setOpenCategoria(true);
    if(selectedOptions5.length>=1){
      setSelectedOptions5([]); setSelectedOptions6([])
    }
  };
  const peticionCategorias=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarCategoria',{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setCategorias(response.data.data);
      console.log(response.data)
      console.log(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }
  /*Funciones de Listar Fabricantes 😄*/
    const [openFabricante, setOpenFabricante] = React.useState(false);
    const [IDCategoria, setIDCategoria]=React.useState({});
    const peticionFabricantes=async()=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarFabricante/'+IDCategoria,{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setFabricante(response.data.data)
        console.log(response.data)
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const handleCloseFabricante =()=>{
        setOpenFabricante(false);
        if(selectedOptions6.length>=1){
          peticionMarcas();
        }
    }
    const handleOpenFabricante = () => {
      setOpenFabricante(true);
      if(selectedOptions7.length>=1){
        setSelectedOptions7([])
      }
    };
    const handleFabricante = (event) => {
      const value =event.target.value;
      setSelectedOptions5(value);
    };

  /*Funciones de Listar Marcas 😄*/
    const [openMarcas, setOpenMarcas] = React.useState(false);
    const [IDFabricante, setIDFabricante]=React.useState({});
    const peticionMarcas=async()=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarMarca/'+IDCategoria+'/'+IDFabricante,{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setMarcas(response.data.data)
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const handleCloseMarcas =()=>{
      setOpenMarcas(false);
        // if(selectedOptions4.length>=1){
        //   peticionFabricantes();
        // }
    }
    const handleOpenMarcas = () => {
      setOpenMarcas(true);
      //  if(selectedOptions4.length>=1){
      //     setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
      //   }
    };
    const handleMarcas = (event) => {
      const value =event.target.value;
      setSelectedOptions7(value);
    };

  /*Funciones de Listar Segmentos 😄*/
  const [openSegmentos, setOpenSegmentos] = React.useState(false);
  const [IDMarca, setIDMarca]=React.useState({});
  const peticionSegmentos=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarMarca/'+IDMarca+'/'+IDFabricante,{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setSegmentos(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }
  const handleCloseSegmentos =()=>{
    setOpenSegmentos(false);
      // if(selectedOptions4.length>=1){
      //   peticionFabricantes();
      // }
  }
  const handleOpenSegmentos = () => {
    setOpenSegmentos(true);
    //  if(selectedOptions4.length>=1){
    //     setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
    //   }
  };
  const handleSegmentos = (event) => {
    const value =event.target.value;
    setSelectedOptions8(value);
  };

  /*Funciones de Listar Tamanno 😄*/
  const [openTamanno, setOpenTamanno] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionTamanno=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarMarca/'+IDMarca+'/'+IDFabricante,{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setTamanno(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }
  const handleCloseTamanno =()=>{
    setOpenTamanno(false);
      // if(selectedOptions4.length>=1){
      //   peticionFabricantes();
      // }
  }
  const handleOpenTamanno = () => {
    setOpenTamanno(true);
    //  if(selectedOptions4.length>=1){
    //     setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
    //   }
  };
  const handleTamanno = (event) => {
    const value =event.target.value;
    setSelectedOptions8(value);
  }; 

  /*Funciones de Listar RTamanno 😄*/
  const [openRTamanno, setOpenRTamanno] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionRTamanno=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarMarca/'+IDMarca+'/'+IDFabricante,{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setRTamanno(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }
  const handleCloseRTamanno =()=>{
    setOpenRTamanno(false);
      // if(selectedOptions4.length>=1){
      //   peticionFabricantes();
      // }
  }
  const handleOpenRTamanno = () => {
    setOpenRTamanno(true);
    //  if(selectedOptions4.length>=1){
    //     setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
    //   }
  };
  const handleRTamanno = (event) => {
    const value =event.target.value;
    setSelectedOptions8(value);
  }; 

  /*Funciones de Listar Producto 😄*/
  const [openProducto, setOpenProducto] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionProducto=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarMarca/'+IDMarca+'/'+IDFabricante,{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setProductos(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }
  const handleCloseProducto =()=>{
    setOpenProducto(false);
      // if(selectedOptions4.length>=1){
      //   peticionFabricantes();
      // }
  }
  const handleOpenProducto = () => {
    setOpenProducto(true);
    //  if(selectedOptions4.length>=1){
    //     setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
    //   }
  };
  const handleProducto = (event) => {
    const value =event.target.value;
    setSelectedOptions8(value);
  }; 

  /*Funciones de Listar CBarra 😄*/
  const [openCBarra, setOpenCBarra] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionCBarra=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarMarca/'+IDMarca+'/'+IDFabricante,{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setCBarras(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }
  const handleCloseCBarra =()=>{
    setOpenCBarra(false);
      // if(selectedOptions4.length>=1){
      //   peticionFabricantes();
      // }
  }
  const handleOpenCBarra = () => {
    setOpenCBarra(true);
    //  if(selectedOptions4.length>=1){
    //     setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
    //   }
  };
  const handleCBarra = (event) => {
    const value =event.target.value;
    setSelectedOptions8(value);
  }; 

  /*Funciones de Listar Nacionalidad 😄*/
  const [openNacionalidad, setOpenNacionalidad] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionNacionalidad=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarMarca/'+IDMarca+'/'+IDFabricante,{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setNacionalidad(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }
  const handleCloseNacionalidad =()=>{
    setOpenNacionalidad(false);
      // if(selectedOptions4.length>=1){
      //   peticionFabricantes();
      // }
  }
  const handleOpenNacionalidad = () => {
    setOpenNacionalidad(true);
    //  if(selectedOptions4.length>=1){
    //     setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
    //   }
  };
  const handleNacionalidad = (event) => {
    const value =event.target.value;
    setSelectedOptions8(value);
  }; 

  /*Funciones de Listar Indicadores 😄*/
  const [openIndicadores, setOpenIndicadores] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionIndicadores=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarMarca/'+IDMarca+'/'+IDFabricante,{
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then(response=>{
      setMarcas(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }
  const handleCloseIndicadores =()=>{
    setOpenIndicadores(false);
      // if(selectedOptions4.length>=1){
      //   peticionFabricantes();
      // }
  }
  const handleOpenIndicadores = () => {
    setOpenIndicadores(true);
    //  if(selectedOptions4.length>=1){
    //     setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
    //   }
  };
  const handleIndicadores = (event) => {
    const value =event.target.value;
    setSelectedOptions8(value);
  };

  /*Mis Selecciones*/
    const [chipData, setChipData] = React.useState({
      nombre:'',
      id:''
    });
    const handleDelete = (chipToDelete) => () => {
      setChipData((chips) => (chips.nombre !== chipToDelete.key));
    };
    const handleChip=(e)=>{
      let ids;
      const {name, value}=e.target;
      if(selectedOptions1.length === render.length){
        let result = selectedOptions1.reduce((acc,cur) => {
          let {id} = cur;
          let ex = acc.find(x => x.id === id);
            if(!ex){ex = id;acc.push(ex);}
            return acc;
        }, [])
        ids=result.concat(selectedOptions2,selectedOptions3).join('*')
        setChipData({[name]: value,id:ids})
        console.log(ids)
      }else{
        ids=selectedOptions1.concat(selectedOptions2,selectedOptions3).join('*')
        setChipData({[name]: value,id:ids})
        console.log(ids)
      }
    }
    const GuardarSelecciones =()=>{
      abrirCerrarModalSelect()
      setChipData({nombre:[]})
    }
    const [modalSelect, setModalSelect]=useState(false);
    const [isSelected, setIsSelected]=useState({
      selectedOptions1:false,
      selectedOptions2:false,
      selectedOptions3:false,
      selectedOptions4:false,
      selectedOptions5:false,
      selectedOptions6:false,
    });
    const comprobarCombos =()=>{
      switch (true) {
        case selectedOptions1.length === 0:
          setIsSelected({selectedOptions1:true})
          toast.fire({
            icon: 'error',
            title: 'No ha Seleccionado un Período',
            confirmButtonText: `Ok`,
          })
          break;
        case selectedOptions2.length === 0:
          setIsSelected({selectedOptions2:true})
          toast.fire({
            icon: 'error',
            title: 'No ha Seleccionado un Canal',
            confirmButtonText: `Ok`,
          })
          break;
        case selectedOptions3.length === 0:
          setIsSelected({selectedOptions3:true})
          toast.fire({
            icon: 'error',
            title: 'No ha Seleccionado una Región',
            confirmButtonText: `Ok`,
          })
          break;
        default:
          setModalSelect(!modalSelect);
          setIsSelected({selectedOptions1:false, selectedOptions2:false, selectedOptions3:false})
          break;
      }
    }
    const abrirCerrarModalSelect=()=>{
      comprobarCombos()
    }
     const bodyMySelect=(
      <div style={{width:'25%', height:'40%', justifyContent:'space-around'}} className={styles.modal}>
        <h1 style={{textAlign:'center'}}>Crear Filtro de Selección</h1>
        <div className={styles.agrupar}>
          <div style={{width:'100%', overflow:'visible'}} className='grupoEditar'>
            <TextField name="nombre" className={styles.inputMaterial} type='text' onChange={handleChip} value={chipData && chipData.nombre} label="Nombre del Filtro" placeholder='Escriba el nombre de sus Selecciones'/>
          </div>
          <Stack direction="row" justifyContent={'flex-end'} spacing={2}>
            <Button style={{background:"#2FAC6A"}} variant="contained" onClick={()=>GuardarSelecciones()}>Guardar</Button>
            <Button variant="contained"  onClick={()=>abrirCerrarModalSelect()}>Cancelar</Button>
          </Stack>
        </div>
      </div>
    )
    const DeletePeriodo =()=>{
      if(selectedOptions1 !== []){
        setSelectedOptions1([])
        setSelectedOptions2([])
        setSelectedOptions3([])
      }
    }
    const [botonreporte, setBotonreporte]=useState({
      semanas:false,
      meses:false,
      trimestres:false,
      semestres:false
    })
  /*Controles de Search*/
    const [focus, setFocus] = React.useState(false);
    const [render, setRender] = React.useState(false);
    const [searchText, setSearchText] = React.useState({
      periodo:''
    })
    const handleChangeSearch=(e)=>{
      const name= e.target.name
      const value= e.target.value
      setSearchText({[name]:value})
      setFocus(true)
    }
  /*Controles de Select All*/
    const [showMenuItem, setShowMenuItem] = React.useState({
      periodo:false,
      categoria:false,
    });
    const controladorAll = ()=>{
      switch (true) {
        case data.length===0:
          setShowMenuItem({periodo:false})
          break;
        case tiempoReporte==='Trimestres':
          setShowMenuItem({periodo:false})
          break;
        case tiempoReporte==='Semestres':
          setShowMenuItem({periodo:false})
          break;
        default:
          setShowMenuItem({periodo:true})
          break;
      }
    }
    const isAllSelectPeriodo = data.length > 0 && selectedOptions1.length === render.length;
    const isAllSelectCategoria = Categorias.length > 0 && selectedOptions4.length === Categorias.length;

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(panel);
      console.log(panel)
    };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <BotonUsuario
          handleDrawerOpen={handleDrawerOpen}
          open={open}
        />
        
      <DrawerComponent
        open={open}
        key={chipData.nombre}
        label={chipData.nombre}
        id={id}
        openo={openo}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleDrawerClose={handleDrawerClose}
        handleClose={handleClose}
        handleDelete={handleDelete}
        chipData={chipData}
        botonreporte={botonreporte}
        seleccionarPeriodo={seleccionarPeriodo}
        DeletePeriodo={DeletePeriodo}
        peticionSemanas={peticionSemanas}
        peticionMeses={peticionMeses}
        peticionTrimestres={PeticionTrimestres}
        peticionSemestres={PeticionSemestres}
      >
        
      </DrawerComponent>
        <Modal
          open={modalSelect}
          onClose={abrirCerrarModalSelect}
        >{bodyMySelect}
        </Modal>
        <Main open={open}>
          <div className={styles.Contenedordata}>
            <section className={styles.containerOfTable}>
              <HeaderComponent/>
              <Box className={styles.boxAccordion}>
                <Accordion expanded={expanded === 'panel1'} onClick={handleChange('panel1')} sx={{borderRadius:'unset', width:'95%','& .MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-pwcg7p-MuiCollapse-root':{overflowY:'auto !important'}}}>
                  <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography>Money Market</Typography>
                  </AccordionSummary>
                  <AccordionDetails >
                    <Box className={styles.boxDetails}>
                      {[{id:0,nombre:'Semana'},{id:1,nombre:'Retail'},{id:2,nombre:'Estado'},{id:3,nombre:'Tienda'},{id:4,nombre:'Categoría'},{id:5,nombre:'Fabricante'},{id:6,nombre:'Marca'},{id:7,nombre:'Código de Barras'},{id:8,nombre:'Moneda'}].map((item)=>(
                        <Box key={item.id} className={styles.element}>
                          <FormControl className={styles.formControl}>
                            <InputLabel size={'small'} className={styles.inputLabel} id={`multiple-select-label${item.id}`}>{item.nombre}</InputLabel>
                            <Select
                              labelId={`multiple-select-label${item.id}`}
                            >
                              {[0,1,2,3,4,5,6,7,8].map((item1)=>(
                                <MenuItem key={item1}>
                                  <ListItemText>{item1}</ListItemText>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                  <AccordionActions>
                    <Stack direction="row" className={styles.buttons}>
                 <button id='save' style={{width:'35%', padding:8}} variant="contained" onClick={abrirCerrarModalSelect}>Guardar</button>
                 <button id='process' style={{width:'35%', padding:8}} variant="contained" onClick={comprobarCombos}>Procesar</button>
               </Stack>
                  </AccordionActions>
                </Accordion>
                
                <Accordion expanded={expanded === 'panel2'} onClick={handleChange('panel2')} sx={{borderRadius:'unset', width:'95%','& .MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-pwcg7p-MuiCollapse-root':{overflowY:'auto !important'}}}>
                  <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Collapsible Group Item #2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                      sit amet blandit leo lobortis eget.
                      abrirCerrarModalSelecta
                      autoAutha
                      a
                      a
                      abrirCerrarModalSelecta
                      abrirCerrarModalSelecta
                      a
                      a

                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
               
            </section>
          </div>
       </Main>
       <Button className='atras'
         style={{background: 'transparent',position:'fixed',border:'0.2em solid #fff',minWidth:'50px', borderRadius:'50%'}}
         variant="contained" onClick={()=>window.location = '/retailservices/home'}>
            <ArrowBack style={{fontSize:'2.5em', fill:'#fff'}}></ArrowBack>
       </Button>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  Contenedordata:{
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    height: '100%',
  },
  boxAccordion:{
    width: '100%',
    height: '100%',
    gridArea: '2 / 1 / 4 / 3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxDetails:{
    width: '100%',
    height: '100%',
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'stretch',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 20%))',
  },
  element:{
    width: '95%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl:{
    width: '90%',
  },
  inputLabel:{
    background: 'rgb(247, 244, 244)',
    width: 'auto',
    fontSize: '10px !Important',
  },
  '@media screen and (min-width: 992px)':{
    containerOfTable:{
        background: '#fff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyItems: 'center',
        borderTopLeftRadius: '1.5em',
        borderBottomLeftRadius: '1.5em',
        display: 'grid',
        gridTemplateColumns: '1fr 20%',
        gridTemplateRows: '15% 70% 15%',
        boxShadow:'-4px 6px 20px 0px rgb(0 0 0 / 49%)',
    },
  },
  modal: {
    position: 'absolute',
    width: '30%',
    height: '40%',
    minHeight:'300px',
    padding:'2%',
    border: '1.3px solid #000',
    background: '#ffefd5',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1em',
    display:'inline-flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  agrupar:{
    display: 'flex',
    width: '100%',
    height:'40%',
    justifyContent: 'space-between',
    flexDirection:'column',
    overflow:'visible'
  },
  inputMaterial:{
    width: '95%',
    height:'100%'
  },
  list:{
    width:'80%',
    display:'inline-flex',
    flexDirection:'column'
  },
  listItem:{
    padding:'5% 0', justifyContent:'center',width:'auto'
  },
  popOver:{
    width:'90%', borderRadius:'1.5em', background:'transparent'
  },
  buttons:{
    width: '30%', justifyContent:'space-around',height:'100%'
  },
  botonReportes:{
    color:'#fff !important', borderRadius:'1.5em !important', width:'90% !important', margin:'4% 0 2% !important', padding:'10% !important'
  },
  Collapse:{
    position:'absolute', width:'30%',height:'auto', top:'15%', left:'15%', zIndex:'100000'
  }
}))

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
      marginLeft:`${drawerWidth + 2}%` ,
    }),
  }),
);