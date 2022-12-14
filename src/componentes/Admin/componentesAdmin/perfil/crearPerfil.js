import React from "react";
import { $ } from "react-jquery-plugin";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from 'sweetalert2-react-content';
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { PhotoCameraRounded } from "@mui/icons-material";


export default class CrearPerfil extends React.Component{
    //Validación de Formulario

  constructor (props) {
    super(props);
    this.state = { 
      formErrors: {
        nombres:'',
        apellidos:'',
        correo: '',
        password: '',
      },
      nombresValid: false,
      apellidosValid: false,
      correoValid: false,
      passwordValid: false,
      id_usuarioValid: false,
      nivelValid: false,
      clienteValid: false,
      formValid: false,
      nombres:'',
      apellidos:'',
      correo:'',
      password:'',
      usuario:'',
      id_Cliente:'',
      id_perfil:'',
      id_usuario:'',
      activeStep:0,

    }    
  } 
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nombresValid= this.state.nombresValid;
    let apellidosValid= this.state.apellidosValid;
    let correoValid = this.state.correoValid;
    let passwordValid = this.state.passwordValid;

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
        case 'nombres':
          nombresValid = value.length >= 6;
          fieldValidationErrors.nombres = nombresValid ? '' : ' es demasiado corto';
          break;
        case 'apellidos':
          apellidosValid = value.length >= 6;
          fieldValidationErrors.apellidos = apellidosValid ? '' : ' es demasiado corto';
          break;  
        case 'correo':
          correoValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.correo = correoValid ? '' : ' es invalido';
            toast.fire({
              icon: 'error',
              title: ''+fieldValidationErrors.correo+'',
              confirmButtonText: `Ok`,
            })
          break;
        case 'password':
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid ? '': ' es demasiado corto';
            break;
        default:
          break;
      }
      this.setState(
        {formErrors: fieldValidationErrors,
          nombresValid:nombresValid,
          apellidosValid:apellidosValid,
          correoValid: correoValid,
          passwordValid: passwordValid,
        }, this.validateForm
      );
  }
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  validateForm() {
      //--- Para botón Next ---//
    this.setState({formValidNext: this.state.nombresValid && this.state.apellidosValid});
        //--- Para botón Submit ---//
    this.setState({formValid: this.state.nombresValid && this.state.apellidosValid && this.state.correoValid && this.state.passwordValid});
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},() => { this.validateField(name, value) });
  }  
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
    var datos={
      usuario: this.state.correo,
      correo: this.state.correo,
      clave:this.state.password,
      correo:this.state.correo,
      nombres:this.state.nombres,
      apellidos:this.state.apellidos,
      id_Cliente: this.state.id_cliente,
      id_perfil: this.state.id_perfil,
    }

  var token=sessionStorage.getItem('token');
  axios.post(process.env.REACT_APP_API_ENDPOINT+'NuevoUsuarios',datos,{
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then((result) => {
    console.log(result)
    console.log(result.data);  
      toast.fire({
        icon: 'success',
        title: ''+result.data.message+'',
        confirmButtonText: `Ok`,
      })
    }).catch((error) => {
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

  componentDidMount(){
    // Inicio de animación del formulario
    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;

    $(".next").on('click',(function(){
      if(animating) return false;
        animating = true;
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.animate({opacity: 0}, {
          step: function(now, mx) {
            scale = 1 - (1 - now) * 0.2;
              left = (now * 50)+"%";
              opacity = 1 - now;
              current_fs.css({
                'transform': 'scale('+scale+')',
                'position': 'absolute',
                'top': '10%'
              });
                next_fs.css({'left': left, 'opacity': opacity});
          },
          duration: 800,
          complete: function(){
            current_fs.hide();
            animating = false;
          },
          easing: 'easeInOutBack'
        });
    }));

    $(".previous").on('click',(function(){
      if(animating) return false;
        animating = true;
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        previous_fs.show();
        current_fs.animate({opacity: 0}, {
          step: function(now, mx) {
            scale = 0.8 + (1 - now) * 0.2;
            left = ((1-now) * 50)+"%";
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
          },
          duration: 800,
          complete: function(){
            current_fs.hide();
            animating = false;
          },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
      // $(".submit").on('click',(function(){
      //   alert(2322)
      // }))
    }));

    // Fin de la animación del formulario
    const MySwal = withReactContent(Swal)
    const toast = MySwal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 7000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
                    
    $(document).ready(function () {
      $('#imagenes').change(async function () {
          var imagen = document.getElementById("imagenes").files;
          for (let x = 0; x < imagen.length; x++) {
            loadImage(imagen[x]);
            console.log(imagen)
          }
      });
    });
    function loadImage(imagen) {
      var _URL = window.URL || window.webkitURL;
      var img = new Image();
      img.src = _URL.createObjectURL(imagen);
      img.alt = imagen.name;
      img.onload = function () {
        var ancho = img.width;
        var alto = img.height
        let medida =  parseInt(ancho*alto);
        var imagenValid = 8100;
        let Errors = medida <= imagenValid
          switch (Errors) {
            case false:
              toast.fire({
                icon: 'error',
                title: 'La imagen insertada es muy Grande',
                confirmButtonText: `Ok`,
              })
              break;
            default:
              break;
          }
      }
    }              
  }

  handleNext = () => {
    this.setState({activeStep:this.state.activeStep+1});
  };
  handleBack = () => {
    this.setState({activeStep:this.state.activeStep-1});
  };
  handleContinue=()=>{
    this.setState({activeStep:0})
  }
  handleRegister=()=>{
    this.setState({activeStep:this.state.activeStep+1})
  }
  render(){
    return(
      <Box sx={{ width: '85%', height:'90%'}}>
        <Stepper orientation="vertical" activeStep={this.state.activeStep}>
            <Step>
              <StepLabel>Datos de Usuario</StepLabel>
              <StepContent>
                <Box sx={{height:'75%', display: 'flex', overflow:'visible', flexDirection: 'column', alignContent: 'space-around',width: '100%',justifyContent: 'space-around'}}>
                  <Box sx={{display:'flex', overflow:'visible', justifyContent:'space-around'}}>
                    <TextField className='textField' id="outlined-multiline-flexible" label="Nombres"
                      value={this.state.nombres} name={'nombres'}
                      onChange={(e)=>this.handleUserInput(e)}
                    />
                    <TextField className='textField' id="outlined-multiline-flexible" label="Apellidos"
                      value={this.state.apellidos} name={'apellidos'}
                      onChange={(e)=>this.handleUserInput(e)}
                    />
                    <TextField className='textField' id="outlined-multiline-flexible" label="Nombre Retail"
                      value={this.state.nRetail} name={'nRetail'}
                      onChange={(e)=>this.handleUserInput(e)}
                    />
                    <TextField className='textField' id="outlined-multiline-flexible" label="Género"
                      value={this.state.genero} name={'genero'}
                      onChange={(e)=>this.handleUserInput(e)}
                    />
                  </Box>
                  <Box sx={{display:'flex', overflow:'visible', justifyContent:'space-around'}}>
                    <TextField className='textField' id="outlined-multiline-flexible" label="Cargo"
                      value={this.state.cargo} name={'cargo'}
                      onChange={(e)=>this.handleUserInput(e)}
                    />
                    <TextField className='textField' id="outlined-multiline-flexible" label="Teléfono"
                      value={this.state.cell} name={'cell'} type='tel'
                      onChange={(e)=>this.handleUserInput(e)}
                    />
                    <TextField className='textField' id="outlined-multiline-flexible" label="Correo Electrónico"
                      value={this.state.correo} name={'correo'} type='email'
                      onChange={(e)=>this.handleUserInput(e)}
                    />
                    <TextField className='textField' id="outlined-multiline-flexible" label="Ciudad/Estado de Residencia"
                      value={this.state.ciudad} name={'ciudad'}
                      onChange={(e)=>this.handleUserInput(e)}
                    />
                  </Box>
                </Box>
                
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button onClick={this.handleNext}>Siguiente</Button>
              </Box>  
              </StepContent>
            </Step>
            <Step sx={{height:'100%'}}>
              <StepLabel>Crear de Usuario</StepLabel>
              <StepContent sx={{height:'100%'}}>
                <Box sx={{height:'75%', display: 'flex', overflow:'visible', flexDirection: 'column', alignContent: 'space-around',width: '100%',justifyContent: 'space-around'}}>
                  <TextField className='textField' id="outlined-multiline-flexible" label="Usuario"
                    value={this.state.usuario} name={'usuario'}
                    onChange={(e)=>this.handleUserInput(e)}
                  />
                  <Button aria-label="upload picture" component="label" startIcon={<PhotoCameraRounded/>} style={{minWidth:230, border:'solid 1px rgb(196,196,196)'}}>
                    <input hidden accept=".jpg,.jpeg, .png" type="file"  value={this.state.avatar} name={'avatar'} onChange={(e)=>this.handleUserInput(e)}/>
                    <label style={{fontSize:16, color:'#666', textTransform:'none'}}>Imagen</label>
                  </Button>
                </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button onClick={this.handleBack}>Regresar</Button>
                <Button onClick={this.handleRegister}>Enviar</Button>
              </Box>  
              </StepContent>
            </Step>
        </Stepper>
        {this.state.activeStep === 2?(
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Se ha realizado el registro con Exito</Typography>
            <Button onClick={this.handleContinue} sx={{ mt: 1, mr: 1 }}>
                Registrar un Nuevo Usuario
            </Button>
          </Paper>
        ):''}
      </Box>
      // <form id="msform">
      //   <ul id="progressbar">
      //     <li className="active"></li>
      //       <li></li>
      //   </ul>
      //   <fieldset>
      //     <h2 className="fs-title">Datos del Usuario</h2>
      //       <input type="text" name="nombres" placeholder="Nombres" value={this.state.nombres} onChange={this.handleUserInput}/>
      //       <input type="text" name="apellidos" placeholder="Apellidos" value={this.state.apellidos} onChange={this.handleUserInput}/>
      //       <input type="number" name="id_perfil" placeholder="Id Perfil" value={this.state.id_perfil} onChange={this.handleUserInput}/>
      //       <input type="file" accept=".jpg,.jpeg, .png" name="imagenes[]" id="imagenes" multiple/>    
      //       <input type="button" name="next"  disabled={!this.state.formValidNext} className="next action-button" value="Next" />
      //   </fieldset>
      //   <fieldset>
      //     <h2 className="fs-title">Crear Usuario</h2>
      //       <input type="number" name="id_cliente" placeholder="Id Cliente" value={this.state.id_cliente} onChange={this.handleUserInput}/>
      //       <input  type="email" name="correo" placeholder="Correo" value={this.state.correo} onChange={this.handleUserInput}/>
      //       <input  type="text" name="usuario" placeholder="Usuario" value={this.state.usuario} onChange={this.handleUserInput}/>
      //       <input className={`${this.errorClass(this.state.formErrors.password)}`} type="password" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleUserInput}/>
      //       <input type="button" name="previous" className="previous action-button" value="Previous" />
      //       <input type="submit" disabled={!this.state.formValid} name="submit" className="submit action-button" onClick={this.enviarDatos}  value="Submit" />
      //   </fieldset>
      // </form> 
     )
  }
}

