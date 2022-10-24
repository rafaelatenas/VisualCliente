import * as React from 'react';
import './data.css'
import { styled } from '@mui/material/styles';
import { Box,CssBaseline, ListItemText, IconButton} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import { MenuItem, Stack, Button, TextField,  Checkbox } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { DrawerComponent, BotonUsuario, CardComponents, HeaderComponent } from './components/Components';
import { SelectCanales, SelectAtributos, SelectIndicadores, SelectPeriodos, SelectRegiones,  } from './components/Selects';
import Alert from '@mui/material/Alert';

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
      const [selectedOptions33, setSelectedOptions33] = useState([]);


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
        console.log(response.data.data)
        setData(response.data.data);
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }

    const peticionMeses=async()=>{
      setBotonreporte({meses:true,periodo:true})
      await axios.get('http://localhost:3005/VisorCliente_Api/listarPeriodo/',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        console.log(response.data)
        setData(response.data.data);
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const PeticionTrimestres=async()=>{
      setBotonreporte({trimestres:true,periodo:true})
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarTrimestre',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        console.log(response.data.data)
        setData(response.data.data);
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const PeticionSemestres=async()=>{
      setBotonreporte({semestres:true,periodo:true})
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarSemestre',{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        console.log(response.data.data)
        setData(response.data.data);
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
      const {periodo} = botonreporte
      let Tipo;
      /* Valores condicionales necesarios para variable Semana o Periodo*/
      switch (periodo) {
        case true:
          // Periodo
          Tipo=[1];
          break;
          // Semana
        default:
          Tipo=[0];
          break;
      }
      await axios.post('http://localhost:3005/VisorCliente_Api/ListarCanal/',{
        headers: {'Authorization': `Bearer ${token}`},
        IdValor:selectedOptions1,
        IdTipo:Tipo
      })
      .then(response=>{
        console.log(response.data)
        setCanal(response.data.data);
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
    const [idRegiones, setIdRegiones] = useState();
    
    const peticionRegiones=async()=>{
      const {periodo} = botonreporte
      let IdValor;
      switch (periodo) {
        case true:
          IdValor=[1];
          break;
      
        default:
          IdValor=[0];
          break;
      }
      await axios.post('http://localhost:3005/VisorCliente_Api/ListarRegion/',{
        headers: {'Authorization': `Bearer ${token}`},
        IdValor:selectedOptions1,
        IdCanal:selectedOptions2,
        IdTipo:IdValor
      })
      .then(response=>{
        console.log(response.data)
        setRegion(response.data.data);
      }).catch(error=>{
        console.log(error);
        console.log(error);
      })

    }
    const handleRegiones = (event) => {
      const value =event.target.value;
      setSelectedOptions3(value);
      console.log(value)
      if (value.length >=1) {
        // peticionSubRegiones(value)
      }
    };

    const handleOpenRegiones = () => {
      setOpenRegiones(true);
      if(selectedOptions4.length>=1){
        setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
      }
    };
    const handleCloseRegion = () => {
      setOpenRegiones(false);
      setShowMenuItem({categoria:true})
      peticionCestas()
    };

       /*Funcion onChange del combo SubRegiones */
    const [SubRegion, setSubRegion]=useState([])
    const peticionSubRegiones=async(value)=>{
      const {periodo} = botonreporte
      let url;
      switch (periodo) {
        case true:
          url = `http://localhost:3005/VisorCliente_Api/ListarSubRegionPeriodo/`;
          break;
        default:
          url=`http://localhost:3005/VisorCliente_Api/ListarSubRegionSemanal/`;
          break;
      }
      await axios.post( url,{
        headers: {
          'Authorization': `Bearer ${token}`,},
          IdOption:selectedOptions1,
          IdCanal:selectedOptions2,
          IdRegion:value
      })
      .then(response=>{
        console.log(response)
        // setSubRegion(response.data.data);
      }).catch(error=>{
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
    }
    const handleSubRegiones = (event) => {
      const value =event.target.value;
      setSelectedSubregiones(value);
    };
    const OptionSubRegion = SubRegion.map((item)=>(
      <MenuItem key={item.id} value={item.id}>
        <Checkbox checked={selectedOptions2.indexOf(item.id) > -1} />
        <ListItemText sx={{fontSize:'1em'}} primary={item.nombre} />
      </MenuItem>
    ))
    
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
      const {periodo} = botonreporte
      let url;
      switch (periodo) {
        case true:
          url = `http://localhost:3005/VisorCliente_Api/ListarCestaSemana/`;
          break;
        default:
          url=`http://localhost:3005/VisorCliente_Api/ListarCestaPeriodo/`;
          break;
      }
      await axios.post( url,{
        headers: {'Authorization': `Bearer ${token}`},
      })
      .then(response=>{
        setCesta(response.data.data);
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
      semestres:false,
      /* Indicador Perido usado en la llamada de canal periodo */
      periodo:false,
    })
  /*Controles de Search*/
    const [focus, setFocus] = React.useState(false);
    const [render, setRender] = React.useState(false);
    const [searchText, setSearchText] = React.useState({
      periodo:''
    })
    const handleChangeSearch=(e)=>{
      const {name, value}=e.target
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
          {alerta}
          <div className="Contenedordata">
            <section className="container-of-table">
              <HeaderComponent/>
                <article className="table-of-data">
                  <SelectPeriodos
                    className='propor'
                    tiempoReporte={tiempoReporte}
                    selectedOptions1={selectedOptions1}
                    isSelected={isSelected}
                    openPeriodo={openPeriodo}
                    handlePeriodos={handlePeriodos}
                    handleClosePeriodo={handleClosePeriodo}
                    handleOpenPeriodo={handleOpenPeriodo}
                    datos={data}
                    isAllSelectPeriodo={isAllSelectPeriodo}
                    showMenuItem={showMenuItem}
                    handleChangeSearch={handleChangeSearch}
                    focus={focus}
                    searchText={searchText.periodo}
                    setRender={setRender}
                    setSearchText={setSearchText}
                    setFocus={setFocus}
                    render={render}
                  />
                  <SelectCanales
                    selectedOptions2={selectedOptions2}
                    isSelected={isSelected}
                    openCanales={openCanales}
                    handleCanales={handleCanales}
                    handleCloseCanal={handleCloseCanal}
                    handleOpenCanal={handleOpenCanales}
                    canal={canal}
                  />
                  <SelectRegiones
                    selectedOptions3={selectedOptions3}
                    isSelected={isSelected}
                    openRegiones={openRegiones}
                    handleRegiones={handleRegiones}
                    handleCloseRegion={handleCloseRegion}
                    handleOpenRegiones={handleOpenRegiones}
                    regiones={region}
                    /* SubRegiones */
                    idRegiones={idRegiones}
                    SubRegion={SubRegion}
                    selectedOptions33={selectedOptions33}
                    handleSubRegiones={handleSubRegiones}

                  />
                  <SelectAtributos
                    selectedOptions4={selectedOptions4}
                    isSelected={isSelected}
                    openCesta={openCesta}
                    handleCesta={handleCesta}
                    handleCloseCesta={handleCloseCesta}
                    handleOpenCesta={handleOpenCesta}
                    Cesta={Cesta}
                    // isAllSelectCesta={isAllSelectCesta}
                    showMenuItem={showMenuItem}
                    //Categorias
                    Categorias={Categorias}
                    selectedOptions5={selectedOptions5}
                    openCategoria={openCategoria}
                    handleCategoria={handleCategoria}
                    isAllSelectCategoria={isAllSelectCategoria}
                    handleCloseCategoria={handleCloseCategoria}
                    handleOpenCategoria={handleOpenCategoria}
                    setIDCategoria={setIDCategoria}
                    //Fabricantes
                    Fabricante={Fabricante}
                    selectedOptions6={selectedOptions6}
                    openFabricante={openFabricante}
                    handleFabricante={handleFabricante}
                    handleCloseFabricante={handleCloseFabricante}
                    handleOpenFabricante={handleOpenFabricante}
                    setIDFabricante={setIDFabricante}
                    //Marcas
                    Marcas={Marcas}
                    selectedOptions7={selectedOptions7}
                    openMarcas={openMarcas}
                    handleMarcas={handleMarcas}
                    handleCloseMarcas={handleCloseMarcas}
                    handleOpenMarcas={handleOpenMarcas}
                    //Segmentos
                    Segmentos={Segmentos}
                    selectedOptions8={selectedOptions8}
                    openSegmentos={openSegmentos}
                    handleSegmentos={handleSegmentos}
                    handleCloseSegmentos={handleCloseSegmentos}
                    handleOpenSegmentos={handleOpenSegmentos}
                    //Tamaño
                    Tamanno={Tamanno}
                    selectedOptions9={selectedOptions9}
                    openTamanno={openTamanno}
                    handleTamanno={handleTamanno}
                    handleCloseTamanno={handleCloseTamanno}
                    handleOpenTamanno={handleOpenTamanno} 
                    //Rango Tamaño
                    RTamanno={RTamanno}
                    selectedOptions10={selectedOptions10}
                    openRTamanno={openRTamanno}
                    handleRTamanno={handleRTamanno}
                    handleCloseRTamanno={handleCloseRTamanno}
                    handleOpenRTamanno={handleOpenRTamanno}  
                    //Producto
                    Productos={Productos}
                    selectedOptions11={selectedOptions11}
                    openProductos={openProducto}
                    handleProductos={handleProducto}
                    handleCloseProductos={handleCloseProducto}
                    handleOpenProductos={handleOpenProducto} 
                    //Codigo de Barras
                    CBarra={CBarras}
                    selectedOptions12={selectedOptions12}
                    openCBarras={openCBarra}
                    handleCBarras={handleCBarra}
                    handleCloseCBarras={handleCloseCBarra}
                    handleOpenCBarras={handleOpenCBarra}  
                    //Nacionalidad
                    Nacionalidad={Nacionalidad}
                    selectedOptions13={selectedOptions13}
                    openNacionalidad={openNacionalidad}
                    handleNacionalidad={handleNacionalidad}
                    handleCloseNacionalidad={handleCloseNacionalidad}
                    handleOpenNacionalidad={handleOpenNacionalidad}                
                  />
                  <SelectIndicadores
                    Indicadores={Indicadores}
                    selectedOptions14={selectedOptions14}
                    openIndicadores={openIndicadores}
                    handleIndicadores={handleIndicadores}
                    handleCloseIndicadores={handleCloseIndicadores}
                    handleOpenIndicadores={handleOpenIndicadores}
                    setIDIndicadores={setIDFabricante}
                    isSelected={isSelected}
                  />
               </article>
               <Stack direction="row" className={styles.buttons}>
                 <button id='save' style={{width:'35%'}} variant="contained" onClick={abrirCerrarModalSelect}>Guardar</button>
                 <button id='process' style={{width:'35%'}} variant="contained" onClick={comprobarCombos}>Procesar</button>
               </Stack>
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
    position: 'absolute', top: '90%', right: '3%', width: '30%', justifyContent:'space-around',height:'5%'
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