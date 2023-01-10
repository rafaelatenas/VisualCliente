import { Box, Button, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import atenasLogo from '../../../landing/Images/ATSLOGO.png'
import CuadroFondoBlanco from '../../../landing/Images/CuadroFondoBlanco.png'

import React, { useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/styles";
import { createRef } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const recaptcharef = React.createRef();
const MySwal = withReactContent(Swal);
const toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export function  ModalRecovery(params) {
  const {setOpen}=params
    const style = styles()
    const [validToken, setValidToken] = useState(false)
    const [formErrors, setFormErrors] = useState({
        correo: '',
        nuevaClave: '',
        confirmNuevaClave:''
    })
    const [input, setInput]=useState({
        correo:[],
        nuevaClave:[],
        confirmNuevaClave:[]
    })
    const handleChangeInput=(e)=>{
        const {name, value}=e.target;
        setInput({...input, [name]:value})
        validateField(name, value)
    }
    const validateField = (fieldName, value) => {
        let fieldValidationErrors = formErrors;
        let correoValid
        let nuevaClaveValid
        let ConfirmNuevaClaveValid
        
        switch(fieldName) {
          case 'correo':
            correoValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            console.log(correoValid)
            fieldValidationErrors.correo = correoValid ? '' : 'Correo invalido';
            setFormErrors({...formErrors,'correo': fieldValidationErrors.correo})
            if (correoValid !== null) {
              onSubmitWithReCAPTCHA()
            }
            break;
          default:
            break;
        }
    }

    const onSubmitWithReCAPTCHA = async () => {
        const recaptcha = recaptcharef.current;
        const responseCaptcha =  {captcha: await recaptcha.executeAsync(), size:recaptcha.props.size};
        const value = responseCaptcha.captcha
        if (value !== null) {
          isHuman(responseCaptcha)
        }
    }
    const isHuman=(valueResponse)=>{
        axios.post(process.env.REACT_APP_API_ENDPOINT+"ValidationCaptcha",valueResponse)
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
    const handleEnviar = async () => {
        let headersList = {
            "Content-Type": "application/json",
        };
        let bodyContent = JSON.stringify({
          Correo:input.correo,
        });
        let reqOptions = {
          url: process.env.REACT_APP_API_ENDPOINT + "VerificarCorreo",
          method: "POST",
          headers: headersList,
          data: bodyContent,
        };
        await axios
        .request(reqOptions)
        .then((response) => {
          switch (response.status) {
            case 200:
              setOpen(false)
              toast.fire({
                  icon: "warning",
                  title: "" + response.data.message,
              });
              break;
            case 201:
              
              toast.fire({
                  icon: "warning",
                  title: "" + response.data.message,
              });
              break;          
            default:
              toast.fire({
                    icon: "warning",
                    title: "" + response.data.message,
                });
              break;
          }
        })
        .catch((error) => {
            if (error.response.status === 400 || 500) {
            toast.fire({
                icon: "error",
                title: "" + error.response.data.message,
            });
            }
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        });
        console.log(bodyContent)
    }
    return(
        <Container className={style.containerRecovery}>
          <Box className={style.boxRecovery}>
            <img className={style.logoRecovery} src={atenasLogo} alt="Logo Atenas" title=''/>
            <TextField error={formErrors.correo === ''? false: true} sx={{width:'95%', overflow:'visible'}} 
              helperText={formErrors.correo} className={formErrors.correo === ''? style.email: `${style.email} ${style.error}`} 
              variant="outlined" label="Correo" type='email' name='correo' value={input.correo} onChange={(e)=>handleChangeInput(e)}
            />
            <ReCAPTCHA 
              className="recaptcha"
              sitekey={'6Lew_48iAAAAAFbTFcQf7WgN8AEfIXw9dZfndnKu'}
              size="invisible"
              ref={recaptcharef}
            />
            <Button variant="contained" disabled={!validToken} onClick={handleEnviar}>Confirmar</Button>
         </Box>
        </Container>
    )
}
const styles = makeStyles(()=>({
    containerRecovery:{
        backgroundImage: `url(${CuadroFondoBlanco})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '50%',
        height: '35%',
        minWidth: 360,
        maxWidth: '500px !important',
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 !important',
    },
    boxRecovery:{
      width: '65%',
      height: '85%',
      maxHeight: 490,
      minWidth: 250,
      maxWidth: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'column',
  },
  logoRecovery:{
    width: '70%',
    height: 'auto',
    maxWidth: 250,
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
            height: '15%',
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
            display: 'inline',
            maxWidth: '100%',
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
          containerRecovery:{
            height:'35%'
          },
          boxRecovery:{
            height:'90%'
          },
          recovery:{
            '& p':{
              fontSize:12,
              color:'#fff'
            }
          },
          gruopConfirm:{
            width: '65%',
            height: 'auto',
            maxWidth: 260,
            minHeight:60,
            '& p':{
              fontSize:12
            },
            '& label':{
              width: '65%',
              height: 'auto',
              maxWidth: 260,
              margin: 0,
              '& span':{
                fontSize:12
              },
            },
          },
          confirmRecovery:{
    
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
                fontSize:12,
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
                fontSize:12,
                top:0
              },
            }
          },
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
              fontSize: 12,
            }
          },
          password:{
            width: '90%',
            height: '10%',
            '& label':{
              fontSize: 12,
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
            height: '15%',
            '& label':{
              fontSize: 12,
            }
          },
          password:{
              width: '90%',
              height: '10%',
              '& label':{
              fontSize: 12,
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
              fontSize: 12,
            }
          },
          password:{
              width: '90%',
              height: '10%',
              '& label':{
                fontSize: 12,
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
        logoRecovery:{
          width: '50%'
        },
        '@media screen and (min-width:993px) and (max-width:1450px)':{
          cardLogin:{
              height: '80%',
              justifyContent: 'center',
              width: '35%',
              backgroundSize: '80%',
              minHeight:250
          },
          logoLogin:{
              width: '70%',
              height: 'auto',
              maxWidth: 380,
          },
          form:{
              width: '60%',
              height: '65%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              maxHeight:310,
              minHeight:250
          },
          email:{
            width: '90%',
            height: '15%',
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
          emailRecovery:{
            width: '90%',
            height: '15%',
            maxWidth: 270,
            maxHeight: 60,
            overflow:'visible',
            '& div':{
              width: '100%',
              height: '100%',
              borderRadius: '2em',
              backgroundColor: '#fff',
            },
          },
          gruopConfirm:{
            '& p':{
              fontSize:12
            },
            '& label':{
              '& span svg':{
                fontSize:'1.5em'
              }
            },
            '& span':{
              fontSize:12
            }
          }
        },
        '@media screen and (min-width:1451px)':{
          cardLogin:{
            width: '40%',
            height: '80%',
            justifyContent: 'center',
            maxWidth: 690,
            maxHeight:490,
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
            width: '75% !important',
            height: '15%',
            '& label':{
              fontSize: 12,
            }
          },
          password:{
            width: '90%',
            height: '10%',
            '& label':{
              fontSize: 12,
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
        },
      },
}))