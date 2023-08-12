const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active')
    })
}
if (close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}




// cart section 

// var removeCartItemButtons = document.getElementsByClassName('fa-times-circle')
// console.log(removeCartItemButtons)
// for(var i=0; i<removeCartItemButtons.length; i++){
//     var button = removeCartItemButtons[i]
//     button.addEventListener('click',function(event)
//     {
//         // console.log('clicked')
//         var buttonClicked = event.target
//         buttonClicked.parentElement.remove()
//     })
// }



let carts = document.querySelectorAll('#add-cart');

let products = [
    {
        name:'Cartoon Astronut T-Shirt',
        tag:'f1',
        price:15,
        inCart:0
    },

    {
        name:'Leaves Printed T-Shirt',
        tag:'f2',
        price:20,
        inCart:0
    },
    {
        name:'Black Hoddie',
        tag:'f3',
        price:30,
        inCart:0
    },
    {
        name:'Blue Hoddie',
        tag:'f4',
        price:35,
        incart:0
    }

];

for(let i=0; i<carts.length; i++){

    carts[i].addEventListener('click',() =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}


function onLoadCartNumber(){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.card span').textContent = productNumbers;
    }
}


function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ){

        localStorage.setItem('cartNumbers', productNumbers + 1 );
        document.querySelector('.card span').textContent = productNumbers +1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.card span').textContent =1;

    }

    SetItems(product);
    
}

function SetItems(product)
{
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems ={
                ...cartItems,
                [product.tag]:product
            }
        }

        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
        }
    }
    

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}





function totalCost(product){
// console.log("The product price is " , product.price);
let cartCost = localStorage.getItem('totalCost');

console.log("My cartCost" , cartCost);
console.log(typeof cartCost);

if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost" , cartCost +
     product.price);
}else{
    localStorage.setItem("totalCost" , product.price);
}
}

// section that diplay the add cart
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
            <div class="product" id="btn-remove">
            <i onclick="myFunction()" class="far fa-times-circle"></i>
            <div class="img-div">
            <img src="./img/products/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price1">${item.price}</div>
            
            
            <div class="quantity">
            <div class="icon">
            <span>${item.inCart}</span>
            </div>
            </div>

            <div id="total">
            <div class="total">
           <p> Rs.${item.inCart * item.price},00 </p>
            </div>
            </div>

            </div>
            `
            ;
        });

        productContainer.innerHTML +=`
        <div class ="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total</h4>
        <h4 class="basketTotal">
        Rs.${cartCost},00
        </h4>
        </div>
        `;

    }

}


function myFunction(){
    const deleteElement = document.getElementById('btn-remove');
    deleteElement.remove();
}


// var removeCartItemButtons = document.getElementById('btn-remove')
// console.log(removeCartItemButtons)
// for(var i=0; i< removeCartItemButtons.length; i++){
//     var button = removeCartItemButtons[i]
//     button.addEventListener('click',function(event)
//     {
//         var buttonClicked = event.target
//         buttonClicked.parentElement.remove()
//     })
// }


onLoadCartNumber();
displayCart();