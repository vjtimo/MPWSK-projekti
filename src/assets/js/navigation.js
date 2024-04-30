import {toggleCart} from './shoppingCart.js';
import {logout} from './auth.js';
const cartModal = document.querySelector('#cart-modal');
const shoppingCart = document.querySelector('#cart');
const logoutLink = document.querySelector('#logout');
const backDrop = document.querySelector('.modalBackdrop');

shoppingCart.addEventListener('click', toggleCart);

logoutLink.addEventListener('click', (e) => {
  logout();
});
