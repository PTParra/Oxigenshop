class Formulario {
    constructor(formulario) {
        this.formulario = document.getElementById(formulario);
    }

    async sendValues(){
        let formData = new FormData(this.formulario);

        formData = Object.fromEntries(formData);

        let resultado = await this.valuesToServer(formData);

        if(resultado){
            console.log(resultado);
            console.log("DATOS ENVIADOS!");

            //Una vez que este terminado y funcionando todo, this.formulario.submit(); se puede descomentar
            //this.formulario.submit();
        }
    }

    async valuesToServer(data) {
        let url = 'https://jsonplaceholder.typicode.com/posts';
        console.log(data);
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (response.ok) {
                const json = await response.json()
                return json;
            }
        } catch (error) {
            throw Error('Han ocurrido errores: ' + error);
        }
    }
}


class ValidacionFormulario extends Formulario{
    constructor(formulario) {
        super(formulario);
        this.inicializar();
    }

    inicializar() {
        this.formulario.addEventListener("submit", (event) => this.controlarErrores(event));
        this.formulario.querySelectorAll('input').forEach((element) => { this.quitarErrorAlInteractuar(element) })
    }

    controlarErrores(event) {
        event.preventDefault();

        let errorNombre = this.errorNombre();
        let errorEmail = this.errorEmail();
        let errorCheckbox = this.errorCheckbox();

        if (errorNombre || errorEmail || errorCheckbox) {
            throw Error("Ha habido errores en la introduccion de datos...");
        }

        

        this.sendValues();
    }

    quitarErrorAlInteractuar(campo) {
        campo.addEventListener('input', () => {
            campo.classList.remove('error-in-input');
            let campoError = document.getElementById("error-" + campo.id);
            campoError.innerText = "";
            if (campo.id === 'consent') {
                let campoCheckbox = document.querySelector(".contact__form__consent__custom-checkbox");
                campoCheckbox.classList.remove('error-in-input');
            }
        });
    }

    errorNombre() {
        const campoNombre = this.formulario.querySelector('#name');
        let valorNombre = campoNombre.value;

        if (valorNombre.length < 2 || valorNombre.length > 100) {
            this.mostrarError("error-name", "Debe ser entre 2 y 100 caracteres", "#name");
            return true;
        }
        return false;
    }

    errorEmail() {
        const validacionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const campoEmail = this.formulario.querySelector('#email');
        let valorEmail = campoEmail.value;

        if (valorEmail.length <= 0 || !validacionEmail.test(valorEmail)) {
            this.mostrarError("error-email", "Debe ser un correo válido", "#email");
            return true;
        }
        return false;
    }

    errorCheckbox() {
        const campoEmail = this.formulario.querySelector('#consent');
        let valorEmail = campoEmail.checked;

        if (!valorEmail) {
            this.mostrarError("error-consent", "Debes aceptar los terminos y condiciones", "#custom-checkbox-consent");
            return true;
        }
        return false;
    }

    mostrarError(idCampoEscribirError, descripcionError, campoInputRemarcar) {
        const campoEscribirError = document.getElementById(idCampoEscribirError);
        campoEscribirError.innerText = `(${descripcionError})`;
        const campoConError = document.querySelector(campoInputRemarcar);
        campoConError.classList.add('error-in-input');
        console.log(new Error(descripcionError));
    }
}