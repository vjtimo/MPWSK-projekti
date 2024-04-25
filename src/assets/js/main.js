import {registerUser, login} from './api.js';
import {checkSession, logout} from './auth.js';
import {displayItems} from './components.js';
import {isLogged, setLogged, loginLink, logoutLink} from './variables.js';

//used to check the page the user is currently on
const currentPath = window.location.pathname;

//gets userdata from current session
let user = JSON.parse(sessionStorage.getItem('user'));

//modifies site based on logged state
const startApp = (logged) => {
  logged ? console.log('logged in') : console.log('not logged in');
  logoutLink.style.display = logged ? 'flex' : 'none';
  loginLink.style.display = logged ? 'none' : 'flex';
};
//only add event listeners if on correct page
if (currentPath === '/src/login.html') {
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
      user = loginResult;
      startApp(true);
      window.location.href = '/src/index.html';
    } else {
      console.log('Failed to log in');
    }
  });
}
if (currentPath === '/src/menu.html') {
  displayItems();
}
//placeholder logout
logoutLink.addEventListener('click', (e) => {
  logout();
  startApp(false);
});

// Check if the user is logged in
(async () => {
  setLogged(await checkSession());
  isLogged() ? startApp(true) : startApp(false);
})();
