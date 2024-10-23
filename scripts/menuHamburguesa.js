class MenuHamburguesa {
    constructor(botonMenu, listaLinks) {
        this.botonMenu = document.getElementById(botonMenu);
        this.listaLinks = document.getElementById(listaLinks);
    }

    inicializar(){
        this.botonMenu.addEventListener("click", () => this.mostrarOcultarMenu());
    }

    mostrarOcultarMenu(){
        this.listaLinks.classList.toggle('links-active');
        const imagenMenu = this.botonMenu.querySelector('img');
        const enlaceImagenCerrar = './assets/icons/closeMenu.png';
        const enlaceImagenAbrir = './assets/icons/Menu.png';
        
        imagenMenu.src = this.listaLinks.checkVisibility() ? enlaceImagenCerrar : enlaceImagenAbrir;
    }
}