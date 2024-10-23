class MenuHamburguesa {
    constructor(botonMenu, listaLinks) {
        this.botonMenu = document.getElementById(botonMenu);
        this.listaLinks = document.getElementById(listaLinks);
        this.inicializar();
    }

    inicializar(){
        this.botonMenu.addEventListener("click", () => this.mostrarOcultarMenu());
    }

    mostrarOcultarMenu(){
        this.listaLinks.classList.toggle('links-active');
    }
}