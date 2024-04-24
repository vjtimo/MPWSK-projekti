import {regForm, loginForm} from './variables.js';
import {registerUser, login} from './api.js';

//Register user post request
regForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  await registerUser(regForm);
});
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await login(loginForm);
});
