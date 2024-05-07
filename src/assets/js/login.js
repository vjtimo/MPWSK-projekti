import {login, registerUser, getCart} from './api.js';

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginResult = await login(loginForm);
  console.log(loginResult);
  if (loginResult) {
    await getCart(loginResult.id);

    window.location.href = '/src/index.html';
  } else {
    console.log('Failed to log in');
  }
});
