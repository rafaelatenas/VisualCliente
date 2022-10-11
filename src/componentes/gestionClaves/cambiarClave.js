import React, { useState } from 'react';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './activarUsuario.css';
import { TextField, FormControl, InputLabel, OutlinedInput, FormLabel, InputAdornment} from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff} from '@material-ui/icons';
import { IconButton, Button} from '@mui/material';
import { useAuthContext } from '../context/authContext';
import {useNavigate, useParams} from 'react-router-dom'
import atenaslogoEliseBlanca from '../../landing/Images/ATSElise.png'
import { makeStyles } from '@material-ui/styles';
import logoCuadro from '../../landing/Images/logo-cauadro.png'
import { FooterMovile } from '../Home/homeComponents';

export default function CambiarClave(){
  const style = styles()
  const Navigate = useNavigate();
  let { email,token } = useParams()
  const {logout}=useAuthContext();
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
        logout();
      }
    }).catch(err => {
        if(err.response) {
          console.log(err.response)
          console.log(err.response.data.message);
          console.log(err.response.status);
          console.log(err.response.headers);        
        
        }       
          // toast.fire({
          //   icon:'error',
          //   title:''+err.response.data.message+'',
          //   confirmButtonText: `Ok`,
          // })    
    })
  }
  // enviarDatos=(e)=>{
  //   console.log(password === confirmacionPassword)
  // const MySwal = withReactContent(Swal)
  // const toast = MySwal.mixin({
  //   toast: true,
  //   position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 5000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //       toast.addEventListener('mouseenter', Swal.stopTimer)
  //       toast.addEventListener('mouseleave', Swal.resumeTimer)
  //    }
  // });
  // e.preventDefault();
  // console.log("Fomulario Enviado....")
  // const {password, Usuario, confirmacionpassword}=state;
  // var datosEnviar={password:password, usuario:Usuario, confirmacionpassword:confirmacionpassword}
  // console.log(datosEnviar)
  // axios.post(process.env.REACT_APP_API_ENDPOINT+"ActivarUsuario",datosEnviar)
  //   .then((result) => {
  //     setState({status:true})
  //     console.log(result)
  //     console.log(result.data);  
  //       toast.fire({
  //         icon: 'success',
  //         title: ''+result.data.message+'',
  //         confirmButtonText: `Ok`,
  //       })
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //     console.log(error.response.data.message);
  //     console.log(error.response.status);
  //     console.log(error.response.headers);        
  //       toast.fire({
  //         icon: 'error',
  //         title: ''+error.response.message+'',
  //         confirmButtonText: `Ok`,
  //       })    
  //   })
  // }
  
  return(
    <section className={style.contenedorActivacion}>
      <div className={style.changePassword}>
        <FormControl className={style.formChange}>
          <img className={style.logoActivate} src={atenaslogoEliseBlanca} alt='Logo Elise Blanca. Atenas Grupo Consultor' title=''/>
          <FormLabel className={style.text}>{email}</FormLabel>
          <TextField className={style.textPassword} label="Clave"  type={showPassword ? 'text' : 'password'} value={password}
            onChange={(e)=>handleUserPassword(e)} name='Password'
          />
          <TextField className={style.textPassword} label="Confirmar Clave"  type={showPassword ? 'text' : 'password'} value={password2}
            onChange={(e)=>handleUserConfirmPassword(e)} name='ConfirmPassword'
            InputProps={{
              endAdornment:(
                <InputAdornment position="end" style={{width:'12%',height:'100%'}} onClick={(e)=>handleClickShowPassword(e)}>
                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                </InputAdornment>
              )
            }}
          />
          <Button className={style.buttonConfirm} variant="outlined" disabled={!confirmPasswordValid} onClick={enviarDatos}>Confirmar</Button>
        </FormControl>
      </div>
      <FooterMovile/>
      <IconButton className={style.back} variant="contained" onClick={()=>window.location = '/retailservices/home'}>
        <ArrowBack style={{fontSize:'2.5em', fill:'#fff'}}></ArrowBack>
      </IconButton>
    </section>
  )
};

const styles = makeStyles(()=>({
  contenedorActivacion:{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  changePassword:{
    width: '100%',
    height: '65%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: `url(${logoCuadro})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '95% 85%',
  },
  formChange:{
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'visible',
  },
  logoActivate:{
    width: '60%',
    height: 'auto',
  },
  text:{
    width: '80%',
    height: '10%',
    background: '#fff',
    borderRadius: '2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center'
  },
  textPassword: {
    width: '80%',
    height: '10%',
    overflow: 'visible',
    '& div':{
      width: '100%',
      height: '100%',
      borderRadius: '2em',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
    },
  },
  buttonConfirm:{
    background: '#fff !important',
    borderRadius: '1.2em !important',
  },
  back:{
    display:'none !important'
  },
  '@media screen and (min-width:500px)':{
    changePassword:{
      backgroundSize:'85% 90%'
    },
    formChange:{
      width:'75%'
    }
  },
  '@media screen and (min-width:768px)':{
    changePassword:{
      backgroundSize:'75% 90%'
    },
    formChange:{
      width:'70%'
    }
  },
  '@media screen and (min-width:1024px)':{
    back:{
      display:'block !important',
      background: 'transparent',
      border: '0.2em solid rgb(255, 255, 255) !important',
      minWidth: 50,
      maxWidth: 70,
      borderRadius: '50% !important',
      padding: '0% !important',
      position: 'fixed !important',
      left: '1%',
      top: '87%',
      width: 60,
      height: 60,
    }
  }
}))