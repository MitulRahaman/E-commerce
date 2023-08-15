let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//open cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}

//close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}


const ready = () => {
    //remove items from cart
    var removeCartButton = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i];
        button.addEventListener('click', removeCartItem);
    }
    //total changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

const removeCartItem = (e) => {
    var buttonClicked = e.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

const quantityChanged = (e) => {
    var input = e.target;
    if (isNaN(input.value) || input.value <= 0)
        input.value = 1
    updateTotal();
}

const addCartClicked = (e) => {
    var button = e.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product_name')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImage = shopProducts.getElementsByClassName('card-img-top')[0].src;
    addProductToCart(title, price, productImage);
    updateTotal();
}

const addProductToCart = (title, price, productImage) => {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        console.log(cartItemsNames);
        if (cartItemsNames[i].innerHTML == title) {
            alert('You have already add this item to cart');
            return;
        }
    }
    
    
    var cartBoxContent =
        `<img src="${productImage}" alt="" class="cart-img" />
                     <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity" />
                     </div>
                     <i class="fa-solid fa-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

const buyButtonClicked = () => {
    alert('Your order is placed!');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else
    ready();

//total
const updateTotal = () => {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
        total = Math.round(total * 100) / 100;

        localStorage.setItem('ls_cartContent', cartContent);
        localStorage.setItem('ls_cartBoxes', cartBoxes);
        localStorage.setItem('ls_total', total);
    }

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    
}