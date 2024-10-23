const menuHamburguesa = new MenuHamburguesa('menu-hamburguesa', 'enlaces-header');

const barraPorcentaje = new BarraPorcentaje('barra-porcentaje');

const botonScrollUp = new BotonScrollUp('volver-arriba', 200);

const validacionFormulario = new ValidacionFormulario('formulario-contacto');

const precios = [
    new ConversorPrecio(0, 'precio-basic'), 
    new ConversorPrecio(25, 'precio-professional'),
    new ConversorPrecio(60, 'precio-premium')
]

const inputSeleccionarPrecio = document.getElementById('selector-precio');

inputSeleccionarPrecio.addEventListener('input', () => {
    const nuevaMoneda = inputSeleccionarPrecio.value;
    console.log(nuevaMoneda);
    precios.forEach(precio => {
        precio.cambiarNuevoPrecio(nuevaMoneda);
    });
})