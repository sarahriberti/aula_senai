//Métodos
class Validator{
    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
        ]
    }
    //inicio da validação de todos os campos
    validate(form) {

        //limpa todas as validações antigas 
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        //pegar todos os inputs 
        let inputs = form.getElementsByTagName('input');

        //Colocar os inputs em Array (lista)
        let inputsArray = [...inputs];

        //Loop para percorrer os inputs da lista  do array (lista)
        inputsArray.forEach(function(input, obj) {
            
            //Fazer a validaçaõ de acordo com os atributos do input
            for(let i = 0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null)  {
                   
                    //Limpa String para saber o método
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    //valor do input
                    let value = input.getAttribute(this.validations[i])

                    //invoca o método min
                    this[method](input,value);
                }
            }
        }, this); 
    }

    //método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }
     //método para validar se tem um máximo de caracteres
     maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }
        onlyletters(input) {
            let re = /^[A-Za-z]+$/;;
            let inputValue = input.value;
            let errorMessage = `Este campo não aceita números nem caracteres especiais`;

            if(!re.test(inputValue)) {
                this.printMessage(input, errorMessage);
            }
        }

        //Método para validar email
        emailvalidate(input) {
            let re = /\S+@\S+\.\S+/;
            let email = input.value;
            let errorMessage = `Insira um e-mail no padrão senai@sp.senai.br`;
            if(!re.test(email)) {
                this.printMessage(input, errorMessage);
            }
        }

        //Verifica se um campo está igual ao outro
        equal(input, inputName) {
            let inputToCompare = document.getElementsByName(inputName)[0];
            let errorMessage = `Os campos de senha devem ser iguais`;
            if(input.value != inputToCompare.value) {
                this.printMessage(input, errorMessage);
            }
        }

        //Método para exibir inputs que são necessários 
        required(input) {
            let inputValue = input.value;
            if(inputValue === '') {
                let errorMessage = `Este campo é obrigatório`;
                this.printMessage(input, errorMessage);
            }
        }

        //Validar o campo de senha
        passwordvalidate(input) {
            let charArr = input.value.split("");
            let uppercases = 0;
            let numbers = 0;
            for(let i = 0; charArr.length > i; i++) {
                if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                    uppercases++;
                } else if(!isNaN(parseInt(charArr[i]))) {
                    numbers++;
                }
            }

            if(uppercases === 0 || numbers === 0) {
                let errorMessage = `A senha precisa ter um caractere maiúsculo e um número`;
                this.printMessage(input, errorMessage);
            }
        }

        //Método para imprimir mensagem de erro
        printMessage(input, msg) {

            //Checa os erros presentes no input
            let errorsQty = input.parentNode.querySelector('.error-validation');

            //Imprime erro se a variável for nula
            if(errorsQty === null) {
                let template = document.querySelector('.error-validation').cloneNode(true);
                template.textContent = msg;
                let inputParent = input.parentNode;
                template.classList.remove('template');
                inputParent.appendChild(template);
            }
        }

        

        //Remover todas as validções para fazer as checagem novamente
        cleanValidations(validations) {
            validations.forEach(el => el.remove());
        }
}
function limpaForm(){

  const formulario = document.querySelector('#register-form');
  formulario.reset();
}
let form = document.getElementById('form_login');
let submit = document.getElementById('enter_cad');
let validator = new Validator();

//Evento de envio do form para validção
submit.addEventListener('click', function(e) {
    e.preventDefault();
    validator.validate(form);
});
