import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "../manegadorRetail/data.css";
import "./moneyMarket.css";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline, IconButton } from "@material-ui/core";
import { ArrowBack, ArrowUpwardRounded } from "@material-ui/icons";
import {
  Stack,
  Button,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  BotonUsuario,
  HeaderComponent,
} from "../manegadorRetail/components/Components";
import Alert from "@mui/material/Alert";
import {
  Categoria,
  CodigoBarra,
  Estado,
  Fabricante,
  Marca,
  Moneda,
  Retail,
  Semana,
  Tienda,
} from "./components";
import { useMemo } from "react";
import { useCallback } from "react";
import { ChargingStationOutlined } from "@mui/icons-material";

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

const AG_GRID_LOCALE_EN = {
 
    rowGroupColumnsEmptyMessage: "Drag here to set row groups aaaaa",

  };
  
var AG_GRID_LOCALE_ZZZ = {};

  // Create a dummy locale based on english but prefix everything with zzz
  Object.keys(AG_GRID_LOCALE_EN).forEach(function (key) {
    if (key === 'rowGroupColumnsEmptyMessage') {
      return AG_GRID_LOCALE_ZZZ[key] = AG_GRID_LOCALE_EN[key];
    }
    AG_GRID_LOCALE_ZZZ[key] = AG_GRID_LOCALE_EN[key];
  });
const tblPreciosSemanales = React.createRef();
export default function MoneyMarket() {
  var token = sessionStorage.getItem("token");
  const [activeStep, setActiveStep] = useState(0);
  const [Carga, setCarga] = useState(false);
  const [dataGrid, setDataGrid] = useState();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    ExcPrcWeek();
  };
  function ExcPrcWeek() {
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
      idRetail: filtros.Retailers,
      idEstados: filtros.Estados,
      idTienda: filtros.Tiendas,
      idTienda: filtros.Tiendas,
      idCategoria: filtros.Categorias,
      idFabricante: filtros.Fabricantes,
      idMarcas: filtros.Marcas,
      idCodBarras: filtros.CodBarras,
      idMoneda: filtros.Monedas,
    });
    let urlReporte;
    switch (filtros.Monedas) {
      case 1:
        urlReporte = "GenerarReporteBolivaresMnyMkt";
        break;
      case 2:
        urlReporte = "GenerarReporteDolaresMnyMkt";
        break;
      default:
        break;
    }
    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + urlReporte,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    localStorage.setItem("UltimaPeticion", bodyContent);
    /* Se comparan las peticiones para evitar pedir la misma data */
    const peticionIgual = localStorage.getItem("UltimaPeticion") === bodyContent;
    switch (peticionIgual) {
      case false:
        axios
        .request(reqOptions)
        .then((response) => {
          if (response.data.message) {
            toast.fire({
              icon: "warning",
              title: "" + response.data.message,
            });
          } else {
            let jsonData = response.data.data;
            setDataGrid(jsonData);
          }
        })
        .catch((error) => {
            toast.fire({
              icon: 'error',
              title: '' + error.response.data.message,
            })
          console.log(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
        break;
    
      default:
        axios
      .request(reqOptions)
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          let jsonData = response.data.data;
          setDataGrid(jsonData);
        }
      })
      .catch((error) => {
          toast.fire({
            icon: 'error',
            title: '' + error.response.data.message,
          })
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
        break;
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const styles = useStyles(activeStep);
  var token = sessionStorage.getItem("token");
  let headersList = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  /* Control Semanas */

  const [dataSemanal, setDataSemanal] = useState([]);
  const PeticionSemanas = async () => {

    if (dataSemanal.length !== 0) {
      setDataSemanal([]);
    }
    setCarga(true)
    await axios
      .get(process.env.REACT_APP_API_ENDPOINT + "ListarSemanasMnyMkt/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
      setCarga(false)

        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setDataSemanal(response.data.data);
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
  console.log(Carga)
  /* Control Retailers */
  const [dataRetail, setDataRetail] = useState([]);
  const PeticionRetailers = async () => {
    if (dataRetail.length !== 0) {
      setDataRetail([]);
    }
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
    });
    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarRetailersMnyMkt/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    setCarga(true)
    await axios
      .request(reqOptions)
      .then((response) => {
        setCarga(true)
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setDataRetail(response.data.data);
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
  console.log(Carga)
  /* Control Estados */
  const [dataEstado, setDataEstado] = useState([]);
  const PeticionEstados = async () => {
    if (dataEstado.length !== 0) {
      setDataEstado([]);
    }
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
      idRetail: filtros.Retailers,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarEstadosMnyMkt/",
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
          setDataEstado(response.data.data);
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
  /* Control Tiendas */
  const [dataTienda, setDataTienda] = useState([]);
  const PeticionTiendas = async () => {
    if (dataTienda.length !== 0) {
      setDataTienda([]);
    }
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
      idRetail: filtros.Retailers,
      idEstados: filtros.Estados,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarTiendasMnyMkt/",
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
          setDataTienda(response.data.data);
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
  /* Control Categoriass */
  const [dataCategoria, setDataCategoria] = useState([]);
  const PeticionCategorias = async () => {
    if (dataCategoria.length !== 0) {
      setDataCategoria([]);
    }
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
      idRetail: filtros.Retailers,
      idEstados: filtros.Estados,
      idTienda: filtros.Tiendas,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarCategoriasMnyMkt/",
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
          setDataCategoria(response.data.data);
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
  /* Control Fabricantes */
  const [dataFabricante, setDataFabricante] = useState([]);
  const PeticionFabricantes = async () => {
    if (dataFabricante.length !== 0) {
      setDataFabricante([]);
    }
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
      idRetail: filtros.Retailers,
      idEstados: filtros.Estados,
      idTienda: filtros.Tiendas,
      idTienda: filtros.Tiendas,
      idCategoria: filtros.Categorias,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarFabricantesMnyMkt/",
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
          setDataFabricante(response.data.data);
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
  /* Control Marcas */
  const [dataMarca, setDataMarca] = useState([]);
  const PeticionMarcas = async () => {
    if (dataMarca.length !== 0) {
      setDataMarca([]);
    }
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
      idRetail: filtros.Retailers,
      idEstados: filtros.Estados,
      idTienda: filtros.Tiendas,
      idTienda: filtros.Tiendas,
      idCategoria: filtros.Categorias,
      idFabricante: filtros.Fabricantes,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarMarcasMnyMkt/",
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
          setDataMarca(response.data.data);
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
  /* Control Codigo de Barras */
  const [dataCodigoBarra, setDataCodigoBarra] = useState([]);
  const PeticionCodigoBarras = async () => {
    if (dataCodigoBarra.length !== 0) {
      setDataCodigoBarra([]);
    }
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
      idRetail: filtros.Retailers,
      idEstados: filtros.Estados,
      idTienda: filtros.Tiendas,
      idTienda: filtros.Tiendas,
      idCategoria: filtros.Categorias,
      idFabricante: filtros.Fabricantes,
      idMarcas: filtros.Marcas,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarCodigoBarrasMnyMkt/",
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
          setDataCodigoBarra(response.data.data);
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

  /* Control de Filtro */
  const [filtros, setFiltros] = useState({
    Semanas: [],
    Retailers: [],
    Estados: [],
    Tiendas: [],
    Categorias: [],
    Marcas: [],
    Fabricantes: [],
    CodBarras: [],
    Monedas: [],
  });
  const handleChangeFiltros = (e) => {
    const { name, value } = e.target;
    switch (value[value.length - 1] === "all") {
      case true:
        switch (name) {
          case "Retailers":
            let todosRetail = [];
            for (let i = 0; i < dataRetail.length; i++) {
              const element = dataRetail[i];
              todosRetail.push(element.id)
            }
            if (filtros.Retailers.length>0) {
              setFiltros({ ...filtros, 'Retailers':[]})
            }else{
              setFiltros({ ...filtros, 'Retailers': todosRetail })
            };
            break;
          case "Estados":
            let todosEstados = [];
            for (let i = 0; i < dataEstado.length; i++) {
              const element = dataEstado[i];
              todosEstados.push(element.id)
            }
            if (filtros.Estados.length>0) {
              setFiltros({ ...filtros, 'Estados':[]})
            }else{
              setFiltros({ ...filtros, 'Estados': todosEstados })
            };
            break;
          case "Tiendas":
            let todosTiendas = [];
            for (let i = 0; i < dataTienda.length; i++) {
              const element = dataTienda[i];
              todosTiendas.push(element.id)
            }
            if (filtros.Tiendas.length>0) {
              setFiltros({ ...filtros, 'Tiendas':[]})
            }else{
              setFiltros({ ...filtros, 'Tiendas': todosTiendas })
            };
            break;
          case "Categorias":
            let todoCategorias = [];
            for (let i = 0; i < dataCategoria.length; i++) {
              const element = dataCategoria[i];
              todoCategorias.push(element.id)
            }
            if (filtros.Categorias.length>0) {
              setFiltros({ ...filtros, 'Categorias':[]})
            }else{
              setFiltros({ ...filtros, 'Categorias': todoCategorias })
            };
            break;
          case "Marcas":
            let todosMarcas = [];
            for (let i = 0; i < dataMarca.length; i++) {
              const element = dataMarca[i];
              todosMarcas.push(element.id)
            }
            if (filtros.Marcas.length>0) {
              setFiltros({ ...filtros, 'Marcas':[]})
            }else{
              setFiltros({ ...filtros, 'Marcas': todosMarcas })
            };
            break;
          case "Fabricantes":
            let todosFabricantes = [];
            for (let i = 0; i < dataFabricante.length; i++) {
              const element = dataFabricante[i];
              todosFabricantes.push(element.id)
            }
            if (filtros.Fabricantes.length>0) {
              setFiltros({ ...filtros, 'Fabricantes':[]})
            }else{
              setFiltros({ ...filtros, 'Fabricantes': todosFabricantes })
            };
            break;
          case "CodBarras":
            let todoCodBarra = [];
            for (let i = 0; i < dataCodigoBarra.length; i++) {
              const element = dataCodigoBarra[i];
              todoCodBarra.push(element.id)
            }
            if (filtros.CodBarras.length>0) {
              setFiltros({ ...filtros, 'CodBarras':[]})
            }else{
              setFiltros({ ...filtros, 'CodBarras': todoCodBarra })
            };
            break;
          default:
            break;
        }
        break;
      default:
        setFiltros({ ...filtros, [name]: value });
        break;
    }
  };


  const [Openfiltros, setOpenfiltros] = useState({
    Semanas: false,
    Retailers: false,
    Estados: false,
    Tiendas: false,
    Categorias: false,
    Marcas: false,
    Fabricantes: false,
    Codigobarras: false,
  });

  const handleOpenFiltros = (name) => {
    setOpenfiltros({ ...Openfiltros, [name]: true });
    switch (name) {
      case "Semanas":
        PeticionSemanas();
        
        break;
      case "Retailers":
        PeticionRetailers();
        break;
      case "Estados":
        PeticionEstados();
        break;
      case "Tiendas":
        PeticionTiendas();
        break;
      case "Categorias":
        PeticionCategorias();
        break;
      case "Marcas":
        PeticionMarcas();
        break;
      case "Fabricantes":
        PeticionFabricantes();
        break;
      case "CodBarras":
        PeticionCodigoBarras();
        break;
      default:
        break;
    }
  };
  const handleCloseFiltros = (name) => {
    setOpenfiltros({ ...Openfiltros, [name]: false });
  };
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
        Debe Selecionar un Reporte
      </Alert>
    </Box>
  );

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
  // const id = openo ? 'simple-popover' : undefined;

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(panel);
    console.log(panel);
  };
  let TituloSemana = [];
  for (let i = 0; i < dataSemanal.length; i++) {
    const element = dataSemanal[i];
    console.log(filtros.Semanas.lastIndexOf(element.id));
    if (filtros.Semanas.lastIndexOf(element.id) > -1) {
      TituloSemana.push(element.nombre);
    }
  }

  const columns = [
    { headerName: "Retail", field: "Retail", cellStyle: { textAlign: "left", minWidth:100 }, pinned: 'left' },
    { headerName: "Tienda", field: "Tienda", cellStyle: { textAlign: "left", minWidth:100 }, pinned: 'left' },
    {
      headerName: "Barra",
      field: "CodigoBarra",
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Categoría",
      field: "Categoria",
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Producto",
      field: "Producto",
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Tamaño",
      field: "Tamano",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Mínimo",
      field: "Minimo",
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Máximo",
      field: "Maximo",
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Promedio",
      field: "Promedio",
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: `${TituloSemana[0]}`,
      field: `${filtros.Semanas[0]}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      hide: `${filtros.Semanas[0] ? false : true}`,
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(2);
        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
    {
      headerName: `${TituloSemana[1]}`,
      field: `${filtros.Semanas[1]}`,
      hide: `${filtros.Semanas[1] ? false : true}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(
          2
        );

        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
    {
      headerName: `${TituloSemana[2]}`,
      field: `${filtros.Semanas[2]}`,
      hide: `${filtros.Semanas[2] ? false : true}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(
          2
        );
        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
    {
      headerName: `${TituloSemana[3]}`,
      field: `${filtros.Semanas[3]}`,
      hide: `${filtros.Semanas[3] ? false : true}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(
          2
        );
        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
    {
      headerName: `${TituloSemana[4]}`,
      field: `${filtros.Semanas[4]}`,
      hide: `${filtros.Semanas[4] ? false : true}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(
          2
        );
        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
    {
      headerName: `${TituloSemana[5]}`,
      field: `${filtros.Semanas[5]}`,
      hide: `${filtros.Semanas[5] ? false : true}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(
          2
        );
        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
    {
      headerName: `${TituloSemana[6]}`,
      field: `${filtros.Semanas[6]}`,
      hide: `${filtros.Semanas[6] ? false : true}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(
          2
        );
        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
    {
      headerName: `${TituloSemana[7]}`,
      field: `${filtros.Semanas[7]}`,
      hide: `${filtros.Semanas[7] ? false : true}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(
          2
        );
        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
    {
      headerName: `${TituloSemana[8]}`,
      field: `${filtros.Semanas[8]}`,
      hide: `${filtros.Semanas[8] ? false : true}`,
      cellRenderer: (params) => {
        if (params.value !== null) {
          return parseFloat(params.value).toFixed(2);
        }
        return "--";
      },
      cellStyle: (params) => {
        const valor = (((params.value + Number.EPSILON) * 100) / 100).toFixed(
          2
        );
        if (valor < params.data.Promedio) {
          if (params.value === 0 || params.value === null) {
            return { textAlign: "right", background: "transparent" };
          }
          return { textAlign: "right", color: "#fff", background: "#067BC2" };
        } else if (valor > params.data.Promedio) {
          return { textAlign: "right", color: "#fff", background: "#E85F5C" };
        } else {
          return { textAlign: "right", background: "#transparent" };
        }
      },
    },
  ];
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      enableRowGroup: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      showRowGroup: false,
      enablePivot: true,
      enableValue: true,
    };
  }, []);
  const getLocaleText = useCallback((params) => {
    switch (params.key) {
      case 'rowGroupColumnsEmptyMessage':
        return 'Arrastre aquí para agrupar.';
      case 'loadingOoo':
        return 'Cargando...';
      case 'noRowsToShow':
        return 'Cargando...';
        case 'autosizeThiscolumn':
          return 'Autodimennsionar esta columna';  
        case 'autosizeAllColumns':
          return 'Autodimennsionar todas las columnas'; 
      default:
        if (params.defaultValue) {
          // the &lrm; marker should not be made uppercase
          const val = params.defaultValue.split('&lrm;');
          const newVal = val[0].toUpperCase();
          if (val.length > 1) {
            return `${newVal}&lrm;`;
          }
          return newVal;
        }
        return '';
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <BotonUsuario handleDrawerOpen={handleDrawerOpen} open={open} />

      {/* <DrawerComponent
        open={open}
        openo={openo}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleDrawerClose={handleDrawerClose}
        handleClose={handleClose}
      >
        
      </DrawerComponent> */}
      <Main open={open}>
        <div className={styles.Contenedordata}>
        
          <section className={styles.containerOfTable}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={styles.stepper}
            >
              <Step className={styles.stepCombo}>
                <StepContent
                  sx={{
                    "& div": { height: "100% !important", overflow: "visible" },
                  }}
                >
                  <section className={styles.table}>
                    <HeaderComponent />
                    <article className={styles.tableOfData}>
                      <Semana
                        data={dataSemanal}
                        value={filtros.Semanas}
                        openFiltro={Openfiltros.Semanas}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                      />
                      <Retail
                        data={dataRetail}
                        value={filtros.Retailers}
                        openFiltro={Openfiltros.Retailers}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                      />
                      <Estado
                        data={dataEstado}
                        value={filtros.Estados}
                        openFiltro={Openfiltros.Estados}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                      />
                      <Tienda
                        data={dataTienda}
                        value={filtros.Tiendas}
                        openFiltro={Openfiltros.Tiendas}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                      />
                      <Categoria
                        data={dataCategoria}
                        value={filtros.Categorias}
                        openFiltro={Openfiltros.Categorias}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                      />
                      <Fabricante
                        data={dataFabricante}
                        value={filtros.Fabricantes}
                        openFiltro={Openfiltros.Fabricantes}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                      />
                      <Marca
                        data={dataMarca}
                        value={filtros.Marcas}
                        openFiltro={Openfiltros.Marcas}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                      />
                      <CodigoBarra
                        data={dataCodigoBarra}
                        value={filtros.CodBarras}
                        openFiltro={Openfiltros.Codigobarras}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                      />
                      <Moneda
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        value={filtros.Monedas}
                      />
                    </article>
                    <Stack direction="row" className={styles.stack}>
                      <button
                        id="save"
                        style={{ width: "35%" }}
                        variant="contained"
                      >
                        Guardar
                      </button>
                      <button
                        id="process"
                        style={{ width: "35%" }}
                        variant="contained"
                        onClick={handleNext}
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
                      <div
                        className="ag-theme-alpine"
                        style={{ height: "100%" }}
                      >
                        <AgGridReact
                          defaultColDef={defaultColDef}
                          columnDefs={columns}
                          rowData={dataGrid}
                          enableCharts={false}
                          alwaysShowHorizontalScroll={true}
                          alwaysShowVerticalScroll={true}
                          rowGroupPanelShow={"always"}
                          groupDisplayType={"groupRows"}
                          autoGroupColumnDef={true}
                          animateRows={true}
                          enableRangeSelection={true}
                          enableRangeHandle={true}
                          enableFillHandle={true}
                          domLayout="normal"
                          getLocaleText={getLocaleText}
                          // pagination={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "100%", height: "100%" }}>
                    <div
                      id="tblPreciosSemanales"
                      ref={tblPreciosSemanales}
                      style={{ width: "100%", height: "100%" }}
                    ></div>
                  </div>
                </StepContent>
              </Step>
            </Stepper>
          </section>
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
        onClick={() => (window.location = "/retailservices/home")}
      >
        <ArrowBack style={{ fontSize: "2.5em", fill: "#fff" }}></ArrowBack>
      </Button>
    </Box>
  );
}

const useStyles = makeStyles({
  Contenedordata: {
    display: "flex",
    flexDirection: "row-reverse",
    width: "100%",
    height: "100%",
  },
  stepper: {
    height: "100vh",
    "& div div": {
      margin: 0,
      padding: 0,
      border: 0,
      height: "100%",
    },

    "& .Mui-disabled": {
      display: "none",
    },
    "& .css-1pe7n21-MuiStepConnector-root": {
      display: "none",
    },
  },
  stepCombo: {
    height: (props) => (props !== 1 ? "50%" : 0),
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
    height: (props) => (props !== 0 ? "100%" : "50%"),
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
    gridTemplateRows: "35% 55% 10%",
    "-webkit-box-shadow": "-4px 6px 20px 0px rgba(0, 0, 0, 0.49)",
    boxShadow: "-4px 6px 20px 0px rgba(0, 0, 0, 0.49)",
  },
  tableOfData: {
    gridColumn: "1/3",
    gridRow: "2/3",
    display: "grid",
    gridGap: "10% 0%",
    justifyItems: "center",
    gridTemplateColumns: "repeat(auto-fill, minmax(75px, 20%))",
    overflow: "visible",
    height: "60%",
    width: "95%",
  },
  stack: {
    position: "relative",
    left: "50%",
    width: "30%",
    justifyContent: "space-around",
    maxHeight: 40,
    height: "5% !important",
  },
  element: {
    width: "95%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    width: "90%",
  },
  inputLabel: {
    background: "rgb(247, 244, 244)",
    width: "auto",
    fontSize: "10px !Important",
  },
  "@media screen and (min-width: 992px)": {
    containerOfTable: {
      background: "#fff",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyItems: "center",
      borderTopLeftRadius: "1.5em",
      borderBottomLeftRadius: "1.5em",

      boxShadow: "-4px 6px 20px 0px rgb(0 0 0 / 49%)",
    },
  },
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
  },
  inputMaterial: {
    width: "95%",
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
    width: "30%",
    justifyContent: "space-around",
    height: "100%",
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
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth + 2}%`,
    }),
  })
);
