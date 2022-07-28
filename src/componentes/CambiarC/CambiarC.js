import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack} from '@material-ui/icons';
import { IconButton, Button} from '@mui/material';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './CambiarC.css';

class CambiarC extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      formErrors: {
        Password:'',
        ConfirmacionPassword:'',
      },
      passwordValid: false,
      confirmacionpasswordValid: false,
      Password: '',
      ConfirmacionPassword:'',
    } 
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
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
    this.setState({
      formErrors: fieldValidationErrors,
      passwordValid: passwordValid,
    },this.validateForm);
  }
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  validateForm() {
    this.setState({formValid: this.state.passwordValid});
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},() => { this.validateField(name, value) });
  }   

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword}) 
  };

  enviarDatos=(e)=>{ 
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
    const {Password, ConfirmacionPassword}=this.state;
    var datosEnviar={password:Password, confirmacionPassword:ConfirmacionPassword }

    axios.post(process.env.REACT_APP_API_ENDPOINT+"login",datosEnviar)
    .then((result) => {
      this.setState({status:true})
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
      <section className='contenedorcambio'>
        <div className='cambiarC'>
        <FormControl>
            <TextField style={{top:'15%',overflow:'visible', borderRadius:'2em', background:'#fff'}} id="input-textfield1" label="Contraseña" type='text' name='Password' value={this.state.Password} onChange={this.handleUserInput}/>
            <FormControl style={{height:'auto',overflow:'visible',width: '100%',top:'35%'}}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={this.state.showPassword ? 'text' : 'password'} name='ConfirmacionPassword' value={this.state.ConfirmacionPassword} onChange={this.handleUserInput}
                endAdornment={
                <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword} edge="end">
                  {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
                }
              />
            </FormControl>
            <Button variant="outlined" disabled={!this.state.formValid} onClick={this.enviarDatos}>Confirmar</Button>
          </FormControl>
        </div>
        <Button className='atras'
        style={{background: 'transparent',position:'fixed',border:'0.2em solid #fff',minWidth:'50px', borderRadius:'50%'}} 
        variant="contained" href='/Home'>
          <ArrowBack style={{fontSize:'2.5em'}}></ArrowBack>
      </Button>
      </section>
    )
  };
};
export default CambiarC;