import {registerUser} from './api.js';

const regForm = document.querySelector('#register');

regForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  try {
    await registerUser(regForm);
    localStorage.setItem(
      'toastMessage',
      'Voit nyt kirjautua sisään luomallasi tunnuksella'
    );
    window.location.href = 'login.html';
  } catch (e) {
    displayErrors(e);
  }
});
const displayErrors = (errorData) => {
  const errors = errorData.message.split(', ');
  document
    .querySelectorAll('.error-message')
    .forEach((span) => (span.innerText = ''));
  errors.forEach((error) => {
    const [field, message] = error.split(': ');
    console.log(field);
    const errorElement = document.getElementById(`${field}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  });
};
