const mostrarOcultarMenuHamburguesa = () => {

    const links = document.querySelector('.navbar__links');


    links.style.display = links.checkVisibility() ? "none" : "block";
}

const botonMenu = document.getElementById('menu-hamburguesa');

botonMenu.addEventListener("click", mostrarOcultarMenuHamburguesa);