import {addItemsToCart} from './api.js';
import {url} from './variables.js';

import {logoutLink, loginLink, isLogged, setLogged} from './variables.js';
const shoppingCart = document.querySelector('#cart');

const checkSession = async () => {
  if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + 'auth/me', fetchOptions);
      const json = await response.json();
      if (!response.ok) {
        return false;
      } else {
        const role = json.user.rooli;

        return {valid: true, role: role}; // Session is valid, return the role
      }
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return false;
  }
};
const logout = async () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  await addItemsToCart();
  localStorage.removeItem('STORED_ORDERS');
  sessionStorage.removeItem('cartId');
  alert('You have logged out');
  window.location.href = '/src/index.html';
  setLogged(false);
};

const startApp = (logged) => {
  logged ? console.log('logged in') : console.log('not logged in');
  logoutLink.style.display = logged ? 'flex' : 'none';
  loginLink.style.display = logged ? 'none' : 'flex';
  shoppingCart.style.display = logged ? 'flex' : 'none';
};

(async () => {
  const {valid, role} = await checkSession();
  setLogged(valid);
  isLogged() ? startApp(true) : startApp(false);
})();

export {checkSession, logout};
