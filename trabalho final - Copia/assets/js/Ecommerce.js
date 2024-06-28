//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//abrir o cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

//fechar o cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};


//funcionamento do carrinho no js
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
   ready(); 
}

//fazendo a função
function ready(){
    //remover itens do carrinho
    var reomveCartButtons = document.getElementsByClassName('cart-remove');
    console.log(reomveCartButtons);
    for (var i = 0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //alterações de quantidade 
    var quantidadeInputs = document.getElementsByClassName('cart-quantidade');
    for (var i = 0; i < quantidadeInputs.length; i++){
        var input = quantidadeInputs[i];
        input.addEventListener("change", quantidadechanged);
    }
    // adicionar ao carrinho
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //botão de comprar funcional
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonCliked);
}

//botão de comprar
function buyButtonCliked(){
    alert('Seu pedido foi feito')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//remover itens do carrinho
function removeCartItem (event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

//alterações de quantidade
function quantidadechanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }   
    updatetotal();
}

//adicionando ao carrinho
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductTocart(title, price, productImg);
    updatetotal();
}

function addProductTocart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("Você já adicionou este item ao carrinho");
            return;
        }
        
    }

var cartBoxContent = `
                      <img src="${productImg}" alt="" class="cart-img">
                      <div class="detail-box">
                         <div class="cart-product-title">${title}</div>
                         <div class="cart-price">${price}</div>
                      <input type="number" value="1" class="cart-quantidade">
                      </div>
                      <!-- remover o cart-->
                      <i class='bx bxs-trash-alt cart-remove' ></i>`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantidade')[0].addEventListener('change', quantidadechanged);
    
}


//atualização do item total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantidadeElement = cartBox.getElementsByClassName('cart-quantidade')[0];
        var price = parseFloat(priceElement.innerText.replace("R$", ""))
        var quantidade = quantidadeElement.value;
        total = total + (price * quantidade);
    }
        //se o preço contiver algum valor em centavos
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "R$" + total;
    
}