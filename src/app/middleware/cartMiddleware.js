const cartQuantity = document.querySelectorAll('.header__cart-item');
const container_cart =$('.header__cart-list-item');
const count_cart = document.querySelector('.header__cart-notice');

count_cart.innerHTML = cartQuantity.length;


