import { Search } from "@material-ui/icons";
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import cargando from "../../landing/favicon/loader.svg";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "60%",
      width: 245,
      minwidth: 250,
    },
  },
};
var AG_GRID_LOCALE_ZZZ = {};
const AG_GRID_LOCALE_EN = {
    // Set Filter
    selectAll: "(Select All)",
    selectAllSearchResults: "(Select All Search Results)",
    searchOoo: "Search...",
    blanks: "(Blanks)",
    noMatches: "No matches",
  
    // Number Filter & Text Filter
    filterOoo: "Filter...",
    equals: "Equals",
    notEqual: "Not equal",
    blank: "Blank",
    notBlank: "Not blank",
    empty: "Choose One",
  
    // Number Filter
    lessThan: "Less than",
    greaterThan: "Greater than",
    lessThanOrEqual: "Less than or equal",
    greaterThanOrEqual: "Greater than or equal",
    inRange: "In range",
    inRangeStart: "from",
    inRangeEnd: "to",
  
    // Text Filter
    contains: "Contains",
    notContains: "Not contains",
    startsWith: "Starts with",
    endsWith: "Ends with",
  
    // Date Filter
    dateFormatOoo: "yyyy-mm-dd",
  
    // Filter Conditions
    andCondition: "AND",
    orCondition: "OR",
  
    // Filter Buttons
    applyFilter: "Apply",
    resetFilter: "Reset",
    clearFilter: "Clear",
    cancelFilter: "Cancel",
  
    // Filter Titles
    textFilter: "Text Filter",
    numberFilter: "Number Filter",
    dateFilter: "Date Filter",
    setFilter: "Set Filter",
  
    // Side Bar
    columns: "Columns",
    filters: "Filters",
  
    // columns tool panel
    pivotMode: "Pivot Mode",
    groups: "Row Groups",
    rowGroupColumnsEmptyMessage: "Drag here to set row groups aaaaa",
    values: "Values",
    valueColumnsEmptyMessage: "Drag here to aggregate",
    pivots: "Column Labels",
    pivotColumnsEmptyMessage: "Drag here to set column labels",
  
    // Header of the Default Group Column
    group: "Group",
  
    // Other
    loadingOoo: "Loading...",
    noRowsToShow: "No Rows To Show",
    enabled: "Enabled",
  
    // Menu
    pinColumn: "Pin Column",
    pinLeft: "Pin Left",
    pinRight: "Pin Right",
    noPin: "No Pin",
    valueAggregation: "Value Aggregation",
    autosizeThiscolumn: "Autosize This Column",
    autosizeAllColumns: "Autosize All Columns",
    groupBy: "Group by",
    ungroupBy: "Un-Group by",
    addToValues: "Add ${variable} to values",
    removeFromValues: "Remove ${variable} from values",
    addToLabels: "Add ${variable} to labels",
    removeFromLabels: "Remove ${variable} from labels",
    resetColumns: "Reset Columns",
    expandAll: "Expand All",
    collapseAll: "Close All",
    copy: "Copy",
    ctrlC: "Ctrl+C",
    copyWithHeaders: "Copy With Headers",
    copyWithHeaderGroups: "Copy With Header Groups",
    paste: "Paste",
    ctrlV: "Ctrl+V",
    export: "Export",
    csvExport: "CSV Export",
    excelExport: "Excel Export",
  
    // Enterprise Menu Aggregation and Status Bar
    sum: "Sum",
    min: "Min",
    max: "Max",
    none: "None",
    count: "Count",
    avg: "Average",
    filteredRows: "Filtered",
    selectedRows: "Selected",
    totalRows: "Total Rows",
    totalAndFilteredRows: "Rows",
    more: "More",
    to: "to",
    of: "of",
    page: "Page",
    nextPage: "Next Page",
    lastPage: "Last Page",
    firstPage: "First Page",
    previousPage: "Previous Page",
  
    // Pivoting
    pivotColumnGroupTotals: "Total",
  
    // Enterprise Menu (Charts)
    pivotChartAndPivotMode: "Pivot Chart & Pivot Mode",
    pivotChart: "Pivot Chart",
    chartRange: "Chart Range",
  
    columnChart: "Column",
    groupedColumn: "Grouped",
    stackedColumn: "Stacked",
    normalizedColumn: "100% Stacked",
  
    barChart: "Bar",
    groupedBar: "Grouped",
    stackedBar: "Stacked",
    normalizedBar: "100% Stacked",
  
    pieChart: "Pie",
    pie: "Pie",
    doughnut: "Doughnut",
  
    line: "Line",
  
    xyChart: "X Y (Scatter)",
    scatter: "Scatter",
    bubble: "Bubble",
  
    areaChart: "Area",
    area: "Area",
    stackedArea: "Stacked",
    normalizedArea: "100% Stacked",
  
    histogramChart: "Histogram",
  
    // Charts
    pivotChartTitle: "Pivot Chart",
    rangeChartTitle: "Range Chart",
    settings: "Settings",
    data: "Data",
    format: "Format",
    categories: "Categories",
    defaultCategory: "(None)",
    series: "Series",
    xyValues: "X Y Values",
    paired: "Paired Mode",
    axis: "Axis",
    navigator: "Navigator",
    color: "Color",
    thickness: "Thickness",
    xType: "X Type",
    automatic: "Automatic",
    category: "Category",
    number: "Number",
    time: "Time",
    xRotation: "X Rotation",
    yRotation: "Y Rotation",
    ticks: "Ticks",
    width: "Width",
    height: "Height",
    length: "Length",
    padding: "Padding",
    spacing: "Spacing",
    chart: "Chart",
    title: "Title",
    titlePlaceholder: "Chart title - double click to edit",
    background: "Background",
    font: "Font",
    top: "Top",
    right: "Right",
    bottom: "Bottom",
    left: "Left",
    labels: "Labels",
    size: "Size",
    minSize: "Minimum Size",
    maxSize: "Maximum Size",
    legend: "Legend",
    position: "Position",
    markerSize: "Marker Size",
    markerStroke: "Marker Stroke",
    markerPadding: "Marker Padding",
    itemSpacing: "Item Spacing",
    itemPaddingX: "Item Padding X",
    itemPaddingY: "Item Padding Y",
    layoutHorizontalSpacing: "Horizontal Spacing",
    layoutVerticalSpacing: "Vertical Spacing",
    strokeWidth: "Stroke Width",
    offset: "Offset",
    offsets: "Offsets",
    tooltips: "Tooltips",
    callout: "Callout",
    markers: "Markers",
    shadow: "Shadow",
    blur: "Blur",
    xOffset: "X Offset",
    yOffset: "Y Offset",
    lineWidth: "Line Width",
    normal: "Normal",
    bold: "Bold",
    italic: "Italic",
    boldItalic: "Bold Italic",
    predefined: "Predefined",
    fillOpacity: "Fill Opacity",
    strokeOpacity: "Line Opacity",
    histogramBinCount: "Bin count",
    columnGroup: "Column",
    barGroup: "Bar",
    pieGroup: "Pie",
    lineGroup: "Line",
    scatterGroup: "X Y (Scatter)",
    areaGroup: "Area",
    histogramGroup: "Histogram",
    groupedColumnTooltip: "Grouped",
    stackedColumnTooltip: "Stacked",
    normalizedColumnTooltip: "100% Stacked",
    groupedBarTooltip: "Grouped",
    stackedBarTooltip: "Stacked",
    normalizedBarTooltip: "100% Stacked",
    pieTooltip: "Pie",
    doughnutTooltip: "Doughnut",
    lineTooltip: "Line",
    groupedAreaTooltip: "Area",
    stackedAreaTooltip: "Stacked",
    normalizedAreaTooltip: "100% Stacked",
    scatterTooltip: "Scatter",
    bubbleTooltip: "Bubble",
    histogramTooltip: "Histogram",
    noDataToChart: "No data available to be charted.",
    pivotChartRequiresPivotMode: "Pivot Chart requires Pivot Mode enabled.",
    chartSettingsToolbarTooltip: "Menu",
    chartLinkToolbarTooltip: "Linked to Grid",
    chartUnlinkToolbarTooltip: "Unlinked from Grid",
    chartDownloadToolbarTooltip: "Download Chart",
  
    // ARIA
    ariaHidden: "hidden",
    ariaVisible: "visible",
    ariaChecked: "checked",
    ariaUnchecked: "unchecked",
    ariaIndeterminate: "indeterminate",
    ariaDefaultListName: "List",
    ariaColumnSelectAll: "Toggle Select All Columns",
    ariaInputEditor: "Input Editor",
    ariaDateFilterInput: "Date Filter Input",
    ariaFilterList: "Filter List",
    ariaFilterInput: "Filter Input",
    ariaFilterColumnsInput: "Filter Columns Input",
    ariaFilterValue: "Filter Value",
    ariaFilterFromValue: "Filter from value",
    ariaFilterToValue: "Filter to value",
    ariaFilteringOperator: "Filtering Operator",
    ariaColumn: "Column",
    ariaColumnList: "Column List",
    ariaColumnGroup: "Column Group",
    ariaRowSelect: "Press SPACE to select this row",
    ariaRowDeselect: "Press SPACE to deselect this row",
    ariaRowToggleSelection: "Press Space to toggle row selection",
    ariaRowSelectAll: "Press Space to toggle all rows selection",
    ariaToggleVisibility: "Press SPACE to toggle visibility",
    ariaSearch: "Search",
    ariaSearchFilterValues: "Search filter values",
  
    ariaRowGroupDropZonePanelLabel: "Row Groups",
    ariaValuesDropZonePanelLabel: "Values",
    ariaPivotDropZonePanelLabel: "Column Labels",
    ariaDropZoneColumnComponentDescription: "Press DELETE to remove",
    ariaDropZoneColumnValueItemDescription:
      "Press ENTER to change the aggregation type",
  
    // ARIA Labels for Dialogs
    ariaLabelColumnMenu: "Column Menu",
    ariaLabelCellEditor: "Cell Editor",
    ariaLabelDialog: "Dialog",
    ariaLabelSelectField: "Select Field",
    ariaLabelTooltip: "Tooltip",
    ariaLabelContextMenu: "Context Menu",
    ariaLabelSubMenu: "SubMenu",
    ariaLabelAggregationFunction: "Aggregation Function",
  
    // Number Format (Status Bar, Pagination Panel)
    thousandSeparator: ",",
    decimalSeparator: ".",
  };
  
// Create a dummy locale based on english but prefix everything with zzz
Object.keys(AG_GRID_LOCALE_EN).forEach(function (key) {
  if (key === 'thousandSeparator' || key === 'decimalSeparator') {
    return;
  }
  AG_GRID_LOCALE_ZZZ[key] = 'zzz-' + AG_GRID_LOCALE_EN[key];
});
export function Semana(params) {
  const {
    data,
    value,
    handleChangeValue,
    handleOpen,
    handleClose,
    ActiveDisabled,
    openFiltro,
  } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? data
    : data.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <FormControl sx={{ width: "80%" }}>
      <InputLabel id="demo-simple-select-label">Semana</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Semanas"
        name="Semanas"
        multiple
        onChange={handleChangeValue}
        onClose={() => handleClose("Semanas")}
        onOpen={() => handleOpen("Semanas")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < data.length) {
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
          <MenuItem key={option.id} value={option.id} className="items">
            <ListItem>
              <Checkbox
                checked={
                  value.indexOf(option.id) > -1 || value.indexOf(option) > -1
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
  } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  // const isAllSelectPeriodo = data.length > 0 && selectedOptions1.length === render.length;
  return (
    <FormControl sx={{ width: "80%" }}>
      <InputLabel id="demo-simple-select-label">Retail</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Retail"
        name="Retailers"
        multiple
        onChange={handleChangeValue}
        onClose={() => handleClose("Retailers")}
        onOpen={() => handleOpen("Retailers")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < data.length) {
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
              checked={value.length > 0 && value.length === (datos.length-1) || value.indexOf(option.id) > -1}
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
  } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  return (
    <FormControl sx={{ width: "80%" }}>
      <InputLabel id="demo-simple-select-label">Estado</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Estados"
        name="Estados"
        multiple
        onChange={handleChangeValue}
        onClose={() => handleClose("Estados")}
        onOpen={() => handleOpen("Estados")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < data.length) {
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
              checked={value.length > 0 && value.length === (datos.length-1) || value.indexOf(option.id) > -1}
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
  } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  return (
    <FormControl sx={{ width: "80%" }}>
      <InputLabel id="demo-simple-select-label">Tiendas</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Tiendas"
        name="Tiendas"
        multiple
        onChange={handleChangeValue}
        onClose={() => handleClose("Tiendas")}
        onOpen={() => handleOpen("Tiendas")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < data.length) {
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
              checked={value.length > 0 && value.length === (datos.length-1) || value.indexOf(option.id) > -1}
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
  } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  return (
    <FormControl sx={{ width: "80%" }}>
      <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Categorias"
        name="Categorias"
        multiple
        onChange={handleChangeValue}
        onClose={() => handleClose("Categorias")}
        onOpen={() => handleOpen("Categorias")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < data.length) {
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
              checked={value.length > 0 && value.length === (datos.length-1) || value.indexOf(option.id) > -1}
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
  } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  return (
    <FormControl sx={{ width: "80%" }}>
      <InputLabel id="demo-simple-select-label">Fabricante</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Fabricantes"
        name="Fabricantes"
        multiple
        onChange={handleChangeValue}
        onClose={() => handleClose("Fabricantes")}
        onOpen={() => handleOpen("Fabricantes")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < data.length) {
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
              checked={value.length > 0 && value.length === (datos.length-1) || value.indexOf(option.id) > -1}
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
  } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  return (
    <FormControl sx={{ width: "80%" }}>
      <InputLabel id="demo-simple-select-label">Marca</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Marcas"
        name="Marcas"
        multiple
        onChange={handleChangeValue}
        onClose={() => handleClose("Marcas")}
        onOpen={() => handleOpen("Marcas")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < data.length) {
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
              checked={value.length > 0 && value.length === (datos.length-1) || value.indexOf(option.id) > -1}
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
  } = params;
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const datos = !search
    ? ([{id:'all', nombre:'Marca Todo'}]).concat(data)
    : ([{id:'all', nombre:'Marca Todo'}]).concat(data).filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  return (
    <FormControl sx={{ width: "80%" }}>
      <InputLabel id="demo-simple-select-label">Codigo de Barras</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Codigo de Barras"
        name="CodBarras"
        multiple
        onChange={handleChangeValue}
        onClose={() => handleClose("CodBarras")}
        onOpen={() => handleOpen("CodBarras")}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length >= 2 && selected.length < data.length) {
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
              checked={value.length > 0 && value.length === (datos.length-1) || value.indexOf(option.id) > -1}
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
  return (
    <FormControl sx={{ width: "80%" }}>
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
const useStyles = makeStyles((theme) => ({
  box: {
    width: "100%",
  },
}));
