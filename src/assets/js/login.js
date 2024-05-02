import {login, registerUser, getCart} from './api.js';

const regForm = document.querySelector('#register');
const loginForm = document.querySelector('#login-form');
regForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  await registerUser(regForm);
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginResult = await login(loginForm);
  console.log(loginResult);
  if (loginResult) {
    const cart = await getCart(loginResult.id);
    console.log(cart);
    window.location.href = '/src/index.html';
  } else {
    console.log('Failed to log in');
  }
});
