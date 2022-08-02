import { CloseRounded} from '@material-ui/icons';
import React from 'react';
import { Box, Container, Typography, Modal, IconButton, CardContent, Popover, Card } from '@mui/material';
import './home.css';
import { CardDesktop, CarouselFooter, HeaderDesktop, HeaderMovile } from './homeComponents';

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
    /*Controles Modal */
    handleOpenModal=(datos)=>{
        console.log(document.getElementsByClassName('CardsCarousel'))
        //this.state.openModal? this.setState({anchorEl:e.currentTarget}):this.setState({anchorEl:null})

        this.setState({openModal:true, textModal:datos})
    }
    handleCloseModal=()=>{
        this.setState({openModal:!this.state.openModal})
    }
    /*Controles Popover */

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
    
    CardDesktop = ()=>{return( <>
                    <CardDesktop 
                        PropsCardPopoverClose={this.handleClosePopover}
                        PropsCardPopover={this.state.openPopover}
                        PropsIdPopover={this.state.idPopover}
                    />
                    <Popover
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClosePopover}
                        anchorEl={this.state.anchorEl}
                        //anchorPosition={{ top: this.state.medidas.top + this.state.medidas.top*0.2, left: this.state.medidas.left }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        style={{backgroundColor:'trasnparent', position:'absolute'}}
                    >
                        <CardContent style={{background:'#04172b73'}}>
                            The content of the Popover.
                        </CardContent>
                    </Popover>
                </>)}

    footerDesktop = <Container class='BoxCarousel containerCarousel'>
                        <CarouselFooter PropsFooterOpenModal={this.handleOpenModal}/>
                    </Container>

	render() {
		return(
            <Container className='containerBox'>
                {this.state.withdScreen > 850 ? <HeaderDesktop/> : <HeaderMovile/>}
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
                {this.state.withdScreen > 850 ? 
                
                    <>
                    <CardDesktop 
                        PropsCardPopoverClose={this.handleClosePopover}
                        PropsCardPopover={this.state.openPopover}
                        PropsIdPopover={this.state.idPopover}
                    />
                    <Popover
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClosePopover}
                        anchorEl={this.state.anchorEl}
                        //anchorPosition={{ top: this.state.medidas.top + this.state.medidas.top*0.2, left: this.state.medidas.left }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        style={{backgroundColor:'trasnparent', position:'absolute'}}
                    >
                        <CardContent style={{background:'#04172b73'}}>
                            The content of the Popover.
                        </CardContent>
                    </Popover>
                    </>: ''}

                </Container>
                {this.state.withdScreen > 850 ? this.footerDesktop : ''}

            </Container>
        )
    }
}

export default Home;
