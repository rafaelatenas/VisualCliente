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
import {DrawerComponent, BotonUsuario, CardComponents, HeaderComponent} from '../componentes_data/Components';
import { SelectCanales, SelectCategorias, SelectFabricantes, SelectMarcas, SelectPeriodos, SelectRegiones } from '../componentes_data/Selects';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';


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
  var token=localStorage.getItem('token');

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
    const [tiempoReporte, settiempoReporte] = React.useState([]);
    const seleccionarPeriodo=(parametro)=>{
      settiempoReporte(parametro)
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

  /*Data Categorias*/
    const [Categoria, setCategoria]=useState([]);
    const [selectedOptions4, setSelectedOptions4] = useState([]);

  /*Data Fabricantes*/
    const [Fabricante, setFabricante]=useState([]);
    const [selectedOptions5, setSelectedOptions5] = useState([]);

  /*Data Marcas*/
    const [Marcas, setMarcas]=useState([]);
    const [selectedOptions6, setSelectedOptions6] = useState([]);

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
      peticionCategorias()
      if(selectedOptions4.length>=1){
        setSelectedOptions4([]); setSelectedOptions5([]); setSelectedOptions6([])
      }
    };
    const handleCloseRegion = () => {
      setOpenRegiones(false);
      setShowMenuItem({categoria:true})
    };

       /*Funcion onChange del combo SubRegiones */
      const [SubRegion, setSubRegion]= React.useState([])
      const peticionSubRegiones=async(value)=>{
      await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarSubRegion/'+value,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response=>{
        setSubRegion(response.data.data);
        console.log(response.data)
        console.log(response.data.data)
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

    
  /*Funciones de Listar Categoria 😄*/
    const [openCategoria, setOpenCategoria] = React.useState(false);
    const handleCategoria = (event) => {
      const value =event.target.value;
      if (value[value.length - 1] === "all") {
        setSelectedOptions4(selectedOptions4.length === Categoria.length ? [] : Categoria);
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
        setCategoria(response.data.data);
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
        if(selectedOptions5.length>=1){
          peticionMarcas();
        }
    }
    const handleOpenFabricante = () => {
      setOpenFabricante(true);
      if(selectedOptions6.length>=1){
        setSelectedOptions6([])
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
      setSelectedOptions6(value);
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
    console.log(render)
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
    console.log(isAllSelectPeriodo)
    const isAllSelectCategoria = Categoria.length > 0 && selectedOptions4.length === Categoria.length;
  console.log(chipData)
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
        peticionSemanas={peticionSemanas}
        botonreporte={botonreporte}
        seleccionarPeriodo={seleccionarPeriodo}
        DeletePeriodo={DeletePeriodo}
        peticionMeses={peticionMeses}
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
                  tiempoReporte={tiempoReporte}
                  selectedOptions1={selectedOptions1}
                  isSelected={isSelected}
                  openPeriodo={openPeriodo}
                  handlePeriodos={handlePeriodos}
                  handleClosePeriodo={handleClosePeriodo}
                  handleOpenPeriodo={handleOpenPeriodo}
                  data={data}
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
                  region={region}
                />
                <SelectCategorias
                  selectedOptions4={selectedOptions4}
                  isSelected={isSelected}
                  openCategoria={openCategoria}
                  handleCategoria={handleCategoria}
                  handleCloseCategoria={handleCloseCategoria}
                  handleOpenCategoria={handleOpenCategoria}
                  categoria={Categoria}
                  isAllSelectCategoria={isAllSelectCategoria}
                  showMenuItem={showMenuItem}
                  setIDCategoria={setIDCategoria}
                />
                <SelectFabricantes
                  Fabricante={Fabricante}
                  selectedOptions5={selectedOptions5}
                  openFabricante={openFabricante}
                  handleFabricante={handleFabricante}
                  handleCloseFabricante={handleCloseFabricante}
                  handleOpenFabricante={handleOpenFabricante}
                  setIDFabricante={setIDFabricante}
                  isSelected={isSelected}
                />
                <SelectMarcas
                  Marcas={Marcas}
                  isSelected={isSelected}
                  selectedOptions6={selectedOptions6}
                  openMarcas={openMarcas}
                  handleMarcas={handleMarcas}
                  handleCloseMarcas={handleCloseMarcas}
                  handleOpenMarcas={handleOpenMarcas}
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
         variant="contained" href='./Home'>
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