import React from 'react';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './activarUsuario.css';
import { TextField, FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { Visibility, VisibilityOff} from '@material-ui/icons';
import { IconButton, Button} from '@mui/material';

class ActivarUsuario extends React.Component{
   
  constructor(props) {
    super(props)            
    this.state = {
      formErrors: {
        Usuario:'',
        password: '',
        confirmacionpassword:'',
      },
        usuarioValid:false,
        passwordValid: false,
        confirmacionpasswordValid: false,
        formValid: false,
        showPassword: false,
        IgualPassword:false,        
        Usuario:'',
        password: '',
        confirmacionpassword:'',
    } 
  }
        

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usuarioValid = this.state.usuarioValid;
    let passwordValid = this.state.passwordValid;
    let confirmacionpasswordValid = this.state.confirmacionpasswordValid;

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
    switch(fieldName) {
      case 'Email':
        usuarioValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Usuario = usuarioValid ? '' : ' es invalido';
        break;
      case 'Password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.Password = passwordValid ? '': ' es demasiado corto';
        break;
      case 'ConfirmacionPassword':
        confirmacionpasswordValid = value.length >= 6;
        fieldValidationErrors.ConfirmacionPassword = confirmacionpasswordValid ? '': ' es demasiado corto';
        break;
      default:
        break;
    }
      
    this.setState(
      {formErrors: fieldValidationErrors,
        usuarioValid: usuarioValid,
        passwordValid: passwordValid,
        confirmacionpasswordValid: confirmacionpasswordValid
      }, 
    this.validateForm);
  }
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},() => { this.validateField(name, value) });
  }  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && (this.state.Password = this.state.ConfirmacionPassword)});
  }
  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword}) 
  };
        
  handleMouseDownPassword = () => {
    this.setState({showPassword: this.state.showPassword})
  };
         
  enviarDatos=(e)=>{
    console.log(this.state.password === this.state.confirmacionPassword)
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
  console.log("Fomulario Enviado....")
  const {password, Usuario, confirmacionpassword}=this.state;
  var datosEnviar={password:password, usuario:Usuario, confirmacionpassword:confirmacionpassword}
  console.log(datosEnviar)
  axios.post(process.env.REACT_APP_API_ENDPOINT+"ActivarUsuario",datosEnviar)
    .then((result) => {
      this.setState({status:true})
      console.log(result)
      console.log(result.data);  
        toast.fire({
          icon: 'success',
          title: ''+result.data.message+'',
          confirmButtonText: `Ok`,
        })
    })
    .catch((error) => {
      console.error(error)
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);        
        toast.fire({
          icon: 'error',
          title: ''+error.response.message+'',
          confirmButtonText: `Ok`,
        })    
    })
  }

  render(){
    return(
      <section className='contenedorActivacion'>
        <div className='activarUs'>
          <FormControl>
            <TextField style={{top:'15%', borderRadius:'2em', background:'#fff'}} id="input-textfield1" label="Correo" type='text' name='Usuario' value={this.state.Usuario} onChange={this.handleUserInput}/>
            <TextField style={{top:'25%',borderRadius:'2em', background:'#fff'}} id="input-textfield2" label="Contraseña" 
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleUserInput}
              name='password'/>
            <FormControl style={{height:'auto',width: '100%',top:'35%'}}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={this.state.showPassword ? 'text' : 'password'} name='confirmacionpassword' value={this.state.confirmacionpassword} onChange={this.handleUserInput}
                endAdornment={
                  <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword} edge="end">
                    {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                }
              />
            </FormControl>
            <Button variant="outlined" disabled={this.state.formValid} onClick={this.enviarDatos}>Confirmar</Button>
          </FormControl>
        </div>
      </section>
    )
  };
};
export default ActivarUsuario;

