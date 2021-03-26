const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos =document.querySelector('#lista-productos');
const contadorCarrito = document.querySelector('#cart_count');
let articulosCarrito = [];


registrarEventos()
//cargarEventListeners
function registrarEventos(){
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click',eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();

    })


//muestra cursos local storage
document.addEventListener('DOMContentLoaded', () =>{
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML()
})


}

function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregarCarrito')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDataCurso(productoSeleccionado);

        actualizarContadorCarrito();
    

    }

}


//elimina un curso del carrito

function eliminarProducto(e){
     console.log(e.target.classList);
     if(e.target.classList.contains('borrar-producto')){
         const cursoId = e.target.getAttribute('data-id');

         articulosCarrito = articulosCarrito.filter(producto => producto.id !== cursoId )

         carritoHTML();
         actualizarContadorCarrito();




     }
}

// leer contenido card y extrae la informacion

function leerDataCurso(producto){
    //1- obtener todos los datos de la card 2- obtner foto nombre precio del producto y guardarlo en un json
   

     //crear objeto
     const productoInfo = {
         foto: producto.querySelector('img').src,
         titulo: producto.querySelector('h4').textContent,
         precio: producto.querySelector('.precio span').textContent,
         id: producto.querySelector('a').getAttribute('data-id'),
         cantidad: 1

     }

     const existe = articulosCarrito.some( producto => producto.id === productoInfo.id); 
     if(existe){
        const productos = articulosCarrito.map( producto =>{
            if( producto.id === productoInfo.id){
                producto.cantidad++;
                return producto;

            } else {
                return producto;
            }
        });
        articulosCarrito = [...productos]

     } else {

        articulosCarrito = [...articulosCarrito, productoInfo];


     }

     //revisar si elemento ya existe en el carrito

    //  articulosCarrito = [...articulosCarrito, productoInfo];

    //  console.log(articulosCarrito);
     carritoHTML();

}

//mostrar carrito de compras en el html

function carritoHTML(){

    //limpiar HTML

    limpiarHTML();


    articulosCarrito.forEach( producto => {
        const {foto , titulo , precio, cantidad, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML =`
            <td>
            <img  src="${ foto }" width="90" alt="imagen producto">

           

            </td>
    
            <td>

            ${titulo}

            </td>
            
            
            <td>

            ${precio}

            </td>


            <td>

            ${cantidad}

            </td>

            <td>
     
            <a href="#" class="btn btn-danger borrar-producto" data-id="${id}">Borrar</a>

            </td>

        `;

        contenedorCarrito.appendChild(row);
    })

    //sincronizar con storage
    sincronizarStorage()
    
}


function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//eliminar los cursos del tbody

function limpiarHTML(){

  while(contenedorCarrito.firstChild) {


    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    actualizarContadorCarrito();
    

  }

}

function actualizarContadorCarrito(){

    contadorCarrito.textContent = articulosCarrito.length;

}