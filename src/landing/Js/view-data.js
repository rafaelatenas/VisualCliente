//   //-------Tittle of Services Page---------//

// Valor corresponderá al nombre del servicio obtenido mediante la API, los ejemplos posibles son: "Retail Services, Retail Scanning, Home Pantry"
const data_of_tittle = "Servicio proporcionado por la API";

window.document.title = ('|Atenas|' + ' ' + data_of_tittle);


var menu = document.getElementById('menu');
var cancel_menu = document.getElementById('cancel-menu');

var menu_inter = document.getElementById('menu-int');
var change;
menu.addEventListener('click', () => {
    console.log('si')
    change = true

    if (change) {
        cancel_menu.style.visibility = "visible";
        menu.style.visibility = "hidden";
        document.getElementById('menu-des').style.left = ("0%");
        document.getElementById('menu-des').style.zIndex = ("100");

    }
})

cancel_menu.addEventListener('click', () => {
    console.log('si')
    change = false


    if (!change) {
        document.getElementById('menu-des').style.left = ("-80%")
        document.getElementById('menu-des').style.zIndex = ("0");

        cancel_menu.style.visibility = "hidden";
        menu.style.visibility = "visible";
    }
})


const button_dropdown = document.getElementById('button-dropdown');
const rotate = document.getElementById('rotate')
button_dropdown.addEventListener('click', () => {
    if (!change) {
        document.getElementById('container-dropdow').style.left = "0%";
        change = true;
        rotate.style.transform = "rotate(180deg)"
        rotate.style.animation = "none"
        button_dropdown.style.justifyContent = "center"


    } else {
        document.getElementById('container-dropdow').style.left = "";
        change = false;
        rotate.style.transform = "rotate(0deg)"
        rotate.style.animation = ""



    }

})