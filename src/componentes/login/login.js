/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { TextField, FormControl, InputLabel, OutlinedInput, Box, FormHelperText, Modal, InputAdornment, FormGroup, FormControlLabel, Checkbox, FormLabel, Container, Typography} from '@mui/material';
import { EmailOutlined, Visibility, VisibilityOff} from '@material-ui/icons';
import { makeStyles } from "@material-ui/styles";
import { IconButton, Button} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import LogoCuadro from '../../landing/Images/logo-cauadro.webp'
import CuadroFondoBlanco from '../../landing/Images/CuadroFondoBlanco.webp'
import atenaslogoEliseBlanca from '../../landing/Images/ATSElise.webp'
import atenasLogo from '../../landing/Images/ATSLOGO.webp'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/authContext';

const recaptchaRef = React.createRef();

function Login (){
  const style = styles()
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
        console.log(result.data)
      }
    }).catch(err => {
        if(err.response) {
          console.log(err.response)
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
    <section className={style.login}>
      <Box id='card-login' className={style.cardLogin}>
        <FormControl className={style.form}>
          <img width={'80%'} height={'auto'} className={style.logoLogin} src={atenaslogoEliseBlanca} alt="Logo Atenas" title=''/>
          <TextField error={formErrors.Email === ''? false: true} helperText={formErrors.Email} className={formErrors.Email === ''? style.email: `${style.email} ${style.error}`} 
              variant="outlined" label="Correo" type='text' name='Email' value={email} onChange={(e)=>handleUserEmail(e)}/>
            <FormControl error={formErrors.Password === ''? false: true} className={formErrors.Password === ''? style.password: `${style.password} ${style.error}`} >
              <InputLabel  style={{ zIndex:'30',background:'transparent'}} htmlFor="outlined-adornment-password">Clave</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={showPassword?  'text' : 'password'} name='Password' value={password} onChange={(e)=>handleUserPassword(e)}
                endAdornment={
                <IconButton style={{width:'10%',height:'100%', margin:-7}} aria-label="toggle password visibility" onClick={handleClickShowPassword}  position="end">
                  {showPassword ? <VisibilityOff className={style.iconVisibility}/> : <Visibility className={style.iconVisibility}/>}
                </IconButton>
                }
              />
              <FormHelperText>{formErrors.Password}</FormHelperText>
            </FormControl>
            <Button className={style.button} variant="outlined" disabled={false} onClick={enviarDatos}>Confirmar</Button> 
        </FormControl>
          <Button className={style.recovery} onClick={()=>openModalPassword()}>
            <p>¿Olvido su Clave?</p>
          </Button>
          
      </Box>
      <Modal
        className={style.ModalRecovery}
        open={open}
        onClose={()=>openModalPassword()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container className={style.containerRecovery}>
          <Box className={style.boxRecovery}>
            <img className={style.logoLogin} src={atenasLogo} alt="Logo Atenas" title=''/>
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

const styles = makeStyles(()=>({
  login:{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cardLogin:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'column',
      backgroundImage: `url(${LogoCuadro})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      marginBottom: '1%',
  },
  email:{
    height: 'auto',
    overflow: 'visible',
    '& div':{
      width: '100%',
      height: '100%',
      borderRadius: '2em',
      backgroundColor: '#fff',
    },
    '& label':{
      top:-8,
    }
  },
  password:{
    height: 'auto',
    overflow: 'visible',
    '& div':{
      width: '100%',
      height: '100%',
      borderRadius: '2em',
      backgroundColor: '#fff',
    },
    '& label':{
      top:-8,
    }
  },
  button:{
      width: '50%',
      borderRadius: '2em !important',
      backgroundColor: '#F6B232 !important',
      color: '#fff !important',
  },
  adorment:{
      height: '100%',
      width: 'auto',
  },
  recovery:{
    '& p':{
      fontSize:18,
      color:'#fff'
    }
  },
  ModalRecovery:{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  containerRecovery:{
      backgroundImage: `url(${CuadroFondoBlanco})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      width: '50%',
      height: '60%',
      minWidth: 400,
      maxWidth: '500px !important',
      display: 'flex !important',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 !important',
  },
  boxRecovery:{
      width: '73%',
      height: '95%',
      maxHeight: 490,
      minWidth: 365,
      maxWidth: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'column',
  },
  '@media screen and (orientation: portrait)':{
    cardLogin:{
      maxHeight:450,
      maxWidth:350
    },
    '@media screen and (max-width:576px)':{
      cardLogin:{
        width: '80%',
        height: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minWidth: 250,
        backgroundSize: '100% 80%',
      },
      logoLogin:{
        width: '70%',
        height: 'auto',
        maxWidth: 250,
      },
      form:{
        width: '85%',
        height: '65%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
      email:{
        width: '90%',
        height: '10%',
        margin:'0 0 4% 0 !important',
        minHeight:30,
        "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":{
          "-webkit-transform": 'translate(14px, 10px) scale(1)',
          "-moz-transform": 'translate(14px, 10px) scale(1)',
          "-ms-transform": 'translate(14px, 10px) scale(1)',
          transform: 'translate(14px, 10px) scale(1)',
        },
      },
      password:{
        width: '90%',
        height: '10%',
        minHeight:30,
        "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":{
          "-webkit-transform": 'translate(14px, 10px) scale(1)',
          "-moz-transform": 'translate(14px, 10px) scale(1)',
          "-ms-transform": 'translate(14px, 10px) scale(1)',
          transform: 'translate(14px, 10px) scale(1)',
        },
      },
      error:{
        height: '10%',
        minHeight: 53,
        '& .css-1wc848c-MuiFormHelperText-root.Mui-error':{
          overflow:'visible'
        }
      },
      /*Styles Recaptcha*/
      '#rc-imageselect':{
        display: 'inline'
      },
      'g-recaptcha':{
        display: 'inline',
        '& & div':{
          width: '100% !important',
          height: 78,
          transform:'scale(0.77)', 
          '--webkit-transform':'scale(0.77)',
          textAlign: 'center',
          position: 'relative',
        },
      },
      '#rc-imageselect':{
          maxWidth: '100%',
      },
      recovery:{
        '& p':{
          fontSize:12,
          color:'#fff'
        }
      },
      '@media screen and (max-height:600px)':{
        cardLogin:{
          height:'70%'
        },
        email:{
          "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":{
            "-webkit-transform": 'translate(14px, 5px) scale(1)',
            "-moz-transform": 'translate(14px, 5px) scale(1)',
            "-ms-transform": 'translate(14px, 5px) scale(1)',
            transform: 'translate(14px, 5px) scale(1)',
          },
          '& label':{
            fontSize:13,
            top:0,
          },
        },
        password:{
          "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":{
            "-webkit-transform": 'translate(14px, 5px) scale(1)',
            "-moz-transform": 'translate(14px, 5px) scale(1)',
            "-ms-transform": 'translate(14px, 5px) scale(1)',
            transform: 'translate(14px, 5px) scale(1)',
          },
          '& label':{
            fontSize:13,
            top:0
          },
        }
      }
    },
    '@media screen and (min-width: 577px )and (max-width:768px)':{
      cardLogin:{
          width: '60%',
          height: '80%',
          backgroundSize: '100% 100%',
          justifyContent: 'center',
          maxWidth:400
      },
      logoLogin:{
          width: '90%',
          height: 'auto',
          maxWidth: 287,
      },
      form:{
          width: '85%',
          height: '85%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
      },
      email:{
        width: '90%',
        height: '10%',
        '& label':{
          top:-5,
          fontSize: '1.2em',
        }
      },
      password:{
        width: '90%',
        height: '10%',
        '& label':{
          top:-5,
          fontSize: '1.2em',
        }
      },
      error:{
          height: '10%',
          minHeight: 67,
      },
      button:{
          height: '10%',
          maxHeight: 70,
          fontSize: '1.2em !important'
      },
      recovery:{
        '& p':{
          fontSize:16,
          color:'#fff'
        }
      },
      
    },
    '@media screen and (min-width:769px) and (max-width:992px)':{
      cardLogin:{
          width: '60%',
          height: '80%',
          backgroundSize: '100% 100%',
          justifyContent: 'center',
          maxWidth:450
      },
      logoLogin:{
          width: '90%',
          height: 'auto',
          maxWidth: 287,
      },
      form:{
          width: '85%',
          height: '85%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
      },
      email:{
        width: '90%',
        height: '10%',
        '& label':{
          top:-5,
          fontSize: '1.2em',
        }
      },
      password:{
          width: '90%',
          height: '10%',
          '& label':{
          top:-5,
          fontSize: '1.2em',
        }
      },
      error:{
          height: '10%',
          minHeight: 67,
          '& p':{
            height:'50%'
          }
      },
      button:{
          height: '10%',
          maxHeight: 70,
          fontSize: '1.2em !important'
      },
    },
    '@media screen and (min-width:993px) and (max-width:1450px)':{
      cardLogin:{
          width: '50%',
          height: '80%',
          justifyContent: 'center',
          backgroundSize: '100% 90%',
          minWidth:430,
          maxHeight:500
      },
      logoLogin:{
          width: '80%',
          height: 'auto',
          maxWidth: 380,
      },
      form:{
          width: '85%',
          height: '70%',
          alignItems: 'center',
          justifyContent: 'space-between',
      },
      email:{
        width: '90%',
        height: '10%',
        '& label':{
          fontSize: '1.6em',
          top: 0,
        }
      },
      password:{
          width: '90%',
          height: '10%',
          '& label':{
            fontSize: '1.6em',
            top: 0,
        }
      },
      error:{
          height: '10%',
          minHeight: 67,
          '& p':{
            fontSize: '1em',
            height: '50%',
          }
      },
      iconVisibility:{
          fontSize: '1.5em !important'
      },
      button:{
          height: '10%',
          maxHeight: 70,
          fontSize: '1.6em !important',
      }
    },
  },
  '@media screen and (orientation: landscape)':{
    '@media screen and (min-width:993px) and (max-width:1450px)':{
    cardLogin:{
        height: '80%',
        justifyContent: 'center',
        width: '40%',
        backgroundSize: '80%',
    },
    logoLogin:{
        width: '70%',
        height: 'auto',
        maxWidth: 380,
    },
    form:{
        width: '65%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    email:{
      width: '90%',
      height: '10%',
    },
    password:{
        width: '90%',
        height: '10%',
    },
    error:{
        height: '10%',
        minHeight: 67,
        '& p':{
          fontSize: '1em',
          height: '50%',
        }
    },
    button:{
        height: '10%',
        maxHeight: 70
    },
    '@media screen and (orientation: landscape)':{
      form:{
          width: '65%',
          height: '85%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          maxHeight: 320,
          minHeight: 283,
      }
    },
  },
  
  '@media screen and (min-width:1451px)':{
    cardLogin:{
        width: '40%',
        height: '80%',
        justifyContent: 'center',
        maxWidth: 690,
    },
    logoLogin:{
        width: '80%',
        height: 'auto',
        maxWidth: 460,
    },
    form:{
        width: '65%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        maxWidth: 760,
        maxHeight: 590,
    },
    email:{
      width: '90%',
      height: '10%',
      '& label':{
        fontSize: '1.3em',
        top: 0,
      }
    },
    password:{
        width: '90%',
        height: '10%',
        '& label':{
          fontSize: '1.3em',
          top: 0,
      }
    },
    error:{
      height: '10%',
      minHeight: 67,
    },
    iconVisibility:{
        fontSize: '1.3em !important'
    },
    button:{
        height: '10%',
        maxHeight: 70,
        fontSize: '1.3em !important'
    },
  }
  },
  
}))