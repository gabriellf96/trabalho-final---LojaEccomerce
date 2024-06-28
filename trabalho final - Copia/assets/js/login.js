const loginform = document.getElementById("login-form");
const Email = document.getElementById("E-mail");
const senha = document.getElementById("senha");

loginform.addEventListener("submit", (Event) =>{
    Event.preventDefault();

   checkInputloginform();
})

//limpar os campos
Email.addEventListener("blur", (Event) =>{
    checkInputEmail();
})

senha.addEventListener("blur", (Event) =>{
    checkInputSenha();
})

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


function checkInputsenha(){
    const senhaValue = senha.value;

    if(senhaValue === ""){
        //mostrar a mensagem de erro
        errorInput(senha, "A senha é obrigatória")
    }else if(senhaValue.length < 6){
        errorInput(senha, "A senha precisa ter 6 caracteres")
    }else{
        const formItem = senha.parentElement;
        formItem.className = "input-box"
    }
          
}

function checkInputloginform(){
    checkInputEmail();
    checkInputsenha();

    const formItems = loginform.querySelectorAll(".input-box")

    const isValid = [...formItems].every((item) =>{
        return item.className === "input-box"
    });

    if(isValid){
        alert("Seja bem vindo!!")
        window.location.href = "Ecommerce.html";
    }
    

}







function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message; 

    formItem.className = "input-box error"
}