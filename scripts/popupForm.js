class PopupFormulario{
    constructor(idPopup, idInvisibleButton, tiempoEspera){
        this.popup = document.getElementById(idPopup);
        this.invisibleButton = document.getElementById(idInvisibleButton);
        this.tiempoEspera = tiempoEspera;
        this.quitado = localStorage.getItem("popup") === "quitado" ? true : false;
        console.log(this.quitado);
    }

    inicializar(){
        this.invisibleButton.addEventListener('click', () => this.cerrarPopup());
        this.popup.querySelector('.popup__form__button-close-container').addEventListener('click', () => this.cerrarPopup());
        document.addEventListener('keydown', (key) => {
            if(key.key === 'Escape' && !this.quitado && this.popup.checkVisibility())
                this.cerrarPopup();
        });
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => this.mostrarPopup(), this.tiempoEspera);
        });
        document.addEventListener('scroll', () => this.comprobarAlturaPagina());
    }

    cerrarPopup(){
        this.popup.classList.remove('mostrarPopup');
        localStorage.setItem("popup", "quitado");
        this.quitado = true;
    }

    mostrarPopup(){
        if(!this.quitado){
            this.popup.classList.add('mostrarPopup');
        }
    }

    comprobarAlturaPagina(){
        const posicionVentana = window.scrollY;
        const alturaVentana = window.innerHeight;
        const alturaPagina = document.documentElement.scrollHeight;
        let porcentajeAltura = (posicionVentana * 100) / (alturaPagina - alturaVentana);
        porcentajeAltura = porcentajeAltura > 100 ? 100 : porcentajeAltura;

        if(porcentajeAltura > 25){
            this.mostrarPopup();
        }
    }
}