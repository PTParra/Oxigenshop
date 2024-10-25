class Formulario {
    constructor(idFormulario) {
        this.formulario = document.getElementById(idFormulario);
    }

    async sendValues(){
        let formData = new FormData(this.formulario);

        formData = Object.fromEntries(formData);

        let resultado = await this.valuesToServer(formData);

        if(resultado){
            console.log(resultado);
            console.log("DATOS ENVIADOS!");

            
            this.formulario.submit();
        }
    }

    async valuesToServer(data) {
        let url = 'https://jsonplaceholder.typicode.com/posts';
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


class ValidacionFormulario{
    constructor(formulario) {
        this.formulario = new Formulario(formulario)
    }

    inicializar() {
        this.formulario.formulario.addEventListener("submit", (event) => this.controlarErrores(event));
        this.formulario.formulario.querySelectorAll('input').forEach((element) => { this.quitarErrorAlInteractuar(element) })
    }

    controlarErrores(event) {}

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

    errorNombre(idCampoNombre) {
        const campoNombre = this.formulario.formulario.querySelector('#' + idCampoNombre);
        let valorNombre = campoNombre.value;

        if (valorNombre.length < 2 || valorNombre.length > 100) {
            this.mostrarError("error-" + idCampoNombre, "Debe ser entre 2 y 100 caracteres", "#" + idCampoNombre);
            return true;
        }
        return false;
    }

    errorEmail(idCampoEmail) {
        const validacionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const campoEmail = this.formulario.formulario.querySelector('#' + idCampoEmail);
        let valorEmail = campoEmail.value;

        if (valorEmail.length <= 0 || !validacionEmail.test(valorEmail)) {
            this.mostrarError("error-" + idCampoEmail, "Debe ser un correo válido", "#" + idCampoEmail);
            return true;
        }
        return false;
    }

    errorCheckbox(idCampoCheckbox) {
        const campoCheckbox = this.formulario.formulario.querySelector('#' + idCampoCheckbox);
        let valorCheckbox = campoCheckbox.checked;

        if (!valorCheckbox) {
            this.mostrarError("error-" + idCampoCheckbox, "Debes aceptar los terminos y condiciones", "#custom-checkbox-" + idCampoCheckbox);
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

class ValidacionFormularioContacto extends ValidacionFormulario{
    constructor(formulario) {
        super(formulario);
    }

    controlarErrores(event){
        event.preventDefault();

        let errorNombre = this.errorNombre('name');
        let errorEmail = this.errorEmail('email');
        let errorCheckbox = this.errorCheckbox('consent');

        if (errorNombre || errorEmail || errorCheckbox) {
            throw Error("Ha habido errores en la introduccion de datos...");
        }

        

        this.formulario.sendValues();
    }
}

class ValidacionFormularioPopup extends ValidacionFormulario{
    constructor(formulario) {
        super(formulario);
    }

    controlarErrores(event) {
        event.preventDefault();

        if (this.errorEmail('email-popup')) {
            throw Error("Ha habido errores en la introduccion de datos...");
        }

        localStorage.setItem("popup", "quitado");

        this.formulario.sendValues();
    }
}