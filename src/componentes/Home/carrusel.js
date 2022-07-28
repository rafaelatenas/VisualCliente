import React from "react";
import canales from "../../landing/Images/logo_canales-cadenas.jpg";
import Categorias from "../../landing/Images/logo_categorias.png";
import NSE from "../../landing/Images/logo_nse.jpg";
import Skus from "../../landing/Images/logo_sku`s.png";
import TopProveedores from "../../landing/Images/logo_top-proveedores.jpg";

class Carousel extends React.Component{
    render(){
        return(
            <div className="slider">
                <div id="slide-track" className="slide-track">
                    <div className="slide">
                        <img src={canales} alt="Canales y Cadenas" data-icon="1" />
                    </div>
                    <div className="slide">
                        <img src={NSE} alt="NSE" data-icon="2" />
                    </div>
                    <div className="slide">
                        <img src={Skus} alt="Top Sku`s" data-icon="3" />
                    </div>
                    <div className="slide">
                        <img src={TopProveedores} alt="Top Proveedores" data-icon="4" />
                    </div>
                    <div className="slide">
                        <img src={Categorias} alt="Categorías" data-icon="5" />
                    </div>
                    <div className="slide">
                        <img src="../../landing/Images/logo_ranking_categoria.png" alt="Ranking Categorías" data-icon="6" />
                    </div>
                    <div className="slide">
                        <img src="../../landing/Images/logo_omnibus.png" alt="Omnibus" data-icon="7"/>
                    </div>
                    <div className="slide">
                        <img src="../../landing/Images/Icon-Top_Marcas.png" alt="TOP Marcas" data-icon="8" />
                    </div>
                    <div className="slide">
                        <img src="../../landing/Images/Icon-Top_SKU.png" alt="TOP SKU 's" data-icon="9" />
                    </div>
                    <div className="slide">
                        <img src={canales} alt="Canales y Cadenas" data-icon="1" />
                    </div>
                    <div className="slide">
                        <img src={NSE} alt="NSE" data-icon="2" />
                    </div>
                    <div className="slide">
                        <img src={Skus} alt="Top Sku`s" data-icon="3" />
                    </div>
                    <div className="slide">
                        <img src={TopProveedores} alt="Top Proveedores" data-icon="4" />
                    </div>
                    <div className="slide">
                        <img src={Categorias} alt="Categorías" data-icon="5" />
                    </div>
                    <div className="slide">
                        <img src="../../landing/Images/logo_ranking_categoria.png" alt="Ranking Categorías" data-icon="6" />
                    </div>
                    <div className="slide">
                        <img src="../../landing/Images/logo_omnibus.png" alt="Omnibus" data-icon="7"/>
                    </div>
                    <div className="slide">
                        <img src="../../landing/Images/Icon-Top_Marcas.png" alt="TOP Marcas" data-icon="8"/>
                    </div>
                    <div className="slide">
                        <img src="../../landing/Images/Icon-Top_SKU.png" alt="TOP SKU's" data-icon="9"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Carousel;