if (window.matchMedia("(max-width: 992px)").matches) {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryControlsContainer = document.querySelector('.gallery-controls');
    const galleryControls = ['previous', 'next'];
    const galleryItems = document.querySelectorAll('.gallery-item');

    class Carousel {
        constructor(container, items, controls) {
            this.carouselContainer = container;
            this.carouselControls = controls;
            this.carouselArray = [...items];
        }



        // Update css classes for gallery
        updateGallery() {
            this.carouselArray.forEach(el => {
                el.classList.remove('gallery-item-1');
                el.classList.remove('gallery-item-2');
                el.classList.remove('gallery-item-3');
                el.classList.remove('gallery-item-4');
                el.classList.remove('gallery-item-5');
            });

            this.carouselArray.slice(0, 5).forEach((el, i) => {

                el.classList.add(`gallery-item-${i+1}`);
            });
        }

        // Update the current order of the carouselArray and gallery
        setCurrentState(direction) {

            if (direction.className == 'gallery-controls-previous') {
                this.carouselArray.unshift(this.carouselArray.pop());
            } else {
                this.carouselArray.push(this.carouselArray.shift());
            }

            this.updateGallery();
        }


        setControls() {
            this.carouselControls.forEach(control => {
                galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;

                document.querySelector(`.gallery-controls-${control}`);
            });
        }

        // Add a click event listener to trigger setCurrentState method to rearrange carousel
        useControls() {
            const triggers = [...galleryControlsContainer.childNodes];

            triggers.forEach(control => {
                control.addEventListener('touchstart', e => {
                    e.preventDefault();

                    if (control.className == 'gallery-controls-add') {
                        const newItem = document.createElement('img');
                        const latestItem = this.carouselArray.length;
                        const latestIndex = this.carouselArray.findIndex(item => item.getAttribute('data-index') == this.carouselArray.length) + 1;


                        // Then add it to the carouselArray and update the gallery
                        this.carouselArray.splice(latestIndex, 0, newItem);
                        document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
                        this.updateGallery();

                    } else {
                        this.setCurrentState(control);
                    }

                });
            });
        }
    }

    const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

    exampleCarousel.setControls();
    // exampleCarousel.setNav();
    exampleCarousel.useControls();


    //--- Fin del Carrusel ---//




//Redireccionar al hacer click en los servicios principales

var Home_Pantry = document.getElementById('home_pantry');
var Retail_Scanning = document.getElementById('scanning');
var Execution = document.getElementById('execution');
var CI = document.getElementById('CI');
var WOP = document.getElementById('wop');

Home_Pantry.addEventListener('click', () => {
    window.location.href = "#"
});

Retail_Scanning.addEventListener('click', () => {
    window.location.href = "#"
});

Execution.addEventListener('click', () => {
    window.location.href = "#"
});

CI.addEventListener('click', () => {
    window.location.href = "#"
});

WOP.addEventListener('click', () => {
    window.location.href = "#"
});

//--- Tamaño de botones de servicios principales ---//
const gallery_item = document.querySelectorAll('.gallery-item')

for (const iterator of gallery_item) {
    var calcular = iterator.clientHeight + 30
    iterator.style.width = `${calcular}px`
}



//-- Despliegie de barra del footer--//


const bar_user = document.getElementById('barUser');

//--tamaño de la barra de usuario//
var calcularWidth = bar_user.clientHeight * 4.2

var calcularLeft = (screen.width - calcularWidth) / 2;
bar_user.style.width = `${calcularWidth}px`
bar_user.style.left = `${calcularLeft}px`

//-- barra desplegable--//

const footer = document.querySelector('footer');
var cambio = false;

bar_user.addEventListener("click", function() {
    if (!cambio) {
        footer.animate([
            { top: '10%' },
            { top: '0%' }
        ], {
            duration: 1000,
            fill: 'forwards',
        })


        // document.querySelector('footer').style.top = "0%";
        cambio = true;
    } else {
        footer.animate([
            { top: '0%' },
            { top: '10%' }
        ], {
            duration: 1000,
            fill: 'forwards',
        })

        cambio = false;
    }
});



//--- Botones del Menú Desplegable ---//

var log_out = document.getElementById('log_out');
var Gohome = document.getElementById('GOhome');
var config = document.getElementById('config');

log_out.addEventListener('click', () => {
    window.location.href = "index.html"
});
Gohome.addEventListener('click', () => {
    window.location.href = "home.html"
});
config.addEventListener('click', () => {
    window.location.href = "#"
});


const modificables = document.querySelector('.modificables');

var calcular_modificablesWidth = screen.width - (modificables.clientHeight * 1.2)
var calcular_modificablesLeft = (screen.width - calcular_modificablesWidth) / 2


if (screen.width <= 540) {
    modificables.style.width = "100%"
} else if (screen.width > 540) {
    modificables.style.width = `${calcular_modificablesWidth}px`
    modificables.style.left = `${calcular_modificablesLeft}px`
    modificables.style.borderTopLeftRadius = "1em"
    modificables.style.borderTopRightRadius = "1em"
    log_out.style.width = '100%'
    log_out.style.height = '100%'
    Gohome.style.width = '100%'
    Gohome.style.height = '100%'
    config.style.width = '100%'
    config.style.height = '100%'
}
    //--- Tamaño de Logo Atenas---//

const Logo_Atenas = document.querySelector('.Logo-atenas')

var calcularLogo = Logo_Atenas.clientHeight * 2.1
Logo_Atenas.style.width = `${calcularLogo}px`


}