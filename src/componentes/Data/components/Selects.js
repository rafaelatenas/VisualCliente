import { Box, InputLabel, FormControl, Chip, Select, MenuItem, ListItem, Checkbox, ListItemText, TextField, ListSubheader, InputAdornment } from "@mui/material"
import { makeStyles } from "@material-ui/styles";
import { Search } from "@material-ui/icons";
import React from "react";
import { useState, useMemo } from "react";

const containsText = (text, searchText) =>text.toString().toLowerCase().indexOf(searchText.toString().toLowerCase()) >-1;

export function SelectPeriodos(data){
    const classes = useStyles();
    const handleChangeSearch=(e)=>{
        data.setFocus(true)
        const name= e.target.name
        const value= e.target.value
        data.setSearchText({[name]:value})
    }
    const displayedOptions = useMemo(
        () => data.data.filter((option) => containsText(option.nombre, data.searchText)),
        [data.searchText]
    );
    
    const OptionPeriodo = data.data.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(data.selectedOptions1.indexOf(option.id) > -1) || (data.selectedOptions1.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    
    const OptionPeriodoSearch = displayedOptions.map((option) => (
        <MenuItem key={option.id} value={option.id}>
            <ListItem>
                <Checkbox checked={(data.selectedOptions1.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    
    const OptionRender = useMemo(
        ()=>{
            if(data.focus === true){
                data.setRender(displayedOptions)
                return OptionPeriodoSearch;
            }else{
                data.setRender(data.data)
                return OptionPeriodo
            }
        }
    )
    

    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%', fontSize:18}}>PERÍODOS</InputLabel>
            <FormControl sx={{width: '100%'}} className={classes.formControl} error={data.isSelected.selectedOptions1}>
                <InputLabel className="inputLabel" id="mutiple-select-label">{data.tiempoReporte}</InputLabel>
                <Select 
                id="4225"
                    labelId="mutiple-select-label42"
                    multiple
                    value={data.selectedOptions1}
                    open={data.openPeriodo}
                    onChange={data.handlePeriodos}
                    onClose={data.handleClosePeriodo}
                    onOpen={data.handleOpenPeriodo}
                    renderValue={(selected) =>{
                        if(selected.length>=3 && selected.length<data.render.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`${selected.length} Opciones Marcadas`}/>)
                        }else if(selected.length === data.render.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`Todas Marcadas (${selected.length})`}/>)
                        }else if(selected.length<3){
                            return(
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) =>{
                                        for (let h = 0; h < data.data.length; h++) {
                                            const element = data.data[h];
                                            if(element.id === value){
                                                return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                            }
                                        }
                                    })}
                                </Box>
                            )
                        }
                    }}
                    MenuProps={MenuProps}
                >
                    <ListSubheader>
                        <TextField
                        name="periodo"
                        size="small"
                        autoFocus={data.focus}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" style={{width: '10%',height: '100%'}}>
                                <Search />
                            </InputAdornment>
                            )
                        }}
                        onChange={(e) => handleChangeSearch(e)}
                        //onClick={data.setFocus(true)}
                        onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                            // Prevents autoselecting item while typing (default Select behaviour)
                            e.stopPropagation();
                            }
                        }}
                        />
                        
                    </ListSubheader>
                    <MenuItem value="all" className='items' classes={{root: data.isAllSelectPeriodo ? classes.selectedAll : ""}} style={{ display: data.showMenuItem.periodo ? "flex" : "none" }}>
                        <ListItem>
                            <Checkbox
                                classes={{ indeterminate: classes.indeterminateColor }}
                                checked={data.isAllSelectPeriodo}
                                indeterminate={ data.selectedOptions1.length > 0 && data.selectedOptions1.length < OptionRender.length }
                            />
                        </ListItem>
                        <ListItemText primary="Marcar Todo" classes={{ primary: classes.selectAllText }}/>
                        
                    </MenuItem >
                    {OptionRender}
                </Select>
            </FormControl>
        </Box>
    )
}

export function SelectCanales(canal){
    const classes = useStyles();
    var ID_Cliente = sessionStorage.getItem('Id_Cliente')
    const OptionCanales = canal.canal.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          <Checkbox checked={canal.selectedOptions2.indexOf(item.id) > -1} />
          <ListItemText sx={{fontSize:'1em'}} primary={item.nombre} />
        </MenuItem>
      ))
    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>CANALES</InputLabel>
            <FormControl sx={{width:'100%'}} className={'formControl'} error={canal.isSelected.selectedOptions2}>
                <InputLabel className="inputLabel" id="mutiple-select-label">Canales</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={canal.selectedOptions2}
                    open={canal.openCanales}
                    onChange={canal.handleCanales}
                    onClose={canal.handleCloseCanal}
                    onOpen={canal.handleOpenCanal}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) =>{
                              for (let h = 0; h < canal.canal.length; h++) {
                              const element = canal.canal[h];
                                if(element.id === value){
                                  return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                }else if(value === parseInt(ID_Cliente)){
                                  return(<Chip style={{fontSize:'.7em'}} key={value} label="MI CADENA"/>)
                                }
                              }
                            })}
                          </Box>
                      )}
                    MenuProps={MenuProps}
                >
                    
                    <MenuItem value={parseInt(ID_Cliente)}>
                        
                        <ListItem>
                            <Checkbox style={{display:'block', padding:'0'}} checked={canal.selectedOptions2.indexOf(parseInt(ID_Cliente)) > -1}/>
                        </ListItem>
                        <ListItemText sx={{fontSize:'1em'}} primary={'MI CADENA'} />
                    </MenuItem>
                    {OptionCanales}
                </Select>
            </FormControl>
        </Box>
    )
}

export function SelectRegiones(region){
    const classes = useStyles();
    const OptionRegiones = region.region.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          <Checkbox checked={region.selectedOptions3.indexOf(item.id) > -1} />
          <ListItemText sx={{fontSize:'1em'}} primary={item.nombre} />
        </MenuItem>
      ))
    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>REGIONES</InputLabel>
            <FormControl sx={{width: '100%'}} className={classes.formControl} error={region.isSelected.selectedOptions3}>
                <InputLabel className="inputLabel" id="mutiple-select-label">Regiones</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={region.selectedOptions3}
                    open={region.openRegiones}
                    onChange={region.handleRegiones}
                    onClose={region.handleCloseRegion}
                    onOpen={region.handleOpenRegiones}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) =>{
                              for (let h = 0; h < region.region.length; h++) {
                              const element = region.region[h];
                                if(element.id === value && value !== 0){
                                  return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                }else if (value === 0) {
                                return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                }
                              }
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {OptionRegiones}
                </Select>
            </FormControl>
        </Box>
    )
}
/*SubRegiones*/


export function SelectFabricantes(Fabricantes){
    const{Fabricante,selectedOptions5,openFabricante,handleFabricante,handleCloseFabricante,handleOpenFabricante}=Fabricantes
    const classes = useStyles();
    const OptionFabricante = Fabricante.map((option) => (
        <MenuItem key={option.id} value={(option.id)}>
            <ListItem>
                <Checkbox checked={(selectedOptions5.indexOf(option.id) > -1) || (selectedOptions5.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <Box style={{width:'100%', height:'auto', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <FormControl sx={{width: '100%'}} className={classes.formControl}>
                <InputLabel className="inputLabel" id="mutiple-select-label">Fabricantes</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={selectedOptions5}
                    open={openFabricante}
                    onChange={handleFabricante}
                    onClose={handleCloseFabricante}
                    onOpen={handleOpenFabricante}
                    renderValue={(selected) =>{
                        Fabricante.setIDFabricante(selected)
                        if(selected.length>=3 && selected.length<Fabricante.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`${selected.length} Opciones Marcadas`}/>)
                        }else if(selected.length === Fabricante.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`Todas Marcadas (${selected.length})`}/>)
                        }else if(selected.length<3){
                            return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h < Fabricante.length; h++) {
                                        const element = Fabricante[h];
                                        if(element.id === value){
                                            return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                        }
                                    }
                                })}
                            </Box>
                           )
                         }
                    }}
                    MenuProps={MenuProps}
                >
                    {OptionFabricante}
                </Select>
            </FormControl>
        </Box>
    )
}

export function SelectMarcas(Marca){
    console.log(Marca)
    const {Marcas,handleCloseMarcas,handleMarcas,handleOpenMarcas,openMarcas,selectedOptions6}=Marca
    const classes = useStyles();
    const OptionMarcas = Marcas.map((option) => (
        <MenuItem key={option.id} value={(option.id)}>
            <ListItem>
                <Checkbox checked={(selectedOptions6.indexOf(option.id) > -1) || (selectedOptions6.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <Box style={{width:'100%', height:'auto', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <FormControl sx={{width: '100%'}} className={classes.formControl}>
                <InputLabel className="inputLabel" id="mutiple-select-label">Marcas</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={selectedOptions6}
                    open={openMarcas}
                    onChange={handleMarcas}
                    onClose={handleCloseMarcas}
                    onOpen={handleOpenMarcas}
                    renderValue={(selected) =>{
                        // Marcas.setIDFabricante(selected)
                        if(selected.length>=3 && selected.length<Marcas.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`${selected.length} Opciones Marcadas`}/>)
                        }else if(selected.length === Marcas.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`Todas Marcadas (${selected.length})`}/>)
                        }else if(selected.length<3){
                            return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h < Marcas.length; h++) {
                                        const element = Marcas[h];
                                        if(element.id === value){
                                            return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                        }
                                    }
                                })}
                            </Box>
                           )
                         }
                    }}
                    MenuProps={MenuProps}
                >
                    {OptionMarcas}
                </Select>
            </FormControl>
        </Box>
    )
}


export function SelectCategorias(categorias){
    const {selectedOptions4,isSelected,openCategoria,handleCategoria,handleCloseCategoria,handleOpenCategoria,categoria,isAllSelectCategoria,showMenuItem,setIDCategoria,}=categorias
    console.log(categoria)
    const classes = useStyles();
    const OptionCategoria = categoria.map((option) => (
        <MenuItem key={option.id} value={(option.id)}>
            <ListItem>
                <Checkbox checked={(selectedOptions4.indexOf(option.id) > -1) || (selectedOptions4.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>ATRIBUTOS</InputLabel>
            <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions4}>
                <InputLabel className="inputLabel" id="mutiple-select-label">Categoría</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={selectedOptions4}
                    open={openCategoria}
                    onChange={handleCategoria}
                    onClose={handleCloseCategoria}
                    onOpen={handleOpenCategoria}
                    renderValue={(selected) =>{
                        categoria.setIDCategoria(selected)
                        if(selected.length>=3 && selected.length<categoria.length){
                          return(<ListItemText sx={{fontSize:'1em'}} primary={`${selected.length} Opciones Marcadas`}/>)
                        }else if(selected.length === categoria.length){
                          return(<ListItemText sx={{fontSize:'1em'}} primary={`Todas Marcadas (${selected.length})`}/>)
                        }else if(selected.length<3){
                          return(
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) =>{
                              for (let h = 0; h < categoria.length; h++) {
                              const element = categoria[h];
                                if(element.id === value){
                                  return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                }
                              }
                            })}
                          </Box>
                          )
                        }
                      }}
                    MenuProps={MenuProps}
                >
                    <MenuItem value="all" classes={{root: isAllSelectCategoria ? classes.selectedAll : ""}} style={{ display: showMenuItem.categoria ? "flex" : "none" }}>
                        <ListItem>
                            <Checkbox
                                classes={{ indeterminate: classes.indeterminateColor }}
                                checked={isAllSelectCategoria}
                                indeterminate={ selectedOptions4.length > 0 && selectedOptions4.length < categoria.length}
                            />
                        </ListItem>
                        <ListItemText primary="Marcar Todo" classes={{ primary: classes.selectAllText }}/>
                    </MenuItem >
                    {OptionCategoria}
                </Select>
            </FormControl>
            <SelectFabricantes
                Fabricante={categorias.Fabricante}
                selectedOptions5={categorias.selectedOptions5}
                openFabricante={categorias.openFabricante}
                handleFabricante={categorias.handleFabricante}
                handleCloseFabricante={categorias.handleCloseFabricante}
                handleOpenFabricante={categorias.handleOpenFabricante}
                setIDFabricante={categorias.setIDFabricante}
            />
            <SelectMarcas
                Marcas={categorias.Marcas}
                selectedOptions6={categorias.selectedOptions6}
                openMarcas={categorias.openMarcas}
                handleMarcas={categorias.handleMarcas}
                handleCloseMarcas={categorias.handleCloseMarcas}
                handleOpenMarcas={categorias.handleOpenMarcas}
            />
            <SelectFabricantes
                Fabricante={categorias.Fabricante}
                selectedOptions5={categorias.selectedOptions5}
                openFabricante={categorias.openFabricante}
                handleFabricante={categorias.handleFabricante}
                handleCloseFabricante={categorias.handleCloseFabricante}
                handleOpenFabricante={categorias.handleOpenFabricante}
                setIDFabricante={categorias.setIDFabricante}
            />
             <SelectMarcas
                Marcas={categorias.Marcas}
                selectedOptions6={categorias.selectedOptions6}
                openMarcas={categorias.openMarcas}
                handleMarcas={categorias.handleMarcas}
                handleCloseMarcas={categorias.handleCloseMarcas}
                handleOpenMarcas={categorias.handleOpenMarcas}
            />
            {/*<SelectFabricantes
                Fabricante={categorias.Fabricante}
                selectedOptions5={categorias.selectedOptions5}
                openFabricante={categorias.openFabricante}
                handleFabricante={categorias.handleFabricante}
                handleCloseFabricante={categorias.handleCloseFabricante}
                handleOpenFabricante={categorias.handleOpenFabricante}
                setIDFabricante={categorias.setIDFabricante}
            />
            <SelectMarcas
                Marcas={categorias.Marcas}
                selectedOptions6={categorias.selectedOptions6}
                openMarcas={categorias.openMarcas}
                handleMarcas={categorias.handleMarcas}
                handleCloseMarcas={categorias.handleCloseMarcas}
                handleOpenMarcas={categorias.handleOpenMarcas}
            />
            <SelectFabricantes
                Fabricante={categorias.Fabricante}
                selectedOptions5={categorias.selectedOptions5}
                openFabricante={categorias.openFabricante}
                handleFabricante={categorias.handleFabricante}
                handleCloseFabricante={categorias.handleCloseFabricante}
                handleOpenFabricante={categorias.handleOpenFabricante}
                setIDFabricante={categorias.setIDFabricante}
            />
            <SelectMarcas
                Marcas={categorias.Marcas}
                selectedOptions6={categorias.selectedOptions6}
                openMarcas={categorias.openMarcas}
                handleMarcas={categorias.handleMarcas}
                handleCloseMarcas={categorias.handleCloseMarcas}
                handleOpenMarcas={categorias.handleOpenMarcas}
            />
            <SelectMarcas
                Marcas={categorias.Marcas}
                selectedOptions6={categorias.selectedOptions6}
                openMarcas={categorias.openMarcas}
                handleMarcas={categorias.handleMarcas}
                handleCloseMarcas={categorias.handleCloseMarcas}
                handleOpenMarcas={categorias.handleOpenMarcas}
            /> */}
        </Box>
    )
}


export function SelectIndicadores(categorias){
    const {selectedOptions4,isSelected,openCategoria,handleCategoria,handleCloseCategoria,handleOpenCategoria,categoria,isAllSelectCategoria,showMenuItem,setIDCategoria,}=categorias
    console.log(categoria)
    const classes = useStyles();
    const OptionCategoria = categoria.map((option) => (
        <MenuItem key={option.id} value={(option.id)}>
            <ListItem>
                <Checkbox checked={(selectedOptions4.indexOf(option.id) > -1) || (selectedOptions4.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>ATRIBUTOS</InputLabel>
            <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions4}>
                <InputLabel className="inputLabel" id="mutiple-select-label">Categoría</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={selectedOptions4}
                    open={openCategoria}
                    onChange={handleCategoria}
                    onClose={handleCloseCategoria}
                    onOpen={handleOpenCategoria}
                    renderValue={(selected) =>{
                        categoria.setIDCategoria(selected)
                        if(selected.length>=3 && selected.length<categoria.length){
                          return(<ListItemText sx={{fontSize:'1em'}} primary={`${selected.length} Opciones Marcadas`}/>)
                        }else if(selected.length === categoria.length){
                          return(<ListItemText sx={{fontSize:'1em'}} primary={`Todas Marcadas (${selected.length})`}/>)
                        }else if(selected.length<3){
                          return(
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) =>{
                              for (let h = 0; h < categoria.length; h++) {
                              const element = categoria[h];
                                if(element.id === value){
                                  return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                                }
                              }
                            })}
                          </Box>
                          )
                        }
                      }}
                    MenuProps={MenuProps}
                >
                    <MenuItem value="all" classes={{root: isAllSelectCategoria ? classes.selectedAll : ""}} style={{ display: showMenuItem.categoria ? "flex" : "none" }}>
                        <ListItem>
                            <Checkbox
                                classes={{ indeterminate: classes.indeterminateColor }}
                                checked={isAllSelectCategoria}
                                indeterminate={ selectedOptions4.length > 0 && selectedOptions4.length < categoria.length}
                            />
                        </ListItem>
                        <ListItemText primary="Marcar Todo" classes={{ primary: classes.selectAllText }}/>
                    </MenuItem >
                    {OptionCategoria}
                </Select>
            </FormControl>

        </Box>
    )
}

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: '60%',
        width: '20%',
        '& ul':{
            background:'red'
        }
      },
    },
};
const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: '30%',
        height: '40%',
        minHeight:'300px',
        padding:'2%',
        border: '1.3px solid #000',
        background: '#ffefd5',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '1em',
        display:'inline-flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    agrupar:{
        display: 'flex',
        width: '100%',
        height:'40%',
        justifyContent: 'space-between',
        flexDirection:'column',
        overflow:'visible'
    },
    inputMaterial:{
        width: '95%',
        height:'100%'
    },
    list:{
        width:'80%',
        display:'inline-flex',
        flexDirection:'column'
    },
    listItem:{
        padding:'5% 0', justifyContent:'center',width:'auto'
    },
    popOver:{
        width:'90%', borderRadius:'1.5em', background:'transparent'
    },
    buttons:{
        position: 'absolute', top: '90%', right: '3%', width: '30%', justifyContent:'space-around',height:'5%'
    },
    botonReportes:{
        color:'#fff !important', borderRadius:'1.5em !important', width:'90% !important', margin:'4% 0 2% !important', padding:'10% !important'
    },
    MultiselecLabel:{
        display:'flex',
        flexDirection:'column',
        '& ul':{
            background:'red'
        }
    }
}))