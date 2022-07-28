//   //-------Tittle of Services Page---------//

// Valor corresponderá al nombre del servicio obtenido mediante la API, los ejemplos posibles son: "Retail Services, Retail Scanning, Home Pantry"
const data_of_tittle = "Servicio proporcionado por la API";

window.document.title = ('|Atenas|' + ' ' + data_of_tittle);

//-- -- --Interactive drop - down menu button

var menu = document.getElementById('menu');
var cancel_menu = document.getElementById('cancel-menu');

var menu_inter = document.getElementById('menu-int');
var change = false;
menu.addEventListener('click', () => {
        if (!change) {
            cancel_menu.style.visibility = "visible";
            menu.style.visibility = "hidden";
            document.getElementById('menu-des').style.left = ("0%");
        }
    })
    //---- Alert Temporal de disposición de servicios----
var alert_message = document.getElementById('alert-message');

function event_temporal() {
    addEventListener('click', () => {
        alert_message.style.visibility = 'visible'
    })

}
//-- -- -- -- --matchMedia

var boton = document.getElementById('boton'); //-- Boton Desplegable movil

var active_modal = document.getElementById('Icon-Top_SKU'); //--Ejemplo de activador Modal exclusive desktop
var close_modal = document.getElementById('close-modal'); //-- Boton de cerrar modal exclusivo desktop
var popup = document.getElementById('popup'); //--Modal exclusive desktop

var select_options = document.getElementById('select-options'); //-- Card de selección de opciones --//
if (window.matchMedia("(max-width: 991px)").matches) {

    document.getElementById('buttons-complementary').style.visibility = "hidden"

    //-- --Drop down bar MOVIL
    var despliegue = false;

    boton.addEventListener("click", function() {
        if (!despliegue) {
            document.getElementById('desplegable').style.top = "50%";

            despliegue = true;
        } else {
            document.getElementById('desplegable').style.top = "0%";
            despliegue = false;
        }
    });
    cancel_menu.addEventListener('click', () => {
        if (!change) {
            document.getElementById('menu-des').style.left = ("-80%")

            cancel_menu.style.visibility = "hidden";
            menu.style.visibility = "visible";
        }
    })

    //---Disabled button link---//
    // Elemento desactivado segùn lectura de datos obtenidos mediante la API. Recordar integrar Matchmedia para desactivar
    // la lectura en dispositivos moviles, asimismo0, recordar ajustar el modal para dispositivos móviles según se requiera.
    const scanning_child = document.getElementById('retailscanning').parentNode;
    scanning_child.href = '#'

    //---Popup Disabled---//
    popup.style.visibility = "hidden";
    //---Alert Disabled---//
    document.getElementById('alert-message').style.display = "none;"


} else {
    document.getElementById('desplegable').style.top = "";



    //--- Popup Activade---//
    active_modal.addEventListener('click', () => {
        popup.style.visibility = "visible";

    })
    close_modal.addEventListener('click', () => {
        popup.style.visibility = "";
    })

    //---- Alert Temporal de disposición de servicios----
    var alert_message = document.getElementById('alert-message');
    var aceptar = document.getElementById('aceptar');

    const event = document.getElementById('Icon-Ranking_Retail');
    event.addEventListener('click', () => {
        alert_message.style.visibility = "visible";
    })


    aceptar.addEventListener('click', () => {
        alert_message.style.visibility = "hidden";
        console.log('hiciste click en aceptar')
    })

}