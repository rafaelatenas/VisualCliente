import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../usuario/listarUsuarios.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, TextField} from '@material-ui/core';
import { Edit , Delete, Check, Close, ErrorOutline} from '@material-ui/icons';
import { DataGrid, GridToolbarDensitySelector,GridToolbarContainer, GridToolbarExportContainer, GridToolbarExport} from '@mui/x-data-grid';
import { writeXLSX, writeFile } from 'xlsx';
import * as XLSX from 'xlsx/xlsx.mjs';
import { Stack, Tooltip } from '@mui/material';

//* Componentes de Estilos *//
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '35%',
    height: '60%',
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
  const [currency, setCurrency] = useState({Ind_Activo:''});
  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    Persona_Contacto: '',
    Cliente: '',
    Telefono:'',
    Direccion:'',
    Rif:'',
    Id_Cliente:'',
    Fax:''
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
    timer: 10000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
     }
  });
  const peticionGet=async()=>{

    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarCliente',{
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
    await axios.get( process.env.REACT_APP_API_ENDPOINT+'ListarClienteId/'+ID,{
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
    id_usuario:consolaSeleccionada.id_usuario,
    Ind_Activo:currency.Ind_Activo,
    usuario:consolaSeleccionada.usuario,
    correo:consolaSeleccionada.correo, 
    nombres:consolaSeleccionada.nombres,
    apellidos:consolaSeleccionada.apellidos,
    id_perfil:consolaSeleccionada.id_perfil,
    id_cliente:consolaSeleccionada.id_cliente,
  } 
  const peticionPost=()=>{
       axios.post(process.env.REACT_APP_API_ENDPOINT+'ListarClienteId',datosEnviar,{
         headers: {
           'Authorization': `Bearer ${token}`
         }
      })
      .then(response=>{
        toast.fire({
          icon: 'success',
          title: ''+response.data.message+'',
          confirmButtonText: `Ok`,
        })
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
        console.log(response.data.message);
        setTimeout(() => {
          window.location.href = '/management/panel/createUser'
        }, 11000);
        
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
  const currencies = [
    {value: 0,
     label: 'Activo',
    },
    {value: 1,
     label: 'Inactivo',
  }]
  const handleChangeselect = (e) => {
    const {name, value}=e.target;
    setCurrency(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(value)
  };

  const alertTohandleChange =(e)=>{
    Swal.fire(
      {icon: 'warning',
      title: 'El Usuario debe contener el mismo valor de Correo Electrónico',
      confirmButtonText: 'Entendido',
    })
  }
/*Cuerpo del Modal de Edición*/
  const bodyEditar=(
    <div style={{width:'60%'}} className={styles.modal}>
      <h3 style={{textAlign:'center'}}>Editar Datos de Usuario</h3>
      <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around'}} className='agruparEdit'>
        <div style={{width:'40%'}} className='grupoEdit'>
          <TextField name="ID_Cliente" className={styles.inputMaterial} type='number' label="ID Cliente" onChange={handleChange}  value={consolaSeleccionada && consolaSeleccionada.Id_Cliente}/>
          <br/>
          <TextField name="Cliente" className={styles.inputMaterial} label="Cliente" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.Cliente}/>
          <br/>
          <TextField name="Direccion" className={styles.inputMaterial} label="Direccion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.Direccion}/>
          <br/>
          <TextField name="Telefono" className={styles.inputMaterial} label="Teléfono" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.Telefono}/>
          <br/>
          <TextField name="Rif" className={styles.inputMaterial} label="Rif" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.Rif}/>
          <br/>
        </div>
        <div style={{width:'40%'}} className='grupoEdit'>
        <TextField name="Persona_Contacto" className={styles.inputMaterial} type='text' label="Contacto" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.Persona_Contacto}/>
        <br />
        <TextField name="Ind_Activo" 
          className={styles.inputMaterial}
          select 
          label="Usuario Activo"
          value={currency.Ind_Activo}
          onChange={handleChangeselect}
          helperText="Seleccione una opción"
          SelectProps={{
            native: true,
          }}
        >
        {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
        ))}</TextField>
        <br />
        <br />
        <TextField name="Fax" className={styles.inputMaterial} type='number' label="Fax"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.Fax}/>
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
          <button style={{curso:'pointer'}} onClick={()=>downloadexcel()}>Descargar CSV</button>
        </GridToolbarExportContainer>
      </GridToolbarContainer>
    );
  }

  const colums = [
    { field: 'Id_Cliente', headerName: 'ID Cliente',headerAlign:'center',align: 'center'},
    { field: 'Cliente', headerName: 'Cliente',headerAlign:'center',align: 'center', width:'160'},
    { field: 'Direccion', headerName: 'Dirección',headerAlign:'center',align: 'center',width:'160'},
    { field: 'Telefono', headerName: 'Teléfono',headerAlign:'center',align: 'center',width:'160'},
    { field: 'Rif', headerName: 'Rif',headerAlign:'center',align: 'center',width:'200'},
    { field: 'Persona_Contact' , headerName: 'Contacto',headerAlign:'center',align: 'center'},
    { field: 'Ind_Activo',
      headerName: 'Perfil Activo',
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
            if (thisRow.Ind_Activo === true) {
              return<Check></Check>
            }else{
              return<Close></Close>
            }
      }     
    },
    { field: 'action',
      headerName: 'Action',
      headerAlign:'center',
      sortable: false,
      align:'center',
      renderCell:(params)=>{
        return[
        <Tooltip title="Editar" arrow placement="bottom">
          <Edit style={{cursor:'pointer'}} onClick={()=>{
            var ID = params.id
              seleccionarConsola('Editar')
              peticionGetID(ID)
          }}/> 
        </Tooltip>,
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
        <div style={{flexGrow:4}}>
          <DataGrid
            columns={colums}
            rows={data}
            getRowId={(row) => row.Id_Cliente}
            components={{
              Toolbar: CustomToolbar,
            }}
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
