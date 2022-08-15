import { CloseRounded} from '@material-ui/icons';
import React from 'react';
import { Box, Container, Typography, Modal, IconButton, CardContent, Popover, Card, List, ListItem, ListItemText, Paper, MenuList, Menu, MenuItem } from '@mui/material';
import './home.css';
import { CardDesktop, CarouselFooter, HeaderDesktop, HeaderMovile } from './homeComponents';
import { Link, NavLink } from 'react-router-dom';
const urlProduccion = 'retailservices/';
class Home extends React.Component {
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            withdScreen:window.innerWidth,
            openModal:false,
            textModal:'',
            idPopover:'',
            anchorEl:null,
        }
    }
    /*Controles Modal */
    handleOpenModal=(datos)=>{
        this.setState({openModal:true, textModal:datos})
    }
    handleCloseModal=()=>{
        this.setState({openModal:!this.state.openModal})
    }
    /*Controles Popover */
    reports=[
        {id:1, key:1, url:'/retailservices/home/data', padre:'WOP', name:'Resumen Táctico'},
        {id:1, key:2, url:'', padre:'WOP', name:'Eficiencia Operativa'},
        {id:1, key:3, url:'', padre:'WOP', name:'Ranking de Tiendas'},
        {id:1, key:4, url:'', padre:'WOP', name:'Panel de Canedas'},
        {id:2, key:5, url:'', padre:'Retail Scanning', name:'Reporte Retail Scanning'},
        {id:2, key:6, url:'', padre:'Retail Scanning', name:'Money Market'},
        {id:2, key:7, url:'', padre:'Retail Scanning', name:'Categories Performance'},
        {id:2, key:8, url:'', padre:'Retail Scanning', name:'Suppliers Performance'},
        {id:2, key:9, url:'', padre:'Retail Scanning', name:'Skus Performance'},
        {id:3, key:10, url:'', padre:'Home Pantry', name:'Canales y Cadenas'},
        {id:3, key:11, url:'', padre:'Home Pantry', name:'NSE'},
        {id:3, key:12, url:'', padre:'Home Pantry', name:'Categorías'},
        {id:4, key:13, url:'', padre:'CI', name:'Omnibus'},
        {id:4, key:14, url:'', padre:'CI', name:'CI a la Medida'},
        {id:4, key:15, url:'', padre:'CI', name:'Reportes Sindicados'},
        {id:5, key:16, url:'', padre:'Execution', name:'Censo Caracas'},
        {id:5, key:17, url:'', padre:'Execution', name:'Censo Maracaibo'},
    ]
    handleClosePopover=(e)=>{
        this.state.anchorEl === null? this.setState({anchorEl:e.currentTarget}):this.setState({anchorEl:null})
        this.setState({idPopover:e.target.id})
        switch (this.state.idPopover === parseInt(e.target.id)) {
            case true:
                this.state.anchorEl === null? this.setState({anchorEl:e.currentTarget}):this.setState({anchorEl:null})
                break;
            case false:
                this.state.anchorEl === null? this.setState({anchorEl:e.currentTarget}):this.setState({anchorEl:null})
                break;
            default:
                break;
        }
    }

    PowerBi=(e)=>{
        var modal = document.getElementById('modal');
        var texto_modal = document.getElementById('texto_modal')
        modal.style.display='block'
        console.log(window)
        let iframe = '';
        switch (e.target.id) {
            case 'wopBi':
                iframe +='<iframe id="iframeWOP" width="800px" height="600px" title="Frame WOP Url" frameborder="0" src="https://app.powerbi.com/reportEmbed?reportId=593bcb73-4e32-4982-9a0e-ece34c4bcca6&autoAuth=true&ctid=60d43e61-27f8-4543-b6ff-2b0d08f50018&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXBhYXMtMS1zY3VzLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9"> </iframe>'
                break;
            case 'manejadorBi':
                iframe +='<iframe id="iframeWOP" width="800px" height="600px" title="Frame WOP Url" frameborder="0" src="https://app.powerbi.com/reportEmbed?reportId=593bcb73-4e32-4982-9a0e-ece34c4bcca6&autoAuth=true&ctid=60d43e61-27f8-4543-b6ff-2b0d08f50018&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXBhYXMtMS1zY3VzLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9"> </iframe>'
                break
            default:
                break;
        }
        console.dir(modal)

        texto_modal.innerHTML = iframe;
    }

    footerDesktop = <Container class='BoxCarousel containerCarousel'>
                        <CarouselFooter PropsFooterOpenModal={this.handleOpenModal}/>
                    </Container>

	render() {
		return(
            <Container className='containerBox'>
                {this.state.withdScreen > 1080 ? <HeaderDesktop props={this.props.logOut}/> : <HeaderMovile/>}
                <Modal
                    className='Modal'
                    open={this.state.openModal}
                    onClose={this.handleCloseModal}
                    aria-labelledby="Modal de Presentacion a Descripcion de Reportes"
                    aria-describedby="Muestra una Descripcion del contenido de los reportes"
                >
                    <Box className='boxModal'>
                        <Card className='cardModal'>
                            <CardContent className='cardModal'>
                                <IconButton onClick={this.handleCloseModal} title='Cerrar Modal'>
                                <CloseRounded></CloseRounded>
                            </IconButton>
                            <Typography>{this.state.textModal}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Modal>
                <Container className='containerCard'>
                {this.state.withdScreen > 1080 ? 
                    <>
                    <CardDesktop 
                        PropsCardPopoverClose={this.handleClosePopover}
                        PropsCardPopover={this.state.openPopover}
                        PropsIdPopover={this.state.idPopover}
                    />
                    <Menu
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClosePopover}
                    className='menuComponent'
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    >
                            {this.reports.map((report)=>{
                                if (parseInt(this.state.idPopover) === report.id)
                                return(
                                    <MenuItem className='Item' key={report.key} style={{ justifyContent:'flex-start', marginLeft:'10%', overflow:'visible !important'}}>
                                        <NavLink className='LinkReport' to={report.url} style={{textDecoration:'none', color:'#fff', fontSize:'.85em'}}>{report.name}</NavLink>
                                    </MenuItem>
                                )
                            })}
                    </Menu>
                    </>: ''}
                </Container>
                {this.state.withdScreen > 1080 ? this.footerDesktop : ''}

            </Container>
        )
    }
}

export default Home;
