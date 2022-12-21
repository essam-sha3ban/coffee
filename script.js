let toggleMenu = document.querySelector(".menu");
let links = document.querySelector(".links");
let iconSearch = document.querySelector(".iconSearch")
let searchInput = document.querySelector(".search")
let iconCart = document.querySelector(".shopping")
let cart = document.querySelector(".cart")

let itemCart =document.querySelectorAll(".item")
let removeItemCart = document.querySelector(".remove")



toggleMenu.onclick=function(){
    links.classList.toggle("active");
    cart.classList.remove("active");
    toggleMenu.classList.toggle("fa-xmark")

   
}

iconSearch.onclick = function(){
    searchInput.classList.toggle("active")     
    cart.classList.remove("active");
}

iconCart.onclick=function(){
    cart.classList.toggle("active");
    searchInput.classList.remove("active")
    links.classList.remove("active");
   
}


//working cart 

if(document.readyState =="loading"){
    document.addEventListener("DOMContentLoaded",ready)
}
else{
    ready()
}

function ready(){

    //remove item from cart
    let removeIconCart =document.getElementsByClassName("remove")
   
    for(let i =0; i<removeIconCart.length ;i++){
        let button = removeIconCart[i];
        button.addEventListener("click",removeItem)
    }

    //add product to cart
    let addCart = document.getElementsByClassName("add-to-cart")
    for(let i =0; i<addCart.length; i++){
        let button = addCart[i]
        button.addEventListener("click" , addCartClick)
    }

    //quantity change
  let quantityInputs = document.getElementsByClassName("quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //buy button
  let buyBtn = document.getElementsByClassName("buy-new")[0].addEventListener("click",buyBtnNow)
 
}




//remove item from cart
function removeItem(event){
let buttonClicked = event.target;
buttonClicked.parentElement.remove();
updateTotal()
}


//add product to cart 
function addCartClick(event){
    let button = event.target
    let shopProduct = button.parentElement
    console.log(shopProduct)
    let title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    let price = shopProduct.getElementsByClassName("product-price")[0].innerText;
    let image = shopProduct.getElementsByClassName("shopping-image")[0].src;   
    console.log(title , price , image)
    addProductToCart(title , price , image)
    updateTotal()
}
function addProductToCart(title,price,image){
    let cartBox = document.createElement("div")
    cartBox.classList.add("item")
    let CartItem = document.getElementsByClassName("cart-content")[0]
    let BoxTitle = CartItem.getElementsByClassName("title")
    for(let i = 0;i< BoxTitle.length ; i++){
        if(BoxTitle[i].innerText == title){
            alert(" this products add to cart")
          return
        }
    }
    let cartBoxContent = `
    <img src="${image}" class="product-imge" alt="">
    <div class="info">
      <h2 class="title">${title}</h2>
      <p class="price">${price}</p>
      <input type="number"  value="1"  class="quantity">
    </div>
    <i class="fas fa-trash remove"></i>`;
    cartBox.innerHTML = cartBoxContent;
    CartItem.append(cartBox);
    cartBox.getElementsByClassName("remove")[0].addEventListener("click",removeItem)
    cartBox.getElementsByClassName("quantity")[0].addEventListener("change",quantityChanged);

    }

//quantityChanged
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateTotal()
  }


  //buyBtnNow
  function buyBtnNow(){
    alert("your order is placed")
    let contentCart = document.querySelector(".cart-content")
    while(contentCart.hasChildNodes()){
    contentCart.removeChild(contentCart.firstChild)
  
    }
    updateTotal()  
    return
  }

  //update price

  function updateTotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0]
    let cartBoxes = cartContent.getElementsByClassName("item") 
    let total = 0;
    for(let i = 0; i<cartBoxes.length; i++){
       let cartBox=cartBoxes[i];
       let priceElement = cartBox.getElementsByClassName("price")[0];
       let quantityElement = cartBox.getElementsByClassName("quantity")[0];
       let price = parseFloat(priceElement.innerText.replace("$"),"")
       let quantity = quantityElement.value;
       total =total + price*quantity 

    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  }


