class BarraPorcentaje{
    constructor(contenedor){
        this.contenedor = document.getElementById(contenedor);
        this.inicializar();
    }

    inicializar() {
        document.addEventListener("scroll", () => this.calcularPorcentajeAltura());
    }

    calcularPorcentajeAltura(){
        const posicionVentana = window.scrollY;
        const alturaVentana = window.innerHeight;
        const alturaPagina = document.documentElement.scrollHeight;
        let porcentajeAltura = (posicionVentana * 100) / (alturaPagina - alturaVentana);
        porcentajeAltura = porcentajeAltura > 100 ? 100 : porcentajeAltura;

        this.contenedor.style.width = porcentajeAltura + "%";
    }
}