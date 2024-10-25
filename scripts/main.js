const menuHamburguesa = new MenuHamburguesa('menu-hamburguesa', 'enlaces-header');

menuHamburguesa.inicializar();

const barraPorcentaje = new BarraPorcentaje('barra-porcentaje');

barraPorcentaje.inicializar();

const botonScrollUp = new BotonScrollUp('volver-arriba', 200);

botonScrollUp.inicializar();

const validacionFormulario = new ValidacionFormularioContacto('formulario-contacto');

validacionFormulario.inicializar();

const validacionFormularioPopup = new ValidacionFormularioPopup('formulario-popup');

validacionFormularioPopup.inicializar();

const popupFormulario = new PopupFormulario('popup-subscribe', 'background-close-button', 5000);

popupFormulario.inicializar();

const slider = new Slider('slider-imagenes');

slider.inicializar();