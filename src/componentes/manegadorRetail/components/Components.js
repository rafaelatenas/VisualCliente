import {Tooltip,Chip,IconButton,Divider,Accordion,AccordionSummary,Typography,List,Paper,} from "@material-ui/core";
import {ListItem,Button,Avatar,AccordionDetails,Toolbar,Card,CardHeader,CardActions,Box,TextField,Stack, Select, FormControl, InputLabel} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/styles";
import logoatenas from "../../../landing/Images/ATSLOGO.png";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./componentes.css";
import { useAuthContext } from "../../context/authContext";
import cargando from "../../../landing/favicon/loader.svg";
import logoAtenienses from "../../../landing/Images/ats_logo.png"

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "60%",
        width: "16%",
      },
    },
  };
export function HeaderComponent() {
  return (
    <div style={{ width: "90%", height: "100%", gridColumn: "2/3" }}>
      <img
        style={{ width: "90%", height: "100%" }}
        src={logoatenas}
        alt="Atenas Logo"
      ></img>
    </div>
  );
}
export function BotonUsuario(open) {
  const styles = useStyles();
  return (
    <Toolbar className={`${styles.Toolbar} toolbar`}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={open.handleDrawerOpen}
        edge="start"
        // sx={{mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon style={{ fontSize: "35px", fill: "#fff" }} />
      </IconButton>
    </Toolbar>
  );
}
/* Componentes Drawer */
export function DrawerHeaderComponent(props) {
  const { handleDrawerClose } = props;
  return (
    <DrawerHeader>
      <Stack style={{ width: "70%", height: "100%", justifyContent: "center" }}>
        <Tooltip
          title={sessionStorage.getItem("Retail")}
          arrow
          placement="right"
          style={{ minHeight: 36, height:'65%', borderRadius:'2em' }}
        >
          <Chip
            avatar={
              <Avatar
                sx={{minHeight: 30,maxHeight: 50,minWidth: 30,maxWidth: 50}}
                src={logoAtenienses}
                alt={sessionStorage.getItem('Retail')}
              />
            }
            label={sessionStorage.getItem("Retail")}
            variant="outlined"
          ></Chip>
        </Tooltip>
      </Stack>
      <IconButton
        style={{
          margin: "0",
          padding: "0",
          background: "#F6B232",
          borderRadius: ".3em",
          width: "12%",
          height: "50%",
          minHeight: 40,
          minWidth: 40,
        }}
        onClick={handleDrawerClose}
      >
        <MenuIcon
          style={{
            fontSize: "35px",
            fill: "#fff",
            width: "auto",
            height: "auto",
          }}
        />
      </IconButton>
    </DrawerHeader>
  );
}
export function MySelecctionComponent(params) {
  const { ValueFiltros, data, handleDelete, handleChange, expanded } = params;
  return (
    <Accordion
      style={{
        margin: "0",
        padding: "0% 0 2%",
        width: "70%",
        height: "auto",
        maxHeight: "30%",
        boxShadow: "none",
      }}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        style={{
          minHeight: "4%",
          color: "#03508f",
          width: "100%",
          border: ".1em solid #000",
          borderRadius: "1.5em",
        }}
        expandIcon={<ExpandMore style={{ fill: "#03508f" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className="misSelect">Mis Selecciones</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: " 0 0 5%",
            m: 0,
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          component="ul"
        >
          {data.map((value) => (
            <ListItem
              style={{ width: "auto", paddingLeft: "1%", paddingRight: "1%" }}
            >
              <Chip
                style={{
                  background: "#F6B232",
                  color: "#fff",
                  borderRadius: "1em",
                }}
                label={value.nombre}
                onDelete={() => handleDelete(value)}
                onClick={() => ValueFiltros(value)}
              />
            </ListItem>
          ))}
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
}
export function SelecctionRetail(params) {
    const {selectedOptionRetail,setSelectedOptionRetail,setSelectedOption,selectedOptions,Retail}=params
    
    const handlePeriodos = (event) => {
      let algo = []
        const { value } = event.target;
        setSelectedOptionRetail(value);
        for (const i in selectedOptions) {
            const element = selectedOptions[i];
            if (element.length !==0) {
              algo.push(i)
              console.log(algo.push(i))
              // setSelectedOption({...selectedOptions, [i]:[]})
          }
          
        }
        
      };
    return (
        <FormControl
          style={{
              overflow: "visible",
              margin: "2% 0 1%",
              borderRadius: "1.5em",
              width: "90%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
          }}
        >
          <InputLabel
          size={"small"}
          id="mutiple-select-label"
          >
            Retailers
          </InputLabel>
            <Select
                label="Retailers"
                labelId="mutiple-select-label"
                multiple={false}
                name="Retail"
                value={selectedOptionRetail}
                onChange={handlePeriodos}
                sx={{
                    width: "100%",
                    overflow: "visible",
                    borderRadius: "2em",
                    "& div": { borderRadius: "1.5em", "& div": { p: 1.5 } },
                  }}
                MenuProps={MenuProps}
            >
            {Retail.length > 0 ? (
                Retail.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                    {option.nombre}
                    </MenuItem>
                ))
                ) : (
                <Box
                    sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <img src={cargando} alt="Cargando..." title="" />
                </Box>
            )}
            </Select>
        </FormControl>
    );
}
export function CardComponents(props) {
  const styles = useStyles();
  const {
    selectedOptionRetail,
    DeletePeriodo,
    botonreporte,
    setData,
    peticionMeses,
    peticionSemanas,
    peticionSemestres,
    peticionTrimestres,
    seleccionarPeriodo,
  } = props;
  const disabledOptionRetail = parseInt(sessionStorage.getItem("Id_Cliente")) === 11 && selectedOptionRetail === null;
  return (
    <Card
      className={`${styles.reporte} reporte`}
      style={{ borderRadius: "1.5em" }}
    >
      <CardHeader
        style={{ padding: "5% 0 3%", color: "#03508f", fontSize: "1em" }}
        title="REPORTE"
      />
      <Divider style={{ width: "70%", background: "rgb(0 0 0 / 38%)" }} />
      <CardActions
        style={{
          display: "flex",
          padding: "0",
          flexDirection: "column",
          width: "80%",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          style={{ background: botonreporte.semanas ? "#F6B232" : "#03508f" }}
          onClick={() => {
            var parametro = "Semanas";
            seleccionarPeriodo(parametro);
            peticionSemanas();
            DeletePeriodo();
            setData([]);
          }}
          className={styles.botonReportes}
          disabled={disabledOptionRetail}
        >
          SEMANAL
        </Button>
        <Button
          className={styles.botonReportes}
          disabled={disabledOptionRetail}
          onClick={() => {
            var parametro = "Meses";
            seleccionarPeriodo(parametro);
            peticionMeses();
            DeletePeriodo();
            setData([]);
          }}
          style={{ background: botonreporte.meses ? "#F6B232" : "#03508f" }}
        >
          MENSUAL
        </Button>
        <Button
          className={styles.botonReportes}
          disabled={disabledOptionRetail}
          onClick={() => {
            var parametro = "Trimestres";
            seleccionarPeriodo(parametro);
            peticionTrimestres();
            DeletePeriodo();
            setData([]);
          }}
          style={{
            background: botonreporte.trimestres ? "#F6B232" : "#03508f",
          }}
        >
          TRIMESTRAL
        </Button>
        <Button
          className={styles.botonReportes}
          disabled={disabledOptionRetail}
          onClick={() => {
            var parametro = "Semestres";
            seleccionarPeriodo(parametro);
            peticionSemestres();
            DeletePeriodo();
            setData([]);
          }}
          style={{ background: botonreporte.semestres ? "#F6B232" : "#03508f" }}
        >
          SEMESTRAL
        </Button>
      </CardActions>
    </Card>
  );
}
export function MenuAtenas(params) {
  const { anchorEl, handleClick } = params;
  const { logout } = useAuthContext();
  const styles = useStyles();
  const openo = Boolean(anchorEl);
  const id = openo ? "simple-popover" : undefined;
  return (
    <List className={styles.list}>
      <ListItem className={styles.listItem}>
        <div className={styles.popOver}>
          <Button
            className="buttonPopover"
            style={{
              width: "100%",
              minHeight: 30,
              borderRadius: "1.5em",
              margin: ".3em 0",
              padding: "0px !important",
            }}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            Opcion de Menu 1
          </Button>
          {/* <Menu
                                style={{width:'100%', height:'100%'}}
                                id={open.id}
                                open={open.openo}
                                anchorEl={open.anchorEl}
                                onClose={open.handleClose}
                            >
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP2</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP3</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP4</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP5</MenuItem>
                            </Menu> */}
          <Button
            className="buttonPopover"
            style={{
              width: "100%",
              minHeight: 30,
              borderRadius: "1.5em",
              margin: ".3em 0",
              padding: "0px !important",
            }}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            Opcion de Menu 2
          </Button>
          {/* <Menu
                                style={{width:'100%', height:'100%'}}
                                id={open.id}
                                open={open.openo}
                                anchorEl={open.anchorEl}
                                onClose={open.handleClose}
                            >
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP2</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP3</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP4</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP5</MenuItem>
                            </Menu> */}
          <Button
            className="buttonPopover"
            style={{
              width: "100%",
              minHeight: 30,
              borderRadius: "1.5em",
              margin: ".3em 0",
              padding: "0px !important",
            }}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            Opcion de Menu 3
          </Button>
          {/* <Menu
                                style={{width:'100%', height:'100%'}}
                                id={open.id}
                                open={open.openo}
                                anchorEl={open.anchorEl}
                                onClose={open.handleClose}
                            >
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP2</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP3</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP4</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP5</MenuItem>
                            </Menu> */}
          <Button
            className="buttonPopover"
            style={{
              width: "100%",
              minHeight: 30,
              borderRadius: "1.5em",
              margin: ".3em 0",
              padding: "0px !important",
            }}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            Opcion de Menu 4
          </Button>
          {/* <Menu
                                style={{width:'100%', height:'100%'}}
                                id={open.id}
                                open={open.openo}
                                anchorEl={open.anchorEl}
                                onClose={open.handleClose}
                            >
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP2</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP3</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP4</MenuItem>
                                <MenuItem className={styles.MenuItem} onClick={(e)=>{handleDirectURL(e)}}>WOP5</MenuItem>
                            </Menu> */}
          <Button
            className="buttonPopover"
            style={{
              width: "100%",
              minHeight: 30,
              borderRadius: "1.5em",
              margin: ".3em 0",
              padding: "0px !important",
            }}
            aria-describedby={id}
            variant="contained"
            onClick={() => logout()}
          >
            Salir
          </Button>
        </div>
      </ListItem>
    </List>
  );
}
const drawerWidth = 15;
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "30%",
    height: "40%",
    minHeight: "300px",
    padding: "2%",
    border: "1.3px solid #000",
    background: "#ffefd5",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1em",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  agrupar: {
    display: "flex",
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
    flexDirection: "column",
    overflow: "visible",
  },
  inputMaterial: {
    width: "95%",
    height: "100%",
  },
  list: {
    width: "80%",
    height: "40%",
    display: "inline-flex",
    flexDirection: "column",
  },
  listItem: {
    padding: "5% 0",
    justifyContent: "center",
    width: "auto",
  },
  popOver: {
    width: "90%",
    borderRadius: "1.5em",
    height: "100%",
    background: "transparent",
    display: "inline-flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  MenuItem: {
    width: "100%",
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center !important",
  },
  Toolbar: {
    width: "5%",
    height: "20%",
    justifyContent: "space-evenly",
    flexDirection: "column",
    padding: "0 !important",
  },
  Stack: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  Avatar: {
    minHeight: 50,
    minWidth: 50,
    maxWidth: 100,
    maxHeight: 100,
  },
  buttons: {
    position: "absolute",
    top: "90%",
    right: "3%",
    width: "30%",
    justifyContent: "space-around",
    height: "5%",
  },
  botonReportes: {
    color: "#fff !important",
    borderRadius: "1.5em !important",
    width: "90% !important",
    height: "20%",
    minHeight: "20px",
    padding: "1% !important",
    margin: "0 !important",
  },
  reporte: {
    borderRadius: "1.5em",
    width: "70%",
    height: "30%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: "1.5% 0",
    border: "1px solid #03508f !important",
  },
  Collapse: {
    position: "absolute",
    width: "100%",
    height: "auto",
  },
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-evenly",
  width: "100%",
}));
