const menuHamburguesa = new MenuHamburguesa('menu-hamburguesa', 'enlaces-header');

menuHamburguesa.inicializar();

const barraPorcentaje = new BarraPorcentaje('barra-porcentaje');

barraPorcentaje.inicializar();

const botonScrollUp = new BotonScrollUp('volver-arriba', 200);

botonScrollUp.inicializar();

const validacionFormulario = new ValidacionFormulario('formulario-contacto');

validacionFormulario.inicializar();

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

const validacionFormularioPopup = new ValidacionFormularioPopup('formulario-popup');

validacionFormularioPopup.inicializar();

const popupFormulario = new PopupFormulario('popup-subscribe', 'background-close-button', 5000);

popupFormulario.inicializar();