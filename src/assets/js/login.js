import {login, registerUser, getCart} from './api.js';

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginResult = await login(loginForm);
  if (loginResult) {
    await getCart(loginResult.id);

    window.location.href = '/src/index.html';
  }
});
const displayErrors = (errorData) => {
  const errors = errorData.message.split(', ');
  document
    .querySelectorAll('.error-message')
    .forEach((span) => (span.innerText = ''));
  errors.forEach((error) => {
    const [field, message] = error.split(': ');
    const errorElement = document.getElementById(`${field}-error`);
    if (errorElement) {
      errorElement.textContent = message; // Display the error message
    }
  });
};
