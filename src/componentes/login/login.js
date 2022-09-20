/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { TextField, FormControl, InputLabel, OutlinedInput, Box, FormHelperText, Modal, InputAdornment, FormGroup, FormControlLabel, Checkbox, FormLabel, Container, Typography} from '@mui/material';
import { EmailOutlined, Visibility, VisibilityOff} from '@material-ui/icons';
import { IconButton, Button} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import './login.css'
import atenaslogoEliseBlanca from '../../landing/Images/ATSElise.png'
import atenasLogo from '../../landing/Images/ATSLOGO.png'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/authContext';

const recaptchaRef = React.createRef();

function Login (){
  const Navigate = useNavigate();
  const {login}=useAuthContext();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({Email: '', Password: '', EmailRecovery:''})
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [validToken, setValidToken] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [open,setOpen] = useState(false)
  const [checked, setChecked] = React.useState(false);
  const [emailRecovery,setEmailRecovery] = useState('')
  const [emailValidRecovery, setEmailValidRecovery] = useState(false)


  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let EmailValid = emailValid;
    let PasswordValid = passwordValid;
    let EmailValidRecovery = emailValidRecovery;
    
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
      case 'EmailRecovery':
        EmailValidRecovery = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.EmailRecovery = EmailValidRecovery ? '' : 'Correo invalido';
        setFormErrors({EmailRecovery: fieldValidationErrors.EmailRecovery})
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors)
    setEmailValid(emailValid)
    setPasswordValid(passwordValid)
    setEmailValidRecovery(EmailValidRecovery)
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
      sessionStorage.setItem('user', result.data.Login);
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
          // toast.fire({
          //   icon:'error',
          //   title:''+err.response.data.message+'',
          //   confirmButtonText: `Ok`,
          // })    
    })
  }
    /* Validación Google */
  const handleChangeRecovery = value => {
    if (value !== null) {
      isHuman()
    }
  }
  const handleChangeLogin = value => {
    console.log(value)
    if (value !== null) {
      isHuman()
    }
  }
  const isHuman=async()=>{
    var responseKey = {captcha: recaptchaRef.current.getValue()};
    // axios.post(process.env.REACT_APP_API_ENDPOINT+"ValidationCaptcha",responseKey)
    axios.post("localhost:3005/VisorCliente_Api/ValidationCaptcha",responseKey)
    .then(result => {
      console.log(result)
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
  const openModalPassword = ()=>{
    setOpen(!open)
  }
  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };
  const handleUserEmailRecovery = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value)
    setEmailRecovery(value)
  } 
  const PasswordRecovery=()=>{
    console.log(0)
  }
  const CheckboxModal = 
    <Checkbox
      checked={checked}
      onChange={handleChecked}
      inputProps={{ 'aria-label': 'controlled' }}
    />;
  return (
    <section className="login">
      <Box id='card-login' className="card-login">
        <FormControl className="Form">
          <img width={'80%'} height={'auto'} className='logoLogin' src={atenaslogoEliseBlanca} alt="Logo Atenas" title=''/>
          <TextField error={formErrors.Email === ''? false: true} helperText={formErrors.Email} className={formErrors.Email === ''? 'email': 'email error'} 
              variant="outlined" label="Correo" type='text' name='Email' value={email} onChange={(e)=>handleUserEmail(e)}/>
            <FormControl error={formErrors.Password === ''? false: true} className={formErrors.Password === ''? 'password': 'password error'} >
              <InputLabel  style={{ zIndex:'30',background:'transparent'}} htmlFor="outlined-adornment-password">Clave</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={showPassword?  'text' : 'password'} name='Password' value={password} onChange={(e)=>handleUserPassword(e)}
                endAdornment={
                <IconButton style={{width:'10%',height:'100%', margin:-7}} aria-label="toggle password visibility" onClick={handleClickShowPassword}  position="end">
                  {showPassword ? <VisibilityOff className='iconVisibility'/> : <Visibility className='iconVisibility'/>}
                </IconButton>
                }
              />
              <FormHelperText>{formErrors.Password}</FormHelperText>
            </FormControl>
            <Button className="button" variant="outlined" disabled={false} onClick={enviarDatos}>Confirmar</Button> 
        </FormControl>
          <Button onClick={()=>openModalPassword()}>
            <p style={{color:'#fff'}}>¿Olvido su Clave?</p>
          </Button>
          
      </Box>
      <Modal
        className='ModalRecovery'
        open={open}
        onClose={()=>openModalPassword()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container className='containerRecovery'>
          <Box className='boxRecovery'>
            <img className='logoLogin' src={atenasLogo} alt="Logo Atenas" title=''/>
            <TextField error={formErrors.EmailRecovery === ''? false: true} 
              helperText={formErrors.EmailRecovery} className={formErrors.EmailRecovery === ''? 'email': 'email error'} 
              variant="outlined" label="Correo" type='text' name='EmailRecovery' value={emailRecovery} onChange={(e)=>handleUserEmailRecovery(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment style={{width:'10%'}} position="start">
                    <EmailOutlined/>
                  </InputAdornment>
                ),
              }}
            />
            <ReCAPTCHA 
            className="recaptcha"
            onChange={handleChangeRecovery}
            sitekey={process.env.REACT_APP_PUBLIC_KEY}
            badge='bottomleft'
            ref={recaptchaRef}
            />
            {/* <FormGroup>
              <FormLabel>¿Está seguro de realizar esta acción?</FormLabel>
              <FormControlLabel control={CheckboxModal} label="Si, deseo realizar esta acción." />
            </FormGroup> */}
            <Button variant="contained" disabled={!validToken} onClick={()=>PasswordRecovery()}>Confirmar</Button>
         </Box>
        </Container>
        
      </Modal>
      <ReCAPTCHA 
        className="recaptcha"
        onChange={handleChangeLogin}
        sitekey={process.env.REACT_APP_PUBLIC_KEY}
        badge='bottomleft'
        ref={recaptchaRef}
      />
    </section>
    )
};

export default Login;
