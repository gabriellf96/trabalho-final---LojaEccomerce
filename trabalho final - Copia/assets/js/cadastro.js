const formCadastro = document.getElementById("form-cadastro");
const Usuario = document.getElementById("Usuário");
const Email = document.getElementById("E-mail");
const Senha = document.getElementById("Senha");
const ConfirmarSenha = document.getElementById("Confirmarsenha");

formCadastro.addEventListener("submit", (Event) => {
    Event.preventDefault();

    checkInputformCadastro();
})

//limpar os campos
Usuario.addEventListener("blur", (Event) =>{
    checkInputUsuario();
})

Email.addEventListener("blur", (Event) =>{
    checkInputEmail();
})

Senha.addEventListener("blur", (Event) =>{
    checkInputSenha();
})

ConfirmarSenha.addEventListener("blur", (Event) =>{
    checkInputConfirmarSenha();
})

function checkInputUsuario(){
    const UsuarioValue = Usuario.value;

    if(UsuarioValue === ""){
        //mostrar a mensagem de erro
        errorInput(Usuario, "Preencha um Usuário!!")
    }else{
        const formItem = Usuario.parentElement;
        formItem.className = "input-box"
    }
}

function checkInputEmail(){
    const EmailValue = Email.value;

    if(EmailValue === ""){
        //mostrar a mensagem de erro
        errorInput(Email, "O e-mail é obrigatório")
    }else if(EmailValue.indexOf("@") == true -1 || EmailValue.indexOf(".") == -1 || (EmailValue.indexOf(".") - EmailValue.indexOf("@") == 1)){
        errorInput(Email, "Preencha com um e-mail válido!!")
    }else{
        const formItem = Email.parentElement;
        formItem.className = "input-box"
    }
    
}

function checkInputSenha(){
    const SenhaValue = Senha.value;

    if(SenhaValue === ""){
        //mostrar a mensagem de erro
        errorInput(Senha, "A senha é obrigatória")
    }else if(SenhaValue.length < 6){
        errorInput(Senha, "A senha precisa ter no mínimo 8 caracteres")
    }else{
        const formItem = Senha.parentElement;
        formItem.className = "input-box"
    }
          
}

function checkInputConfirmarSenha(){
    const SenhaValue = Senha.value;
    const SenhaConfirmarValue = ConfirmarSenha.value;

   if(SenhaConfirmarValue === ""){
    errorInput(ConfirmarSenha, "A confirmação de senha é obrigatória.")
   }else if(SenhaConfirmarValue !== SenhaValue){
    errorInput(ConfirmarSenha, "As senhas não são iguais.")
   }else{
    const formItem = ConfirmarSenha.parentElement;
    formItem.className = "input-box"
   }
          
}
 
function checkInputformCadastro(){
    checkInputUsuario();
    checkInputEmail();
    checkInputSenha();
    checkInputConfirmarSenha();

    const formItems = formCadastro.querySelectorAll(".input-box")

    const isValid = [...formItems].every((item) =>{
        return item.className === "input-box"
    });

    if(isValid){
        alert("Cadastrado com sucesso!!")
        window.location.href = "login.html";
    }
    

}

function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message; 

    formItem.className = "input-box error"
}