import * as React from 'react';
import './data.css'
import { styled } from '@mui/material/styles';
import { Box, CssBaseline, ListItemText, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { MenuItem, Stack, Button, TextField, Checkbox, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { DrawerComponent, BotonUsuario, CardComponents, HeaderComponent } from './components/Components';
import { SelectCanales, SelectAtributos, SelectIndicadores, SelectPeriodos, SelectRegiones, } from './components/Selects';
import Alert from '@mui/material/Alert';
import Report from './VisualizarData';

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
export default function DATA() {

  const styles = useStyles();
  var token = sessionStorage.getItem('token');
  const [selectedOptionRetail, setSelectedOptionRetail] = useState(null)
  /*Control del ComponetDrawer*/
  const [alert, setAlert] = React.useState(false);
  const alerta =
    <Box className={styles.Collapse} style={{ display: alert ? 'block' : 'none' }}>
      <Alert
        severity="error" variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => { setAlert(false); }}
          >Ok
          </IconButton>
        }
      >
        {parseInt(sessionStorage.getItem('Id_Cliente')) === 1 ? selectedOptionRetail !== null ? 'Debe Selecionar un Reporte' : 'Debe Seleccionar un Retail' : 'Debe Selecionar un Reporte'}
      </Alert>
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
  const seleccionarPeriodo = (parametro) => {
    setTiempoReporte(parametro)
    setAlert(false)
    handleDrawerClose()
  }

  const [data, setData] = useState([]);
  const [selectedOptions1, setSelectedOptions1] = useState([]);


  /*Data Canales*/
  const [canal, setCanal] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);

  /*Data Regiones*/
  const [region, setRegion] = useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);

  /*Data SubRegionres*/
  const [selectedOptions33, setSelectedOptions33] = useState([]);


  /*Data Cestas*/
  const [Cesta, setCesta] = useState([]);
  const [selectedOptions4, setSelectedOptions4] = useState([]);

  /*Data Categorias*/
  const [Categorias, setCategorias] = useState([]);
  const [selectedOptions5, setSelectedOptions5] = useState([]);
  /*Data Fabricantes*/
  const [Fabricante, setFabricante] = useState([]);
  const [selectedOptions6, setSelectedOptions6] = useState([]);

  /*Data Marcas*/
  const [Marcas, setMarcas] = useState([]);
  const [selectedOptions7, setSelectedOptions7] = useState([]);

  /*Data Segmentos*/
  const [Segmentos, setSegmentos] = useState([]);
  const [selectedOptions8, setSelectedOptions8] = useState([]);

  /*Data Tamaño*/
  const [Tamanno, setTamanno] = useState([]);
  const [selectedOptions9, setSelectedOptions9] = useState([]);

  /*Data Rango de Tamaño*/
  const [RTamanno, setRTamanno] = useState([]);
  const [selectedOptions10, setSelectedOptions10] = useState([]);

  /*Data Productos*/
  const [Productos, setProductos] = useState([]);
  const [selectedOptions11, setSelectedOptions11] = useState([]);

  /*Data Codigo de Barras*/
  const [CBarras, setCBarras] = useState([]);
  const [selectedOptions12, setSelectedOptions12] = useState([]);

  /*Data Nacionalidad*/
  const [Nacionalidad, setNacionalidad] = useState([]);
  const [selectedOptions13, setSelectedOptions13] = useState([]);

  /*Data Indicadores*/
  const [Indicadores, setIndicadores] = useState([]);
  const [selectedOptions14, setSelectedOptions14] = useState([]);
  /*Data Global de Grilla*/
  const [dataGrid, setDataGrid]= useState([])
  /* Funcion Onchange Agrupada de todos los combos */
  const handleChangeSelect = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "Periodo":
        const ValorID = render.map(
          function ({ id }) {
            return id
          }
        );
        if (value[value.length - 1] === "all") {
          setSelectedOptions1(selectedOptions1.length === data.length ? [] : ValorID);
          return;
        }
        setSelectedOptions1(value);
        break;
      case "Canales":
        setSelectedOptions2(value);
        break;
      case "Areas":
        setSelectedOptions3(value);
        break;
      case "Zonas":
        setSelectedOptions33(value);
        break;
      case "Cesta":
        setSelectedOptions4(value);
        break;
      case "Categorias":
        setSelectedOptions5(value);
        break;
      case "Fabricantes":
        setSelectedOptions6(value);
        break;
      case "Marcas":
        setSelectedOptions7(value);
        break;
      default:
        break;
    }
  };
  /*Funciones de Listar PERÍODOS 😄*/
  const peticionSemanas = async () => {
    setBotonreporte({ semanas: true })
    await axios.get(process.env.REACT_APP_API_ENDPOINT + 'ListarSemana', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          setData(response.data.data);
        }
      }).catch(error => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: 'error',
            title: '' + error.response.data.message,
          })
        }
        console.log(error)
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const peticionMeses = async () => {
    setBotonreporte({ meses: true, periodo: true })
    await axios.get(process.env.REACT_APP_API_ENDPOINT + 'listarPeriodo/', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          setData(response.data.data);
        }
      }).catch(error => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: 'error',
            title: '' + error.response.data.message,
          })
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const PeticionTrimestres = async () => {
    setBotonreporte({ trimestres: true, periodo: true })
    await axios.get(process.env.REACT_APP_API_ENDPOINT + 'ListarTrimestre', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          setData(response.data.data);
        }
      }).catch(error => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: 'error',
            title: '' + error.response.data.message,
          })
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const PeticionSemestres = async () => {
    setBotonreporte({ semestres: true, periodo: true })
    await axios.get(process.env.REACT_APP_API_ENDPOINT + 'ListarSemestre', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          setData(response.data.data);
        }
      }).catch(error => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: 'error',
            title: '' + error.response.data.message,
          })
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const [openPeriodo, setOpenPeriodo] = React.useState(false);
  const handleClosePeriodo = () => {
    setOpenPeriodo(false);
    if (selectedOptions1.length >= 1) {
      peticionCanales()
    }
  };
  const handleOpenPeriodo = () => {
    controladorAll();
    setCanal([])
    setTimeout(console.log(canal), 20000)

    if (selectedOptions2.length >= 1) {
      setSelectedOptions2([]); setSelectedOptions3([]); setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
    }

    if (tiempoReporte.length === 0) {
      setOpen(true);
      setOpenPeriodo(false);
      setAlert(true)
    } else {
      setOpenPeriodo(true);
      setAlert(false)
    }
  };

  /*Funciones de Listar CANALES 😄*/
  const peticionCanales = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarCanal/', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdValor: selectedOptions1,
      IdTipo: Tipo
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          setCanal(response.data.data);
        }
      }).catch(error => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: 'error',
            title: '' + error.response.data.message,
          })
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const [openCanales, setOpenCanales] = React.useState(false);

  const handleCloseCanal = () => {
    setOpenCanales(false);
  }
  const handleOpenCanales = () => {
    setOpenCanales(true);

    if (selectedOptions2.length >= 1) {
      setRegion([])
      prueba()
      setSelectedOptions2([]); setSelectedOptions3([]); setSelectedOptions4([]);
      setSelectedOptions5([]); setSelectedOptions6([]); setSelectedOptions7([]);
      setSelectedOptions8([]); setSelectedOptions9([]); setSelectedOptions10([]);
      setSelectedOptions11([]); setSelectedOptions12([]); setSelectedOptions13([]);
    }
  };
  const prueba = () => {
    console.log(region)
    setTimeout(() => {
      console.log(region)

    }, 5000);
  }


  /*Funciones de Listar REGIONES 😄*/
  const [openRegiones, setOpenRegiones] = React.useState(false);
  const [idRegiones, setIdRegiones] = useState();

  const peticionRegiones = async () => {
    const { periodo } = botonreporte
    let IdValor;
    switch (periodo) {
      case true:
        IdValor = [1];
        break;

      default:
        IdValor = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarArea/', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdTipo: IdValor
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          setRegion(response.data.data);
          console.log(response.data.data)
        }
      }).catch(error => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: 'error',
            title: '' + error.response.data.message,
          })
        }
        console.log(error);
        console.log(error);
      })

  }

  const handleOpenRegiones = () => {
    setOpenRegiones(true);
    peticionRegiones()
    if (selectedOptions3.length >= 1) {
      setSelectedOptions3([]); setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([]);
      setSelectedOptions7([]); setSelectedOptions8([]); setSelectedOptions9([]);
      setSelectedOptions10([]); setSelectedOptions11([]); setSelectedOptions12([]);
      setSelectedOptions13([]);
    }
  };
  const handleCloseRegion = () => {
    setOpenRegiones(false);
    setShowMenuItem({ categoria: true })
  };

  /*Funcion onChange del combo SubRegiones */
  const [SubRegion, setSubRegion] = useState([])
  const peticionSubRegiones = async (value) => {
    const { periodo } = botonreporte
    let url;
    switch (periodo) {
      case true:
        url = process.env.REACT_APP_API_ENDPOINT + `ListarSubRegionPeriodo/`;
        break;
      default:
        url = process.env.REACT_APP_API_ENDPOINT + `ListarSubRegionSemanal/`;
        break;
    }
    await axios.post(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      IdOption: selectedOptions1,
      IdCanal: selectedOptions2,
      IdArea: value
    })
      .then(response => {
        console.log(response)
        // setSubRegion(response.data.data);
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleSubRegiones = (event) => {
    const value = event.target.value;
  };
  const OptionSubRegion = SubRegion.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      <Checkbox checked={selectedOptions2.indexOf(item.id) > -1} />
      <ListItemText sx={{ fontSize: '1em' }} primary={item.nombre} />
    </MenuItem>
  ))

  /*Funciones de Listar Cestas 😄*/
  const [openCesta, setOpenCesta] = React.useState(false);
  const [IDCesta, setIDCesta] = React.useState({});

  const handleCesta = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedOptions4(selectedOptions4.length === Cesta.length ? [] : Cesta);
      return;
    } else {
      setSelectedOptions4(value);
    }
  };

  const handleCloseCesta = () => {
    setOpenCesta(false);
  }
  const handleOpenCesta = () => {
    setOpenCesta(true);
    peticionCestas()
    if (selectedOptions4.length >= 1) {
      setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([]); setSelectedOptions7([]);
      setSelectedOptions8([]); setSelectedOptions9([]); setSelectedOptions10([]);
      setSelectedOptions11([]); setSelectedOptions12([]); setSelectedOptions13([]);
    }
  };
  const peticionCestas = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + `ListarCesta/`, {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",

    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          setCesta(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  /*Funciones de Listar Categorias 😄*/
  const [openCategoria, setOpenCategoria] = React.useState(false);
  const handleCategoria = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedOptions5(selectedOptions5.length === Categorias.length ? [] : Categorias);
      return;
    } else {
      setSelectedOptions5(value);
    }
  };

  const handleCloseCategoria = () => {
    setOpenCategoria(false);
  }
  const handleOpenCategoria = () => {
    setOpenCategoria(true);
    peticionCategorias()
    if (selectedOptions5.length >= 1) {
      setSelectedOptions5([]); setSelectedOptions6([]); setSelectedOptions7([]); setSelectedOptions8([]);
      setSelectedOptions9([]); setSelectedOptions10([]); setSelectedOptions11([]);
      setSelectedOptions12([]); setSelectedOptions13([]);
    }
  };
  const peticionCategorias = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarCategoria/', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setCategorias([])
          }
          setCategorias(response.data.data);
        }
      }).catch(error => {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  /*Funciones de Listar Fabricantes 😄*/
  const [openFabricante, setOpenFabricante] = React.useState(false);
  const peticionFabricantes = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarFabricante/', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
    })
      .then(response => {
        console.log(response.data.data)
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setFabricante([])
          }
          setFabricante(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseFabricante = () => {
    setOpenFabricante(false);
  }
  const handleOpenFabricante = () => {
    setOpenFabricante(true);
    peticionFabricantes()
    if (selectedOptions6.length >= 1) {
      setSelectedOptions6([]); setSelectedOptions7([]); setSelectedOptions8([]); setSelectedOptions9([]);
      setSelectedOptions10([]); setSelectedOptions11([]); setSelectedOptions12([]);
      setSelectedOptions13([]);
    }
  };

  /*Funciones de Listar Marcas 😄*/
  const [openMarcas, setOpenMarcas] = React.useState(false);
  const [IDFabricante, setIDFabricante] = React.useState({});
  const peticionMarcas = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }

    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarMarca/', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
      IdFabricante: selectedOptions6.length > 0 ? selectedOptions6 : null
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setMarcas([])
          }
          setMarcas(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseMarcas = () => {
    setOpenMarcas(false);
  }
  const handleOpenMarcas = () => {
    setOpenMarcas(true);
    peticionMarcas()
    if (selectedOptions7.length >= 1) {
      setSelectedOptions7([]); setSelectedOptions8([]); setSelectedOptions9([]); setSelectedOptions10([]);
      setSelectedOptions11([]); setSelectedOptions12([]); setSelectedOptions13([]);
    }
  };

  /*Funciones de Listar Segmentos 😄*/
  const [openSegmentos, setOpenSegmentos] = React.useState(false);
  const peticionSegmentos = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarSegmento/', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
      IdFabricante: selectedOptions6.length > 0 ? selectedOptions6 : "",
      IdMarca: selectedOptions7.length > 0 ? selectedOptions7 : "",
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setSegmentos([])
          }
          setSegmentos(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseSegmentos = () => {
    setOpenSegmentos(false);
  }
  const handleOpenSegmentos = () => {
    setOpenSegmentos(true);
    peticionSegmentos()
    if (selectedOptions8.length >= 1) {
      setSelectedOptions8([]); setSelectedOptions9([]); setSelectedOptions10([]); setSelectedOptions11([]);
      setSelectedOptions12([]); setSelectedOptions13([]);
    }
  };
  const handleSegmentos = (event) => {
    const value = event.target.value;
    setSelectedOptions8(value);
  };

  /*Funciones de Listar Tamanno 😄*/
  const [openTamanno, setOpenTamanno] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionTamanno = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarTamano/', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
      IdFabricante: selectedOptions6.length > 0 ? selectedOptions6 : "",
      IdMarca: selectedOptions7.length > 0 ? selectedOptions7 : "",
      IdSegmento: selectedOptions8.length > 0 ? selectedOptions8 : "",

    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setTamanno([])
          }
          setTamanno(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseTamanno = () => {
    setOpenTamanno(false);
    // if(selectedOptions4.length>=1){
    //   peticionFabricantes();
    // }
  }
  const handleOpenTamanno = () => {
    setOpenTamanno(true);
    peticionTamanno()
    if (selectedOptions9.length >= 1) {
      setSelectedOptions9([]); setSelectedOptions10([]); setSelectedOptions11([]); setSelectedOptions12([]);
      setSelectedOptions13([]);
    }
  };
  const handleTamanno = (event) => {
    const value = event.target.value;
    setSelectedOptions9(value);
  };

  /*Funciones de Listar RTamanno 😄*/
  const [openRTamanno, setOpenRTamanno] = React.useState(false);
  const peticionRTamanno = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarRTamano', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
      IdFabricante: selectedOptions6.length > 0 ? selectedOptions6 : "",
      IdMarca: selectedOptions7.length > 0 ? selectedOptions7 : "",
      IdSegmento: selectedOptions8.length > 0 ? selectedOptions8 : "",
      IdTamano: selectedOptions9.length > 0 ? selectedOptions9 : "",

    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setRTamanno([])
          }
          setRTamanno(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseRTamanno = () => {
    setOpenRTamanno(false);
  }
  const handleOpenRTamanno = () => {
    setOpenRTamanno(true);
    peticionRTamanno()
    if (selectedOptions10.length >= 1) {
      setSelectedOptions10([]); setSelectedOptions11([]); setSelectedOptions12([]); setSelectedOptions13([]);
    }
  };
  const handleRTamanno = (event) => {
    const value = event.target.value;
    setSelectedOptions10(value);
  };

  /*Funciones de Listar Producto 😄*/
  const [openProducto, setOpenProducto] = React.useState(false);
  const peticionProducto = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarProducto', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
      IdFabricante: selectedOptions6.length > 0 ? selectedOptions6 : "",
      IdMarca: selectedOptions7.length > 0 ? selectedOptions7 : "",
      IdSegmento: selectedOptions8.length > 0 ? selectedOptions8 : "",
      IdTamano: selectedOptions9.length > 0 ? selectedOptions9 : "",
      IdRTamano: selectedOptions10.length > 0 ? selectedOptions10 : "",
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setProductos([])
          }
          setProductos(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseProducto = () => {
    setOpenProducto(false);
  }
  const handleOpenProducto = (e) => {
    setOpenProducto(true);
    peticionProducto()
    console.log(e)
    if (selectedOptions11.length >= 1) {
      setSelectedOptions11([]); setSelectedOptions12([]); setSelectedOptions13([]);
    }
  };
  const handleProducto = (event) => {
    const value = event.target.value;
    setSelectedOptions11(value);
  };

  /*Funciones de Listar CBarra 😄*/
  const [openCBarra, setOpenCBarra] = React.useState(false);
  const peticionCBarra = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.get(process.env.REACT_APP_API_ENDPOINT + 'ListarCodBarra', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
      IdFabricante: selectedOptions6.length > 0 ? selectedOptions6 : "",
      IdMarca: selectedOptions7.length > 0 ? selectedOptions7 : "",
      IdSegmento: selectedOptions8.length > 0 ? selectedOptions8 : "",
      IdTamano: selectedOptions9.length > 0 ? selectedOptions9 : "",
      IdRTamano: selectedOptions10.length > 0 ? selectedOptions10 : "",
      IdProducto: selectedOptions11.length > 0 ? selectedOptions11 : "",
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setCBarras([])
          }
          setCBarras(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseCBarra = () => {
    setOpenCBarra(false);
  }
  const handleOpenCBarra = () => {
    setOpenCBarra(true);
    peticionCBarra()
    if (selectedOptions12.length >= 1) {
      setSelectedOptions12([]); setSelectedOptions13([]);
    }
  };
  const handleCBarra = (event) => {
    const value = event.target.value;
    setSelectedOptions8(value);
  };

  /*Funciones de Listar Nacionalidad 😄*/
  const [openNacionalidad, setOpenNacionalidad] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionNacionalidad = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post(process.env.REACT_APP_API_ENDPOINT + 'ListarNacionalidad', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo,
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
      IdFabricante: selectedOptions6.length > 0 ? selectedOptions6 : "",
      IdMarca: selectedOptions7.length > 0 ? selectedOptions7 : "",
      IdSegmento: selectedOptions8.length > 0 ? selectedOptions8 : "",
      IdTamano: selectedOptions9.length > 0 ? selectedOptions9 : "",
      IdRTamano: selectedOptions10.length > 0 ? selectedOptions10 : "",
      IdCBarra: selectedOptions12.length > 0 ? selectedOptions12 : "",
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setNacionalidad([])
          }
          setNacionalidad(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseNacionalidad = () => {
    setOpenNacionalidad(false);
  }
  const handleOpenNacionalidad = () => {
    setOpenNacionalidad(true);
    peticionNacionalidad()
    if (selectedOptions13.length >= 1) {
      setSelectedOptions13([]);
    }
  };
  const handleNacionalidad = (event) => {
    const value = event.target.value;
    setSelectedOptions8(value);
  };

  /*Funciones de Listar Indicadores 😄*/
  const [openIndicadores, setOpenIndicadores] = React.useState(false);
  // const [IDMarca, setIDMarca]=React.useState({});
  const peticionIndicadores = async () => {
    const { periodo } = botonreporte
    let Tipo;
    /* Valores condicionales necesarios para variable Semana o Periodo*/
    switch (periodo) {
      case true:
        // Periodo
        Tipo = [1];
        break;
      // Semana
      default:
        Tipo = [0];
        break;
    }
    await axios.post('http://localhost:3005/VisorCliente_Api/Indicadores/', {
      headers: { 'Authorization': `Bearer ${token}` },
      IdTipo: Tipo
    })
      .then(response => {
        if (response.data.message) {
          toast.fire({
            icon: 'warning',
            title: '' + response.data.message,
          })
        } else {
          if (response.data.data === undefined) {
            setIndicadores([])
          }
          setIndicadores(response.data.data);
        }
      }).catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
  }
  const handleCloseIndicadores = () => {
    setOpenIndicadores(false);
  }
  const handleOpenIndicadores = () => {
    setOpenIndicadores(true);
    if (selectedOptions1.length > 0 ) {
      peticionIndicadores()
    }
  };
  const handleIndicadores = (event) => {
    const value = event.target.value;
    setSelectedOptions14(value);
  };

  /*Mis Selecciones*/
  const [chipData, setChipData] = React.useState({
    nombre: '',
    id: ''
  });
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => (chips.nombre !== chipToDelete.key));
  };
  const handleChip = (e) => {
    let ids;
    const { name, value } = e.target;
    if (selectedOptions1.length === render.length) {
      let result = selectedOptions1.reduce((acc, cur) => {
        let { id } = cur;
        let ex = acc.find(x => x.id === id);
        if (!ex) { ex = id; acc.push(ex); }
        return acc;
      }, [])
      ids = result.concat(selectedOptions2, selectedOptions3).join('*')
      setChipData({ [name]: value, id: ids })
    } else {
      ids = selectedOptions1.concat(selectedOptions2, selectedOptions3).join('*')
      setChipData({ [name]: value, id: ids })
    }
  }
  const GuardarSelecciones = () => {
    abrirCerrarModalSelect()
    setChipData({ nombre: [] })
  }
  const [modalSelect, setModalSelect] = useState(false);
  const [isSelected, setIsSelected] = useState({
    selectedOptions1: false,
    selectedOptions2: false,
    selectedOptions3: false,
    selectedOptions4: false,
    selectedOptions5: false,
    selectedOptions6: false,
  });
  const comprobarCombos =  async () => {
    handleNext()
    const datosEnviar = {
      IdValor: selectedOptions1,
      IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
      IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
      IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
      IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
      IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
      // IdFabricante: selectedOptions6.length > 0 ? selectedOptions6 : "",
      // IdMarca: selectedOptions7.length > 0 ? selectedOptions7 : "",
      // IdSegmento: selectedOptions8.length > 0 ? selectedOptions8 : "",
      // IdTamano: selectedOptions9.length > 0 ? selectedOptions9 : "",
      // IdRTamano: selectedOptions10.length > 0 ? selectedOptions10 : "",
      // IdCBarra: selectedOptions12.length > 0 ? selectedOptions12 : "",
    }
      await axios.post('http://localhost:3005/VisorCliente_Api/GenerarDataSemanal/', {
        headers: { 'Authorization': `Bearer ${token}` },
        IdValor: selectedOptions1,
        IdCanal: selectedOptions2.length > 0 ? selectedOptions2 : "",
        IdArea: selectedOptions3.length > 0 ? selectedOptions3 : "",
        IdZona: selectedOptions33.length > 0 ? selectedOptions33 : "",
        IdCesta: selectedOptions4.length > 0 ? selectedOptions4 : "",
        IdCategoria: selectedOptions5.length > 0 ? selectedOptions5 : "",
        IdIndicador: selectedOptions14

        
      })
        .then(response => {
          if (response.data.message) {
            toast.fire({
              icon: 'warning',
              title: '' + response.data.message,
            })
          } else {
            if (response.data.data === undefined) {
              setDataGrid([])
            }
            setDataGrid(response.data.data);
          }
        }).catch(error => {
          console.log(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
        })
    switch (true) {
      case selectedOptions1.length === 0:
        setIsSelected({ selectedOptions1: true })
        toast.fire({
          icon: 'error',
          title: 'No ha Seleccionado un Período',
          confirmButtonText: `Ok`,
        })
        break;
      case selectedOptions2.length === 0:
        setIsSelected({ selectedOptions2: true })
        toast.fire({
          icon: 'error',
          title: 'No ha Seleccionado un Canal',
          confirmButtonText: `Ok`,
        })
        break;
      default:
        // setModalSelect(!modalSelect);
        setIsSelected({ selectedOptions1: false, selectedOptions2: false, selectedOptions3: false })
        break;
    }
  }
  const abrirCerrarModalSelect = () => {
    // comprobarCombos()
  }
  console.log(dataGrid)
  const bodyMySelect = (
    <div style={{ width: '25%', height: '40%', justifyContent: 'space-around' }} className={styles.modal}>
      <h1 style={{ textAlign: 'center' }}>Crear Filtro de Selección</h1>
      <div className={styles.agrupar}>
        <div style={{ width: '100%', overflow: 'visible' }} className='grupoEditar'>
          <TextField name="nombre" className={styles.inputMaterial} type='text' onChange={handleChip} value={chipData && chipData.nombre} label="Nombre del Filtro" placeholder='Escriba el nombre de sus Selecciones' />
        </div>
        <Stack direction="row" justifyContent={'flex-end'} spacing={2}>
          <Button style={{ background: "#2FAC6A" }} variant="contained" onClick={() => GuardarSelecciones()}>Guardar</Button>
          <Button variant="contained" onClick={() => abrirCerrarModalSelect()}>Cancelar</Button>
        </Stack>
      </div>
    </div>
  )
  const DeletePeriodo = () => {
    if (selectedOptions1 !== []) {
      setSelectedOptions1([])
      setSelectedOptions2([])
      setSelectedOptions3([])
    }
  }
  const [botonreporte, setBotonreporte] = useState({
    semanas: false,
    meses: false,
    trimestres: false,
    semestres: false,
    /* Indicador Perido usado en la llamada de canal periodo */
    periodo: false,
  })
  /*Controles de Search*/
  const [focus, setFocus] = React.useState(false);
  const [render, setRender] = React.useState(false);
  const [searchText, setSearchText] = React.useState({
    periodo: '',
    cesta: '',
    categoria: '',
    fabricante: '',
    marca: '',
    segmento: ''
  })
  console.log(searchText.periodo)
  const handleChangeSearch = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setSearchText({ [name]: value })
    setFocus(true)
  }
  /*Controles de Select All*/
  const [showMenuItem, setShowMenuItem] = React.useState({
    periodo: false,
    cesta: '',
    categoria: '',
    fabricante: '',
    marca: '',
    segmento: ''
  });
  const controladorAll = () => {
    switch (true) {
      case data.length === 0:
        setShowMenuItem({ periodo: false })
        break;
      case tiempoReporte === 'Trimestres':
        setShowMenuItem({ periodo: false })
        break;
      case tiempoReporte === 'Semestres':
        setShowMenuItem({ periodo: false })
        break;
      default:
        setShowMenuItem({ periodo: true })
        break;
    }
  }
  const isAllSelectPeriodo = data.length > 0 && selectedOptions1.length === render.length;
  const isAllSelectCesta = Cesta.length > 0 && selectedOptions4.length === Cesta.length;
  const isAllSelectCategoria = Categorias.length > 0 && selectedOptions5.length === Categorias.length;


  const [activeStep, setActiveStep] =useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        setData={setData}
        selectedOptionRetail={selectedOptionRetail}
        setSelectedOptionRetail={setSelectedOptionRetail}
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
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepContent>
              <section className="container-of-table">
                <HeaderComponent />
                <article className="table-of-data">
                  <SelectPeriodos
                    className='propor'
                    tiempoReporte={tiempoReporte}
                    selectedOptions1={selectedOptions1}
                    isSelected={isSelected}
                    openPeriodo={openPeriodo}
                    handlePeriodos={handleChangeSelect}
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
                    handleCanales={handleChangeSelect}
                    handleCloseCanal={handleCloseCanal}
                    handleOpenCanal={handleOpenCanales}
                    selectedOptionRetail={selectedOptionRetail}
                    canal={canal}
                  />
                  <SelectRegiones
                    selectedOptions3={selectedOptions3}
                    isSelected={isSelected}
                    openRegiones={openRegiones}
                    handleRegiones={handleChangeSelect}
                    handleCloseRegion={handleCloseRegion}
                    handleOpenRegiones={handleOpenRegiones}
                    regiones={region}
                    /* SubRegiones */
                    idRegiones={idRegiones}
                    SubRegion={SubRegion}
                    selectedOptions33={selectedOptions33}
                    handleSubRegiones={handleChangeSelect}

                  />
                  <SelectAtributos
                    selectedOptions4={selectedOptions4}
                    isSelected={isSelected}
                    openCesta={openCesta}
                    handleCesta={handleChangeSelect}
                    handleCloseCesta={handleCloseCesta}
                    handleOpenCesta={handleOpenCesta}
                    Cesta={Cesta}
                    setIDCesta={setIDCesta}
                    IDCesta={IDCesta}
                    
                    isAllSelectCesta={isAllSelectCesta}
                    setRender={setRender}
                    setSearchText={setSearchText}
                    showMenuItem={showMenuItem}
                    handleChangeSearch={handleChangeSearch}
                    searchText={searchText.cesta}
                    render={render}
                    //Categorias
                    Categorias={Categorias}
                    selectedOptions5={selectedOptions5}
                    openCategoria={openCategoria}
                    handleCategoria={handleChangeSelect}
                    isAllSelectCategoria={isAllSelectCategoria}
                    handleCloseCategoria={handleCloseCategoria}
                    handleOpenCategoria={handleOpenCategoria}
                    focus={focus}
                    //Fabricantes
                    Fabricante={Fabricante}
                    selectedOptions6={selectedOptions6}
                    openFabricante={openFabricante}
                    handleFabricante={handleChangeSelect}
                    handleCloseFabricante={handleCloseFabricante}
                    handleOpenFabricante={handleOpenFabricante}
                    setIDFabricante={setIDFabricante}
                    //Marcas
                    Marcas={Marcas}
                    selectedOptions7={selectedOptions7}
                    openMarcas={openMarcas}
                    handleMarcas={handleChangeSelect}
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
                  <button id='save' style={{ width: '35%' }} variant="contained" onClick={abrirCerrarModalSelect}>Guardar</button>
                  <button id='process' style={{ width: '35%' }} variant="contained" onClick={comprobarCombos}>Procesar</button>
                </Stack>
              </section>
            </StepContent>
          </Step>
          <Step>
            <StepContent>
              <Report dataGrid={dataGrid}/>
            </StepContent>
          </Step>

          
          
        </Stepper>
          
            
        </div>
      </Main>
      <Button className='atras'
        style={{ background: 'transparent', position: 'fixed', border: '0.2em solid #fff', minWidth: '50px', borderRadius: '50%' }}
        variant="contained" onClick={() => window.location = '/retailservices/home'}>
        <ArrowBack style={{ fontSize: '2.5em', fill: '#fff' }}></ArrowBack>
      </Button>
      
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '30%',
    height: '40%',
    minHeight: '300px',
    padding: '2%',
    border: '1.3px solid #000',
    background: '#ffefd5',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1em',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  agrupar: {
    display: 'flex',
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    overflow: 'visible',
    alignItems: 'center'
  },
  inputMaterial: {
    width: '100%',
    height: '100%'
  },
  list: {
    width: '80%',
    display: 'inline-flex',
    flexDirection: 'column'
  },
  listItem: {
    padding: '5% 0', justifyContent: 'center', width: 'auto'
  },
  popOver: {
    width: '90%', borderRadius: '1.5em', background: 'transparent'
  },
  buttons: {
    position: 'absolute', top: '90%', right: '3%', width: '30%', justifyContent: 'space-around', height: '5%'
  },
  botonReportes: {
    color: '#fff !important', borderRadius: '1.5em !important', width: '90% !important', margin: '4% 0 2% !important', padding: '10% !important'
  },
  Collapse: {
    position: 'absolute', width: '30%', height: 'auto', top: '15%', left: '15%', zIndex: '100000'
  }
}))

const drawerWidth = 15;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    width: '80%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: "",
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth + 2}%`,
    }),
  }),
);