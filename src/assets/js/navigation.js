import {toggleCart} from './shoppingCart.js';
import {logout} from './auth.js';
const shoppingCart = document.querySelector('#cart');
const logoutLink = document.querySelector('#logout');


shoppingCart.addEventListener('click', toggleCart);

logoutLink.addEventListener('click', (e) => {
  logout();
});
