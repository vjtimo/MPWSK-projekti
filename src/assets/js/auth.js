import {url} from './variables.js';
import {logoutLink, loginLink, isLogged, setLogged} from './variables.js';

let user = JSON.parse(sessionStorage.getItem('user'));
const checkSession = async () => {
  if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + 'api/auth/me', fetchOptions);
      if (!response.ok) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return false;
  }
};
const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  alert('You have logged out');
  window.location.href = '/src/index.html';
  setLogged(false);
};
//modifies site based on logged state
const startApp = (logged) => {
  logged ? console.log('logged in') : console.log('not logged in');
  logoutLink.style.display = logged ? 'flex' : 'none';
  loginLink.style.display = logged ? 'none' : 'flex';
};

(async () => {
  setLogged(await checkSession());
  isLogged() ? startApp(true) : startApp(false);
})();

export {checkSession, logout};
