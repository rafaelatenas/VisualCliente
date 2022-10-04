import { Box, InputLabel, FormControl, Chip, Select, MenuItem, ListItem, Checkbox, ListItemText, TextField, ListSubheader, InputAdornment } from "@mui/material"
import { makeStyles } from "@material-ui/styles";
import { Search } from "@material-ui/icons";
import React from "react";
import { useState, useMemo } from "react";
import './select.css'

const containsText = (text, searchText) =>text.toString().toLowerCase().indexOf(searchText.toString().toLowerCase()) >-1;

export function SelectPeriodos(data){
    const {datos,focus,handleChangeSearch,handleClosePeriodo,handleOpenPeriodo,handlePeriodos,isAllSelectPeriodo,isSelected,openPeriodo,render,searchText,selectedOptions1,setFocus,setRender,setSearchText,showMenuItem,tiempoReporte}=data
    const classes = useStyles();

    const displayedOptions = useMemo(
        () => datos.filter((option) => containsText(option.nombre, searchText)),
        [searchText]
    );
    
    const OptionPeriodo = datos.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions1.indexOf(option.id) > -1) || (selectedOptions1.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    
    const OptionPeriodoSearch = displayedOptions.map((option) => (
        <MenuItem key={option.id} value={option.id} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions1.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    
    const OptionRender = useMemo(
        ()=>{
            if(focus === true){
                setRender(displayedOptions)
                return OptionPeriodoSearch;
            }else{
                setRender(datos)
                return OptionPeriodo
            }
        }
    )
    

    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%', fontSize:18}}>PERÍODOS</InputLabel>
            <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions1}>
                <InputLabel size={'small'} className="inputLabel" id="mutiple-select-label">{tiempoReporte}</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={selectedOptions1}
                    open={openPeriodo}
                    onChange={handlePeriodos}
                    onClose={handleClosePeriodo}
                    onOpen={handleOpenPeriodo}
                    renderValue={(selected) =>{
                        if(selected.length>=3 && selected.length<render.length){
                            return(<ListItemText sx={{'& span':{fontSize:'10px'}}} primary={`${selected.length} Opciones Marcadas`}/>)
                        }else if(selected.length === render.length){
                            return(<ListItemText sx={{'& span':{fontSize:'10px'}}} primary={`Todas Marcadas (${selected.length})`}/>)
                        }else if(selected.length<3){
                            return(
                                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5 }}>
                                    {selected.map((value) =>{
                                        for (let h = 0; h < datos.length; h++) {
                                            const element = datos[h];
                                            if(element.id === value){
                                                return(<Chip sx={{'& span':{fontSize:'10px'}}} key={value} label={element.nombre}/>)
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
                        autoFocus={focus}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" style={{width: 'auto',height: '100%'}}>
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
                    <MenuItem value="all" className='items' classes={{root: isAllSelectPeriodo ? classes.selectedAll : ""}} style={{ display: showMenuItem.periodo ? "flex" : "none" }}>
                        <ListItem>
                            <Checkbox
                                classes={{ indeterminate: classes.indeterminateColor }}
                                checked={isAllSelectPeriodo}
                                indeterminate={ selectedOptions1.length > 0 && selectedOptions1.length < OptionRender.length }
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
        <MenuItem key={item.id} value={item.id} className='items'>
          <Checkbox checked={canal.selectedOptions2.indexOf(item.id) > -1} />
          <ListItemText sx={{fontSize:'10px'}} primary={item.nombre} />
        </MenuItem>
      ))
    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>CANALES</InputLabel>
            <FormControl sx={{width: '100%'}} className={classes.formControl} error={canal.isSelected.selectedOptions2}>
                <InputLabel className="inputLabel" id="mutiple-select-label">Canales</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={canal.selectedOptions2}
                    open={canal.openCanales}
                    onChange={canal.handleCanales}
                    onClose={canal.handleCloseCanal}
                    onOpen={canal.handleOpenCanal}
                    renderValue={(selected) => {
                        if(selected.length>1 && selected.length < canal.canal.length){
                            return(<ListItemText sx={{'& span':{fontSize:'10px'}}} primary={`${selected.length} Opciones Marcadas`}/>)
                        }else if(selected.length === canal.canal.length){
                            return(<ListItemText sx={{'& span':{fontSize:'10px'}}} primary={`Todas Marcadas (${selected.length})`}/>)
                        }else if(selected.length){
                            return(
                                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5 }}>
                                    {selected.map((value) =>{
                                        for (let h = 0; h < canal.canal.length; h++) {
                                            const element = canal.canal[h];
                                            if(element.id === value){
                                                return(<Chip sx={{'& span':{fontSize:'10px'}}} key={value} label={element.nombre}/>)
                                            }
                                        }
                                    })}
                                </Box>
                            )
                        }
                    }}
                    MenuProps={MenuProps}
                >
                    {/* <MenuItem value={parseInt(ID_Cliente)}>
                        <ListItem>
                            <Checkbox style={{display:'block', padding:'0'}} checked={canal.selectedOptions2.indexOf(parseInt(ID_Cliente)) > -1}/>
                        </ListItem>
                        <ListItemText sx={{fontSize:'1em'}} primary={'MI CADENA'} />
                    </MenuItem> */}
                    {OptionCanales}
                </Select>
            </FormControl>
        </Box>
    )
}

export function SelectRegiones(region){
    const classes = useStyles();
    const OptionRegiones = region.region.map((item) => (
        <MenuItem key={item.id} value={item.id} className='items'>
          <Checkbox checked={region.selectedOptions3.indexOf(item.id) > -1} />
          <ListItemText sx={{fontSize:'1em'}} primary={item.nombre} />
        </MenuItem>
      ))
    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>ÁREAS</InputLabel>
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
                    renderValue={(selected) => {
                        if(selected.length>1 && selected.length < region.region.length){
                            return(<ListItemText sx={{'& span':{fontSize:'10px'}}} primary={`${selected.length} Opciones Marcadas`}/>)
                        }else if(selected.length === region.region.length){
                            return(<ListItemText sx={{'& span':{fontSize:'10px'}}} primary={`Todas Marcadas (${selected.length})`}/>)
                        }else if(selected.length){
                            return(
                                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5 }}>
                                    {selected.map((value) =>{
                                        for (let h = 0; h < region.region.length; h++) {
                                            const element = region.region[h];
                                            if(element.id === value){
                                                return(<Chip sx={{'& span':{fontSize:'10px'}}} key={value} label={element.nombre}/>)
                                            }
                                        }
                                    })}
                                </Box>
                            )
                        }
                    }}
                        
                        
                    //     (
                    //     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    //         {selected.map((value) =>{
                    //           for (let h = 0; h < region.region.length; h++) {
                    //           const element = region.region[h];
                    //             if(element.id === value && value !== 0){
                    //               return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                    //             }else if (value === 0) {
                    //             return(<Chip style={{fontSize:'.7em'}} key={value} label={element.nombre}/>)
                    //             }
                    //           }
                    //         })}
                    //     </Box>
                    // )}
                    MenuProps={MenuProps}
                >
                    {OptionRegiones}
                </Select>
            </FormControl>
        </Box>
    )
}
/*Atributos*/

export function SelectAtributos(atributos){
    const {selectedOptions4,isSelected,openCesta,handleCesta,handleCloseCesta,handleOpenCesta,Cesta,isAllSelectCesta,showMenuItem,setIDCesta}=atributos
    const {selectedOptions5,openCategoria,handleCategoria,handleCloseCategoria,handleOpenCategoria,Categorias,isAllSelectCategoria,setIDCategoria}=atributos
    const {Fabricante,selectedOptions6,openFabricante,handleFabricante,handleCloseFabricante,handleOpenFabricante,setIDFabricante}=atributos
    const {Marcas,handleCloseMarcas,handleMarcas,handleOpenMarcas,openMarcas,selectedOptions7}=atributos
    const {Segmentos,handleCloseSegmentos,handleSegmentos,handleOpenSegmentos,openSegmentos,selectedOptions8}=atributos
    const {Tamanno,handleCloseTamanno,handleTamanno,handleOpenTamanno,openTamanno,selectedOptions9}=atributos
    const {RTamanno,handleCloseRTamanno,handleRTamanno,handleOpenRTamanno,openRTamanno,selectedOptions10}=atributos
    const {Productos,handleCloseProducto,handleProducto,handleOpenProducto,openProducto,selectedOptions11}=atributos
    const {CBarra,handleCloseCBarra,handleCBarra,handleOpenCBarra,openCBarra,selectedOptions12}=atributos
    const {Nacionalidad,handleCloseNacionalidad,handleNacionalidad,handleOpenNacionalidad,openNacionalidad,selectedOptions13}=atributos



    const classes = useStyles();
    const OptionCesta = Cesta.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions4.indexOf(option.id) > -1) || (selectedOptions4.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'space-evenly'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>PRODUCTOS</InputLabel>
            <Box className="boxAtributos">
                <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions4}>
                    <InputLabel className="inputLabel input input" id="mutiple-select-label">Cesta</InputLabel>
                    <Select 
                        labelId="mutiple-select-label"
                        multiple
                        value={selectedOptions4}
                        open={openCesta}
                        onChange={handleCesta}
                        onClose={handleCloseCesta}
                        onOpen={handleOpenCesta}
                        renderValue={(selected) =>{
                            setIDCesta(selected)
                            if(selected.length>=3 && selected.length<Cesta.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`${selected.length} Opciones Marcadas`}/>)
                            }else if(selected.length === Cesta.length){
                            return(<ListItemText sx={{fontSize:'1em'}} primary={`Todas Marcadas (${selected.length})`}/>)
                            }else if(selected.length<3){
                            return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                for (let h = 0; h < Cesta.length; h++) {
                                const element = Cesta[h];
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
                        <MenuItem value="all" classes={{root: isAllSelectCesta ? classes.selectedAll : ""}} style={{ display: showMenuItem.Cesta ? "flex" : "none" }}>
                            <ListItem>
                                <Checkbox
                                    classes={{ indeterminate: classes.indeterminateColor }}
                                    checked={isAllSelectCesta}
                                    indeterminate={ selectedOptions4.length > 0 && selectedOptions4.length < Cesta.length}
                                />
                            </ListItem>
                            <ListItemText primary="Marcar Todo" classes={{ primary: classes.selectAllText }}/>
                        </MenuItem >
                        {OptionCesta}
                    </Select>
                </FormControl>
            
                <SelectCategorias
                    selectedOptions5={selectedOptions5}
                    openCategoria={openCategoria}
                    handleCategoria={handleCategoria}
                    handleCloseCategoria={handleCloseCategoria}
                    handleOpenCategoria={handleOpenCategoria}
                    Categorias={Categorias}
                    isAllSelectCategoria={isAllSelectCategoria}
                    setIDCategoria={setIDCategoria}
                    isSelected={isSelected}
                />
                <SelectFabricantes
                    Fabricante={Fabricante}
                    selectedOptions6={selectedOptions6}
                    openFabricante={openFabricante}
                    handleFabricante={handleFabricante}
                    handleCloseFabricante={handleCloseFabricante}
                    handleOpenFabricante={handleOpenFabricante}
                    setIDFabricante={setIDFabricante}
                    isSelected={isSelected}
                />
                <SelectMarcas
                    Marcas={Marcas}
                    handleCloseMarcas={handleCloseMarcas}
                    handleMarcas={handleMarcas}
                    handleOpenMarcas={handleOpenMarcas}
                    openMarcas={openMarcas}
                    selectedOptions7={selectedOptions7}
                    isSelected={isSelected}
                />
                <SelectSegmentos
                    Segmentos={Segmentos}
                    handleCloseSegmentos={handleCloseSegmentos}
                    handleSegmentos={handleSegmentos}
                    handleOpenSegmentos={handleOpenSegmentos}
                    openSegmentos={openSegmentos}
                    selectedOptions8={selectedOptions8}
                    isSelected={isSelected}
                />
                <SelectTamanno
                    Tamanno={Tamanno}
                    handleCloseTamanno={handleCloseTamanno}
                    handleTamanno={handleTamanno}
                    handleOpenTamanno={handleOpenTamanno}
                    openTamanno={openTamanno}
                    selectedOptions9={selectedOptions9}
                    isSelected={isSelected}
                />
                <SelectRTamanno
                    RTamanno={RTamanno}
                    handleCloseRTamanno={handleCloseRTamanno}
                    handleRTamanno={handleRTamanno}
                    handleOpenRTamanno={handleOpenRTamanno}
                    openRTamanno={openRTamanno}
                    selectedOptions10={selectedOptions10}
                    isSelected={isSelected}
                />
                <SelectProducto
                    Productos={Productos}
                    handleCloseProducto={handleCloseProducto}
                    handleProducto={handleProducto}
                    handleOpenProducto={handleOpenProducto}
                    openProducto={openProducto}
                    selectedOptions11={selectedOptions11}
                    isSelected={isSelected}
                />
                <SelectCBarra
                    CBarra={CBarra}
                    handleCloseCBarra={handleCloseCBarra}
                    handleCBarra={handleCBarra}
                    handleOpenCBarra={handleOpenCBarra}
                    openCBarra={openCBarra}
                    selectedOptions12={selectedOptions12}
                    isSelected={isSelected}
                />
                <SelectNacionalidad
                    Nacionalidad={Nacionalidad}
                    handleCloseNacionalidad={handleCloseNacionalidad}
                    handleNacionalidad={handleNacionalidad}
                    handleOpenNacionalidad={handleOpenNacionalidad}
                    openNacionalidad={openNacionalidad}
                    selectedOptions13={selectedOptions13}
                    isSelected={isSelected}
                />
            </Box>
        </Box>
    )
}
export function SelectCategorias(categoria) {
    const {selectedOptions5,isSelected,openCategoria,handleCategoria,handleCloseCategoria,handleOpenCategoria,Categorias,isAllSelectCategoria,setIDCategoria}=categoria
    const classes = useStyles();
    const OptionCategoria = Categorias.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions5.indexOf(option.id) > -1) || (selectedOptions5.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions5}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Categorias</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions5}
                open={openCategoria}
                onChange={handleCategoria}
                onClose={handleCloseCategoria}
                onOpen={handleOpenCategoria}
                renderValue={(selected) =>{
                    setIDCategoria(selected)
                    if(selected.length>=3 && selected.length<Categorias.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`${selected.length} Opciones Marcadas`}/>)
                    }else if(selected.length === Categorias.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`Todas Marcadas (${selected.length})`}/>)
                    }else if(selected.length<3){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h < Categorias.length; h++) {
                                        const element = Categorias[h];
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
                {/* style={{ display: showMenuItem.Cesta ? "flex" : "none" }} */}
                <MenuItem value="all" classes={{root: isAllSelectCategoria? classes.selectedAll : ""}} className='items'>
                    <ListItem>
                        <Checkbox
                            classes={{ indeterminate: classes.indeterminateColor }}
                            checked={isAllSelectCategoria}
                            indeterminate={ selectedOptions5.length > 0 && selectedOptions5.length < Categorias.length}
                        />
                    </ListItem>
                    <ListItemText primary="Marcar Todo" classes={{ primary: classes.selectAllText }}/>
                </MenuItem >
                {OptionCategoria}
            </Select>
        </FormControl>
    )
}

export function SelectFabricantes(Fabricantes){
    const {Fabricante,isSelected,selectedOptions5,openFabricante,handleFabricante,handleCloseFabricante,handleOpenFabricante,setIDFabricante}=Fabricantes
    const classes = useStyles();
    const OptionFabricante = Fabricante.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions5.indexOf(option.id) > -1) || (selectedOptions5.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions5}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Fabricantes</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions5}
                open={openFabricante}
                onChange={handleFabricante}
                onClose={handleCloseFabricante}
                onOpen={handleOpenFabricante}
                renderValue={(selected) =>{
                    setIDFabricante(selected)
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
    )
}

export function SelectMarcas(Marca){
    const {Marcas,handleCloseMarcas,handleMarcas,handleOpenMarcas,openMarcas,selectedOptions7,isSelected}=Marca
    const classes = useStyles();
    const OptionMarcas = Marcas.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions7.indexOf(option.id) > -1) || (selectedOptions7.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions7}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Marcas</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions7}
                open={openMarcas}
                onChange={handleMarcas}
                onClose={handleCloseMarcas}
                onOpen={handleOpenMarcas}
                renderValue={(selected) =>{
                    // setIDFabricante(selected)
                    if(selected.length>=3 && selected.length<Marcas.length){
                        return(<ListItemText sx={{fontSize:'1em'}} primary={`${selected.length} Opciones Marcadas`}/>)
                    }else if(selected.length === Marcas.length){
                        return(<ListItemText sx={{fontSize:'1em'}} primary={`Todas Marcadas (${selected.length})`}/>)
                    }else if(selected.length<3){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h <Marcas.length; h++) {
                                        const element =Marcas[h];
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
    )
}

export function SelectSegmentos(Marca){
    const {Segmentos,handleCloseSegmentos,handleSegmentos,handleOpenSegmentos,openSegmentos,selectedOptions8,isSelected}=Marca
    const classes = useStyles();
    const OptionSegmentos = Segmentos.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions8.indexOf(option.id) > -1) || (selectedOptions8.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions8}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Segmentos</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions8}
                open={openSegmentos}
                onChange={handleSegmentos}
                onClose={handleCloseSegmentos}
                onOpen={handleOpenSegmentos}
                renderValue={(selected) =>{
                    // setIDFabricante(selected)
                    if(selected.length>=3 && selected.length<Segmentos.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`${selected.length} Opciones Marcadas`}/>)
                    }else if(selected.length === Segmentos.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`Todas Marcadas (${selected.length})`}/>)
                    }else if(selected.length<3){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h <Segmentos.length; h++) {
                                        const element =Segmentos[h];
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
                {OptionSegmentos}
            </Select>
        </FormControl>
    )
}

export function SelectTamanno(Tamannos){
    const {Tamanno,handleCloseTamanno,handleTamanno,handleOpenTamanno,openTamanno,selectedOptions9,isSelected}=Tamannos
    const classes = useStyles();
    const OptionTamanno = Tamanno.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions9.indexOf(option.id) > -1) || (selectedOptions9.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions9}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Tamaño</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions9}
                open={openTamanno}
                onChange={handleTamanno}
                onClose={handleCloseTamanno}
                onOpen={handleOpenTamanno}
                renderValue={(selected) =>{
                    // setIDFabricante(selected)
                    if(selected.length>=3 && selected.length<Tamanno.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`${selected.length} Opciones Marcadas`}/>)
                    }else if(selected.length === Tamanno.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`Todas Marcadas (${selected.length})`}/>)
                    }else if(selected.length<3){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h <Tamanno.length; h++) {
                                        const element =Tamanno[h];
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
                {OptionTamanno}
            </Select>
        </FormControl>
    )
}

export function SelectRTamanno(rTamannos){
    const {RTamanno,handleCloseRTamanno,handleRTamanno,handleOpenRTamanno,openRTamanno,selectedOptions10,isSelected}=rTamannos
    const classes = useStyles();
    const OptionRTamanno = RTamanno.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions10.indexOf(option.id) > -1) || (selectedOptions10.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions10}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Rango Tamaño</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions10}
                open={openRTamanno}
                onChange={handleRTamanno}
                onClose={handleCloseRTamanno}
                onOpen={handleOpenRTamanno}
                renderValue={(selected) =>{
                    // setIDFabricante(selected)
                    if(selected.length>=3 && selected.length<RTamanno.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`${selected.length} Opciones Marcadas`}/>)
                    }else if(selected.length === RTamanno.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`Todas Marcadas (${selected.length})`}/>)
                    }else if(selected.length<3){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h <RTamanno.length; h++) {
                                        const element =RTamanno[h];
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
                {OptionRTamanno}
            </Select>
        </FormControl>
    )
}

export function SelectProducto(Product){
    const {Productos,handleCloseProducto,handleProducto,handleOpenProducto,openProducto,selectedOptions11,isSelected}=Product
    const classes = useStyles();
    const OptionProducto = Productos.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions11.indexOf(option.id) > -1) || (selectedOptions11.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions11}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Producto</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions11}
                open={openProducto}
                onChange={handleProducto}
                onClose={handleCloseProducto}
                onOpen={handleOpenProducto}
                renderValue={(selected) =>{
                    // setIDFabricante(selected)
                    if(selected.length>=3 && selected.length<Productos.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`${selected.length} Opciones Marcadas`}/>)
                    }else if(selected.length === Productos.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`Todas Marcadas (${selected.length})`}/>)
                    }else if(selected.length<3){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h <Productos.length; h++) {
                                        const element =Productos[h];
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
                {OptionProducto}
            </Select>
        </FormControl>
    )
}

export function SelectCBarra(Marca){
    const {CBarra,handleCloseCBarra,handleCBarra,handleOpenCBarra,openCBarra,selectedOptions12,isSelected}=Marca
    const classes = useStyles();
    const OptionCBarra = CBarra.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions12.indexOf(option.id) > -1) || (selectedOptions12.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions12}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Código de Barra</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions12}
                open={openCBarra}
                onChange={handleCBarra}
                onClose={handleCloseCBarra}
                onOpen={handleOpenCBarra}
                renderValue={(selected) =>{
                    // setIDFabricante(selected)
                    if(selected.length>=3 && selected.length<CBarra.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`${selected.length} Opciones Marcadas`}/>)
                    }else if(selected.length === CBarra.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`Todas Marcadas (${selected.length})`}/>)
                    }else if(selected.length<3){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h <CBarra.length; h++) {
                                        const element =CBarra[h];
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
                {OptionCBarra}
            </Select>
        </FormControl>
    )
}

export function SelectNacionalidad(Marca){
    const {Nacionalidad,handleCloseNacionalidad,handleNacionalidad,handleOpenNacionalidad,openNacionalidad,selectedOptions13,isSelected}=Marca
    const classes = useStyles();
    const OptionNacionalidad = Nacionalidad.map((option) => (
        <MenuItem key={option.id} value={(option.id)} className='items'>
            <ListItem>
                <Checkbox checked={(selectedOptions13.indexOf(option.id) > -1) || (selectedOptions13.indexOf(option) > -1)} />
            </ListItem>
            <ListItemText primary={option.nombre}/>
        </MenuItem>
    ))
    return(
        <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions13}>
            <InputLabel className="inputLabel input" id="mutiple-select-label">Nacionalidad</InputLabel>
            <Select 
                labelId="mutiple-select-label"
                multiple
                value={selectedOptions13}
                open={openNacionalidad}
                onChange={handleNacionalidad}
                onClose={handleCloseNacionalidad}
                onOpen={handleOpenNacionalidad}
                renderValue={(selected) =>{
                    // setIDFabricante(selected)
                    if(selected.length>=3 && selected.length<Nacionalidad.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`${selected.length} Opciones Marcadas`}/>)
                    }else if(selected.length === Nacionalidad.length){
                        return(<ListItemText sx={{fontSize:'15px'}} primary={`Todas Marcadas (${selected.length})`}/>)
                    }else if(selected.length<3){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) =>{
                                    for (let h = 0; h <Nacionalidad.length; h++) {
                                        const element =Nacionalidad[h];
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
                {OptionNacionalidad}
            </Select>
        </FormControl>
    )
}

export function SelectIndicadores(Indicador){
    const {Indicadores,handleCloseIndicadores,handleIndicadores,handleOpenIndicadores,isSelected,openIndicadores,selectedOptions14,setIDIndicadores,}=Indicador
    const classes = useStyles();
    var ID_Cliente = sessionStorage.getItem('Id_Cliente')
    const OptionIndicadores = Indicadores.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          <Checkbox checked={selectedOptions14.indexOf(item.id) > -1} />
          <ListItemText sx={{fontSize:'1em'}} primary={item.nombre} />
        </MenuItem>
      ))
    return(
        <Box style={{border:'.1em solid rgb(87 87 86/11%)',background:'#f7f4f4', borderRadius:'1.5em', width:'15%', height:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <InputLabel style={{width:'auto', padding:'10% 0 5%'}}>INDICADORES</InputLabel>
            <FormControl sx={{width: '100%'}} className={classes.formControl} error={isSelected.selectedOptions14}>
                <InputLabel className="inputLabel input" id="mutiple-select-label">Indicadores</InputLabel>
                <Select 
                    labelId="mutiple-select-label"
                    multiple
                    value={selectedOptions14}
                    open={openIndicadores}
                    onChange={handleIndicadores}
                    onClose={handleCloseIndicadores}
                    onOpen={handleOpenIndicadores}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) =>{
                              for (let h = 0; h < Indicadores.length; h++) {
                              const element = Indicadores[h];
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
                    
                    {/* <MenuItem value={parseInt(ID_Cliente)}>
                        
                        <ListItem>
                            <Checkbox style={{display:'block', padding:'0'}} checked={selectedOptions14.indexOf(parseInt(ID_Cliente)) > -1}/>
                        </ListItem>
                        <ListItemText sx={{fontSize:'1em'}} primary={'MI CADENA'} />
                    </MenuItem> */}
                    {OptionIndicadores}
                </Select>
            </FormControl>
        </Box>
    )
}

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: '60%',
        width: '16%',
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
    formControl:{
        overflow:' visible !important',
        marginTop: '2%',
        height: '8%',
        minHeight: 27,
        maxHeight:35
    }
}))