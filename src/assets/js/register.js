import {login, registerUser, getCart} from './api.js';

const regForm = document.querySelector('#register');

regForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  await registerUser(regForm);
});
