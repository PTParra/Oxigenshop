class Slider{
    constructor(idSlider, tiempoCambioAutomatico){
        this.slider = document.getElementById(idSlider);
        this.imagenes = Array.from(this.slider.querySelectorAll('img'));
        this.seleccionada = 0;
        this.tiempoCambioAutomatico = tiempoCambioAutomatico
        this.automatico = setInterval(() => this.cambiarSiguienteOAnterior(1), this.tiempoCambioAutomatico);
    }

    inicializar(){
        this.slider.querySelector('#button-left').addEventListener('click', () => {
            clearInterval(this.automatico);
            this.cambiarSiguienteOAnterior(-1);
            this.automatico = setInterval(() => this.cambiarSiguienteOAnterior(1), this.tiempoCambioAutomatico);
        })

        this.slider.querySelector('#button-right').addEventListener('click', () => {
            clearInterval(this.automatico);
            this.cambiarSiguienteOAnterior(1)
            this.automatico = setInterval(() => this.cambiarSiguienteOAnterior(1), this.tiempoCambioAutomatico);
        });

        this.crearBotonesSaltarImagen();
    }

    cambiarSiguienteOAnterior(numero){
        this.seleccionada += numero;

        if(this.seleccionada > this.imagenes.length - 1)
            this.seleccionada = 0;
        if(this.seleccionada < 0)
            this.seleccionada = this.imagenes.length - 1;
        this.cambiarImagen();
    }

    cambiarImagen(){
        this.imagenes.forEach((imagen) => imagen.classList.remove('mostrada'));
        this.imagenes[this.seleccionada].classList.add('mostrada');
        this.alterarAparienciaBotones();
    }

    crearBotonesSaltarImagen(){
        this.imagenes.forEach((imagen) => {
            const nuevoBoton = document.createElement('button');
            nuevoBoton.id = "botonImagen" + (this.imagenes.indexOf(imagen) + 1);
            nuevoBoton.classList.add('slider__jump-to-image-buttons__button');
            nuevoBoton.addEventListener('click', () => {
                this.cambiarAIndice(imagen);
            } )
            const contenedorBotones = this.slider.querySelector('.slider__jump-to-image-buttons');

            contenedorBotones.appendChild(nuevoBoton);
        })
        document.getElementById('botonImagen1').classList.add('slider__jump-to-image-buttons__button--active');
    }

    cambiarAIndice(imagen){
        this.seleccionada = this.imagenes.indexOf(imagen);
        this.cambiarImagen();
    }

    alterarAparienciaBotones(){
        const botones = this.slider.querySelectorAll('.slider__jump-to-image-buttons__button');
        botones.forEach((boton) => boton.classList.remove('slider__jump-to-image-buttons__button--active'));
        const botonSeleccionado = document.getElementById('botonImagen' + (this.seleccionada + 1));
        botonSeleccionado.classList.add('slider__jump-to-image-buttons__button--active');
    }
}