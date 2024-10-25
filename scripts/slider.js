class Slider{
    constructor(idSlider){
        this.slider = document.getElementById(idSlider);
        this.imagenes = Array.from(this.slider.querySelectorAll('img'));
        this.seleccionada = 0;
        console.log(this.imagenes);
    }

    inicializar(){
        this.slider.querySelector('#button-left').addEventListener('click', () => {
            this.seleccionada--;
            if(this.seleccionada < 0)
                this.seleccionada = this.imagenes.length - 1;
            this.cambiarImagen();
        })

        this.slider.querySelector('#button-right').addEventListener('click', () => {
            this.seleccionada++;
            if(this.seleccionada > this.imagenes.length - 1)
                this.seleccionada = 0;
            this.cambiarImagen();
        })
        this.crearBotonesSaltarImagen();
    }

    cambiarImagen(){
        console.log(this.seleccionada);
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