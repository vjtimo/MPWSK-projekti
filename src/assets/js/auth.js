import {url} from './variables.js';
import {setLogged} from './variables.js';
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
  setLogged(false);
};
export {checkSession, logout};
