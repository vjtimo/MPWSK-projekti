import {login, registerUser, getCart} from './api.js';

const loginForm = document.querySelector('#login-form');
document.addEventListener('DOMContentLoaded', function () {
  const toastMessage = localStorage.getItem('toastMessage');
  if (toastMessage) {
    showToast(toastMessage);
    localStorage.removeItem('toastMessage');
  }
});
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginResult = await login(loginForm);
  if (loginResult) {
    await getCart(loginResult.id);

    window.location.href = 'index.html';
  }
});
const showToast = (message) => {
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  toast.style.color = 'white';
  toast.style.padding = '10px';
  toast.style.borderRadius = '5px';
  toast.style.marginBottom = '10px';
  toast.style.fontSize = '20px';
  toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
  const toastContainer = document.querySelector('#toastContainer');
  toastContainer.appendChild(toast);
  toastContainer.style.left = '50dvw';
  toastContainer.style.top = '2rem';

  setTimeout(() => {
    toast.remove();
  }, 4000);
};
