class ValidacionFormulario{
    constructor(formulario){
        this.formulario = document.getElementById(formulario);
        this.inicializar();
    }

    inicializar(){
        this.formulario.addEventListener("submit", (event) => this.controlarErrores(event));
        this.formulario.querySelectorAll('input').forEach((element) =>{
            element.addEventListener('input', () => {
                element.classList.remove('error-in-input');
                let campoError = document.getElementById("error-" + element.id);
                campoError.innerText = "";
                if(element.id === 'consent'){
                   let campoCheckbox = document.querySelector(".contact__form__consent__custom-checkbox");
                   campoCheckbox.classList.remove('error-in-input');
                }
            });
        })
    }

    controlarErrores(event){
        event.preventDefault();

        let errorNombre = this.errorNombre();
        let errorEmail = this.errorEmail();

        let hayError = errorNombre || errorEmail;

        this.errorCheckbox();
        
        if(hayError){
            throw Error("Ha habido errores en la introduccion de datos...");
        }

        this.formulario.submit();

        console.log(campoNombre);
    }

    errorNombre(){
        const campoNombre = this.formulario.querySelector('#name');
        let valorNombre = campoNombre.value;
        
        if(valorNombre.length < 2 || valorNombre.length > 100){
            const campoError = document.getElementById("error-name");
            campoError.innerText = "(Debe ser entre 2 y 100 caracteres)";
            campoNombre.classList.add('error-in-input');
            console.log(new Error('El campo nombre debe ser entre 2 y 100 caracteres'));
            return true;
        }
        return false;
    }

    errorEmail(){
        const validacionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const campoEmail = this.formulario.querySelector('#email');
        let valorEmail = campoEmail.value;
        
        if(valorEmail.length <= 0 || !validacionEmail.test(valorEmail)){
            const campoError = document.getElementById("error-email");
            campoError.innerText = "(Debe ser un correo válido)";
            campoEmail.classList.add('error-in-input');
            console.log(new Error('Debe ser un correo válido'));
            return true;
        }
        return false;
    }

    errorCheckbox(){
        const campoEmail = this.formulario.querySelector('#consent');
        const campoCustomCheckbox = document.querySelector('.contact__form__consent__custom-checkbox');
        let valorEmail = campoEmail.checked;
        if(!valorEmail){
            const campoError = document.getElementById("error-consent");
            campoError.innerText = "(Debes aceptar los terminos y condiciones)";
            campoCustomCheckbox.classList.add('error-in-input');
            console.log(new Error('Debes aceptar los terminos y condiciones'));
            return true;
        }
        return false;
    }
}