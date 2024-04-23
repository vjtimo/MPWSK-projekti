import {regForm, loginForm} from './variables.js';
import {registerUser, login} from './api.js';

//Register user post request
regForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  registerUser(regForm);
});
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault;
  login(loginForm);
});
