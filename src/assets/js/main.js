import {regForm} from './variables.js';
import {registerUser} from './api.js';
//Register user post request
regForm.addEventListener('submit', async (evt) => {
  console.log(regForm);
  evt.preventDefault(regForm);
  registerUser(regForm);
});
