import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "../manegadorRetail/data.css";
import "./moneyMarket.css";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline} from "@material-ui/core";
import { ArrowBack, ArrowUpwardRounded } from "@material-ui/icons";
import {IconButton,Stack,Button,Stepper,Step,StepContent,StepLabel,Tooltip,Drawer,Chip,Avatar, Divider} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {BotonUsuario,HeaderComponent} from "../manegadorRetail/components/Components";
import {Categoria,CodigoBarra,Estado,Fabricante,Marca,MenuAtenas,Moneda,Retail,Selecciones,Semana,Tienda,} from "./components";
import { useMemo } from "react";
import { useCallback } from "react";

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
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-evenly',
  width: '100%'
}));
const tblPreciosSemanales = React.createRef();

export default function Wop() {
  
  var token = sessionStorage.getItem("token");
  var idCliente = sessionStorage.getItem("Id_Cliente");
  var idPerfil = sessionStorage.getItem("ID_Perfil");
  let headersList = {Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const [activeStep, setActiveStep] = useState(0);
  const styles = useStyles(activeStep);
  const [dataGrid, setDataGrid] = useState();
  /* Stack botones. Guardar. Procesar. Volver*/
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
      idCategoria: filtros.Categorias,
      idFabricante: filtros.Fabricantes,
      idMarcas: filtros.Marcas,
      idCodBarras: filtros.CodBarras,
      idMoneda: filtros.Monedas,
    });
    console.log(filtros, bodyContent)
    let urlReporte;
    switch (filtros.Monedas[0]) {
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
    const peticionIgual =
      localStorage.getItem("UltimaPeticion") === bodyContent;
    switch (peticionIgual) {
      case false:
        axios
          .request(reqOptions)
          .then((response) => {
            console.log(response)
            if (response.data.message) {
              console.log(response.data.message,)
              toast.fire({
                icon: "warning",
                title: "" + response.data.message,
              });
            } else {
              let jsonData = response.data.data;
              setDataGrid(jsonData);
              console.log(jsonData);
            }
          })
          .catch((error) => {
            console.log(error)
            toast.fire({
              icon: "error",
              title: "" + error.response.data.message,
            });
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
              getLocaleText({respuesta:response.data.message})
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
              icon: "error",
              title: "" + error.response.data.message,
            });
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
        let bodyContent = JSON.stringify({
          idCliente: idCliente,
          idPerfil: idPerfil,
          NombreFiltro: nombreFiltro,
          idSemana: filtros.Semanas,
          idRetail: filtros.Retailers,
          idEstado: filtros.Estados,
          idTienda: filtros.Tiendas,
          idCategoria: filtros.Categorias,
          idFabricante: filtros.Fabricantes,
          idMarcas: filtros.Marcas,
          idCodBarras: filtros.CodBarras,
          idMoneda: filtros.Monedas,
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
  
  /* Control Semanas */

  const [dataSemanal, setDataSemanal] = useState([]);
  const PeticionSemanas = async () => {
    if (dataSemanal.length !== 0) {
      setDataSemanal([]);
    }
    setDisbaled({ ...disbaled, Retail: true });
    await axios
      .get(process.env.REACT_APP_API_ENDPOINT + "ListarSemanasMnyMkt/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.message) {
          toast.fire({
            icon: "warning",
            title: "" + response.data.message,
          });
        } else {
          setDataSemanal(response.data.data);
          setDisbaled({ ...disbaled, Retail: false });
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
  /* Control Retailers */
  const [dataRetail, setDataRetail] = useState([]);
  const PeticionRetailers = async () => {
    if (dataRetail.length !== 0) {
      setDataRetail([]);
    }
    let bodyContent = JSON.stringify({
      idSemana: filtros.Semanas,
    });
    console.log(bodyContent)
    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarRetailersMnyMkt/",
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
    console.log(bodyContent)

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
    console.log(bodyContent)

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
    console.log(bodyContent)

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
      idCategoria: filtros.Categorias,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarFabricantesMnyMkt/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    console.log(bodyContent)

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
      idCategoria: filtros.Categorias,
      idFabricante: filtros.Fabricantes,
    });

    let reqOptions = {
      url: process.env.REACT_APP_API_ENDPOINT + "ListarMarcasMnyMkt/",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    console.log(bodyContent)

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
    console.log(bodyContent)

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
    Monedas: 2,
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
              todosRetail.push(element.id);
            }
            if (filtros.Retailers.length > 0) {
              setFiltros({ ...filtros, Retailers: [] });
            } else {
              setFiltros({ ...filtros, Retailers: todosRetail });
            }
            break;
          case "Estados":
            let todosEstados = [];
            for (let i = 0; i < dataEstado.length; i++) {
              const element = dataEstado[i];
              todosEstados.push(element.id);
            }
            if (filtros.Estados.length > 0) {
              setFiltros({ ...filtros, Estados: [] });
            } else {
              setFiltros({ ...filtros, Estados: todosEstados });
            }
            break;
          case "Tiendas":
            let todosTiendas = [];
            for (let i = 0; i < dataTienda.length; i++) {
              const element = dataTienda[i];
              todosTiendas.push(element.id);
            }
            if (filtros.Tiendas.length > 0) {
              setFiltros({ ...filtros, Tiendas: [] });
            } else {
              setFiltros({ ...filtros, Tiendas: todosTiendas });
            }
            break;
          case "Categorias":
            let todoCategorias = [];
            for (let i = 0; i < dataCategoria.length; i++) {
              const element = dataCategoria[i];
              todoCategorias.push(element.id);
            }
            if (filtros.Categorias.length > 0) {
              setFiltros({ ...filtros, Categorias: [] });
            } else {
              setFiltros({ ...filtros, Categorias: todoCategorias });
            }
            break;
          case "Marcas":
            let todosMarcas = [];
            for (let i = 0; i < dataMarca.length; i++) {
              const element = dataMarca[i];
              todosMarcas.push(element.id);
            }
            if (filtros.Marcas.length > 0) {
              setFiltros({ ...filtros, Marcas: [] });
            } else {
              setFiltros({ ...filtros, Marcas: todosMarcas });
            }
            break;
          case "Fabricantes":
            let todosFabricantes = [];
            for (let i = 0; i < dataFabricante.length; i++) {
              const element = dataFabricante[i];
              todosFabricantes.push(element.id);
            }
            if (filtros.Fabricantes.length > 0) {
              setFiltros({ ...filtros, Fabricantes: [] });
            } else {
              setFiltros({ ...filtros, Fabricantes: todosFabricantes });
            }
            break;
          case "CodBarras":
            let todoCodBarra = [];
            for (let i = 0; i < dataCodigoBarra.length; i++) {
              const element = dataCodigoBarra[i];
              todoCodBarra.push(element.id);
            }
            if (filtros.CodBarras.length > 0) {
              setFiltros({ ...filtros, CodBarras: [] });
            } else {
              setFiltros({ ...filtros, CodBarras: todoCodBarra });
            }
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
    CodBarras: false,
  });
  const [disbaled, setDisbaled] = useState({
    Semanas: false,
    Retailers: false,
    Estados: false,
    Tiendas: false,
    Categorias: false,
    Marcas: false,
    Fabricantes: false,
    Codigobarras: false,
  });
  let {Retailers,Estados,Tiendas,Categorias,Fabricantes,Marcas,CodBarras,} = filtros;
  const handleOpenFiltros = (name) => {console.log(filtros)
    setOpenfiltros({ ...Openfiltros, [name]: true });
    switch (name) {
      case "Semanas":
        PeticionSemanas();
        if (Retailers.length > 0) {
          setFiltros({
            ...filtros,
            Retailers: [],
            Estados: [],
            Tiendas: [],
            Categorias: [],
            Marcas: [],
            Fabricantes: [],
            CodBarras: [],
          });
        }
        break;
      case "Retailers":
        PeticionRetailers();
        if (Estados.length > 0) {
          setFiltros({
            ...filtros,
            Estados: [],
            Tiendas: [],
            Categorias: [],
            Marcas: [],
            Fabricantes: [],
            CodBarras: [],
          });
        }
        break;
      case "Estados":
        PeticionEstados();
        if (Tiendas.length > 0) {
          setFiltros({
            ...filtros,
            Tiendas: [],
            Categorias: [],
            Marcas: [],
            Fabricantes: [],
            CodBarras: [],
          });
        }
        break;
      case "Tiendas":
        PeticionTiendas();
        if (Categorias.length > 0) {
          setFiltros({
            ...filtros,
            Categorias: [],
            Marcas: [],
            Fabricantes: [],
            CodBarras: [],
          });
        }
        break;
      case "Categorias":
        PeticionCategorias();
        if (Fabricantes.length > 0) {
          setFiltros({
            ...filtros,
            Marcas: [],
            Fabricantes: [],
            CodBarras: [],
          });
        }
        break;
      case "Fabricantes":
        PeticionFabricantes();
        if (Marcas.length > 0) {
          setFiltros({
            ...filtros,
            Marcas: [],
            CodBarras: [],
          });
        }
        break;
      case "Marcas":
        PeticionMarcas();
        if (CodBarras.length > 0) {
          setFiltros({
            ...filtros,
            CodBarras: [],
          });
        }
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
  
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  /*Elementos de Control Menu Desplegable*/
    const [selecciones, setSelecciones]=useState([])
    const peticionSelecciones = async () => {
      let bodyContent = JSON.stringify({
        idCliente:sessionStorage.getItem('Id_Cliente')
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
    const ValueFiltros =(params)=>{
      let ValSemana = params.Id_Semana.split(',').map(Number)
      let ValRetail = params.Id_Retail.split(',').map(Number)
      let ValEstado = params.Id_Estado.split(',').map(Number)
      let ValTienda = params.Id_Tienda.split(',').map(Number)
      let ValCategoria = params.Id_Categoria.split(',').map(Number)
      let ValMarca = params.Id_Marca.split(',').map(Number)
      let ValFabricante = params.Id_Fabricante.split(',').map(Number)
      let ValCodigoBarra = params.CodigoBarra.split(',').map(Number)
      setFiltros({
        ...filtros,
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
  let TituloSemana = [];
  for (let i = 0; i < dataSemanal.length; i++) {
    const element = dataSemanal[i];
    if (filtros.Semanas.lastIndexOf(element.id) > -1) {
      TituloSemana.push(element.nombre);
    }
  }
  const columns = [
    {
      headerName: "Retail",
      field: "Retail",
      cellStyle: { textAlign: "left", minWidth: 100 },
      pinned: "left",
    },
    {
      headerName: "Tienda",
      field: "Tienda",
      cellStyle: { textAlign: "left", minWidth: 100 },
      pinned: "left",
    },
    {
      headerName: "Categoría",
      field: "Categoria",
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Fabricante",
      field: "Fabricante",
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Marca",
      field: "Marca",
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Barra",
      field: "CodigoBarra",
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
      cellStyle: { textAlign: "left" },
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
    console.log(params.respuesta)
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
            width: '0%',
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
          <DrawerHeader>
            <Stack style={{ width: '70%', height: '100%', justifyContent: 'center' }}>
              <Tooltip title={sessionStorage.getItem('Retail')} arrow placement="right" style={{ minHeight: 36 }}>
                <Chip avatar={<Avatar style={{ minHeight: 30, maxHeight: 50, minWidth: 30, maxWidth: 50 }}>R</Avatar>}
                  label={sessionStorage.getItem('Retail')}  variant="outlined"></Chip>
              </Tooltip>
            </Stack>
            <IconButton style={{ margin: '0', padding: '0', background: '#F6B232', borderRadius: '.3em', width: '12%', height: '50%', minHeight: 40, minWidth: 40 }} onClick={handleDrawerClose}>
              <MenuIcon style={{ fontSize: '35px', fill: '#fff', width: 'auto', height: 'auto', }} />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Selecciones
            ValueFiltros={ValueFiltros}
            handleChange={handleChangeExpanded}
            expanded={expanded}
            data={selecciones}
            handleDelete={handleDeleteFiltros}
            peticionSelecciones={peticionSelecciones}
          />
          <Divider />
          {/* <MenuAtenas/> */}
      </Drawer>
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
                        disabled={Openfiltros}
                      />
                      <Retail
                        data={dataRetail}
                        value={filtros.Retailers}
                        openFiltro={Openfiltros.Retailers}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        disabled={Openfiltros}
                      />
                      <Estado
                        data={dataEstado}
                        value={filtros.Estados}
                        openFiltro={Openfiltros.Estados}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        disabled={Openfiltros}
                      />
                      <Tienda
                        data={dataTienda}
                        value={filtros.Tiendas}
                        openFiltro={Openfiltros.Tiendas}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        disabled={Openfiltros}
                      />
                      <Categoria
                        data={dataCategoria}
                        value={filtros.Categorias}
                        openFiltro={Openfiltros.Categorias}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        disabled={Openfiltros}
                      />
                      <Fabricante
                        data={dataFabricante}
                        value={filtros.Fabricantes}
                        openFiltro={Openfiltros.Fabricantes}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        disabled={Openfiltros}
                      />
                      <Marca
                        data={dataMarca}
                        value={filtros.Marcas}
                        openFiltro={Openfiltros.Marcas}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        disabled={Openfiltros}
                      />
                      <CodigoBarra
                        data={dataCodigoBarra}
                        value={filtros.CodBarras}
                        openFiltro={Openfiltros.CodBarras}
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        disabled={Openfiltros}
                      />
                      <Moneda
                        handleChangeValue={handleChangeFiltros}
                        handleOpen={handleOpenFiltros}
                        handleClose={handleCloseFiltros}
                        disabled={Openfiltros}
                        value={filtros.Monedas}
                      />

                    </article>
                    <Stack direction="row" className={styles.stack}>
                      <button
                        id="save"
                        style={{ width: "35%" }}
                        variant="contained"
                        onClick={handleFiltros}
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
                          excludeChildrenWhenTreeDataFiltering={true}
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
        href="/retailservices/home"
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
