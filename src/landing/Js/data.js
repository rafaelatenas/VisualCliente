//   //-------Tittle of Services Page---------//

// Valor corresponderá al nombre del servicio obtenido mediante la API, los ejemplos posibles son: "Retail Services, Retail Scanning, Home Pantry"
const data_of_tittle = "Servicio proporcionado por la API";

window.document.title = ('|Atenas|' + ' ' + data_of_tittle);


//--- Temporal a ser cambiado con función dinámica que obtenga los valores de la API ---//
var seleccion_opciones = document.getElementById('select-options'); //-- Card de selección de opciones --//

titutlo_opciones = document.createElement('h3');
titutlo_opciones.innerHTML = 'REPORTE'; //-- Contendrá el valor leído mediante la api para sustituirse según el servicio.
titutlo_opciones.id = 'tittle-services-options'
seleccion_opciones.appendChild(titutlo_opciones);

container_opciones = document.createElement('div');
container_opciones.id = 'services-options'
seleccion_opciones.appendChild(container_opciones);

const prueba = [
    'SEMANAL',
    'MENSUAL',
    'TRIMESTRAL',
    'SEMESTRAL'
]

var opciones_servicios = document.getElementById('services-options');

for (let q = 0; q < prueba.length; q++) {
    const elementprueba = prueba[q];

    opciones = document.createElement('button');
    opciones.className = 'opciones'
    opciones.id = `option_${q+1}`;
    opciones.innerHTML = elementprueba;
    opciones_servicios.appendChild(opciones);


    var opciones_periodo =  document.querySelectorAll('.opciones')
        
//provicional va a cambiar por el elemento HTML que se asigne para la sección de periodos//
    const provicional =  document.querySelector('.cards-of-data');

    opciones_periodo[q].addEventListener('click',()=>{

    const cuenta_provicional = provicional.childElementCount;

        switch (cuenta_provicional) {
            case 0:
                provicional_prueba = document.createElement('p');
                provicional_prueba.className = 'provicional_prueba';
                provicional_prueba.id = `option_${q+1}`;
                provicional_prueba.innerHTML = elementprueba;
                provicional.appendChild(provicional_prueba);
                break;

            case 1:
                provicional.removeChild(provicional.children[0]);
                
                provicional_prueba = document.createElement('p');
                provicional_prueba.className = 'provicional_prueba';
                provicional_prueba.id = `option_${q+1}`;
                provicional_prueba.innerHTML = elementprueba;
                provicional.appendChild(provicional_prueba);
                break;
        }

    })

}



var menu = document.getElementById('menu');
var cancel_menu = document.getElementById('cancel-menu');
var menu_desplegable = document.getElementById('menu-des');

var button_selecciones = document.getElementById('button_selecciones');
var selecciones = document.getElementById('selecciones');

var container_table = document.querySelector('.container-of-table');

if (menu.style.visibility == 'visible') {
    menu.addEventListener('click', () => {

        cancel_menu.style.visibility = "visible";
        menu.style.visibility = "hidden";
       
        menu_desplegable.animate([
            //{transform: 'translateX(-100%)'},
            {transform: 'translateX(98%)'}
        
        ],{
            fill:'forwards',
            duration:2400,
        })
        //-- Cerrar Selecciones si se hace click en abrir menú --//
            if (document.body.className  === 'button_selecciones'){
                document.querySelector(".arrowSeleccionts").animate([
                { transform: "rotate(0deg)" }
            ], {
                duration: 2400,
                fill: 'forwards'
            })
            selecciones.animate([

                { height: '0%' }
                
            ], {
                duration: 2400,
                fill: 'forwards'
            });
            }

            container_table.addEventListener('click',()=>{
                menu_desplegable.animate([
                    {transform: 'translateX(-100%)'}
                ],{
                    fill:'forwards',
                    duration:2400
                })
        
                cancel_menu.style.visibility = "hidden";
                menu.style.visibility = "visible"
            })
    });
    cancel_menu.addEventListener('click', () => {
        menu_desplegable.animate([
            {transform: 'translateX(-100%)'}
        ],{
            fill:'forwards',
            duration:2400
        })

        cancel_menu.style.visibility = "hidden";
        menu.style.visibility = "visible"
    });
}

//---- Menu de Selecciones ----//

button_selecciones.addEventListener('click', () => {
    document.body.classList.toggle('button_selecciones');

    if (document.body.className === 'button_selecciones') {
        //---Animación rotar Flecha ---///
        document.querySelector(".arrowSeleccionts").animate([
                { transform: "rotate(180deg)" }
            ], {
                duration: 2400,
                fill: 'forwards'
            })
            //-- Animación para boton de seleeciones ---//
            
        selecciones.animate([
                { height: '80%' }
            ], {
                duration: 2400,
                fill: 'forwards'
            })
       
    } else {
        document.querySelector(".arrowSeleccionts").animate([
            { transform: "rotate(0deg)" }
        ], {
            duration: 2400,
            fill: 'forwards'
        })

        selecciones.animate([
            { height: '0%' }
            
        ], {
            duration: 2400,
            fill: 'forwards'
        });
    }
})






const query = new URLSearchParams(window.location.search)
const params = query.get('name')
console.log(params)

document.addEventListener("DOMContentLoaded", e => {
    fetchData()
})


const fetchData = async() => {
    try {
        const res = await fetch('http://localhost:3001/apiCurso/listarServicios')
        const data = await res.json()
        banderillas(data)

    } catch (error) {
        console.log(error)
    }
}
const banderillas = data => {
    data.forEach(item => {
        let servicios = item.servicio
        console.log(servicios)
    })
}

