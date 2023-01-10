import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import * as React from "react";
import "./data.css";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline, IconButton } from "@material-ui/core";
import { ArrowBack, ArrowUpwardRounded } from "@material-ui/icons";
import {Stack,Button,Step,StepLabel,StepContent,Tooltip, Drawer, Divider,Stepper, Typography} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {BotonUsuario,HeaderComponent, DrawerHeaderComponent, CardComponents, MySelecctionComponent, MenuAtenas, SelecctionRetail} from "./components/Components";
import {SelectCanales,SelectAtributos,SelectIndicadores,SelectPeriodos,SelectRegiones,} from "./components/Selects";
import Alert from "@mui/material/Alert";
import { useMemo, useEffect, useState, useCallback} from "react";
import { desencriptar } from "../../functionsValidas/cripto";

const MySwal = withReactContent(Swal);
const toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export default function DataGrid() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (open!== false) {
      handleDrawerClose()
    }

  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const styles = useStyles(activeStep);
  var token = sessionStorage.getItem("token");
  const [idClienteCrip, setidCliente]=useState()
  var idPerfil = sessionStorage.getItem("ID_Perfil");
  const [selectedOptionRetail, setSelectedOptionRetail] = useState({
    id:[],
    nombre:[]
  });
  /*Control del ComponetDrawer*/
  const [alert, setAlert] = React.useState(false);
  const alerta = (
    <Box
      className={styles.Collapse}
      style={{ display: alert ? "block" : "none" }}
    >
      <Alert
        severity="error"
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlert(false);
            }}
          >
            Ok
          </IconButton>
        }
      >
        {parseInt(sessionStorage.getItem("Id_Cliente")) === 1
          ? selectedOptionRetail !== null
            ? "Debe Selecionar un Reporte"
            : "Debe Seleccionar un Retail"
          : "Debe Selecionar un Reporte"}
      </Alert>
    </Box>
  );
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
    if (setActiveStep !== 0) {
      setActiveStep(0)
    }
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  /*Elementos de Control Menu Desplegable*/
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
  /*Data Periodo y Tiempo del Reporte*/
  const [tiempoReporte, setTiempoReporte] = React.useState([]);
  const seleccionarPeriodo = (parametro) => {
    console.log(parametro)
    setTiempoReporte(parametro);
    setAlert(false);
    handleDrawerClose();
  };

  const [selectedOptions, setSelectedOption]=useState({
    Periodo:[],
    Canales:[],
    Areas:[],
    Zona:[],
    Cesta:[],
    Categorias:[],
    Fabricantes:[],
    Marcas:[],
    Segmento:[],
    Tamanno:[],
    RTamanno:[],
    Producto:[],
    CodBarra:[],
    Nacionalidad:[],
    Indicador:[],
  })
  const [Openfiltros, setOpenfiltros]=useState({
    Periodo:false,
    Canales:false,
    Areas:false,
    Zona:false,
    Cesta:false,
    Categorias:false,
    Fabricantes:false,
    Marcas:false,
    Segmentos:false,
    Tamanno:false,
    RTamanno:false,
    Producto:false,
    CodBarra:false,
    Nacionalidad:false,
    Indicador:false,
  })
  const [data, setData] = useState([]);
  /*Data Canales*/
  const [canal, setCanal] = useState([]);
  /*Data Regiones*/
  const [area, setArea] = useState([]);
  /*Data SubRegionres*/
  const [zona, setZona] = useState([]);
  /*Data Cestas*/
  const [Cesta, setCesta] = useState([]);
  /*Data Categorias*/
  const [Categorias, setCategorias] = useState([]);
  /*Data Fabricantes*/
  const [Fabricante, setFabricante] = useState([]);
  /*Data Marcas*/
  const [Marcas, setMarcas] = useState([]);
  /*Data Segmentos*/
  const [Segmentos, setSegmentos] = useState([]);
  /*Data Tamaño*/
  const [Tamanno, setTamanno] = useState([]);
  /*Data Rango de Tamaño*/
  const [RTamanno, setRTamanno] = useState([]);
  /*Data Productos*/
  const [Productos, setProductos] = useState([]);
  /*Data Codigo de Barras*/
  const [CBarras, setCBarras] = useState([]);
  /*Data Nacionalidad*/
  const [Nacionalidad, setNacionalidad] = useState([]);
  /*Data Indicadores*/
  const [Indicadores, setIndicadores] = useState([]);
  /*Data Retail*/
  const [Retail, setRetail] = useState([]);

  useEffect(() => {
    const PeticionRetailers = async () => {
      try {
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT + "ListarRetail", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.data.message) {
              toast.fire({
                icon: "warning",
                title: "" + response.data.message,
              });
            } else {
              setRetail(response.data.data);
            }
          });
      } catch (error) {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: "error",
            title: "" + error.response.data.message,
          });
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };
    const Peticiondesencriptado = async () => {
      try{
        const desencriptado = await desencriptar(process.env.REACT_APP_PUBLIC_KEY_NORMAL, sessionStorage.getItem('ID_Crit'));
        setidCliente(desencriptado)
        console.log(desencriptado)
        switch (parseInt(desencriptado) === (parseInt(process.env.REACT_APP_PUBLIC_ID_SECRET)-10)) {
          case true:
            PeticionRetailers()
            break;
          default:
            break;
        }
      } catch(e){
        console.log("Error desencriptando: " + e.message + ". ¿La contraseña es la correcta y la información está en base64?")
      }
    }
    Peticiondesencriptado()
  }, []);
  /* Funcion Onchange Agrupada de todos los combos */
  const handleChangeSelect = (event) => {
    const { name, value } = event.target;
    switch (value[value.length - 1] === "all") {
      case true:
        switch (name) {
          case "Periodo":
            let todosPeriodos = [];
            for (let i = 0; i < data.length; i++) {
              const element = data[i];
              todosPeriodos.push(element.id)
            }
            if (selectedOptions.Periodo.length>0) {
              setSelectedOption({ ...selectedOptions, 'Periodo':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Periodo': todosPeriodos })
            };
            break;
          case "Canales":
            let todosCanal = [];
            for (let i = 0; i < canal.length; i++) {
              const element = canal[i];
              todosCanal.push(element.id)
              console.log(element)
            }
            if (selectedOptions.Canales.length>0) {
              setSelectedOption({ ...selectedOptions, 'Canales':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Canales': todosCanal })
            };
            break;
          case "Areas":
            let todosArea = [];
            for (let i = 0; i < area.length; i++) {
              const element = area[i];
              todosArea.push(element.id)
            }
            if (selectedOptions.Areas.length>0) {
              setSelectedOption({ ...selectedOptions, 'Area':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Area': todosArea })
            };
            break;
          case "Zona":
            let todosZona = [];
            for (let i = 0; i < zona.length; i++) {
              const element = zona[i];
              todosZona.push(element.id)
            }
            if (selectedOptions.Zona.length>0) {
              setSelectedOption({ ...selectedOptions, 'Zona':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Zona': todosZona })
            };
            break;
          case "Cesta":
            let todosCesta = [];
            for (let i = 0; i < Cesta.length; i++) {
              const element = Cesta[i];
              todosCesta.push(element.id)
            }
            if (selectedOptions.Cesta.length>0) {
              setSelectedOption({ ...selectedOptions, 'Cesta':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Cesta': todosCesta })
            };
            break;
          case "Categorias":
            let todosCategoria = [];
            for (let i = 0; i < Categorias.length; i++) {
              const element = Categorias[i];
              todosCategoria.push(element.id)
            }
            if (selectedOptions.Categorias.length>0) {
              setSelectedOption({ ...selectedOptions, 'Categorias':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Categorias': todosCategoria })
            };
            break;
          case "Fabricantes":
            let todosFabricante = [];
            for (let i = 0; i < Fabricante.length; i++) {
              const element = Fabricante[i];
              todosFabricante.push(element.id)
            }
            if (selectedOptions.Fabricante.length>0) {
              setSelectedOption({ ...selectedOptions, 'Fabricante':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Fabricante': todosFabricante })
            };
            break;
          case "Marcas":
            let todosMarca = [];
            for (let i = 0; i < Marcas.length; i++) {
              const element = Marcas[i];
              todosMarca.push(element.id)
            }
            if (selectedOptions.Marca.length>0) {
              setSelectedOption({ ...selectedOptions, 'Marca':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Marca': todosMarca })
            };
            break;
          case "Segmento":
            let todosSegmento = [];
            for (let i = 0; i < Segmentos.length; i++) {
              const element = Segmentos[i];
              todosSegmento.push(element.id)
            }
            if (selectedOptions.Segmento.length>0) {
              setSelectedOption({ ...selectedOptions, 'Segmento':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Segmento': todosSegmento })
            };
            break;
          case "Tamanno":
            let todosTamanno = [];
            for (let i = 0; i < Tamanno.length; i++) {
              const element = Tamanno[i];
              todosTamanno.push(element.id)
            }
            if (selectedOptions.Tamanno.length>0) {
              setSelectedOption({ ...selectedOptions, 'Tamanno':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Tamanno': todosTamanno })
            };
            break;
          case "Rtamanno":
            let todosRtamanno = [];
            for (let i = 0; i < RTamanno.length; i++) {
              const element = RTamanno[i];
              todosRtamanno.push(element.id)
            }
            if (selectedOptions.Rtamanno.length>0) {
              setSelectedOption({ ...selectedOptions, 'Rtamanno':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Rtamanno': todosRtamanno })
            };
            break;
          case "Producto":
            let todosProducto = [];
            for (let i = 0; i < Productos.length; i++) {
              const element = Productos[i];
              todosProducto.push(element.id)
            }
            if (selectedOptions.Producto.length>0) {
              setSelectedOption({ ...selectedOptions, 'Producto':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Producto': todosProducto })
            };
            break;
          case "CodBarra":
            let todosCodBarra = [];
            for (let i = 0; i < CBarras.length; i++) {
              const element = CBarras[i];
              todosCodBarra.push(element.id)
            }
            if (selectedOptions.CodBarra.length>0) {
              setSelectedOption({ ...selectedOptions, 'CodBarra':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'CodBarra': todosCodBarra })
            };
            break;
          case "Nacionalidad":
            let todoNacionalidad = [];
            for (let i = 0; i < Nacionalidad.length; i++) {
              const element = Nacionalidad[i];
              todoNacionalidad.push(element.id)
            }
            if (selectedOptions.Nacionalidad.length>0) {
              setSelectedOption({ ...selectedOptions, 'Nacionalidad':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Nacionalidad': todoNacionalidad })
            };
            break;
          case "Indicador":
            let todoCodBarra = [];
            for (let i = 0; i < Indicadores.length; i++) {
              const element = Indicadores[i];
              todoCodBarra.push(element.id)
            }
            if (selectedOptions.Indicador.length>0) {
              setSelectedOption({ ...selectedOptions, 'Indicador':[]})
            }else{
              setSelectedOption({ ...selectedOptions, 'Indicador': todoCodBarra })
            };
            break;
          default:
            break;
        }
        break;
      default:
        setSelectedOption({ ...selectedOptions, [name]: value });
        break;
    }
  };
  const handleOpenFiltros = (name) => {
    setOpenfiltros({ ...Openfiltros, [name]: true });
    switch (name) {
      case "Retail":
        setSelectedOption({ ...selectedOptions,
          'Periodo': [],
          'Canales': [],
          'Areas': [],
          'Zona': [],
          'Cesta': [],
          'Categorias': [],
          'Fabricantes': [],
          'Marcas': [],
          'Segmento': [],
          'Tamanno': [],
          'RTamanno': [],
          'Producto': [],
          'CodBarra': [],
          'Nacionalidad': [],
          'Indicador': [],})
          break;
      case "Periodo":
        setSelectedOption({ ...selectedOptions,
          'Canales': [],
          'Areas': [],
          'Zona': [],
          'Cesta': [],
          'Categorias': [],
          'Fabricantes': [],
          'Marcas': [],
          'Segmento': [],
          'Tamanno': [],
          'RTamanno': [],
          'Producto': [],
          'CodBarra': [],
          'Nacionalidad': [],
          'Indicador': [],})
        if (sessionStorage.getItem('Id_Cliente') === '11' && selectedOptionRetail.id.length<1) {
          handleDrawerOpen()
          setOpenfiltros({ ...Openfiltros, 'Periodo': false });
        }
        switch (tiempoReporte) {
          case 'Semanas':
            peticionSemanas()
            break;
          case 'Meses':
            peticionMeses()
            break;
          case 'Trimestres':
            PeticionTrimestres()
            break;
          case 'Semestres':
            PeticionSemestres()
            break;
          default:
            break;
        }
        break;
      case "Canales":
        setSelectedOption({ ...selectedOptions,
          'Areas': [],
          'Zona': [],
          'Cesta': [],
          'Categorias': [],
          'Fabricantes': [],
          'Marcas': [],
          'Segmento': [],
          'Tamanno': [],
          'RTamanno': [],
          'Producto': [],
          'CodBarra': [],
          'Nacionalidad': [],
          'Indicador': [],})
        peticionCanales();
        break;
      case "Areas":
        setSelectedOption({ ...selectedOptions,
          'Zona': [],
          'Cesta': [],
          'Categorias': [],
          'Fabricantes': [],
          'Marcas': [],
          'Segmento': [],
          'Tamanno': [],
          'RTamanno': [],
          'Producto': [],
          'CodBarra': [],
          'Nacionalidad': [],
          'Indicador': [],})
        peticionArea();
        break;
      case "Zona":
        break;
      case "Cesta":
          peticionCestas();
          break;
      case "Categorias":
        peticionCategorias();
        break;
      case "Fabricantes":
        peticionFabricantes();
        break;
      case "Marcas":
        peticionMarcas();
        break;
      case "Segmento":
        peticionSegmentos();
        break;
      case "Tamanno":
        peticionTamanno();
        break;
      case "RTamanno":
        peticionRTamanno();
        break;
      case "Producto":
        peticionProducto();
        break;
      case "CodBarra":
        peticionCBarra();
        break;
      case "Nacionalidad":
        peticionNacionalidad();
        break;
      case "Indicador":
        peticionIndicadores();
        break;
      default:
        break;
    }
  };
  const handleCloseFiltros = (name) => {
    setOpenfiltros({ ...Openfiltros, [name]: false });
  };

  /*Funciones de Listar PERÍODOS 😄*/
  const peticionSemanas = async () => {
    setBotonreporte({ semanas: true });
    await axios
      .get(process.env.REACT_APP_API_ENDPOINT + "ListarSemana", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setData(response.data.data);

        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: "error",
            title: "" + error.response.data.message,
          });
        }
        console.log(error);
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  const peticionMeses = async () => {
    setBotonreporte({ meses: true, periodo: true });
    await axios
      .get(process.env.REACT_APP_API_ENDPOINT + "listarPeriodo/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: "error",
            title: "" + error.response.data.message,
          });
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  const PeticionTrimestres = async () => {
    setBotonreporte({ trimestres: true, periodo: true });
    await axios
      .get(process.env.REACT_APP_API_ENDPOINT + "ListarTrimestre", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: "error",
            title: "" + error.response.data.message,
          });
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  const PeticionSemestres = async () => {
    setBotonreporte({ semestres: true, periodo: true });
    await axios
      .get(process.env.REACT_APP_API_ENDPOINT + "ListarSemestre", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: "error",
            title: "" + error.response.data.message,
          });
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar CANALES 😄*/
  const peticionCanales = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdValor: selectedOptions.Periodo,
      IdTipo: Tipo,
      IdRetail: selectedOptionRetail.id,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarCanal/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          console.log(response)
          setCanal(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: "error",
            title: "" + error.response.data.message,
          });
        }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar REGIONES 😄*/
  const peticionArea = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdRetail: selectedOptions.Canales.indexOf(selectedOptionRetail.id) > -1?selectedOptionRetail.id:"",    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarArea/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setArea(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.fire({
            icon: "error",
            title: "" + error.response.data.message,
          });
        }
        console.log(error);
        console.log(error);
      });
  };
  /*Funcion onChange del combo SubRegiones */
  const peticionSubRegiones = async (value) => {
    const { periodo } = botonreporte;
    let url;
    switch (periodo) {
      case true:
        url = process.env.REACT_APP_API_ENDPOINT + `ListarSubRegionPeriodo/`;
        break;
      default:
        url = process.env.REACT_APP_API_ENDPOINT + `ListarSubRegionSemanal/`;
        break;
    }
    await axios
      .post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        IdOption: selectedOptions.Periodo,
        IdCanal: selectedOptions.Canal,
        IdArea: value,
      })
      .then((response) => {
        console.log(response);
        // setSubRegion(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar Cestas 😄*/
  const peticionCestas = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdRetail: selectedOptions.Canales.indexOf(selectedOptionRetail.id) > -1?selectedOptionRetail.id:"",
    });
    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarCesta/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setCesta(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar Categorias 😄*/
  const peticionCategorias = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdRetail: selectedOptions.Canales.indexOf(selectedOptionRetail.id) > -1?selectedOptionRetail.id:"",
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarCategoria/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setCategorias([]);
          }
          setCategorias(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar Fabricantes 😄*/
  const peticionFabricantes = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categorias.length > 0 ? selectedOptions.Categorias : "",
      IdRetail: selectedOptions.Canales.indexOf(selectedOptionRetail.id) > -1?selectedOptionRetail.id:"",
    });
    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarFabricante/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
          setFabricante([]);
        } else {
          setFabricante(response.data.data);
        }
      })
      // .catch((error) => {
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // });
  };
  /*Funciones de Listar Marcas 😄*/
  const peticionMarcas = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categorias.length > 0 ? selectedOptions.Categorias : "",
      IdFabricante: selectedOptions.Fabricantes.length > 0 ? selectedOptions.Fabricantes : "",
      IdRetail:selectedOptionRetail.id

    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarMarca/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setMarcas([]);
          }
          setMarcas(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar Segmentos 😄*/
  const peticionSegmentos = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categorias.length > 0 ? selectedOptions.Categorias : "",
      IdFabricante: selectedOptions.Fabricantes.length > 0 ? selectedOptions.Fabricantes : "",
      IdMarca: selectedOptions.Marcas.length > 0 ? selectedOptions.Marcas : "",
      IdRetail:selectedOptionRetail.id

    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarSegmento/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setSegmentos([]);
          }
          setSegmentos(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar Tamanno 😄*/
  const peticionTamanno = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categorias.length > 0 ? selectedOptions.Categorias : "",
      IdFabricante: selectedOptions.Fabricantes.length > 0 ? selectedOptions.Fabricantes : "",
      IdMarca: selectedOptions.Marcas.length > 0 ? selectedOptions.Marcas : "",
      IdSegmento: selectedOptions.Segmento.length > 0 ? selectedOptions.Segmento : "",
      IdRetail:selectedOptionRetail.id

    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarTamano/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setTamanno([]);
          }
          setTamanno(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar RTamanno 😄*/
  const peticionRTamanno = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categorias.length > 0 ? selectedOptions.Categorias : "",
      IdFabricante: selectedOptions.Fabricantes.length > 0 ? selectedOptions.Fabricantes : "",
      IdMarca: selectedOptions.Marcas.length > 0 ? selectedOptions.Marcas : "",
      IdSegmento: selectedOptions.Segmento.length > 0 ? selectedOptions.Segmento : "",
      IdTamano: selectedOptions.Tamanno.length > 0 ? selectedOptions.Tamanno : "",
      IdRetail:selectedOptionRetail.id
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarRTamano/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setRTamanno([]);
          }
          setRTamanno(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar Producto 😄*/
  const peticionProducto = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categorias.length > 0 ? selectedOptions.Categorias : "",
      IdFabricante: selectedOptions.Fabricantes.length > 0 ? selectedOptions.Fabricantes : "",
      IdMarca: selectedOptions.Marcas.length > 0 ? selectedOptions.Marcas : "",
      IdSegmento: selectedOptions.Segmento.length > 0 ? selectedOptions.Segmento : "",
      IdTamano: selectedOptions.Tamanno.length > 0 ? selectedOptions.Tamanno : "",
      IdRTamano: selectedOptions.RTamanno.length > 0 ? selectedOptions.RTamanno : "",
      IdRetail:selectedOptionRetail.id
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarRTamano/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setProductos([]);
          }
          setProductos(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar CBarra 😄*/
  const peticionCBarra = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canal.length > 0 ? selectedOptions.Canal : "",
      IdArea: selectedOptions.Area.length > 0 ? selectedOptions.Area : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categoria.length > 0 ? selectedOptions.Categoria : "",
      IdFabricante: selectedOptions.Fabricante.length > 0 ? selectedOptions.Fabricante : "",
      IdMarca: selectedOptions.Marca.length > 0 ? selectedOptions.Marca : "",
      IdSegmento: selectedOptions.Segmento.length > 0 ? selectedOptions.Segmento : "",
      IdTamano: selectedOptions.Tamanno.length > 0 ? selectedOptions.Tamanno : "",
      IdRTamano: selectedOptions.RTamanno.length > 0 ? selectedOptions.RTamanno : "",
      IdProducto: selectedOptions.Producto.length > 0 ? selectedOptions.Producto : "",
      IdRetail:selectedOptionRetail.id
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarRTamano/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setCBarras([]);
          }
          setCBarras(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar Nacionalidad 😄*/
  const peticionNacionalidad = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canal.length > 0 ? selectedOptions.Canal : "",
      IdArea: selectedOptions.Area.length > 0 ? selectedOptions.Area : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona :"",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categoria.length > 0 ? selectedOptions.Categoria : "",
      IdFabricante: selectedOptions.Fabricante.length > 0 ? selectedOptions.Fabricante : "",
      IdMarca: selectedOptions.Marca.length > 0 ? selectedOptions.Marca : "",
      IdSegmento: selectedOptions.Segmento.length > 0 ? selectedOptions.Segmento : "",
      IdTamano: selectedOptions.Tamanno.length > 0 ? selectedOptions.Tamanno : "",
      IdRTamano: selectedOptions.RTamanno.length > 0 ? selectedOptions.RTamanno : "",
      IdProducto: selectedOptions.Producto.length > 0 ? selectedOptions.Producto : "",
      IdCBarra: selectedOptions.CodBarra.length > 0 ? selectedOptions.CodBarra : "",
      IdRetail:selectedOptionRetail.id

    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarRTamano/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setNacionalidad([]);
          }
          setNacionalidad(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Funciones de Listar Indicadores 😄*/
  const peticionIndicadores = async () => {
    const {semanas,meses,trimestres,semestres}= botonreporte;
    let Tipo;
    /* Valores condicionales necesarios para variable Semana, Meses, Trimestres y Semestres*/
    switch (true) {
      case semanas:
        Tipo = [0];
        break;
      case meses:
        Tipo = [1];
        break;
      case trimestres:
        Tipo = [2];
      break;
      case semestres:
        Tipo = [3];
      break;
      default:
        break;
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      IdTipo: Tipo,
      IdRetail:selectedOptionRetail.id
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "Indicadores/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    await axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          if (response.data.data === undefined) {
            setIndicadores([]);
          }
          setIndicadores(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  /*Mis Selecciones*/
  const [selecciones, setSelecciones]=useState([])
  const peticionSelecciones = async () => {
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      idCliente:idClienteCrip
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "Listarfiltros/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    try {
      await axios.request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          setSelecciones([])
          console.log(response.data.message)
        } else {
          setSelecciones(response.data.data);
        }
      })
    } catch (error) {
      if (error.response.status === 400 || 500) {
        toast.fire({
          icon: "error",
          title: "" + error.response.data.message,
        });
      }
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };
  const handleFiltros = () => {
    Swal.fire({
      title: 'Coloque en nombre de su filtro',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar Filtro',
      showLoaderOnConfirm: true,
      preConfirm: async (nombreFiltro) => {
        let headersList = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        let bodyContent = JSON.stringify({
          idCliente: idClienteCrip,
          idPerfil: idPerfil,
          NombreFiltro: nombreFiltro,
          IdValor: selectedOptions.Periodo,
          IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
          IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
          IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona : "",
          IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
          IdCategoria: selectedOptions.Categorias.length > 0 ? selectedOptions.Categorias : "",
        });
        console.log(bodyContent)
        let reqOptions = {
          url: process.env.REACT_APP_API_ENDPOINT + "Insertfiltros/",
          method: "POST",
          headers: headersList,
          data: bodyContent,
        };
        try {
          await axios.request(reqOptions)
          .then((response) => {
            peticionSelecciones()
            toast.fire({
              icon: "success",
              title: "" + response.data.message,
            })
          })
        } catch (error) {
          if (error.response.status === 400 || 500) {
            toast.fire({
              icon: "error",
              title: "" + error.response.data.message,
            });
          }
          console.log(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  };
  const ValueFiltros =(params)=>{
    let ValSemana = params.Id_Semana.split(',').map(Number)
    let ValRetail = params.Id_Retail.split(',').map(Number)
    let ValEstado = params.Id_Estado.split(',').map(Number)
    let ValTienda = params.Id_Tienda.split(',').map(Number)
    let ValCategoria = params.Id_Categoria.split(',').map(Number)
    let ValMarca = params.Id_Marca.split(',').map(Number)
    let ValFabricante = params.Id_Fabricante.split(',').map(Number)
    let ValCodigoBarra = params.CodigoBarra.split(',').map(Number)
    setSelectedOption({
      ...selectedOptions,
      'Semanas':ValSemana,
      'Retailers':ValRetail,
      'Estados':ValEstado,
      'Tiendas':ValTienda,
      'Categorias':ValCategoria,
      'Marcas':ValMarca,
      'Fabricantes':ValFabricante,
      'CodBarras':ValCodigoBarra,
      'Monedas': params.Id_Moneda.split(',').map(Number),
    })
  }
  const handleDeleteFiltros=(params) => {
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const {id, nombre}=params
    Swal.fire({
      icon: 'question',
      html:`¿Desea eliminar el filtro: ${nombre}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
          let bodyContent = JSON.stringify({
            idFiltro: id,
          });
          let reqOptions = {
            url: process.env.REACT_APP_API_ENDPOINT + "Deletefiltros/",
            method: "POST",
            headers: headersList,
            data: bodyContent,
          };
          axios.request(reqOptions)
            .then((response) => {
              peticionSelecciones()
              setExpanded(false)
              console.log(response)
              Swal.fire(
                'Deleted!',
                response.data.message,
                'success'
              )
            })
            .catch ((error) =>{
              peticionSelecciones()
            if (error.response.status === 400 || 500) {
              Swal.fire(
                'Deleted!',
                error.response.data.message,
                'error'
              )
              toast.fire({
                icon: "error",
                title: "" + error.response.data.message,
              });
            }
            console.log(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers);
          })
          }

    })
  }
  const [expanded, setExpanded] = useState(false);
  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    peticionSelecciones()
  };

  const comprobarCombos = async () => {
    if (selectedOptions.Periodo.length > 0) {
      handleNext();
    }
    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    let ValuePeticionData;
    const { semanas,meses,trimestres,semestres } = botonreporte;
    /* Valores condicionales necesarios para variable Semana o Periodo*/

    switch (true) {
      case semanas:
        ValuePeticionData = "GenerarDataSemanal/";
        break;
      case meses:
          ValuePeticionData = "GenerarDataPeriodo/";
        break;
      case trimestres:
        ValuePeticionData = "GenerarDataTrimestral/";
        break;
      case semestres:
        ValuePeticionData = "GenerarDataSemestral/";
        break;
        // Semana
      default:
        break;
    }
    let bodyContent = JSON.stringify({
      IdValor: selectedOptions.Periodo,
      IdCanal: selectedOptions.Canales.length > 0 ? selectedOptions.Canales : "",
      IdArea: selectedOptions.Areas.length > 0 ? selectedOptions.Areas : "",
      IdZona: selectedOptions.Zona.length > 0 ? selectedOptions.Zona : "",
      IdCesta: selectedOptions.Cesta.length > 0 ? selectedOptions.Cesta : "",
      IdCategoria: selectedOptions.Categorias.length > 0 ? selectedOptions.Categorias : "",
      IdRetail: selectedOptions.Canales.indexOf(selectedOptionRetail.id) > -1?selectedOptionRetail.id:"",
      IdIndicadores:selectedOptions.Indicador
    });
    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + ValuePeticionData,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    switch (true) {
      case selectedOptions.Periodo.length === 0:
        toast.fire({
          icon: "error",
          title: "No ha Seleccionado un Período",
          confirmButtonText: `Ok`,
        });
        break;
      case selectedOptions.Periodo.length !== 0:
        axios
          .request(reqOptions)
          .then((response) => {
            console.log(response);
            setGridApi(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      default:
        break;
    }
  };

  const DeletePeriodo = () => {
    if (selectedOptions.Periodo !== []) {
      setSelectedOption({...selectedOptions, 'Periodo':[]})
    }
  };
  const [botonreporte, setBotonreporte] = useState({
    semanas: false,
    meses: false,
    trimestres: false,
    semestres: false,
    /* Indicador Perido usado en la llamada de canal periodo */
    periodo: false,
  });


  /*Grilla */
  const [gridApi, setGridApi] = useState(null);
  let valorEspecifivo;
  let valorEspecifivoNombre;

  switch (botonreporte.periodo) {
    case true:
      // Periodo
      if (botonreporte.meses) {
        valorEspecifivoNombre = "Meses";
      }
      if (botonreporte.trimestres) {
        valorEspecifivoNombre = "Trimestre";
      }
      if (botonreporte.semestres) {
        valorEspecifivoNombre = "Semestres";
      }
      valorEspecifivo = "Periodo";
      break;
    // Semana
    default:
      valorEspecifivo = "Semana";
      break;
  }
  const columns = [
    {
      headerName: valorEspecifivoNombre,
      field: valorEspecifivo,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Segmento",
      field: "Segmento",
      filter: "agTextColumnFilter",
      pivot: true,
      enablePivot: true,
      enableRowGroup: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Canal",
      field: "Canal",
      filter: "agTextColumnFilter",
      pivot: true,
      enablePivot: true,
      rowGroup: true,
      enableRowGroup: true,
      hide: true,
      cellStyle: { textAlign: "left" },

    },
    {
      headerName: "Area",
      field: "Areas",
      filter: "agTextColumnFilter",
      pivot: true,
      enablePivot: true,
      rowGroup: true,
      enableRowGroup: true,
      hide: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Zona",
      field: "Zona",
      filter: "agTextColumnFilter",
      pivot: true,
      enablePivot: true,
      rowGroup: true,
      enableRowGroup: true,
      hide: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Cesta",
      field: "Cesta",
      filter: "agTextColumnFilter",
      pivot: true,
      enablePivot: true,
      rowGroup: true,
      enableRowGroup: true,
      hide: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Categoria",
      field: "Categoria",
      filter: "agTextColumnFilter",
      enablePivot: true,
      enableRowGroup: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Fabricante",
      field: "Fabricante",
      filter: "agTextColumnFilter",
      enablePivot: true,
      enableRowGroup: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Marca",
      field: "Marca",
      filter: "agTextColumnFilter",
      enablePivot: true,
      enableRowGroup: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Codigo de Barra",
      field: "CodigoBarra",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "PrecioMax ($)",
      field: "PrecioMaxDolar",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
      valueFormatter: (params)=>{if (params.value !== undefined) {
        return new Intl.NumberFormat("es-VE").format(params.value.toFixed(2))
      }},
    },
    {
      headerName: "PrecioMin ($)",
      field: "PrecioMinDolar",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
      valueFormatter: (params)=>{if (params.value !== undefined) {
        return new Intl.NumberFormat("es-VE").format(params.value.toFixed(2))
      }},

    },
    {
      headerName: "PrecioProm ($)",
      field: "PrecioPromDolar",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
      valueFormatter: (params)=>{if (params.value !== undefined) {
        return new Intl.NumberFormat("es-VE").format(params.value.toFixed(2))
      }},

    },
    {
      headerName: "Producto",
      field: "Producto",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Retail",
      field: "Retail",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },

    },
    // { headerName:'ShareValor', field: 'ShareValor', filter: 'agNumberColumnFilter', pivot: true, cellStyle: { textAlign: "left"},},
    // { headerName:'ShareUnidades', field: 'ShareUnidades', filter: 'agNumberColumnFilter', pivot: true, cellStyle: { textAlign: "left"},},
    // { headerName:'VariacionUnidades', field: 'VariacionUnidades', filter: 'agNumberColumnFilter', pivot: true, cellStyle: { textAlign: "left"},},
    // { headerName:'VariacionValor', field: 'VariacionValor', filter: 'agNumberColumnFilter', pivot: true, cellStyle: { textAlign: "left"},},
    // { headerName:'VentasTotalUnidades', field: 'VentasTotalUnidades', filter: 'agNumberColumnFilter', pivot: true, cellStyle: { textAlign: "left"},},
    // { headerName:'VentasTotalValor', field: 'VentasTotalValor', filter: 'agNumberColumnFilter', pivot: true, cellStyle: { textAlign: "left"},},
    {
      headerName: "VentasUnidades",
      field: "VentasUnidades",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
      valueFormatter: (params)=>{if (params.value !== undefined) {
        return new Intl.NumberFormat("es-VE").format(params.value.toFixed(2))
      }},


    },
    {
      headerName: "VentasValor",
      field: "VentasValor",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
      valueFormatter: (params)=>{if (params.value !== undefined) {
        return new Intl.NumberFormat("es-VE").format(params.value.toFixed(2))
      }},

    },
  ];
 
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      enableRowGroup: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 200,
      showRowGroup: false,
      enablePivot: true,
      enableValue: true
    }
      
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Grupo',
      minWidth: 200,
      cellRendererParams: {suppressCount : true}
    };
  }, []);

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",

          toolPanelParams: {
            allowDragFromColumnsToolPanel: true,
            suppressRowGroups: false,
            suppressValues: false,
            suppressPivots: false,
            suppressPivotMode: false,
            suppressColumnFilter: false,
            suppressColumnSelectAll: false,
            suppressColumnExpandAll: false,
          },
        },
      ],
      defaultToolPanel: "columns",
    };
  }, []);



  const getLocaleText = useCallback((params) => {
    switch (params.key) {
      case "rowGroupColumnsEmptyMessage":
        return "Arrastre aquí para agrupar.";
      case "loadingOoo":
        return params.respuesta!==undefined?params.respuesta:"Cargando...";
      case "noRowsToShow":
        return params.respuesta!==undefined?params.respuesta:"No hay información que mostrar";
      case "autosizeThiscolumn":
        return "Autodimennsionar esta columna";
      case "autosizeAllColumns":
        return "Autodimennsionar todas las columnas";
      default:
        if (params.defaultValue) {
          // the &lrm; marker should not be made uppercase
          const val = params.defaultValue.split("&lrm;");
          const newVal = val[0].toUpperCase();
          if (val.length > 1) {
            return `${newVal}&lrm;`;
          }
          return newVal;
        }
        return "";
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <BotonUsuario handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawer
        style={{ borderTopRightRadius: '.5em', borderButtomRightRadius: '.5em' }}
        sx={{
            width:0,
            flexShrink: 0,
            borderTopRightRadius: '.5em',
            '& .MuiDrawer-paper': {
                width: '20%',
                boxSizing: 'border-box',
                borderTopRightRadius: '.5em',
                borderButtomRightRadius: '.5em',
            },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        className='Drawer'
      >
        <DrawerHeaderComponent
          handleDrawerClose={handleDrawerClose}
        />
        {Boolean(parseInt(idClienteCrip) === (parseInt(process.env.REACT_APP_PUBLIC_ID_SECRET)-10))?
          <SelecctionRetail
            selectedOptionRetail={selectedOptionRetail}
            setSelectedOptionRetail={setSelectedOptionRetail}
            handleOpen={handleOpenFiltros}
            Retail={Retail}
            selectedOptions={selectedOptions}
            setSelectedOption={setSelectedOption}
          />
          :
          <MySelecctionComponent
            ValueFiltros={ValueFiltros}
            handleChange={handleChangeExpanded}
            expanded={expanded}
            data={selecciones}
            handleDelete={handleDeleteFiltros}
            peticionSelecciones={peticionSelecciones}
          />
        }
        <Divider style={{ width: '90%', background: 'rgb(0 0 0 / 38%)' }} />
        <CardComponents
          botonreporte={botonreporte}
          seleccionarPeriodo={seleccionarPeriodo}
          DeletePeriodo={DeletePeriodo}
          peticionSemanas={peticionSemanas}
          peticionMeses={peticionMeses}
          peticionTrimestres={PeticionTrimestres}
          peticionSemestres={PeticionSemestres}
          selectedOptionRetail={selectedOptionRetail}
          setData={setData}
        />
        <Divider style={{ width: '90%', background: 'rgb(0 0 0 / 38%)' }} />
        <MenuAtenas
          anchorEl={anchorEl}
          handleClick={handleClick}
        />
      </Drawer>
      <Main open={open}>
        {alerta}
        <div className="Contenedordata">
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={styles.stepper}
          >
            <Step className={styles.stepCombo}>
              <StepContent sx={{ "& div": { height: "100% !important" } }}>
                <section className={styles.table}>
                  <HeaderComponent />
                  {Boolean(parseInt(idClienteCrip) === (parseInt(process.env.REACT_APP_PUBLIC_ID_SECRET)-10)) && selectedOptionRetail.id.length!==0?
                    <div style={{gridRow:'1/2', gridColumn:'1/2', width:'90%', display:'flex', alignItems:'center'}}>
                      <Typography >Retail seleccionado: <u>{selectedOptionRetail.nombre}</u></Typography>
                    </div>
                    :
                    ""
                  }
                  <article className={styles.tableOfData}>
                    <SelectPeriodos
                      tiempoReporte={tiempoReporte}
                      value={selectedOptions.Periodo}
                      openFiltro={Openfiltros.Periodo}
                      handleChangeValue={handleChangeSelect}
                      handleClose={handleCloseFiltros}
                      handleOpen={handleOpenFiltros}
                      disabled={Openfiltros}
                      data={data}
                    />
                    <SelectCanales
                      idCliente={idClienteCrip}
                      selectedOptionRetail={selectedOptionRetail}
                      value={selectedOptions.Canales}
                      openFiltro={Openfiltros.Canales}
                      handleChangeValue={handleChangeSelect}
                      handleClose={handleCloseFiltros}
                      handleOpen={handleOpenFiltros}
                      disabled={Openfiltros}
                      data={canal}
                    />
                    <SelectRegiones
                      disabled={Openfiltros}
                      data={area}
                      value={[selectedOptions.Areas, selectedOptions.Zona]}
                      openFiltro={Openfiltros.Areas}
                      handleChangeValue={handleChangeSelect}
                      handleClose={handleCloseFiltros}
                      handleOpen={handleOpenFiltros}

                    />
                    <SelectAtributos
                      value={[
                        selectedOptions.Cesta,
                        selectedOptions.Categorias,
                        selectedOptions.Fabricantes,
                        selectedOptions.Marcas,
                        selectedOptions.Segmento,
                        selectedOptions.Tamanno,
                        selectedOptions.RTamanno,
                        selectedOptions.Producto,
                        selectedOptions.CodBarra,
                        selectedOptions.Nacionalidad
                      ]}
                      disabled={Openfiltros}
                      data={[
                        Cesta,
                        Categorias,
                        Fabricante,
                        Marcas,
                        Segmentos,
                        Tamanno,
                        RTamanno,
                        Productos,
                        CBarras,
                        Nacionalidad
                      ]}
                      openFiltro={[
                        Openfiltros.Cesta,
                        Openfiltros.Categorias,
                        Openfiltros.Fabricantes,
                        Openfiltros.Marcas,
                        Openfiltros.Segmentos,
                        Openfiltros.Tamanno,
                        Openfiltros.RTamanno,
                        Openfiltros.Producto,
                        Openfiltros.CodBarra,
                        Openfiltros.Nacionalidad
                      ]}
                      handleChangeValue={handleChangeSelect}
                      handleClose={handleCloseFiltros}
                      handleOpen={handleOpenFiltros}
                    />
                    <SelectIndicadores
                      value={selectedOptions.Indicador}
                      disabled={Openfiltros}
                      data={Indicadores}
                      openFiltro={Openfiltros.Indicador}
                      handleChangeValue={handleChangeSelect}
                      handleClose={handleCloseFiltros}
                      handleOpen={handleOpenFiltros}
                    />
                  </article>
                  <Stack direction="row" className={styles.buttons}>
                    {Boolean(idClienteCrip === process.env.REACT_APP_PUBLIC_ID_SECRET)?'':
                    <button
                      id="save"
                      style={{ width: "35%" }}
                      variant="contained"
                      onClick={handleFiltros}
                    >
                      Guardar
                    </button>
                    }
                      <button
                        id="process"
                        style={{ width: "35%" }}
                        variant="contained"
                        onClick={comprobarCombos}
                      >
                        Procesar
                      </button>

                  </Stack>
                </section>
              </StepContent>
            </Step>
            <Step className={styles.stepGrilla}>
              <StepLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& .MuiStepLabel-iconContainer": { display: "none" },
                }}
              >
                <Tooltip title="Volver">
                  <IconButton onClick={handleBack}>
                    <ArrowUpwardRounded />
                  </IconButton>
                </Tooltip>
              </StepLabel>
              <StepContent>
                <div style={{ width: "100%", height: "100vh" }}>
                  <div
                    className="ag-theme-alpine"
                    style={{ width: "100%", height: "90%" }}
                  >
                    <div className="ag-theme-alpine" style={{ height: "100%" }}>
                      <AgGridReact
                        defaultColDef={defaultColDef}
                        columnDefs={columns}
                        rowData={gridApi}
                        alwaysShowHorizontalScroll={true}
                        alwaysShowVerticalScroll={true}
                        rowGroupPanelShow={"always"}
                        // groupDisplayType={"groupRows"}
                        getLocaleText={getLocaleText}

                        sideBar={sideBar}
                        enableCharts={true}
                        animateRows={true}
                        enableRangeSelection={true}
                        enableRangeHandle={true}
                        enableFillHandle={true}
                        autoGroupColumnDef={autoGroupColumnDef}
                        groupDisplayType={'singleColumn'}
                        domLayout="normal"
                        // pagination={true}
                      />
                    </div>
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </Main>
      <Button
        className="atras"
        style={{
          background: "transparent",
          position: "fixed",
          border: "0.2em solid #fff",
          minWidth: "50px",
          borderRadius: "50%",
        }}
        variant="contained"
        href="/retailservices/home"
      >
        <ArrowBack style={{ fontSize: "2.5em", fill: "#fff" }}></ArrowBack>
      </Button>
    </Box>
  );
}

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    width: "30%",
    height: "40%",
    minHeight: "300px",
    padding: "2%",
    border: "1.3px solid #000",
    background: "#ffefd5",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1em",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  agrupar: {
    display: "flex",
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
    flexDirection: "column",
    overflow: "visible",
    alignItems: "center",
  },
  inputMaterial: {
    width: "100%",
    height: "100%",
  },
  list: {
    width: "80%",
    display: "inline-flex",
    flexDirection: "column",
  },
  listItem: {
    padding: "5% 0",
    justifyContent: "center",
    width: "auto",
  },
  popOver: {
    width: "90%",
    borderRadius: "1.5em",
    background: "transparent",
  },
  buttons: {
    position: "absolute",
    top: "90%",
    right: "3%",
    width: "30%",
    justifyContent: "space-around",
    maxHeight: 40,
    height: "5% !important",
  },
  botonReportes: {
    color: "#fff !important",
    borderRadius: "1.5em !important",
    width: "90% !important",
    margin: "4% 0 2% !important",
    padding: "10% !important",
  },
  Collapse: {
    position: "absolute",
    width: "30%",
    height: "auto",
    top: "15%",
    left: "15%",
    zIndex: "100000",
  },
  stepper: {
    height: "100vh",
    "& div div": {
      margin: 0,
      padding: 0,
      border: 0,
    },

    "& .Mui-disabled": {
      display: "none",
    },
    "& .css-1pe7n21-MuiStepConnector-root": {
      display: "none",
    },
  },
  stepCombo: {
    height: (props) => (props !== 1 ? "100%" : 0),
    "& div": {
      height: (props) => (props !== 1 ? "100%" : 0),
      "& div": {
        height: (props) => (props !== 1 ? "100%" : 0),
        "& div": {
          height: (props) => (props !== 1 ? "100%" : 0),
        },
      },
    },
  },
  stepGrilla: {
    "& .ag-theme-alpine .ag-popup": {
      height: "auto",
      "& div": {
        "& .ag-layout-normal": {
          height: "98%",
        },
        height: "auto",
      },
    },
    height: (props) => (props !== 0 ? "100%" : 0),
    "& div": {
      "& .ag-column-drop-wrapper": {
        height: "auto",
      },
      "& .ag-theme-alpine .ag-row": {
        fontSize: 10,
      },
    },
  },
  table: {
    margin: 0,
    background: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyItems: "center",
    display: "grid",
    gridTemplateColumns: "1fr 20%",
    gridTemplateRows: "15% 70% 15%",
    "-webkit-box-shadow": "-4px 6px 20px 0px rgba(0, 0, 0, 0.49)",
    boxShadow: "-4px 6px 20px 0px rgba(0, 0, 0, 0.49)",
  },
  tableOfData: {
    gridColumn: "1/3",
    gridRow: "2/3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "visible",
    height: "100%",
    width: "97%",
  },
});

const drawerWidth = 15;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    width: "80%",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: "",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth + 2}%`,
    }),
  })
);
