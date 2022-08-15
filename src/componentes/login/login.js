/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { TextField, FormControl, InputLabel, OutlinedInput, Box, FormHelperText} from '@mui/material';
import { Visibility, VisibilityOff} from '@material-ui/icons';
import { IconButton, Button} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import './login.css'
import logoElise from '../../landing/Images/ATSElise.png'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/authContext';

const recaptchaRef = React.createRef();

function Login (){
  const Navigate = useNavigate();
  const {login}=useAuthContext();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({Email: '', Password: ''})
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [formValidValid, setFormValid] = useState(false)
  const [validToken, setValidToken] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const withdScreen = window.innerWidth

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let EmailValid = emailValid;
    let PasswordValid = passwordValid;
    
    switch(fieldName) {
      case 'Email':
        EmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = EmailValid ? '' : 'Correo invalido';
        setFormErrors({Email: fieldValidationErrors.Email})
        break;
      case 'Password':
        PasswordValid = value.length >= 6;
        fieldValidationErrors.Password = PasswordValid ? '': 'Clave demasiado corta';
        setFormErrors({Password: fieldValidationErrors.Password})
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors)
    setEmailValid(emailValid)
    setPasswordValid(passwordValid)
  }
  const errorClass = (error)=>{
      return(error.length === 0 ? '' : 'has-error');
  }
  const validateForm = ()=>{
    setFormValid({emailValid, passwordValid});
  }
  const handleUserEmail = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value)
    setEmail(value)
  } 
  const handleUserPassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value)
    setPassword(value)
  } 
  const handleClickShowPassword = () => {
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
      var responseKey = recaptchaRef.current.getValue();
      var datosEnviar={
        email:email,
        password:password,
        captcha:responseKey
      } 

      axios.post(process.env.REACT_APP_API_ENDPOINT+"login",datosEnviar).then(result => {
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
        // return<Navigate to='/retailservices/home/'/>
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
    /* Validación Google */
  const handleChange = value => {
    if (value !== null) {
    var responseKey = recaptchaRef.current.getValue();
      isHuman()
    }
  }
  const isHuman=async()=>{
    var responseKey = {captcha: recaptchaRef.current.getValue()};
    axios.post(process.env.REACT_APP_API_ENDPOINT+"ValidationCaptcha",responseKey)
    .then(result => {
    switch (result.data.success) {
      case true:
        setValidToken(true)
        break;
      case false:
        setValidToken(false)
        break;
      default:
        break;
    }
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <section className="login">
      <Box id='card-login' className="card-login">
        <FormControl className="Form">
          <img className='logoLogin' src={logoElise} alt="Logo Atenas" title=''/>
          <TextField error={formErrors.Email === ''? false: true} helperText={formErrors.Email} className={formErrors.Email === ''? 'email': 'email error'} 
              variant="outlined" label="Correo" type='text' name='Email' value={email} onChange={(e)=>handleUserEmail(e)}/>
            <FormControl error={formErrors.Password === ''? false: true} className={formErrors.Password === ''? 'password': 'password error'} >
              <InputLabel  style={{ zIndex:'30',background:'transparent'}} htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={showPassword?  'text' : 'password'} name='Password' value={password} onChange={(e)=>handleUserPassword(e)}
                endAdornment={
                <IconButton style={{width:'10%',height:'100%', margin:-7}} aria-label="toggle password visibility" onClick={handleClickShowPassword}  edge="end">
                  {showPassword ? <VisibilityOff className='iconVisibility'/> : <Visibility className='iconVisibility'/>}
                </IconButton>
                }
              />
              <FormHelperText>{formErrors.Password}</FormHelperText>
            </FormControl>
              
             <Button className="button" variant="outlined" disabled={!validToken} onClick={enviarDatos}>Confirmar</Button> 
          </FormControl>
            
        </Box>
        <ReCAPTCHA 
          className="recaptcha"
          onChange={handleChange}
          sitekey={process.env.REACT_APP_PUBLIC_KEY}
          badge='bottomleft'
          ref={recaptchaRef}
          />
      </section>
    )
};

export default Login;
