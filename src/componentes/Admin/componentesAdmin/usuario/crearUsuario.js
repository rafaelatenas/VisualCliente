import React, { useState } from "react";
import { $ } from "react-jquery-plugin";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from 'sweetalert2-react-content';
import { Box, Button, MenuItem, Paper, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { PhotoCameraRounded } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core";

export default function CreateUser(){
  var token=sessionStorage.getItem('token')
  const style = styles()
  // const [formErrors, setFormErrors]=({
  //   nombres:'',
  //   apellidos:'',
  //   correo: '',
  //   password: '',
  // })
  // const [valid, setValid]=useState({
  //   nombresValid: false,
  //   apellidosValid: false,
  //   correoValid: false,
  //   passwordValid: false,
  //   id_usuarioValid: false,
  //   nivelValid: false,
  //   clienteValid: false,
  //   formValid: false,
  // })
  const [informacion, setInform]=useState({
    nombres:'',
    apellidos:'',
    cell:'',
    ciudad:'',
    genero:'',
    nRetail:'',
    cargo:'',
    correo:'',
    password:'',
    usuario:'',
    Id_Cliente:'',
    id_perfil:'',
  })
  const [activeStep, setActiveStep]=useState(0)

  // const validateField=(fieldName, value)=> {
  //   let fieldValidationErrors = formErrors;
  //   let nombresValid= valid.nombresValid;
  //   let apellidosValid= valid.apellidosValid;
  //   let correoValid = valid.correoValid;
  //   let passwordValid = valid.passwordValid;

  //   const MySwal = withReactContent(Swal)
  //   const toast = MySwal.mixin({
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     timer: 10000,
  //     timerProgressBar: true,
  //     didOpen: (toast) => {
  //       toast.addEventListener('mouseenter', Swal.stopTimer)
  //       toast.addEventListener('mouseleave', Swal.resumeTimer)
  //     }
  //   });  

  //     switch(fieldName) {
  //       case 'nombres':
  //         nombresValid = value.length >= 6;
  //         fieldValidationErrors.nombres = nombresValid ? '' : ' es demasiado corto';
  //         break;
  //       case 'apellidos':
  //         apellidosValid = value.length >= 6;
  //         fieldValidationErrors.apellidos = apellidosValid ? '' : ' es demasiado corto';
  //         break;  
  //       case 'correo':
  //         correoValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  //         fieldValidationErrors.correo = correoValid ? '' : ' es invalido';
  //           toast.fire({
  //             icon: 'error',
  //             title: ''+fieldValidationErrors.correo+'',
  //             confirmButtonText: `Ok`,
  //           })
  //         break;
  //       case 'password':
  //         passwordValid = value.length >= 6;
  //         fieldValidationErrors.password = passwordValid ? '': ' es demasiado corto';
  //           break;
  //       default:
  //         break;
  //     }
  //     setFormErrors(fieldValidationErrors)
  //     setValid({
  //       nombresValid:nombresValid,
  //       apellidosValid:apellidosValid,
  //       correoValid: correoValid,
  //       passwordValid: passwordValid,
  //     })
  // }
  // const errorClass=(error)=> {
  //   return(error.length === 0 ? '' : 'has-error');
  // }
  // const validateForm =()=> {
  //     //--- Para botón Next ---//
  //   this.setState({formValidNext: valid.nombresValid && this.state.apellidosValid});
  //       //--- Para botón Submit ---//
  //   this.setState({formValid: this.state.nombresValid && this.state.apellidosValid && this.state.correoValid && this.state.passwordValid});
  // }
  const handleUserInput =(e)=>{
    const {name, value, files} = e.target;
    if (files != null) {
        setInform({[name]:files[0]})
    }
        setInform({...informacion,[name]:value})
  }
  console.log(informacion)
// const handleUserInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setInform({[name]: value},() => { this.validateField(name, value) });
//   }  
  const enviarDatos=(e)=>{ 
    const MySwal = withReactContent(Swal)
    const toast = MySwal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    e.preventDefault();
    let headersList = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" 
      }

      let bodyContent = JSON.stringify({
        "usuario":informacion.correo,
        "correo":informacion.usuario,
        "password":informacion.password,
        "nombres":informacion.nombres,
        "apellidos":informacion.apellidos,
        "Id_Cliente":informacion.Id_Cliente,
        "id_perfil":informacion.id_perfil,
      });

      let reqOptions = {
        url:process.env.REACT_APP_API_ENDPOINT +'NuevoUsuarios',
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }
      axios.request(reqOptions)
  //   var datos={
  //     usuario:informacion.correo,
  //     correo:informacion.usuario,
  //     password:'KM25987759',
  //     nombres:informacion.nombres,
  //     apellidos:informacion.apellidos,
  //     Id_Cliente:informacion.Id_Cliente,
  //     id_perfil:informacion.id_perfil,
  //   }

  // var token=sessionStorage.getItem('token');
  // // axios.post(process.env.REACT_APP_API_ENDPOINT+'NuevoUsuarios',datos,{
  // axios.post('http://Localhost:3005/VisorCliente_Api/NuevoUsuarios',{
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   },
  //   usuario:informacion.correo,
  //   correo:informacion.usuario,
  //   password:'KM25987759',
  //   nombres:informacion.nombres,
  //   apellidos:informacion.apellidos,
  //   Id_Cliente:informacion.Id_Cliente,
  //   id_perfil:informacion.id_perfil,
  // })
  .then((result) => {
    console.log(result)
    console.log(result.data); 
      setTimeout(() => {
        window.location.href = '/retailservices/management/panel/user'
      }, 3500); 
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

// componentDidMount(){
// // Inicio de animación del formulario
//    var current_fs, next_fs, previous_fs;
//    var left, opacity, scale;
//    var animating;

//    $(".next").on('click',(function(){
//        if(animating) return false;
//        animating = true;

//        current_fs = $(this).parent();
//        next_fs = $(this).parent().next();

//        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//        next_fs.show();
//        current_fs.animate({opacity: 0}, {
//            step: function(now, mx) {

//                scale = 1 - (1 - now) * 0.2;

//                left = (now * 50)+"%";
//                opacity = 1 - now;
//                current_fs.css({
//            'transform': 'scale('+scale+')',
//            'position': 'absolute',
//            'top': '10%'
//        });
//                next_fs.css({'left': left, 'opacity': opacity});
//            },
//            duration: 800,
//            complete: function(){
//                current_fs.hide();
//                animating = false;
//            },
//            easing: 'easeInOutBack'
//        });
//    }));

//    $(".previous").on('click',(function(){
//        if(animating) return false;
//        animating = true;

//        current_fs = $(this).parent();
//        previous_fs = $(this).parent().prev();

//        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//        previous_fs.show();
//        current_fs.animate({opacity: 0}, {
//            step: function(now, mx) {
//                scale = 0.8 + (1 - now) * 0.2;
//                left = ((1-now) * 50)+"%";
//                opacity = 1 - now;
//                current_fs.css({'left': left});
//                previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
//            },
//            duration: 800,
//            complete: function(){
//                current_fs.hide();
//                animating = false;
//            },
//            //this comes from the custom easing plugin
//            easing: 'easeInOutBack'
//        });
//    }));

   

//    // Fin de la animación del formulario
//    const MySwal = withReactContent(Swal)
//    const toast = MySwal.mixin({
//      toast: true,
//      position: 'top-end',
//      showConfirmButton: false,
//      timer: 7000,
//      timerProgressBar: true,
//      didOpen: (toast) => {
//          toast.addEventListener('mouseenter', Swal.stopTimer)
//          toast.addEventListener('mouseleave', Swal.resumeTimer)
//       }
//    });


                  
//   $(document).ready(function () {
//     $('#imagenes').change(async function () {
//         var imagen = document.getElementById("imagenes").files;
//         for (let x = 0; x < imagen.length; x++) {
//             loadImage(imagen[x]);
//             console.log(imagen)
//         }
//     });
//   });
//   function loadImage(imagen) {
//       var _URL = window.URL || window.webkitURL;
//       var img = new Image();
//       img.src = _URL.createObjectURL(imagen);
//       img.alt = imagen.name;
//       img.onload = function () {
//           var ancho = img.width;
//           var alto = img.height
          
//           let medida =  parseInt(ancho*alto);
          
//           var imagenValid = 8100;
//           let Errors = medida <= imagenValid
//           console.log(img)
          
//           switch (Errors) {
//             case false:
//               toast.fire({
//                 icon: 'error',
//                 title: 'La imagen insertada es muy Grande',
//                 confirmButtonText: `Ok`,
//               })
//               break;
          
//             default:
//               break;
//           }
          
          
//       }
//   }              
// }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleContinue = () => {
    setActiveStep(0);
  };
  const handleRegister=()=>{
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    enviarDatos()
  }

// const handleStep = (step) => () => {
//   setActiveStep(step);
// };


    return(
      <Box sx={{ width: '85%', height:'90%'}}>
        <Stepper orientation="vertical" activeStep={activeStep}>
            <Step>
              <StepLabel>Datos de Usuario</StepLabel>
              <StepContent>
                <Box className={style.boxStep}>
                    <TextField className={style.textField} id="outlined-multiline-flexible" label="Nombres"
                      value={informacion.nombres} name={'nombres'}
                      onChange={(e)=>handleUserInput(e)}
                    />
                    <TextField className={style.TextField} id="outlined-multiline-flexible" label="Apellidos"
                      value={informacion.apellidos} name={'apellidos'}
                      onChange={(e)=>handleUserInput(e)}
                    />
                    <TextField className={style.textField} id="outlined-multiline-flexible" label="Nombre Retail"
                      value={informacion.nRetail} name={'nRetail'}
                      onChange={(e)=>handleUserInput(e)}
                    />
                    <TextField className={style.textField} id="outlined-multiline-flexible" label="Género"
                      value={informacion.genero} name={'genero'} select 
                      onChange={(e)=>handleUserInput(e)}
                    >
                      <MenuItem key={0} value='0' sx={{ display: 'flex', alignItems: 'center' }}>Femenino</MenuItem>
                      <MenuItem key={0} value='1' sx={{ display: 'flex', alignItems: 'center' }}>Masculino</MenuItem>
                    </TextField>
                    <TextField className={style.textField} id="outlined-multiline-flexible" label="Cargo"
                      value={informacion.cargo} name={'cargo'}
                      onChange={(e)=>handleUserInput(e)}
                    />
                    <TextField className={style.textField} id="outlined-multiline-flexible" label="Teléfono"
                      value={informacion.cell} name={'cell'} type='tel'
                      onChange={(e)=>handleUserInput(e)}
                    />
                    <TextField className={style.textField} id="outlined-multiline-flexible" label="Correo Electrónico"
                      value={informacion.correo} name={'correo'} type='email'
                      onChange={(e)=>handleUserInput(e)}
                    />
                    <TextField className={style.textField} id="outlined-multiline-flexible" label="Ciudad/Estado de Residencia"
                      value={informacion.ciudad} name={'ciudad'}
                      onChange={(e)=>handleUserInput(e)}
                    />
                </Box>
                
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button onClick={handleNext}>Siguiente</Button>
              </Box>  
              </StepContent>
            </Step>
            <Step sx={{height:'100%'}}>
              <StepLabel>Crear de Usuario</StepLabel>
              <StepContent sx={{height:'100%'}}>
                <Box className={style.boxStep} sx={{height:'50%'}}>
                  <TextField className={style.textField} id="outlined-multiline-flexible" label="Usuario"
                    value={informacion.usuario} name={'usuario'}
                    onChange={(e)=>handleUserInput(e)}
                  />
                  <TextField className={style.textField} id="outlined-multiline-flexible" label="Id Usuario"
                    value={informacion.Id_Cliente} name={'Id_Cliente'}
                    onChange={(e)=>handleUserInput(e)}
                  />
                  <TextField className={style.textField} id="outlined-multiline-flexible" label="Id Perfil"
                  value={informacion.id_perfil} name={'id_perfil'}
                  onChange={(e)=>handleUserInput(e)}
                  />
                  <Button aria-label="upload picture" component="label" startIcon={<PhotoCameraRounded/>} style={{minWidth:230, border:'solid 1px rgb(196,196,196)'}}>
                    <input hidden accept=".jpg,.jpeg, .png" type="file"  value={informacion.avatar} name={'avatar'} onChange={(e)=>handleUserInput(e)}/>
                    <label style={{fontSize:16, color:'#666', textTransform:'none'}}>Imagen</label>
                  </Button>
                </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button onClick={handleBack}>Regresar</Button>
                <Button onClick={enviarDatos}>Enviar</Button>
              </Box>  
              </StepContent>
            </Step>
        </Stepper>
        {activeStep === 2?(
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Se ha realizado el registro con Exito</Typography>
            <Button onClick={handleContinue} sx={{ mt: 1, mr: 1 }}>
                Registrar un Nuevo Usuario
            </Button>
          </Paper>
        ):''}
      </Box>
        )
  }

const styles = makeStyles({
  boxStep:{
    height: '75%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 25%))',
    gridTemplateRows:'repeat(auto-fit, minmax(60px, 25%))',
    justifyItems:'center'
  },
  textField:{
    overflow: 'visible !important',
    width: '80%',
  },
})