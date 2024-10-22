class BotonScrollUp{
    constructor(boton, milisegundos){
        this.boton = document.getElementById(boton);
        this.milisegundos = milisegundos;
        this.inicializar();
    }

    inicializar(){
        this.boton.addEventListener("click", () => this.scrollUp());
        document.addEventListener("scroll", () => this.calcularPorcentajeAltura());
    }

    scrollUp(){
        setTimeout(() => {
            window.scrollTo({top: 0, behavior:"smooth"});
        }, this.milisegundos);
    }

    calcularPorcentajeAltura(){
        const posicionVentana = window.scrollY;
        const alturaVentana = window.innerHeight;
        const alturaPagina = document.documentElement.scrollHeight;
        let porcentajeAltura = (posicionVentana * 100) / (alturaPagina - alturaVentana);
        porcentajeAltura = porcentajeAltura > 100 ? 100 : porcentajeAltura;
        
        this.boton.style.display = porcentajeAltura > 60 ? "block" : "none";
    }
}