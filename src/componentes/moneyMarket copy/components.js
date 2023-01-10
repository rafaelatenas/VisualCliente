import { ExpandMore, Search } from "@material-ui/icons";
import {Accordion, AccordionDetails, AccordionSummary, Box,Button,Checkbox,Chip,FormControl,InputAdornment,InputLabel,List,ListItem,ListItemText,ListSubheader,Menu,MenuItem,Paper,Select,TextField, Typography} from "@mui/material";
import { useState } from "react";
import cargando from "../../landing/favicon/loader.svg";
import { useAuthContext } from "../context/authContext";

/* Combos filtros */
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "60%",
      width: 245,
      minwidth: 250,
    },
  },
};
export function Semana(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    openFiltro,
    disabled
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(value)
  const datos = !search
    ? data
    : data.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  const maxSelecciones=8
  const validacionSelecciones = value.length===maxSelecciones
  let {Retailers,Estados,Tiendas,Categorias,Fabricantes,Marcas,Codigobarras} = disabled
  let elementDisabled = Retailers||Estados||Tiendas||Categorias||Fabricantes||Marcas||Codigobarras
  console.log(Boolean(elementDisabled))
      return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block !important'}}} disabled={Boolean(elementDisabled)}>
      <InputLabel id="demo-simple-select-label">Semana</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Semanas"
        name="Semanas"
        multiple
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("Semanas")}
        onOpen={() => handleOpen("Semanas")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if ((selected.length >= 2 && selected.length < data.length)|| (value.length>= 2 && datos.length===0)) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if ((selected.length === data.length) || (value.length=== data.length)) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`Todas Marcadas (${selected.length||value.length})`}
              />
            );
          } else if ((selected.length < 2) || (value.length < 2)) {
            if (data.length===0) {
              return(
                <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5, alignItems:'center' }}>
                  <ListItemText sx={{ "& span": { fontSize: "10px" } }} primary={'1 Opcin Marcada'}/>
                </Box>
              )
            } else {
              
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5, alignItems:'center' }}>
                {selected.map((value) => {
                  switch (data.length===0) {
                    case true:
                      return (
                        <ListItemText
                          sx={{ "& span": { fontSize: "10px" } }}
                          primary={'1 Opcin Marcada'}
                        />
                      );
                      break;
                    default:
                      for (let h = 0; h < data.length; h++) {
                        const element = data[h];
                        if (element.id === value) {
                          return (
                            <Chip
                              sx={{"& span": { fontSize: "10px" } }}
                              key={value}
                              label={element.nombre}
                            />
                          );
                        }
                      }
                      break;
                  }
                  
                })}
              </Box>
            );
          }
        }}
      >
        {datos.length !== 0 ? (
          <ListSubheader>
            <TextField
              name="Semanas"
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
        {datos.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items" disabled={validacionSelecciones?((value.indexOf(option.id) > -1) || value.indexOf(option.id.toString()) > -1?false:true):''}>
            <ListItem>
              <Checkbox
                checked={
                  (value.indexOf(option.id) > -1) || value.indexOf(option) > -1
                }
              />
            </ListItem>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export function Retail(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    openFiltro,
    disabled,
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  let {Semanas,Estados,Tiendas,Categorias,Fabricantes,Marcas,Codigobarras} = disabled
  let elementDisabled = Semanas||Estados||Tiendas||Categorias||Fabricantes||Marcas||Codigobarras
  return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block !important'}}} disabled={Boolean(elementDisabled)}>
      <InputLabel id="demo-simple-select-label">Retail</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Retail"
        name="Retailers"
        multiple
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("Retailers")}
        onOpen={() => handleOpen("Retailers")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (((selected.length >= 2 && selected.length < data.length)) || ((value.length>= 2 && (value.length < datos.length || value.length > datos.length)))) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === data.length) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`Todas Marcadas (${selected.length})`}
              />
            );
          } else if (selected.length < 2) {
            return (
              <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5, alignItems:'center'}}>
                {selected.map((value) => {
                  for (let h = 0; h < data.length; h++) {
                    const element = data[h];
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
      >
        {datos.length >1 ? (
          <ListSubheader>
            <TextField
              name="Retailers"
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
        {datos.length >1 ?datos.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItem>
              <Checkbox
              checked={(value.length > 0 && value.length === (datos.length-1)) || ((value.indexOf(option.id) > -1))}
              indeterminate={option.id ==='all'?value.length > 0 && value.length < (datos.length-1):''}
              />
            </ListItem>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        )):''}
      </Select>
    </FormControl>
  );
}
export function Estado(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    openFiltro,
    disabled
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  let {Semanas,Retailers,Tiendas,Categorias,Fabricantes,Marcas,Codigobarras} = disabled
  let elementDisabled = Semanas||Retailers||Tiendas||Categorias||Fabricantes||Marcas||Codigobarras
  return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block !important'}}} disabled={Boolean(elementDisabled)}>
      <InputLabel id="demo-simple-select-label">Estado</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Estados"
        name="Estados"
        multiple
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("Estados")}
        onOpen={() => handleOpen("Estados")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (((selected.length >= 2 && selected.length < data.length) )|| ((value.length>= 2 && (value.length < datos.length || value.length > datos.length)))) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === data.length && data.length>1) {
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
                  for (let h = 0; h < data.length; h++) {
                    const element = data[h];
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
      >
        {datos.length >1 ? (
          <ListSubheader>
            <TextField
              name="Estados"
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
        {datos.length >1 ?datos.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItem>
              <Checkbox
              checked={(value.length > 0 && value.length === (datos.length-1) )|| (value.indexOf(option.id) > -1)}
              indeterminate={option.id ==='all'?value.length > 0 && value.length < (datos.length-1):''}
              />
            </ListItem>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        )):''}
      </Select>
    </FormControl>
  );
}
export function Tienda(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    openFiltro,
    disabled
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  let {Semanas,Retailers,Estados,Categorias,Fabricantes,Marcas,Codigobarras} = disabled
  let elementDisabled = Semanas||Retailers||Estados||Categorias||Fabricantes||Marcas||Codigobarras
      return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block !important'}}} disabled={Boolean(elementDisabled)}>
      <InputLabel id="demo-simple-select-label">Tiendas</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Tiendas"
        name="Tiendas"
        multiple
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("Tiendas")}
        onOpen={() => handleOpen("Tiendas")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (((selected.length >= 2 && selected.length < data.length)) || ((value.length>= 2 && (value.length < datos.length || value.length > datos.length)))) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === data.length) {
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
                  for (let h = 0; h < data.length; h++) {
                    const element = data[h];
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
      >
        {datos.length >1 ? (
          <ListSubheader>
            <TextField
              name="Retailers"
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
        {datos.length >1 ?datos.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItem>
              <Checkbox
              checked={(value.length > 0 && value.length === (datos.length-1) )|| (value.indexOf(option.id) > -1)}
              indeterminate={option.id ==='all'?value.length > 0 && value.length < (datos.length-1):''}
              />
            </ListItem>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        )):''}
      </Select>
    </FormControl>
  );
}
export function Categoria(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    openFiltro,
    disabled
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  let {Semanas,Retailers,Estados,Tiendas,Fabricantes,Marcas,Codigobarras} = disabled
  let elementDisabled = Semanas||Retailers||Estados||Tiendas||Fabricantes||Marcas||Codigobarras
      return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block !important'}}} disabled={Boolean(elementDisabled)}>
      <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Categorias"
        name="Categorias"
        multiple
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("Categorias")}
        onOpen={() => handleOpen("Categorias")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if ((selected.length >= 2 && selected.length < data.length) || (value.length>= 2 && (value.length < datos.length || value.length > datos.length))) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === data.length) {
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
                  for (let h = 0; h < data.length; h++) {
                    const element = data[h];
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
      >
        {datos.length >1 ? (
          <ListSubheader>
            <TextField
              name="Categorias"
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
        {datos.length >1 ?datos.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItem>
              <Checkbox
              checked={(value.length > 0 && value.length === (datos.length-1) )|| (value.indexOf(option.id) > -1)}
              indeterminate={option.id ==='all'?value.length > 0 && value.length < (datos.length-1):''}
              />
            </ListItem>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        )):''}
      </Select>
    </FormControl>
  );
}
export function Fabricante(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    openFiltro,
    disabled
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  let {Semanas,Retailers,Estados,Tiendas,Categorias,Marcas,Codigobarras} = disabled
  let elementDisabled = Semanas||Retailers||Estados||Tiendas||Categorias||Marcas||Codigobarras
      return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block !important'}}} disabled={Boolean(elementDisabled)}>
      <InputLabel id="demo-simple-select-label">Fabricante</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Fabricantes"
        name="Fabricantes"
        multiple
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("Fabricantes")}
        onOpen={() => handleOpen("Fabricantes")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if ((selected.length >= 2 && selected.length < data.length) || (value.length>= 2 && (value.length < datos.length || value.length > datos.length))) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === data.length) {
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
                  for (let h = 0; h < data.length; h++) {
                    const element = data[h];
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
      >
        {datos.length >1 ? (
          <ListSubheader>
            <TextField
              name="Fabricantes"
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
        {datos.length >1 ?datos.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItem>
              <Checkbox
              checked={(value.length > 0 && value.length === (datos.length-1) )|| (value.indexOf(option.id) > -1)}
              indeterminate={option.id ==='all'?value.length > 0 && value.length < (datos.length-1):''}
              />
            </ListItem>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        )):''}
      </Select>
    </FormControl>
  );
}
export function Marca(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    openFiltro,
    disabled
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  let {Semanas,Retailers,Estados,Tiendas,Categorias,Fabricantes,Codigobarras} = disabled
  let elementDisabled = Semanas||Retailers||Estados||Tiendas||Categorias||Fabricantes||Codigobarras
      return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block !important'}}} disabled={Boolean(elementDisabled)}>
      <InputLabel id="demo-simple-select-label">Marca</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Marcas"
        name="Marcas"
        multiple
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("Marcas")}
        onOpen={() => handleOpen("Marcas")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if ((selected.length >= 2 && selected.length < data.length) || (value.length>= 2 && (value.length < datos.length || value.length > datos.length))) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === data.length) {
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
                  for (let h = 0; h < data.length; h++) {
                    const element = data[h];
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
      >
        {datos.length >1 ? (
          <ListSubheader>
            <TextField
              name="Marcas"
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
        {datos.length >1 ?datos.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItem>
              <Checkbox
              checked={(value.length > 0 && value.length === (datos.length-1) )|| (value.indexOf(option.id) > -1)}
              indeterminate={option.id ==='all'?value.length > 0 && value.length < (datos.length-1):''}
              />
            </ListItem>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        )):''}
      </Select>
    </FormControl>
  );
}
export function CodigoBarra(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    openFiltro,
    disabled
  } = params;
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  let {Semanas,Retailers,Estados,Tiendas,Categorias,Fabricantes,Marcas} = disabled
  let elementDisabled = Semanas||Retailers||Estados||Tiendas||Categorias||Fabricantes||Marcas
      return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block !important'}}} disabled={Boolean(elementDisabled)}>
      <InputLabel id="demo-simple-select-label">Codigo de Barras</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Codigo de Barras"
        name="CodBarras"
        multiple
        open={openFiltro}
        onChange={handleChangeValue}
        onClose={() => handleClose("CodBarras")}
        onOpen={() => handleOpen("CodBarras")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if ((selected.length >= 2 && selected.length < data.length) || (value.length>= 2 && (value.length < datos.length || value.length > datos.length))) {
            return (
              <ListItemText
                sx={{ "& span": { fontSize: "10px" } }}
                primary={`${selected.length} Opciones Marcadas`}
              />
            );
          } else if (selected.length === data.length) {
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
                  for (let h = 0; h < data.length; h++) {
                    const element = data[h];
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
      >
        {datos.length >1 ? (
          <ListSubheader>
            <TextField
              name="Marcas"
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
        {datos.length >0 ? datos.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItem>
              <Checkbox
              checked={(value.length > 0 && value.length === (datos.length-1) )|| (value.indexOf(option.id) > -1)}
              indeterminate={option.id ==='all'?value.length > 0 && value.length < (datos.length-1):''}
              />
            </ListItem>
            <ListItemText primary={option.nombre} />
          </MenuItem>
        )):''}
      </Select>
    </FormControl>
  );
}
export function Moneda(params) {
  const { handleChangeValue, value, handleClose, handleOpen } = params;
  const currencies = [
    {
      id: 1,
      nombre: "Bolivar Digital",
    },
    {
      id: 2,
      nombre: "Dólar Americano",
    },
  ];
  console.log(value)
  // let {Semanas,Retailers,Estados,Tiendas,Categorias,Fabricantes,Marcas,Codigobarras} = disabled
  // let elementDisabled = Semanas||Retailers||Estados||Tiendas||Categorias||Fabricantes||Marcas||Codigobarras
  return (
    <FormControl sx={{ width: "80%", '.Mui-disabled':{display:'block'}}} >
      <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Monedas"
        name="Monedas"
        onChange={handleChangeValue}
        onClose={() => handleClose("Monedas")}
        onOpen={() => handleOpen("Monedas")}
      >
        {currencies.map((option) => (
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItemText
              sx={{ "& span": { fontSize: "14px !important" } }}
              primary={option.nombre}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
/* Componentes Menu */
export function Selecciones(params) {
  const {ValueFiltros, data, handleDelete,handleChange, expanded}= params
  
  return(
    <Accordion style={{ margin: '0', padding: '0% 0 2%', width: '70%', height: 'auto', maxHeight: '30%', boxShadow: 'none' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary style={{ minHeight: '4%', color: '#03508f', width: '100%', border: '.1em solid #000', borderRadius: '1.5em' }}
        expandIcon={<ExpandMore style={{ fill: '#03508f' }} />}
        aria-controls="panel1a-content" id="panel1a-header"
      >
        <Typography className="misSelect">Mis Selecciones</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', listStyle: 'none', p: ' 0 0 5%', m: 0 , flexDirection:'column', alignItems:'flex-start'}} component="ul">
          {data.map((value)=>(
            <ListItem style={{ width: 'auto', paddingLeft: '1%', paddingRight: '1%'}}>
              <Chip style={{ background: '#F6B232', color: '#fff',borderRadius:'1em' }}
                label={value.nombre} onDelete={()=>handleDelete(value)} onClick={()=>ValueFiltros(value)}
              />
            </ListItem>
          ))}
        </Paper>
      </AccordionDetails>
    </Accordion>
  )
}
export function MenuAtenas(params){
  const { logout } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const MenuItems =[
    {id:1, nombre:'Opcion1',url:false,children:[
      {id:1, nombre:'Opcion1.1'},
      {id:2, nombre:'Opcion1.2'},
      {id:3, nombre:'Opcion1.3'},
      {id:4, nombre:'Opcion1.4'}
    ]},
    {id:2, nombre:'Opcion2',url:false,children:[
      {id:1, nombre:'Opcion2.1'},
      {id:2, nombre:'Opcion2.2'},
      {id:3, nombre:'Opcion2.3'},
      {id:4, nombre:'Opcion2.4'}
    ]},
    {id:3, nombre:'Opcion3',url:false,children:[
      {id:1, nombre:'Opcion3.1'},
      {id:2, nombre:'Opcion3.2'},
      {id:3, nombre:'Opcion3.3'},
      {id:4, nombre:'Opcion3.4'}
    ]},
    {id:4, nombre:'Opcion4',url:false,children:[
      {id:1, nombre:'Opcion4.1'},
      {id:2, nombre:'Opcion4.2'},
      {id:3, nombre:'Opcion4.3'},
      {id:4, nombre:'Opcion4.4'}
    ]},
    {id:5, nombre:'Salir',url:true,children:null},
  ]
  return(
    <List>
      {MenuItems.map((value)=>(
      <ListItem key={value.id}>
          <Button  onClick={value.url ? () => logout() : handleClick}>{value.nombre}</Button>
          {value.children?
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {value.children.map((valueChild)=>(
                <MenuItem key={valueChild.id}>{valueChild.nombre}</MenuItem>
              ))}
            </Menu>
          
          :''}
      </ListItem>    
      ))}
    </List>
  )
}
