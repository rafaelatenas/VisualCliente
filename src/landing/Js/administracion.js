var contenedor_opciones = document.getElementById('aa')

var contenedor = document.querySelectorAll('.contenedor');
var botones = document.querySelectorAll('.boton');

var lista_menu = document.querySelector('.lista_menu');
//console.log(lista_menu.children)
const lolo = document.getElementById('lolo')
lolo.addEventListener('click',()=>{
    console.log(159)
})
    lolo.addEventListener('click', ()=>{
        console.log(159)
         if (contenedor_opciones.style.visibility === "hidden") {
             //contenedor_opciones.style.visibility = "visible"
             console.log(contenedor)
             for (let k = 0; k < botones.length; k++) {
                
                 botones[k].addEventListener('click',()=>{
                     const elemento_contenedor = contenedor[k]

                     switch (contenedor[k].clientHeight === 0) {
                         case true:
                             setTimeout(() => {
                                 botones[k].style.borderTopRightRadius= '.3em'
                                 botones[k].style.borderTopLeftRadius= '.3em'
                                 botones[k].style.borderBottomRightRadius= '0em'
                                 botones[k].style.borderBottomLeftRadius= '0em'
                            
                             }, 1400);

                             elemento_contenedor.animate([
                            
                                 {height:'75%'},
                                
                             ],{
                                 fill:'forwards',
                                 duration: 1400
                             });
                            
                             break;
   
                         case false :
   
                         setTimeout(() => {
                             console.log(elemento_contenedor)
                             botones[k].style.borderTopRightRadius= '.3em'
                             botones[k].style.borderTopLeftRadius= '.3em'
                             botones[k].style.borderBottomRightRadius= '.3em'
                             botones[k].style.borderBottomLeftRadius= '.3em' 
                         }, 1400);

                         elemento_contenedor.animate(
                             [
                                 {height:'0%'}],{
                                 fill:'forwards',
                                 duration: 1400
                             }
                         );

                             break;
                         default:
                             break;
                     }        
                 })
             }
         }
    });

    lista_menu.children[5].addEventListener('click', () => {
        window.location.href = "index.html"
    });

const abrir_menu = document.getElementById('abrir-menu');
const cancelar_menu = document.getElementById('cancel-menu');
const menu_des = document.getElementById('menu-des')

const cuerpo_modificable = document.querySelector('.cuerpo-modificable')

var m1 = document.querySelectorAll('.m1')

menu_des.classList.remove("menu-des");
menu_des.classList.add("menu_min");
document.querySelector('.logo-atenas').style.width='80%';

for (let q = 0; q < lista_menu.children.length; q++) {
    const element = lista_menu.children[q];
    element.style.justifyContent="center"
    element.addEventListener('mouseover',()=>{
        element.style.transform= 'scale(1.2)';
    });
    element.addEventListener('mouseout',()=>{
        element.style.transform= 'scale(1)';
    })
}

console.log(abrir_menu)

switch (abrir_menu.style.visibility) {
    case 'visible':
        abrir_menu.addEventListener('click',()=>{
            abrir_menu.style.visibility = 'hidden'
            cancelar_menu.style.visibility = 'visible'

            menu_des.classList.add("menu-des");
            menu_des.classList.remove("menu_min");
            document.querySelector('.logo-atenas').style.width='20%';

            menu_des.animate([
                {transform:'translate(75%)'}
                ],{
                fill:'forwards',
                duration:1200
                }
            );

            cuerpo_modificable.animate([
                {width: '80%',
                left:'20%'}
                ],{
                fill:'forwards',
                duration:1200
                }
            );

            setTimeout(() => {
                for (const elemento_texto of m1) {
                    elemento_texto.classList.remove("texto_desaparece")
                    for (let q = 0; q < lista_menu.children.length; q++) {
                        const element = lista_menu.children[q];
                        element.style.justifyContent=`center`
                        console.log(element)
                    }
                }
            }, 300); 
        });

        cancelar_menu.addEventListener('click',()=>{
            cancelar_menu.style.visibility = 'hidden'
            abrir_menu.style.visibility = 'visible'

            menu_des.animate([
                {transform: 'translate(-5%)',
                
            }],{
                fill:'forwards',
                duration:1000
            });

            cuerpo_modificable.animate([
                {width: '95%',
                left:'5%'}],{
                fill:'forwards',
                duration:1000
            })
             setTimeout(() => {
                document.querySelector('.logo-atenas').style.width='80%';

                 menu_des.classList.remove("menu-des");
                 menu_des.classList.add("menu_min");

                 for (let q = 0; q < lista_menu.children.length; q++) {
                    const element = lista_menu.children[q];
                    element.style.justifyContent="space-around"
                    console.log(element)
                }
             }, 980);

            setTimeout(() => {
                for (const elemento_texto of m1) {
                    elemento_texto.classList.add("texto_desaparece")
                }
            }, 600); 
            
        })
        break;
    default:
        break;
}















// var dataSet = [
//     [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Doris Wilder", "Sales Assistant", "Sydney", "3023", "2010/09/20", "$85,600" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Michelle House", "Integration Specialist", "Sydney", "2769", "2011/06/02", "$95,400" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" , `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`],
//     [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675", `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//                          <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//                          <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>` ]
// ];
 


//  $(document).ready(function() {
//      $('#example').DataTable( {
//          data: dataSet,
//          columns: [
//              { title: "Id Usuario" },
//              { title: "Nombres" },
//              { title: "Apellidos" },
//              { title: "Usuario" },
//              { title: "Correo" },
//              { title: "Salary" },
//              { title: "Herramientas" }
//          ]
//      } );
//  } );
// document.querySelector('document').ready(function(){
//     cargarTabla();
// });

//  $(document).ready(function() {
//     // var urlApi = '<?php echo urlApi; ?>';
//     // sessionStorage.setItem("urlApi",urlApi);
//     //cargarTablaFunciones('#TablaFunciones');
//     cargarTabla();
//     //$('#showButton').hide();
// });


//  function cargarTabla(){
//      document.getElementById('example').DataTable({
//         data: dataSet,
//           columns: [
//               { title: "Id" },
//               { title: "Nombres" },
//               { title: "Apellidos" },
//               { title: "Usuario" },
//               { title: "Correo" },
//               { title: "Salary" },
//               { title: "Herramientas",
//                 class:"text-center"
//             }
//               ],
//         //  "buttons": [
//         //      'copy', 'csv', 'excel', 'pdf', 'print'
//         //  ],
        
//         //   "columnDefs": [{
//         //     "title": 'Herramientas',
//         //       "targets": 7,
//         //       "orderable": true,
//         //       "data": 'Id',
//         //       "className": "text-center",
//         //          "render": function(data, type, row, meta) {
//         //              return `<a title="Eliminar" href="#"><img id="EliminarImg" src='landing/Images/provisional.png'></a>
//         //              <a title="Editar" href="#"><img src='landing/favicon/users-solid.svg'></a>
//         //              <a title="Visualizar" href="#"><img src='landing/favicon/users-solid.svg'></a>`;
//         //          }
//         //   }],
//      });
//  }