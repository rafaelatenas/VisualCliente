import { CloseRounded} from '@material-ui/icons';
import React from 'react';
import { Box, Container, Typography, Modal, IconButton, CardContent, Popover, Card, List, ListItem, ListItemText, Paper, MenuList, Menu, MenuItem, CardMedia } from '@mui/material';
import './home.css';
import { CardDesktop, CardMovile, CarouselFooter, FooterMovile, HeaderDesktop, HeaderMovile } from './homeComponents';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            withdScreen:window.innerWidth,
            openModal:false,
            textModal:'',
            idPopover:'',
            anchorEl:null,
        }
    }
    LinkWopUser='reportId=d16796f7-2f73-430a-bfdd-5652f2900811&autoAuth=true&ctid=60d43e61-27f8-4543-b6ff-2b0d08f50018&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXBhYXMtMS1zY3VzLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9';
    /*Controles Modal */
    handleOpenModal=(datos)=>{
        this.setState({openModal:true, textModal:datos})
    }
    handleCloseModal=()=>{
        this.setState({openModal:!this.state.openModal})
    }
    /*Controles Popover */
    reports=[
        {id:1, key:1, target:'', url:'/retailservices/home/data', padre:'WOP', name:'Resumen Táctico'},
        {id:1, key:2, target:'_black', url:`//${sessionStorage.getItem('linkWop')}`, padre:'WOP', name:'WOP'},
        // {id:1, key:3, target:'', url:'', padre:'WOP', name:'Ranking de Tiendas'},
        // {id:1, key:4, target:'', url:'', padre:'WOP', name:'Panel de Cadenas'},
        {id:2, key:5, target:'', url:'', padre:'Retail Scanning', name:'Retail Scanning'},
        {id:2, key:6, target:'', url:'/retailservices/home/moneymarket', padre:'Retail Scanning', name:'Money Market'},
        // {id:2, key:7, target:'', url:'', padre:'Retail Scanning', name:'Categories Performance'},
        // {id:2, key:8, target:'', url:'', padre:'Retail Scanning', name:'Suppliers Performance'},
        // {id:2, key:9, target:'', url:'', padre:'Retail Scanning', name:'Skus Performance'},
        {id:3, key:10, target:'', url:'', padre:'Home Pantry', name:'Canales y Cadenas'},
        {id:3, key:11, target:'', url:'', padre:'Home Pantry', name:'Medicinas'},
        // {id:3, key:12, target:'', url:'', padre:'Home Pantry', name:'Categorías'},
        {id:4, key:13, target:'', url:'', padre:'CI', name:'Omnibus'},
        {id:4, key:14, target:'', url:'', padre:'CI', name:'CI a la Medida'},
        {id:4, key:15, target:'', url:'', padre:'CI', name:'Reportes Sindicados'},
        {id:5, key:16, target:'', url:'', padre:'Execution', name:'Censo Caracas'},
        {id:5, key:17, target:'', url:'', padre:'Execution', name:'Censo Maracaibo'},
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

    footerDesktop = <Container class='BoxCarousel containerCarousel'>
                        <CarouselFooter PropsFooterOpenModal={this.handleOpenModal}/>
                    </Container>
    

	render() {
		return(
            <Container className='containerBox'>
                {this.state.withdScreen >= 1020 ? <HeaderDesktop props={this.props.logOut}/> : <HeaderMovile/>}
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
                            <Typography> {/*{this.state.textModal}*/}</Typography> 
                            </CardContent>
                        </Card>
                    </Box>
                </Modal>
                <Container className='containerCard'>
                {this.state.withdScreen >= 1025 ? 
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
                        <MenuList className='listMenu'>
                            {this.reports.map((report)=>{
                                if (parseInt(this.state.idPopover) === report.id)
                                return(
                                    <MenuItem className='Item' key={report.key} style={{ justifyContent:'flex-start', marginLeft:'10%', overflow:'visible !important'}}>
                                        <NavLink className='LinkReport' to={report.url} target={report.target}>{report.name}</NavLink>
                                    </MenuItem>
                                )
                            })}
                        </MenuList>
                    </Menu>
                    </>: <CardMovile/>}
                </Container>
                {this.state.withdScreen >= 1020 ? this.footerDesktop : <FooterMovile props={this.props.logOut} item={'inicio'}/>}

            </Container>
        )
    }
}

export default Home;
