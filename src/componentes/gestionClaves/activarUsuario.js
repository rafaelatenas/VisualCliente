import React, { useState } from 'react';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './activarUsuario.css';
import { TextField, FormControl, InputLabel, OutlinedInput, FormLabel, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff} from '@material-ui/icons';
import { IconButton, Button} from '@mui/material';
import { useAuthContext } from '../context/authContext';
import {useNavigate, useParams} from 'react-router-dom'
import atenaslogoEliseBlanca from '../../landing/Images/ATSElise.png'

export default function ActivarUsuario(){
  const Navigate = useNavigate();
  let { email } = useParams()
  const {login}=useAuthContext();
  const [password,setPassword] = useState('')
  const [password2,setPassword2] = useState('')
  const [formErrors, setFormErrors] = useState({Email: '', Password: '',password2:'', confirmPassword2:''})
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [confirmPasswordValid,setConfirmPasswordValid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let EmailValid = emailValid;
    let PasswordValid = passwordValid;
    let Password2 = password2;
    
    switch(fieldName) {
      case 'Password':
        PasswordValid = value.length >= 6;
        fieldValidationErrors.Password = PasswordValid ? '': 'Clave demasiado corta';
        setFormErrors({Password: fieldValidationErrors.Password})
        break;
      case 'ConfirmPassword':
        Password2 = value.length >= 6;
        fieldValidationErrors.password2 = Password2 ? '': 'Clave demasiado corta';
        setFormErrors({password2: fieldValidationErrors.password2})
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors)
    setEmailValid(emailValid)
    setPasswordValid(passwordValid)
  }
  const handleUserPassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value)
    setPassword(value)
  }
  const handleUserConfirmPassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField('ConfirmPassword', value)
    setPassword2(value)
    if (value === password) {
      formErrors.confirmPasswordValid =''
      setConfirmPasswordValid(true)
      
    }else{
      formErrors.confirmPasswordValid ='Las claves no son iguales'
      setConfirmPasswordValid(false)
    }
  }  
  const handleClickShowPassword = (e) => {
    console.log(e)
    setShowPassword(!showPassword) 
  };
  const enviarDatos=(e)=>{ 
    const MySwal = withReactContent(Swal)
    const toast = MySwal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    e.preventDefault();
    var datosEnviar={
      email:email,
      password:password,
    } 
    axios.post(process.env.REACT_APP_API_ENDPOINT+"Activar",datosEnviar).then(result => {
      var nombre=result.data.NombresUsuarios;
      var apellidos=result.data.ApellidosUsuarios;  
      sessionStorage.setItem('token', result.data.token);
      sessionStorage.setItem('Id_Cliente', result.data.ID_Cliente);
      sessionStorage.setItem('success', result.data.success);
      toast.fire({
          icon: 'success',
          title: ''+result.data.message+' '+nombre+' '+apellidos+'',
          confirmButtonText: `Ok`,
      })
      if (result.data.success === true) {
        login();
      }
    }).catch(err => {
        if(err.response) {
          console.log(err.response)
          console.log(err.response.data.message);
          console.log(err.response.status);
          console.log(err.response.headers);        
        
        }       
          //toast.fire({
          //   icon:'error',
          //   title:''+err.response.data.message+'',
          //   confirmButtonText: `Ok`,
          // })    
    })
  }
  // enviarDatos=(e)=>{
  //   const MySwal = withReactContent(Swal)
  //   const toast = MySwal.mixin({
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     timer: 5000,
  //     timerProgressBar: true,
  //     didOpen: (toast) => {
  //         toast.addEventListener('mouseenter', Swal.stopTimer)
  //         toast.addEventListener('mouseleave', Swal.resumeTimer)
  //     }
  //   });
  //   e.preventDefault();
  //   const {password, Usuario, confirmacionpassword}=state;
  //   var datosEnviar={password:password, usuario:Usuario, confirmacionpassword:confirmacionpassword}
  //   console.log(datosEnviar)
  //   axios.post(process.env.REACT_APP_API_ENDPOINT+"ActivarUsuario",datosEnviar)
  //     .then((result) => {
  //       setState({status:true})
  //       console.log(result)
  //       console.log(result.data);  
  //         toast.fire({
  //           icon: 'success',
  //           title: ''+result.data.message+'',
  //           confirmButtonText: `Ok`,
  //         })
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       console.log(error.response.data.message);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);        
  //         toast.fire({
  //           icon: 'error',
  //           title: ''+error.response.message+'',
  //           confirmButtonText: `Ok`,
  //         })    
  //     })
  // }
  
  return(
    <section className='contenedorActivacion'>
      <div className='activarUs'>
        <FormControl className='formActivate'>
          <img className='logoActivate' src={atenaslogoEliseBlanca} alt='Logo Elise Blanca. Atenas Grupo Consultor' title=''/>
          <FormLabel className='text'>{email}</FormLabel>
          <TextField className='textPassword' label="Clave"  type={showPassword ? 'text' : 'password'} value={password}
            onChange={(e)=>handleUserPassword(e)}
            name='Password'
          />
          <TextField className='textPassword' label="Confirmar Clave"  type={showPassword ? 'text' : 'password'} value={password2}
            onChange={(e)=>handleUserConfirmPassword(e)}
            name='ConfirmPassword'
            InputProps={{
              endAdornment:(
                <InputAdornment position="end" style={{width:'12%',height:'100%'}} onClick={(e)=>handleClickShowPassword(e)}>
                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                </InputAdornment>
              )
            }}
          />
          <Button className='buttonConfirm' variant="outlined" disabled={!confirmPasswordValid} onClick={enviarDatos}>Confirmar</Button>
        </FormControl>
      </div>
    </section>
  )
};

