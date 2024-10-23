class Precio{
    constructor(precio){
        this.precio = precio;
    }
}

class ConversorPrecio extends Precio{
    constructor(precio, campoPrecio){
        super(precio);
        this.campoPrecio = document.getElementById(campoPrecio);
        this.nuevoPrecio = 0;
    }

    async cambiarNuevoPrecio(nuevaMoneda){
        nuevaMoneda = nuevaMoneda.toLowerCase();

        const conversiones = await this.devolverConversiones();

        if(nuevaMoneda === "eur"){
            this.nuevoPrecio = this.precio;
            this.modificarPrecioDOM(this.nuevoPrecio + "€");
        }else{
            this.nuevoPrecio = Math.floor(this.precio * conversiones[nuevaMoneda]);
            let salida;
            switch (nuevaMoneda) {
                case "usd":
                    salida = "$" + this.nuevoPrecio;
                    break;
                case "gbp":
                    salida = "£" + this.nuevoPrecio;
                    break;
                default:
                    salida = "???" + this.nuevoPrecio;
                    break;
            }
            this.modificarPrecioDOM(salida);
        }
    }

    modificarPrecioDOM(texto){
        this.campoPrecio.innerText = texto;
    }

    async devolverConversiones(){
        const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json';
        try {
            const response = await fetch(url);
            if(response.ok){
                const json = await response.json();
                return json.eur;
            }
        } catch (error) {
            throw Error('Hubo errores a la hora de pedir datos ' + error);
        }
    }
}