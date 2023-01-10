import { CloseRounded} from '@material-ui/icons';
import React from 'react';
import { Box, Container, Typography, Modal, IconButton, CardContent, Popover, Card, List, ListItem, ListItemText, Paper, MenuList, Menu, MenuItem, CardMedia, Button } from '@mui/material';
import './home.css';
import { CardDesktop, CardMovile, CarouselFooter, FooterMovile, HeaderDesktop, HeaderMovile } from './homeComponents';

class Home extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            withdScreen:window.innerWidth,
            openModal:false,
            textModal:'',
            idPopover:'',
            anchorEl:null,
            comprobadorWop : sessionStorage.getItem('linkWop')!==undefined?'_black':'_self'
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
        {id:1, key:1, target:'', url:'', padre:'WOP', name:'Resumen Táctico'},
        {id:1, key:2, target:sessionStorage.getItem('linkWop').length!==0?'_black':'_self', url:`${sessionStorage.getItem('linkWop')}`, padre:'WOP', name:'WOP'},
        {id:2, key:5, target:'', url:'/retailservices/home/retailscanning', padre:'Retail Scanning', name:'Retail Scanning'},
        {id:2, key:6, target:'', url:'/retailservices/home/moneymarket', padre:'Retail Scanning', name:'Money Market'},
        {id:3, key:10, target:'', url:'', padre:'Home Pantry', name:'Canales y Cadenas'},
        {id:3, key:11, target:'', url:'', padre:'Home Pantry', name:'Medicinas'},
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

    console.log(sessionStorage.getItem('linkWop').length)
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
                                        <a className='LinkReport' href={report.url} target={report.target}>{report.name}</a>
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
