import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './listarUsuarios.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, TextField} from '@material-ui/core';
import { Stack, Tooltip } from '@mui/material';
import { Edit , Delete, Check, Close, ErrorOutline} from '@material-ui/icons';
import { DataGrid, GridToolbarDensitySelector,GridToolbarFilterButton,GridToolbarContainer, GridToolbarExportContainer, GridToolbarExport} from '@mui/x-data-grid';
import { writeXLSX, writeFile } from 'xlsx';
import * as XLSX from 'xlsx/xlsx.mjs';


//* Componentes de Estilos *//
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '35%',
    height: '35%%',
    padding:'2%',
    border: '1.3px solid #000',
    background: '#ffefd5',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1em'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '95%'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

//* Funcion Pricipal del Componente*//
function ListarUsuarios() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    nombres: '',
    apellidos:'',
    correo: '',
    usuario: '',
    id_usuario:'',
    id_perfil:'',
    Ind_Us_Activo:'',
    id_cliente:'',
    clave:''
  })
  const [consolaDelete, setConsolaDelete]=useState({
    usuario: '',
    id_usuario:'',
  })
/* Funcion para el cambio de valores en tabla*/
  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
  }
/*Petición a la API LISTAR USUARIOS*/
  var token=localStorage.getItem('token');
  const MySwal = withReactContent(Swal)
  const toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  const peticionGet=async()=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarUsuarios',{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response=>{
      setData(response.data.data);
      console.log(response.data.data)
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers); 
      toast.fire({
        icon: 'error',
        title: ''+error.response.data.message+'',
        confirmButtonText: `Ok`,
      }) 
    })
  }
  /*Muestra los usuarios por ID*/
  const peticionGetID=async(ID)=>{
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarUsuariosId/'+ID,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response=>{
      setConsolaSeleccionada(response.data.data[0]);
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers); 
      toast.fire({
        icon: 'error',
        title: ''+error.response.data.message+'',
        confirmButtonText: `Ok`,
      }) 
    })
  }
/*Petición POST a la API UPDATE USUARIOS para cumplir la funcion de actualizar*/
  var datosEnviar={
    Id_Cliente:consolaSeleccionada.id_cliente,
    id_usuario:consolaSeleccionada.id_usuario,
    Ind_Activo:1,
    usuario:consolaSeleccionada.correo,
    correo:consolaSeleccionada.correo, 
    nombres:consolaSeleccionada.nombres,
    apellidos:consolaSeleccionada.apellidos,
    id_perfil:consolaSeleccionada.id_perfil,    
  } 
  const peticionPost=()=>{
    axios.post(process.env.REACT_APP_API_ENDPOINT+'UpdateUsuarios',datosEnviar,{
      headers: {'Authorization': `Bearer ${token}`}
    })
    .then(response=>{
      abrirCerrarModalEditar()
      toast.fire({
        icon: 'success',
        title: ''+response.data.message+'',
        confirmButtonText: `Ok`,
      })
      setTimeout(() => {window.location.href = '/management/panel/createUser'}, 2000);
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers); 
      toast.fire({
        icon: 'error',
        title: ''+error.response.data.message+'',
        confirmButtonText: `Ok`,
      }) 
    })
  }
/*Petición POST a la API INACTIVAR USUARIOS para cumplir la funcion de "Eliminar"*/
  const peticionDelete=async()=>{
    const ID = consolaDelete.id_usuario
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'InactivarUsuario/'+ID)
    .then(response=>{
      abrirCerrarModalEliminar();
      toast.fire({
        icon: 'success',
        title: ''+response.data.message+'',
        confirmButtonText: `Ok`,
      })  
      setTimeout(() => {window.location.href = '/management/panel/createUser'}, 11000);
    }).catch(error=>{
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers); 
      toast.fire({
        icon: 'error',
        title: ''+error.response.data.message+'',
        confirmButtonText: `Ok`,
      }) 
    })
  }

  const seleccionarConsola=(caso)=>{
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }
  const seleccionarDelete=(thisRow,caso)=>{
    setConsolaDelete(thisRow);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  useEffect(async()=>{
    await peticionGet();
  },[])
  /*Función Select*/

  const alertTohandleChange =(e)=>{
    Swal.fire(
      {icon: 'warning',
      title: 'El campo Usuario debe contener el mismo valor del campo Correo Electrónico',
      confirmButtonText: 'Entendido',
    })
  }
/*Cuerpo del Modal de Edición*/
  const bodyEditar=(
    <div style={{width:'40%'}} className={styles.modal}>
      <h3 style={{textAlign:'center'}}>Editar Datos de Usuario</h3>
      <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around'}} className='agruparEdit'>
        <div style={{width:'40%'}} className='grupoEdit'>
        <TextField name="id_usuario" className={styles.inputMaterial} type='number' label="ID Usuario" onChange={handleChange}  value={consolaSeleccionada && consolaSeleccionada.id_usuario}/>
        <br />
        <TextField name="usuario" className={styles.inputMaterial} label="Usuario" onClick={alertTohandleChange} onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo}/>
        <br />
        <TextField name="nombres" className={styles.inputMaterial} label="Nombres" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombres}/>
        <br />
        <TextField name="apellidos" className={styles.inputMaterial} label="Apellidos" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellidos}/>
        <br />
        <TextField name="correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo}/>
        <br /><br />
        </div>
        <div style={{width:'40%'}} className='grupoEdit'>
        <TextField name="id_perfil" className={styles.inputMaterial} type='number' label="ID Perfil" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.id_perfil}/>
        <br />
        <br />
        <br />
        <TextField name="id_cliente" className={styles.inputMaterial} type='number' label="ID Cliente"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.id_cliente}/>
        <br />
      
      <div align="bottom">
        <Button color="primary" onClick={()=>peticionPost()}>Guardar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
        </div>
      </div>
    </div>  
  )
/*Cuerpo del Modal de Borrado*/
  const bodyEliminar=(
    <div style={{alignItems:'center',textAlign:'center', display:'flex', justifyContent:'space-around', flexDirection:'column',height:'35%'}} className={styles.modal}>
      <ErrorOutline style={{ fontSize: '7.5em'}}></ErrorOutline>
      <p>¿Estás seguro que deseas eliminar al Usuario: <b>{consolaDelete && consolaDelete.usuario}</b>?</p>
      <Stack direction="row" spacing={2} style={{justifyContent:'flex-end'}} >
        <Button id={consolaDelete.id_usuario} variant="contained" color="secondary" onClick={()=>peticionDelete(consolaDelete.id_usuario)}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()} variant="contained" color="primary">No</Button>
      </Stack>
    </div>
  )
/*Funcion Descargar => Descarga Ordenando por Filas y Columnas*/  
  const downloadexcel=()=>{
    const newData=data.map(rows=>{
       delete rows.tableData
       return rows
    })
    const worksheet=XLSX.utils.json_to_sheet(newData)
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, worksheet, "Usuarios")
    //Binary string//
    writeXLSX(workBook, {bookType:"xlsx", type: "binary"})
    //Download
    writeFile(workBook, "UserData.xlsx")
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{marginTop:'1.2%'}}>
        <GridToolbarDensitySelector/>
        <GridToolbarExportContainer>
          <button style={{curso:'pointer'}} onClick={()=>downloadexcel()}>Descargar Excel</button>
        </GridToolbarExportContainer>
      </GridToolbarContainer>
    );
  }

  const colums = [
    { field: 'id_usuario', headerName: 'ID Usuario',headerAlign:'center',align: 'center'},
    { field: 'usuario', headerName: 'Usuario',headerAlign:'center',align: 'center'},
    { field: 'nombres', headerName: 'Nombres',headerAlign:'center',align: 'center'},
    { field: 'apellidos', headerName: 'Apellidos',headerAlign:'center',align: 'center'},
    { field: 'correo', headerName: 'Correo',headerAlign:'center',align: 'center'},
    { field: 'fecha_creacion',
      headerName: 'Fecha  de Creación',
      headerAlign:'center',
      align: 'center',
    },
    { field: 'Ind_Us_Activo',
      headerName: 'Usuario Confirmado',
      headerAlign:'center',
      align:'center',
      sortable: false,
      renderCell: (params) => {
        var api = params.api;
        var thisRow = {};
        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
            if (thisRow.Ind_Us_Activo === true) {
              return<Check></Check>
            }else{
              return<Close></Close>
            }
      }     
    },
    { field: 'Ind_Activo',
      headerName: 'Usuario Activo',
      headerAlign:'center',
      align:'center',
      sortable: false,
      renderCell: (params) => {
        var api = params.api;
        var thisRow = {};
          api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
            if (thisRow.Ind_Activo === true) {
              return<Check></Check>
            }else{
              return<Close></Close>
            }
      }
    },
    { field: 'Acciones',
      headerName: 'Acciones',
      headerAlign:'center',
      sortable: false,
      align:'center',
      renderCell: (params) => {
        return[
        <Tooltip title="Editar" arrow placement="bottom">
          <Edit style={{cursor:'pointer'}} onClick={()=>{
            var ID = params.id
              seleccionarConsola('Editar')
              peticionGetID(ID)
          }}/> 
        </Tooltip>
        ,
        <Tooltip title="Eliminar" arrow placement="bottom">
          <Delete style={{cursor:'pointer'}} onClick={()=>{ 
            var api = params.api;
            var thisRow = {};
            api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
            console.log(thisRow)
            seleccionarDelete(thisRow, 'Eliminar')             
          }}/>
        </Tooltip>
        
        ]
      },
    },
  ]

  return (
    <div className="App">
      <div style={{ display:'flex', maxHeight:'1200px', minHeight:'300px', height:'100%',width:'100%'}}>
        <div style={{flexGrow:1}}>
          <DataGrid
            columns={colums}
            rows={data}
            getRowId={(row) => row.id_usuario}
            components={{Toolbar: CustomToolbar,}}
          ></DataGrid>
        </div>
      </div>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
        >{bodyEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
        >{bodyEliminar}
      </Modal>
    </div>
  );
}
export default ListarUsuarios;

