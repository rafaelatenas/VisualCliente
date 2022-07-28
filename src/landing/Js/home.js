//----------------- Vista de Escritorio ----------------//

var elements_menu = [
    0,
    1,
    2,
    3,
    4,
]

var botones = [
    menu_1 = document.getElementById('menu_1'),
    menu_2 = document.getElementById('menu_2'),
    menu_3 = document.getElementById('menu_3'),
    menu_4 = document.getElementById('menu_4'),
    menu_5 = document.getElementById('menu_5')
]


botones.forEach(item => {

    item.addEventListener('click', () => {
        for (const j of elements_menu) {

            const elemento_desplegable = document.getElementsByClassName("deplegable");

            //var calcularLeftDesplegable = screen
            const valor_boton = Array.from(item.id);
            const valor_desplegable = Array.from(elemento_desplegable[j].id);

            var comparador = valor_boton[5] == valor_desplegable[12];

            var valor_elemento = elemento_desplegable[j].style.display;
            if (valor_elemento == "none" & comparador == true) {
                elemento_desplegable[j].style.display = "block"

                const image_container = document.querySelectorAll('.image-container')

                for (let w = 0; w < image_container.length; w++) {
                    if (w==j) {
                        elemento_desplegable[j].style.width=`${image_container[w].clientWidth}px`
                        elemento_desplegable[j].style.left =`${image_container[w].getBoundingClientRect().left}px`  
                    }
                }
                
                elemento_desplegable[j].animate([
                    { opacity: '0' },
                    { opacity: '1' }
                ], {
                    duration: 1000,
                    fill: 'forwards',
                })
                botones[j].animate(
                    [
                        { transform: 'rotate(0deg)' },
                        { transform: 'rotate(180deg)' }
                    ], {
                        duration: 700,
                        fill: 'forwards'
                    });


            } else if (valor_elemento == "block") {
                botones[j].animate(
                    [
                        { transform: 'rotate(180deg)' },
                        { transform: 'rotate(0deg)' }
                    ], {
                        duration: 700,
                        fill: 'forwards'
                    });
                elemento_desplegable[j].animate([
                    { opacity: '1' },
                    { opacity: '0' }
                ], {
                    duration: 1000,
                    fill: 'forwards',
                })
                setTimeout(() => {
                    elemento_desplegable[j].style.display = 'none'
                }, 1000);
            }
        }
    })

});



//-- -- --Redireccionar a configuraciones-- -- -- //

const opciones_usuarios = document.getElementById('opciones_usuario');
const desplegable = document.querySelectorAll('.union')
opciones_usuarios.addEventListener('click', () => {
    for (const iterator_desplegable of desplegable) {

        var estado_desplegable = iterator_desplegable.style.display

        switch (estado_desplegable) {
            case 'none':
                iterator_desplegable.style.display = 'block'

                iterator_desplegable.animate(
                    [{
                            top: '10%',
                            left: '75%',
                            height: '0%',
                            transform: 'scale(0)',
                            transform: 'rotate(90deg)'
                        }, {
                            top: '8%',
                            left: '67%',
                            height: '15%',
                            transform: 'scale(1)',
                            transform: 'rotate(0deg)'
                        }

                    ], {
                        fill: 'forwards',
                        duration: 1500
                    }
                )
                break;

            case 'block':
                iterator_desplegable.animate(
                    [{
                            top: '8%',
                            left: '67%',
                            height: '15%',
                            transform: 'scale(1)',
                            transform: 'rotate(0deg)'
                        }, {
                            top: '10%',
                            left: '75%',
                            height: '0%',
                            transform: 'scale(0)',
                            transform: 'rotate(90deg)'
                        }

                    ], {
                        fill: 'forwards',
                        duration: 1500
                    }
                )
                setTimeout(() => {
                    iterator_desplegable.style.display = 'none'
                }, 1550);
                break;

        }
    }

});
document.querySelector('section').addEventListener('click', () => {
    for (const iterator_desplegable of desplegable) {
        iterator_desplegable.style.display = 'none'

    }
});
document.querySelector('footer').addEventListener('click', () => {
    for (const iterator_desplegable of desplegable) {
        iterator_desplegable.style.display = 'none'

    }
})

//---Redireccionar a los servicios de cada desplegable ---//

const elements_1 = document.getElementById('elementsWOP');
const elements_2 = document.getElementById('elementsRSc');
const elements_3 = document.getElementById('elementsHP');
const elements_4 = document.getElementById('elementsExc');
const elements_5 = document.getElementById('elementsCI');

var elements = [
    elements_1,
    elements_2,
    elements_3,
    elements_4,
    elements_5
]


const img_1 = document.getElementById('img_1');
const img_2 = document.getElementById('img_2');
const img_3 = document.getElementById('img_3');
const img_4 = document.getElementById('img_4');
const img_5 = document.getElementById('img_5')

var elements_images = [
    img_1,
    img_2,
    img_3,
    img_4,
    img_5
];

document.addEventListener("DOMContentLoaded", e => {
    fetchData()
})

const fetchData = async() => {
    try {
        const res = await fetch('http://localhost:3001/apiCurso/getOpcionesMenu/')
        const data = await res.json()
        DataValor(data)

    } catch (error) {
        console.log(error)
    }
}

function DataValor(data) {
    console.log(data);

    data.forEach(item => {

        let Cantidad_Elementos = Object.keys(item);

        for (var i = 1; i < (++Cantidad_Elementos.length); i++) {
            var Valor_Item_Padre = item[i];
            const img = document.createElement('img');
            console.log(item[i].img_servicio)

            img.src = `../landing/Images/${item[i].img_servicio}`;
            img.alt = item[i].nombre_Servicio;
            elements_images[i - 1].appendChild(img);

            for (let w = 0; w < Valor_Item_Padre.Reportes.length; w++) {

                let Valor_Item_Hijo = item[i].Reportes[i];

                if (Valor_Item_Hijo = i) {
                    a = document.createElement('a');
                    a.classList = "efect";
                    a.innerHTML = item[i].Reportes[w].nombre_reportes;
                    a.setAttribute("href", `data.html?name=${item[i].Reportes[w].url_reportes }`);
                    elements[i - 1].appendChild(a);

                    hr = document.createElement('hr');
                    elements[i - 1].appendChild(hr);
                }
            }
        }
    });

}
//---Redireccionar a los servicios del footer ---//

var prueba = [
    "Canales y Cadenas",
    "NSE",
    "Top Sku`s ",
    "Top Proveedores",
    "Categoría",
    "Ranking Categorías",
    "Omnibus",
    "valor 8",
    "valor 9",
]

const slide = document.querySelectorAll(".slide")
var texto_modal = document.getElementById('texto_modal')
var modal = document.getElementById('modal')


for (const iterador_slide of slide) {

    iterador_slide.addEventListener('click', () => {

        setTimeout(() => {
            modal.style.display = "block"
        }, 500);

        for (const j of elements_menu) {
            const elemento_desplegable = document.getElementsByClassName("deplegable");

            var valor_elemento = elemento_desplegable[j].style.display;

            if (valor_elemento == "block") {
                botones[j].animate(
                    [
                        { transform: 'rotate(180deg)' },
                        { transform: 'rotate(0deg)' }
                    ], {
                        duration: 700,
                        fill: 'forwards'
                    });
                elemento_desplegable[j].animate([
                    { opacity: '1' },
                    { opacity: '0' }
                ], {
                    duration: 1000,
                    fill: 'forwards',
                })
                setTimeout(() => {
                    elemento_desplegable[j].style.display = 'none'
                }, 1000);
            }
        }

        for (let n = 0; n < prueba.length; n++) {
            const elemento = [n + 1];
            var valor_imagen = iterador_slide.children[0].dataset.icon

            if (valor_imagen == elemento) {

                p = document.createElement('p');
                p.classList = "prueba";
                p.innerHTML = prueba[n];
                texto_modal.appendChild(p);

            }
            const numero_hijo = texto_modal.childElementCount;
            if ((numero_hijo > 1)) {

                texto_modal.removeChild(texto_modal.children[0]);

            }
        }
    })


    const cerrar = document.getElementById('cerrar');

    cerrar.addEventListener('click', () => {

        setTimeout(() => {
            modal.style.display = 'none'
        }, 500);

        modal.animate([

            { opacity: '1' },
            { opacity: '0' }

        ], {

            duration: 500,
            fill: 'forwards',

        })

        let childrenElements = texto_modal.childElementCount;

        switch (childrenElements) {

            case 1:
                setTimeout(() => {

                    texto_modal.removeChild(p);

                }, 500);
                break;
        }
    })


    document.querySelector('section').addEventListener('click', () => {

        modal.style.display = "none"

    })
    document.querySelector('header').addEventListener('click', () => {

        modal.style.display = "none"

    })
}


//-- -- --carousel de footer-- -- -- //

const pausa = document.querySelector(".slider");

const slide_track = document.getElementById("slide-track");
slide_track.style.width = `${screen.width*3}px`


//-- -- --carousel de animación footer-- -- -- //

pausa.addEventListener('mouseover', () => {
    slide_track.style.animationPlayState = "paused"
});
pausa.addEventListener('mouseout', () => {
    slide_track.style.animationPlayState = "running"
});


