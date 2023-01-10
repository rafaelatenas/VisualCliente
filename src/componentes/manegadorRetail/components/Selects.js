import {
  Box,
  InputLabel,
  FormControl,
  Chip,
  Select,
  MenuItem,
  ListItem,
  Checkbox,
  ListItemText,
  TextField,
  ListSubheader,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Search } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import "./select.css";
import cargando from "../../../landing/favicon/loader.svg";

const todas = [{ id: "all", nombre: "Marcar Todas" }];

export function SelectPeriodos(params) {
  const { data, handleChangeValue, handleClose, handleOpen, openFiltro, tiempoReporte, value, disabled } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search ? todas.concat(data) : todas.concat(data).filter((dato) => dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
  let { Canales, Areas, Zona, Cesta, Categorias, Fabricante, Marca, Segmento, Tamanno, RTamanno, Producto, CodBarra, Nacionalidad, Indicador } = disabled;
  let elementDisabled = Canales || Areas || Zona || Cesta || Categorias || Fabricante || Marca || Segmento || Tamanno || RTamanno || Producto || CodBarra || Nacionalidad || Indicador;
  const OptionPeriodo = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
          checked={
            (value.length > 0 && value.length === datos.length - 1) ||
            value.indexOf(option.id) > -1
          }
          indeterminate={
            option.id === "all"
              ? value.length > 0 && value.length < datos.length - 1
              : ""
          }
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));

  return (
    <Box
      style={{
        border: ".1em solid rgb(87 87 86/11%)",
        background: "#f7f4f4",
        borderRadius: "1.5em",
        width: "15%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <InputLabel style={{ width: "auto", padding: "10% 0 5%", fontSize: 18 }}>
        PERÍODOS
      </InputLabel>
      <FormControl
        sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
        disabled={Boolean(elementDisabled)}
        className={classes.formControl}
      >
        <InputLabel
          size={"small"}
          className={classes.inputLabel}
          id="mutiple-select-label"
        >
          {tiempoReporte}
        </InputLabel>
        <Select
          labelId="mutiple-select-label"
          multiple
          name="Periodo"
          value={value}
          open={openFiltro}
          onChange={handleChangeValue}
          onClose={() => handleClose("Periodo")}
          onOpen={() => handleOpen("Periodo")}
          renderValue={(selected) => {
            if (selected.length >= 2 && selected.length < datos.length) {
              return (
                <ListItemText
                  sx={{ "& span": { fontSize: "10px" } }}
                  primary={`${selected.length} Opciones Marcadas`}
                />
              );
            } else if (selected.length === datos.length) {
              return (
                <ListItemText
                  sx={{ "& span": { fontSize: "10px" } }}
                  primary={`Todas Marcadas (${selected.length})`}
                />
              );
            } else if (selected.length < 2) {
              return (
                <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    for (let h = 0; h < datos.length; h++) {
                      const element = datos[h];
                      if (element.id === value) {
                        return (
                          <Chip
                            sx={{ "& span": { fontSize: "10px" } }}
                            key={value}
                            label={element.nombre}
                          />
                        );
                      }
                    }
                  })}
                </Box>
              );
            }
          }}
          MenuProps={MenuProps}
        >
          {datos.length > 1 ? (
            <ListSubheader>
              <TextField
                name="periodo"
                size="small"
                onChange={(e) => handleSearch(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{
                        fontSize: "10px !important",
                        width: "auto",
                        height: "100%",
                      }}
                    >
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onKeyDown={(e) => {
                  console.log(e);
                  if (e.key !== "Escape") {
                    e.stopPropagation();
                  }
                }}
              />
            </ListSubheader>
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
          {datos.length > 1 ? OptionPeriodo : ""}
        </Select>
      </FormControl>
    </Box>
  );
}

export function SelectCanales(params) {
  const {
    data,
    handleChangeValue,
    handleClose,
    handleOpen,
    openFiltro,
    value,
    selectedOptionRetail,
    disabled,
    idCliente
  } = params;
  const classes = useStyles();
  var ID_Cliente = sessionStorage.getItem("Id_Cliente");

  const MiCADENA=[{id:parseInt(idCliente) !== 11? parseInt(ID_Cliente): selectedOptionRetail.id, nombre: "Mi Cadena"}]

  let dataUnificada =
    data.length > 0
      ? MiCADENA.concat(data)
      : [];
  const OptionCanales = dataUnificada.map((item) => (
    <MenuItem key={item.id} value={item.id} className="items">
      <Checkbox checked={value.indexOf(item.id) > -1} />
      <ListItemText sx={{ fontSize: "10px" }} primary={item.nombre} />
    </MenuItem>
  ));
  let {
    Periodo,
    Areas,
    Zona,
    Cesta,
    Categorias,
    Fabricante,
    Marca,
    Segmento,
    Tamanno,
    RTamanno,
    Producto,
    CodBarra,
    Nacionalidad,
    Indicador,
  } = disabled;
  let elementDisabled = Periodo || Areas || Zona || Cesta || Categorias || Fabricante || Marca || Segmento || Tamanno || RTamanno || Producto || CodBarra || Nacionalidad || Indicador;
  return (
    <Box
      style={{
        border: ".1em solid rgb(87 87 86/11%)",
        background: "#f7f4f4",
        borderRadius: "1.5em",
        width: "15%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <InputLabel style={{ width: "auto", padding: "10% 0 5%" }}>
        CANALES
      </InputLabel>
      <FormControl
        sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
        className={classes.formControl}
        disabled={elementDisabled}
      >
        <InputLabel className={classes.inputLabel} id="mutiple-select-label">
          Canales
        </InputLabel>
        <Select
          labelId="mutiple-select-label"
          multiple
          name="Canales"
          value={value}
          open={openFiltro}
          onChange={handleChangeValue}
          onClose={() => handleClose("Canales")}
          onOpen={() => handleOpen("Canales")}
          renderValue={(selected) => {
            if (selected.length > 1 && selected.length < dataUnificada.length) {
              return (
                <ListItemText
                  sx={{ "& span": { fontSize: "10px" } }}
                  primary={`${selected.length} Opciones Marcadas`}
                />
              );
            } else if (selected.length === dataUnificada.length) {
              return (
                <ListItemText
                  sx={{ "& span": { fontSize: "10px" } }}
                  primary={`Todas Marcadas (${selected.length})`}
                />
              );
            } else if (selected.length) {
              return (
                <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    for (let h = 0; h < dataUnificada.length; h++) {
                      const element = dataUnificada[h];
                      if (element.id === value) {
                        return (
                          <Chip
                            sx={{ "& span": { fontSize: "10px" } }}
                            key={value}
                            label={element.nombre}
                          />
                        );
                      }
                    }
                  })}
                </Box>
              );
            }
          }}
          MenuProps={MenuProps}
        >
          {dataUnificada.length > 1 ? (
            OptionCanales
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
    </Box>
  );
}

export function SelectRegiones(params) {
  const {
    data,
    handleChangeValue,
    handleClose,
    handleOpen,
    openFiltro,
    value,
    disabled,
  } = params;
  const valueArea = value[0];
  const classes = useStyles();
  let dataUnificada = data.length > 0 ? data : [];
  const OptionRegiones = dataUnificada.map((item) => (
    <MenuItem key={item.id} value={item.id} className="items">
      <Checkbox checked={valueArea.indexOf(item.id) > -1} />
      <ListItemText primary={item.nombre.toUpperCase()} />
      {/* <SubRegiones
                idRegiones={idRegiones}
                selectedOptions33={selectedOptions33}
                handleSubRegiones={handleSubRegiones}
            /> */}
      {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="standard">
            <InputLabel sx={{fontSize:10}} id="demo-select-small">{item.nombre}</InputLabel>
            <Select
                sx={{fontSize:'1em'}}
                labelId="demo-select-small"
                label={item.nombre}
                value={selectedOptions3}
                multiple
                renderValue={(selected) => {
                    return selected.join(', ');
                }}
            >
                <MenuItem key={item.id} value={item.id} className='items'>
                    <Checkbox checked={selectedOptions3.indexOf(item.id) > -1} />
                    <ListItemText  primary={item.nombre} />
                </MenuItem>
                <MenuItem key={item.id} value={item.id} className='items'>
                    <Checkbox checked={selectedOptions3.indexOf(item.id) > -1} />
                    <ListItemText  primary={'item.nombre'} />
                </MenuItem>
                <MenuItem key={item.id} value={item.id} className='items'>
                    <Checkbox checked={selectedOptions3.indexOf(item.id) > -1} />
                    <ListItemText  primary={'item.nombre'} />
                </MenuItem>
            </Select>
            </FormControl> */}
    </MenuItem>
  ));
  let { Periodo, Canales, Zona, Cesta, Categorias, Fabricante, Marca, Segmento, Tamanno, RTamanno, Producto, CodBarra, Nacionalidad, Indicador } = disabled;
  let elementDisabled = Periodo || Canales || Zona || Cesta || Categorias || Fabricante || Marca || Segmento || Tamanno || RTamanno || Producto || CodBarra || Nacionalidad || Indicador;
  return (
    <Box
      style={{
        border: ".1em solid rgb(87 87 86/11%)",
        background: "#f7f4f4",
        borderRadius: "1.5em",
        width: "15%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <InputLabel style={{ width: "auto", padding: "10% 0 5%" }}>
        ÁREAS
      </InputLabel>
      <FormControl
        sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
        className={classes.formControl} disabled={elementDisabled}
      >
        <InputLabel className={classes.inputLabel} id="mutiple-select-label">
          Regiones
        </InputLabel>
        <Select
          labelId="mutiple-select-label"
          name="Areas"
          multiple
          value={valueArea}
          open={openFiltro}
          onChange={handleChangeValue}
          onClose={() => handleClose("Areas")}
          onOpen={() => handleOpen("Areas")}
          renderValue={(selected) => {
            if (selected.length > 1 && selected.length < dataUnificada.length) {
              return (
                <ListItemText
                  sx={{ "& span": { fontSize: "10px" } }}
                  primary={`${selected.length} Opciones Marcadas`}
                />
              );
            } else if (selected.length === dataUnificada.length) {
              return (
                <ListItemText
                  sx={{ "& span": { fontSize: "10px" } }}
                  primary={`Todas Marcadas (${selected.length})`}
                />
              );
            } else if (selected.length) {
              return (
                <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    for (let h = 0; h < dataUnificada.length; h++) {
                      const element = dataUnificada[h];
                      if (element.id === value) {
                        return (
                          <Chip
                            sx={{ "& span": { fontSize: "10px" } }}
                            key={value}
                            label={element.nombre}
                          />
                        );
                      }
                    }
                  })}
                </Box>
              );
            }
          }}
          MenuProps={MenuProps}
        >
          {dataUnificada.length > 1 ? (
            OptionRegiones
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
    </Box>
  );
}
/* SubRegiones */

function SubRegiones(props) {
  console.log(props);
  const { idRegiones, selectedOptions33 } = props;
  // let {Periodo,Canales,Areas,Cesta,Categorias,Fabricante,Marca,Segmento,Tamanno,RTamanno,Producto,CodBarra,Nacionalidad,Indicador} = disabled
  // let elementDisabled = Periodo||Canales||Areas||Cesta||Categorias||Fabricante||Marca||Segmento||Tamanno||RTamanno||Producto||CodBarra||Nacionalidad||Indicador
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="standard">
      {/* <Select
            sx={{fontSize:'1em'}}
            labelId="demo-select-small"
            label={item.nombre}
            value={selectedOptions33}
            multiple
            name="Zonas"
            renderValue={(selected) => {
                return selected.join(', ');
            }}
          >
            <MenuItem key={item.id} value={item.id} className='items'>
                <Checkbox checked={selectedOptions33.indexOf(item.id) > -1} />
                <ListItemText  primary={item.nombre} />
            </MenuItem>
            <MenuItem key={item.id} value={item.id} className='items'>
                <Checkbox checked={selectedOptions33.indexOf(item.id) > -1} />
                <ListItemText  primary={'item.nombre'} />
            </MenuItem>
            <MenuItem key={item.id} value={item.id} className='items'>
                <Checkbox checked={selectedOptions33.indexOf(item.id) > -1} />
                <ListItemText  primary={'item.nombre'} />
            </MenuItem>
          </Select> */}
    </FormControl>
  );
}
/*Atributos*/

export function SelectAtributos(params) {
  const {data,handleChangeValue,handleClose,handleOpen,openFiltro,value,disabled} = params;
  const classes = useStyles();
  let dataCesta = data[0];
  let valueCesta = value[0];
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? todas.concat(dataCesta)
    : todas.concat(dataCesta).filter((dato) =>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
  let {Periodo,Canales,Areas,Zona,Categorias,Fabricante,Marca,Segmento,Tamanno,RTamanno,Producto,CodBarra,Nacionalidad,Indicador} = disabled;
  let elementDisabled = Periodo ||Canales ||Areas ||Zona ||Categorias ||Fabricante ||Marca ||Segmento ||Tamanno ||RTamanno ||Producto ||CodBarra ||Nacionalidad ||Indicador;
  const OptionCesta = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
          checked={(valueCesta.length > 0 && valueCesta.length === datos.length - 1) ||valueCesta.indexOf(option.id) > -1}
          indeterminate={option.id === "all"? valueCesta.length > 0 && valueCesta.length < datos.length - 1: ""}
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));

  return (
    <Box
      style={{
        border: ".1em solid rgb(87 87 86/11%)",
        background: "#f7f4f4",
        borderRadius: "1.5em",
        width: "15%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <InputLabel style={{ width: "auto", padding: "10% 0 5%" }}>
        PRODUCTOS
      </InputLabel>
      <Box className="boxAtributos">
        <FormControl
          disabled={elementDisabled}
          sx={{
            width: "100%",
            ".Mui-disabled": { display: "block !important" },
          }}
          className={classes.formControl}
        >
          <InputLabel
            className="inputLabel input input"
            id="mutiple-select-label"
          >
            Cesta
          </InputLabel>
          <Select
            labelId="mutiple-select-label"
            multiple
            name="Cesta"
            value={valueCesta}
            open={openFiltro[0]}
            onChange={handleChangeValue}
            onClose={() => handleClose("Cesta")}
            onOpen={() => handleOpen("Cesta")}
            renderValue={(selected) => {
              if (selected.length >= 2 && selected.length < dataCesta.length) {
                return (
                  <ListItemText
                    sx={{ "& span": { fontSize: "10px" } }}
                    primary={`${selected.length} Opciones Marcadas`}
                  />
                );
              } else if (selected.length === dataCesta.length) {
                return (
                  <ListItemText
                    sx={{ "& span": { fontSize: "10px" } }}
                    primary={`Todas Marcadas (${selected.length})`}
                  />
                );
              } else if (selected.length < 3) {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      for (let h = 0; h < dataCesta.length; h++) {
                        const element = dataCesta[h];
                        if (element.id === value) {
                          return (
                            <Chip
                              style={{ fontSize: ".7em" }}
                              key={value}
                              label={element.nombre}
                            />
                          );
                        }
                      }
                    })}
                  </Box>
                );
              }
            }}
            MenuProps={MenuProps}
          >
            {datos.length > 1 ? (
              <ListSubheader>
                <TextField
                  name="cesta"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ width: "auto", height: "100%" }}
                      >
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSearch(e)}
                  //onClick={data.setFocus(true)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      // Prevents autoselecting item while typing (default Select behaviour)
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
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
            {datos.length > 1 ? OptionCesta : ""}
          </Select>
        </FormControl>

        <SelectCategorias
          value={value[1]}
          openFiltro={openFiltro[1]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[1]}
          disabled={disabled}
        />
        <SelectFabricantes
          disabled={disabled}
          value={value[2]}
          openFiltro={openFiltro[2]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[2]}
        />
        <SelectMarcas
          disabled={disabled}
          value={value[3]}
          openFiltro={openFiltro[3]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[3]}
        />
        <SelectSegmentos
          disabled={disabled}
          value={value[4]}
          openFiltro={openFiltro[4]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[4]}
        />
        <SelectTamanno
          disabled={disabled}
          value={value[5]}
          openFiltro={openFiltro[5]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[5]}
        />
        <SelectRTamanno
          disabled={disabled}
          value={value[6]}
          openFiltro={openFiltro[6]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[6]}
        />
        <SelectProducto
          disabled={disabled}
          value={value[7]}
          openFiltro={openFiltro[7]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[7]}
        />
        <SelectCBarra
          disabled={disabled}
          value={value[8]}
          openFiltro={openFiltro[8]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[8]}
        />
        {/* <SelectNacionalidad
          disabled={disabled}
          value={value[9]}
          openFiltro={openFiltro[9]}
          handleChangeValue={handleChangeValue}
          handleClose={handleClose}
          handleOpen={handleOpen}
          data={data[9]}
        /> */}
      </Box>
    </Box>
  );
}
export function SelectCategorias(params) {
  const {data,handleChangeValue,handleClose,handleOpen,openFiltro,value, disabled} = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  let validacionBusqueda=data.filter((dato) =>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())).length === 0? [{id:0, nombre:'No se encontro su búsqueda.'}]:data.filter((dato) =>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))
  
  const datos = !search ? todas.concat(data) : validacionBusqueda;

  const classes = useStyles();
  let { Periodo, Canales, Areas, Zona, Cesta, Fabricante, Marca, Segmento, Tamanno, RTamanno, Producto, CodBarra, Nacionalidad, Indicador } = disabled;
  let elementDisabled = Periodo || Canales || Areas || Zona || Cesta || Fabricante || Marca || Segmento || Tamanno || RTamanno || Producto || CodBarra || Nacionalidad || Indicador;
  
  const OptionCategoria = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items" disabled={Boolean(data.filter((dato) =>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())).length === 0)}>
      <ListItem>
        <Checkbox
          checked={
            (value.length > 0 && value.length === datos.length - 1) ||
            value.indexOf(option.id) > -1
          }
          indeterminate={
            option.id === "all"
              ? value.length > 0 && value.length < datos.length - 1
              : ""
          }
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));
  return (
    <FormControl
      sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
      className={classes.formControl} disabled={elementDisabled}
    >
      <InputLabel className="inputLabel input" id="mutiple-select-label">Categorias</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        name="Categorias"
        value={value}
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("Categorias")}
        onOpen={() => handleOpen("Categorias")}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < datos.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === datos.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 3) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  for (let h = 0; h < datos.length; h++) {
                    const element = datos[h];
                    if (element.id === value) {
                      return (
                        <Chip
                          style={{ fontSize: ".7em" }}
                          key={value}
                          label={element.nombre}
                        />
                      );
                    }
                  }
                })}
              </Box>
            );
          }
        }}
        MenuProps={MenuProps}
      >
        {datos.length > 1 ? (
              <ListSubheader>
                <TextField
                  name="cesta"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ width: "auto", height: "100%" }}
                      >
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSearch(e)}
                  //onClick={data.setFocus(true)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      // Prevents autoselecting item while typing (default Select behaviour)
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
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
            {datos.length > 1 ? OptionCategoria : ""}
      </Select>
    </FormControl>
  );
}

export function SelectFabricantes(params) {
  const {data,handleChangeValue,handleClose,handleOpen,openFiltro,value,disabled} = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search ? todas.concat(data)
    : todas.concat(data).filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  let {Periodo,Canales,Areas,Zona,Cesta,Categorias,Marca,Segmento,Tamanno,RTamanno,Producto,CodBarra,Nacionalidad,Indicador} = disabled;
  let elementDisabled = Periodo || Canales || Areas || Zona || Cesta || Categorias || Marca || Segmento || Tamanno || RTamanno || Producto || CodBarra || Nacionalidad || Indicador;
  const classes = useStyles();
  const OptionFabricante = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
        checked={
            (value.length > 0 && value.length === datos.length - 1) ||
            value.indexOf(option.id) > -1
          }
          indeterminate={
            option.id === "all"
              ? value.length > 0 && value.length < datos.length - 1
              : ""
          }
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));
  return (
    <FormControl
      sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
      className={classes.formControl} disabled={elementDisabled}
    >
      <InputLabel className="inputLabel input" id="mutiple-select-label">
        Fabricantes
      </InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        name="Fabricantes"
        value={value}
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={()=>handleClose('Fabricantes')}
        onOpen={()=>handleOpen('Fabricantes')}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < datos.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === datos.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 3) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  for (let h = 0; h < datos.length; h++) {
                    const element = datos[h];
                    if (element.id === value) {
                      return (
                        <Chip
                          style={{ fontSize: "10px" }}
                          key={value}
                          label={element.nombre}
                        />
                      );
                    }
                  }
                })}
              </Box>
            );
          }
        }}
        MenuProps={MenuProps}
      >
            {datos.length > 1 ? (
              <ListSubheader>
                <TextField
                  name="Fabricantes"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ width: "auto", height: "100%" }}
                      >
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSearch(e)}
                  //onClick={data.setFocus(true)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      // Prevents autoselecting item while typing (default Select behaviour)
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
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
            {datos.length > 1 ? OptionFabricante : ""}
      </Select>
    </FormControl>
  );
}

export function SelectMarcas(params) {
  const {data,handleChangeValue,handleClose,handleOpen,openFiltro,value,disabled} = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? data
    : data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  let {Periodo,Canales,Areas,Zona,Cesta,Categorias,Fabricante,Marca,Segmento,Tamanno,RTamanno,Producto,CodBarra,Nacionalidad,Indicador,} = disabled;
  let elementDisabled = Periodo || Canales || Areas || Zona || Cesta || Categorias || Fabricante || Segmento || Tamanno || RTamanno || Producto || CodBarra || Nacionalidad || Indicador;
  const classes = useStyles();
  const OptionMarcas = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
          checked={
            (value.length > 0 && value.length === datos.length - 1) ||
            value.indexOf(option.id) > -1
          }
          indeterminate={
            option.id === "all"
              ? value.length > 0 && value.length < datos.length - 1
              : ""
          }
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));
  return (
    <FormControl
      sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
      className={classes.formControl} disabel={Boolean(elementDisabled)}
    >
      <InputLabel className="inputLabel input" id="mutiple-select-label">
        Marcas
      </InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        name="Marcas"
        value={value}
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={()=>handleClose('Marcas')}
        onOpen={()=>handleOpen('Marcas')}
        renderValue={(selected) => {
          // setIDFabricante(selected)
          if (selected.length >= 2 && selected.length < datos.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === datos.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 3) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  for (let h = 0; h < datos.length; h++) {
                    const element = datos[h];
                    if (element.id === value) {
                      return (
                        <Chip
                          style={{ fontSize: ".7em" }}
                          key={value}
                          label={element.nombre}
                        />
                      );
                    }
                  }
                })}
              </Box>
            );
          }
        }}
        MenuProps={MenuProps}
      >
        {datos.length > 1 ? (
              <ListSubheader>
                <TextField
                  name="Fabricantes"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ width: "auto", height: "100%" }}
                      >
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleSearch(e)}
                  //onClick={data.setFocus(true)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      // Prevents autoselecting item while typing (default Select behaviour)
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
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
            {datos.length > 1 ? OptionMarcas : ""}
      </Select>
    </FormControl>
  );
}

export function SelectSegmentos(params) {
  const {data,handleChangeValue,handleClose,handleOpen,openFiltro,value,disabled} = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? data
    : data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  let {Periodo,Canales,Areas,Zona,Cesta,Categorias,Fabricante,Marca,Segmento,Tamanno,RTamanno,Producto,CodBarra,Nacionalidad,Indicador} = disabled;
  let elementDisabled = Periodo ||Canales ||Areas ||Zona ||Cesta ||Categorias ||Fabricante ||Marca ||Segmento ||Tamanno ||RTamanno ||Producto ||CodBarra ||Nacionalidad ||Indicador;

  const classes = useStyles();
  const OptionSegmentos = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
          checked={
            (value.length > 0 && value.length === datos.length - 1) ||
            value.indexOf(option.id) > -1
          }
          indeterminate={
            option.id === "all"
              ? value.length > 0 && value.length < datos.length - 1
              : ""
          }
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));
  return (
    <FormControl
      sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
      className={classes.formControl} disabled={elementDisabled}
    >
      <InputLabel className="inputLabel input" id="mutiple-select-label">
        Segmentos
      </InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={value}
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={()=>handleClose('Segmentos')}
        onOpen={()=>handleOpen('Segmentos')}
        renderValue={(selected) => {
          // setIDFabricante(selected)
          if (selected.length >= 2 && selected.length < datos.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === datos.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 3) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  for (let h = 0; h < datos.length; h++) {
                    const element = datos[h];
                    if (element.id === value) {
                      return (
                        <Chip
                          style={{ fontSize: ".7em" }}
                          key={value}
                          label={element.nombre}
                        />
                      );
                    }
                  }
                })}
              </Box>
            );
          }
        }}
        MenuProps={MenuProps}
      >
        {OptionSegmentos}
      </Select>
    </FormControl>
  );
}

export function SelectTamanno(params) {
  const {
    data,
    handleChangeValue,
    handleClose,
    handleOpen,
    openFiltro,
    value,
    disabled,
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? data
    : data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  let {Periodo,Canales,Areas,Zona,Cesta,Categorias,Fabricante,Marca,Segmento,Tamanno,RTamanno,Producto,CodBarra,Nacionalidad,Indicador,} = disabled;
  let elementDisabled = Periodo || Canales || Areas || Zona || Cesta || Categorias || Fabricante || Marca || Segmento || Tamanno || RTamanno || Producto || CodBarra || Nacionalidad || Indicador;
  const classes = useStyles();
  const OptionTamanno = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
          checked={value.indexOf(option.id) > -1 || value.indexOf(option) > -1}
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));
  return (
    <FormControl
      sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
      className={classes.formControl}
    >
      <InputLabel className="inputLabel input" id="mutiple-select-label">
        Tamaño
      </InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={value}
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={handleClose}
        onOpen={handleOpen}
        renderValue={(selected) => {
          // setIDFabricante(selected)
          if (selected.length >= 2 && selected.length < datos.length) {
            return (
              <ListItemText
                sx={{ fontSize: "15px" }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === datos.length) {
            return (
              <ListItemText
                sx={{ fontSize: "15px" }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 3) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  for (let h = 0; h < datos.length; h++) {
                    const element = datos[h];
                    if (element.id === value) {
                      return (
                        <Chip
                          style={{ fontSize: ".7em" }}
                          key={value}
                          label={element.nombre}
                        />
                      );
                    }
                  }
                })}
              </Box>
            );
          }
        }}
        MenuProps={MenuProps}
      >
        {OptionTamanno}
      </Select>
    </FormControl>
  );
}

export function SelectRTamanno(params) {
  const classes = useStyles();
  const {
    data,
    handleChangeValue,
    handleClose,
    handleOpen,
    openFiltro,
    value,
    disabled,
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? data
    : data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  let {
    Periodo,
    Canales,
    Areas,
    Zona,
    Cesta,
    Categorias,
    Fabricante,
    Marca,
    Segmento,
    Tamanno,
    RTamanno,
    Producto,
    CodBarra,
    Nacionalidad,
    Indicador,
  } = disabled;
  let elementDisabled =
    Periodo ||
    Canales ||
    Areas ||
    Zona ||
    Cesta ||
    Categorias ||
    Fabricante ||
    Marca ||
    Segmento ||
    Tamanno ||
    RTamanno ||
    Producto ||
    CodBarra ||
    Nacionalidad ||
    Indicador;
  const OptionRTamanno = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
          checked={value.indexOf(option.id) > -1 || value.indexOf(option) > -1}
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));
  return (
    <FormControl
      sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
      className={classes.formControl}
    >
      <InputLabel className="inputLabel input" id="mutiple-select-label">
        Rango Tamaño
      </InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={value}
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={handleClose}
        onOpen={handleOpen}
        renderValue={(selected) => {
          // setIDFabricante(selected)
          if (selected.length >= 2 && selected.length < datos.length) {
            return (
              <ListItemText
                sx={{ fontSize: "15px" }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === datos.length) {
            return (
              <ListItemText
                sx={{ fontSize: "15px" }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 3) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  for (let h = 0; h < datos.length; h++) {
                    const element = datos[h];
                    if (element.id === value) {
                      return (
                        <Chip
                          style={{ fontSize: ".7em" }}
                          key={value}
                          label={element.nombre}
                        />
                      );
                    }
                  }
                })}
              </Box>
            );
          }
        }}
        MenuProps={MenuProps}
      >
        {OptionRTamanno}
      </Select>
    </FormControl>
  );
}

export function SelectProducto(params) {
  const {
    data,
    handleChangeValue,
    handleClose,
    handleOpen,
    openFiltro,
    value,
    disabled,
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? data
    : data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  let {
    Periodo,
    Canales,
    Areas,
    Zona,
    Cesta,
    Categorias,
    Fabricante,
    Marca,
    Segmento,
    Tamanno,
    RTamanno,
    Producto,
    CodBarra,
    Nacionalidad,
    Indicador,
  } = disabled;
  let elementDisabled =
    Periodo ||
    Canales ||
    Areas ||
    Zona ||
    Cesta ||
    Categorias ||
    Fabricante ||
    Marca ||
    Segmento ||
    Tamanno ||
    RTamanno ||
    Producto ||
    CodBarra ||
    Nacionalidad ||
    Indicador;
  const classes = useStyles();
  const OptionProducto = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
          checked={value.indexOf(option.id) > -1 || value.indexOf(option) > -1}
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));
  return (
    <FormControl
      sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
      className={classes.formControl}
    >
      <InputLabel className="inputLabel input" id="mutiple-select-label">
        Producto
      </InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={value}
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={handleClose}
        onOpen={handleOpen}
        renderValue={(selected) => {
          // setIDFabricante(selected)
          if (selected.length >= 2 && selected.length < datos.length) {
            return (
              <ListItemText
                sx={{ fontSize: "15px" }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === datos.length) {
            return (
              <ListItemText
                sx={{ fontSize: "15px" }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 3) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  for (let h = 0; h < datos.length; h++) {
                    const element = datos[h];
                    if (element.id === value) {
                      return (
                        <Chip
                          style={{ fontSize: ".7em" }}
                          key={value}
                          label={element.nombre}
                        />
                      );
                    }
                  }
                })}
              </Box>
            );
          }
        }}
        MenuProps={MenuProps}
      >
        {OptionProducto}
      </Select>
    </FormControl>
  );
}

export function SelectCBarra(params) {
  const {
    data,
    handleChangeValue,
    handleClose,
    handleOpen,
    openFiltro,
    value,
    disabled,
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? data
    : data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  let {
    Periodo,
    Canales,
    Areas,
    Zona,
    Cesta,
    Categorias,
    Fabricante,
    Marca,
    Segmento,
    Tamanno,
    RTamanno,
    Producto,
    CodBarra,
    Nacionalidad,
    Indicador,
  } = disabled;
  let elementDisabled =
    Periodo ||
    Canales ||
    Areas ||
    Zona ||
    Cesta ||
    Categorias ||
    Fabricante ||
    Marca ||
    Segmento ||
    Tamanno ||
    RTamanno ||
    Producto ||
    CodBarra ||
    Nacionalidad ||
    Indicador;
  const classes = useStyles();
  const OptionCBarra = datos.map((option) => (
    <MenuItem key={option.id} value={option.id} className="items">
      <ListItem>
        <Checkbox
          checked={value.indexOf(option.id) > -1 || value.indexOf(option) > -1}
        />
      </ListItem>
      <ListItemText primary={option.nombre} />
    </MenuItem>
  ));
  return (
    <FormControl
      sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
      className={classes.formControl}
    >
      <InputLabel className="inputLabel input" id="mutiple-select-label">
        Código de Barra
      </InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={value}
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={handleClose}
        onOpen={handleOpen}
        renderValue={(selected) => {
          // setIDFabricante(selected)
          if (selected.length >= 2 && selected.length < datos.length) {
            return (
              <ListItemText
                sx={{ fontSize: "15px" }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === datos.length) {
            return (
              <ListItemText
                sx={{ fontSize: "15px" }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 3) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  for (let h = 0; h < datos.length; h++) {
                    const element = datos[h];
                    if (element.id === value) {
                      return (
                        <Chip
                          style={{ fontSize: ".7em" }}
                          key={value}
                          label={element.nombre}
                        />
                      );
                    }
                  }
                })}
              </Box>
            );
          }
        }}
        MenuProps={MenuProps}
      >
        {OptionCBarra}
      </Select>
    </FormControl>
  );
}

// export function SelectNacionalidad(params) {
//   const {
//     data,
//     handleChangeValue,
//     handleClose,
//     handleOpen,
//     openFiltro,
//     value,
//     disabled,
//   } = params;
//   const [search, setSearch] = useState("");
//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };
//   const datos = !search
//     ? data
//     : data.filter((dato) =>
//       dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
//     );
//   let {
//     Periodo,
//     Canales,
//     Areas,
//     Zona,
//     Cesta,
//     Categorias,
//     Fabricante,
//     Marca,
//     Segmento,
//     Tamanno,
//     RTamanno,
//     Producto,
//     CodBarra,
//     Nacionalidad,
//     Indicador,
//   } = disabled;
//   let elementDisabled =
//     Periodo ||
//     Canales ||
//     Areas ||
//     Zona ||
//     Cesta ||
//     Categorias ||
//     Fabricante ||
//     Marca ||
//     Segmento ||
//     Tamanno ||
//     RTamanno ||
//     Producto ||
//     CodBarra ||
//     Nacionalidad ||
//     Indicador;
//   const classes = useStyles();
//   const OptionNacionalidad = datos.map((option) => (
//     <MenuItem key={option.id} value={option.id} className="items">
//       <ListItem>
//         <Checkbox
//           checked={value.indexOf(option.id) > -1 || value.indexOf(option) > -1}
//         />
//       </ListItem>
//       <ListItemText primary={option.nombre} />
//     </MenuItem>
//   ));
//   return (
//     <FormControl
//       sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
//       className={classes.formControl}
//     >
//       <InputLabel className="inputLabel input" id="mutiple-select-label">
//         Nacionalidad
//       </InputLabel>
//       <Select
//         labelId="mutiple-select-label"
//         multiple
//         value={value}
//         open={openFiltro}
//         onChange={handleChangeValue}
//         onClose={handleClose}
//         onOpen={handleOpen}
//         renderValue={(selected) => {
//           // setIDFabricante(selected)
//           if (selected.length >= 2 && selected.length < datos.length) {
//             return (
//               <ListItemText
//                 sx={{ fontSize: "15px" }}
//                 primary={`${selected.length} Opciones Marcadas`}
//               />
//             );
//           } else if (selected.length === datos.length) {
//             return (
//               <ListItemText
//                 sx={{ fontSize: "15px" }}
//                 primary={`Todas Marcadas (${selected.length})`}
//               />
//             );
//           } else if (selected.length < 3) {
//             return (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                 {selected.map((value) => {
//                   for (let h = 0; h < datos.length; h++) {
//                     const element = datos[h];
//                     if (element.id === value) {
//                       return (
//                         <Chip
//                           style={{ fontSize: ".7em" }}
//                           key={value}
//                           label={element.nombre}
//                         />
//                       );
//                     }
//                   }
//                 })}
//               </Box>
//             );
//           }
//         }}
//         MenuProps={MenuProps}
//       >
//         {OptionNacionalidad}
//       </Select>
//     </FormControl>
//   );
// }

export function SelectIndicadores(params) {
  const {
    data,
    handleChangeValue,
    handleClose,
    handleOpen,
    openFiltro,
    value,
    disabled,
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? data
    : data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  let {
    Periodo,
    Canales,
    Areas,
    Zona,
    Cesta,
    Categorias,
    Fabricante,
    Marca,
    Segmento,
    Tamanno,
    RTamanno,
    Producto,
    CodBarra,
    Nacionalidad,
    Indicador,
  } = disabled;
  let elementDisabled =
    Periodo ||
    Canales ||
    Areas ||
    Zona ||
    Cesta ||
    Categorias ||
    Fabricante ||
    Marca ||
    Segmento ||
    Tamanno ||
    RTamanno ||
    Producto ||
    CodBarra ||
    Nacionalidad ||
    Indicador;
  const classes = useStyles();
  var ID_Cliente = sessionStorage.getItem("Id_Cliente");
  const OptionIndicadores = datos.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      <Checkbox checked={value.indexOf(item.id) > -1} />
      <ListItemText
        sx={{ "& span": { fontSize: "10px" } }}
        primary={item.nombre}
      />
    </MenuItem>
  ));
  return (
    <Box
      style={{
        border: ".1em solid rgb(87 87 86/11%)",
        background: "#f7f4f4",
        borderRadius: "1.5em",
        width: "15%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <InputLabel style={{ width: "auto", padding: "10% 0 5%" }}>
        INDICADORES
      </InputLabel>
      <FormControl
        sx={{ width: "100%", ".Mui-disabled": { display: "block !important" } }}
        className={classes.formControl}
      >
        <InputLabel className="inputLabel input" id="mutiple-select-label">
          Indicadores
        </InputLabel>
        <Select
          labelId="mutiple-select-label"
          multiple
          name="Indicador"
          value={value}
          open={openFiltro}
          onChange={handleChangeValue}
          onClose={()=>handleClose('Indicador')}
          onOpen={()=>handleOpen('Indicador')}
          renderValue={(selected) => {
            if (selected.length >= 2 && selected.length < datos.length) {
              return (
                <ListItemText
                  sx={{ fontSize: "15px" }}
                  primary={`${selected.length} Opciones Marcadas`}
                />
              );
            } else if (selected.length === datos.length) {
              return (
                <ListItemText
                  sx={{ fontSize: "15px" }}
                  primary={`Todas Marcadas (${selected.length})`}
                />
              );
            } else if (selected.length < 3) {
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    for (let h = 0; h < datos.length; h++) {
                      const element = datos[h];
                      if (element.id === value) {
                        return (
                          <Chip
                            style={{ fontSize: ".7em" }}
                            key={value}
                            label={element.nombre}
                          />
                        );
                      }
                    }
                  })}
                </Box>
              );
            }
          }}
          MenuProps={MenuProps}
        >
          {/* <MenuItem value={parseInt(ID_Cliente)}>
                        
                        <ListItem>
                            <Checkbox style={{display:'block', padding:'0'}} checked={selectedOptions14.indexOf(parseInt(ID_Cliente)) > -1}/>
                        </ListItem>
                        <ListItemText sx={{'& span':{fontSize:'10px'}}} primary={'MI CADENA'} />
                    </MenuItem> */}
          {OptionIndicadores}
        </Select>
      </FormControl>
    </Box>
  );
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "60%",
      width: "16%",
    },
  },
};
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
    background: "transparent",
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
    margin: "4% 0 2% !important",
    padding: "10% !important",
  },
  formControl: {
    overflow: " visible !important",
    marginTop: "2%",
    height: "8%",
    minHeight: 27,
    maxHeight: 35,
    "& div .MuiList-root, .MuiList-padding, .MuiMenu-list, .css-6hp17o-MuiList-root-MuiMenu-list":
    {
      display: "inline-flex",
      flexDirection: "column",
    },
  },
  inputLabel: {
    background: "rgb(247, 244, 244)",
    width: "auto",
    fontSize: "10px !Important",
  },
}));
