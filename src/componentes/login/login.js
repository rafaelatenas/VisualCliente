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
const recaptchaRef = React.createRef();


class Login extends React.Component {

    constructor (props) {
      super(props);
      this.state = {
        Email: '',
        Password: '',
        formErrors: {Email: '', Password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false,
        ValidToken: false,
      }
    }
    validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    
    switch(fieldName) {
      case 'Email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : 'Correo invalido';
        this.setState({formErrors: {Email: fieldValidationErrors.Email}})
        break;
      case 'Password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.Password = passwordValid ? '': 'Clave demasiado corta';
        this.setState({formErrors: {Password: fieldValidationErrors.Password}})
        break;
      default:
        break;
    }
    this.setState(
      {formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      }, 
      this.validateForm);
    }
    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }
    validateForm() {
      this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},() => { this.validateField(name, value) });
    } 
    handleClickShowPassword = () => {
      this.setState({showPassword: !this.state.showPassword}) 
    };
    handleMouseDownPassword = () => {
      this.setState({showPassword: this.state.showPassword})
    };
    enviarDatos=(e)=>{ 
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
      e.preventDefault();
      const {Email,Password}=this.state;
      var responseKey = recaptchaRef.current.getValue();
      var datosEnviar={
        email:Email,
        password:Password,
        captcha:responseKey
      } 

      axios.post(process.env.REACT_APP_API_ENDPOINT+"login",datosEnviar).then(result => {
        var nombre=result.data.NombresUsuarios;
        var apellidos=result.data.ApellidosUsuarios;  
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('Login', result.data.Login);
        localStorage.setItem('nombres', result.data.NombresUsuarios);
        localStorage.setItem('apellidos', result.data.ApellidosUsuarios);
        sessionStorage.setItem('Id_Cliente', result.data.ID_Cliente);
      toast.fire({
          icon: 'success',
          title: ''+result.data.message+' '+nombre+' '+apellidos+'',
          confirmButtonText: `Ok`,
      })    
      var cliente = result.data.Cliente;
        if (cliente === 'ATENAS') {
          window.location.href = 'management/panel'
        } else {
          console.log('no')
        }  
      }).catch(err => {
          console.log(err)
          if(err.response) {
            console.log(err.response.data.message);
            console.log(err.response.status);
            console.log(err.response.headers);        
          }       
          toast.fire({
            icon:'error',
            title:''+err.response.data.message+'',
            confirmButtonText: `Ok`,
          })    
      })
    }
    /* Validación Google */
    handleChange = value => {
      if (value !== null) {
        this.isHuman()
      }
    }
    isHuman=async()=>{
      var responseKey = {captcha: recaptchaRef.current.getValue()};
      axios.post(process.env.REACT_APP_API_ENDPOINT+"ValidationCaptcha",responseKey)
      .then(result => {
        console.log(result)
        switch (result.data.success) {
          case true:
            this.setState({ValidToken:true})
            break;
          case false:
            this.setState({ValidToken:false})
            break;
          default:
            break;
        }
      }).catch(err => {
        console.log(err)
      })
    }

	render() {
    return (
      <section className="login">
        <Box id='card-login' className="card-login">
          <FormControl className="Form">
            <TextField error={this.state.formErrors.Email === ''? false: true} style={this.state.formErrors.Email === ''? {height:'15%'}: {height:'20%', minHeight:60}} helperText={this.state.formErrors.Email} className='email' 
              variant="outlined" label="Correo" type='text' name='Email' value={this.state.Email} onChange={this.handleUserInput}/>
            <FormControl error={this.state.formErrors.Password === ''? false: true} style={this.state.formErrors.Password === ''? {height:'15%'}: {height:'20%', minHeight:60}} className='password'>
              <InputLabel  style={{ zIndex:'30',background:'transparent'}} htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={this.state.showPassword?  'text' : 'password'} name='Password' value={this.state.Password} onChange={this.handleUserInput}
                endAdornment={
                <IconButton style={{width:'10%',height:'100%', margin:-7}} aria-label="toggle password visibility" onClick={this.handleClickShowPassword}  edge="end">
                  {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
                }
              />
              <FormHelperText>{this.state.formErrors.Password}</FormHelperText>
            </FormControl>
              
            <Button className="button" variant="outlined" disabled={!this.state.ValidToken} onClick={this.enviarDatos}>Confirmar</Button>
          </FormControl>
            
        </Box>
        <ReCAPTCHA 
          className="recaptcha"
          onChange={this.handleChange}
          sitekey={process.env.REACT_APP_PUBLIC_KEY}
          badge='bottomleft'
          ref={recaptchaRef}
          />
      </section>
    )
  };
}
export default Login;
