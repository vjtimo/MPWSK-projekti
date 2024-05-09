const url = 'http://10.120.32.99/app/';
const nav2 = document.querySelector('.nav2');
let logged = false;
const logoutLink = document.querySelector('#logout');

const loginLink = document.querySelector('#login');
const isLogged = () => logged;

const setLogged = (status) => {
  if (typeof status === 'boolean') {
    logged = status;
  } else {
    console.error('Status must be a boolean');
  }
};

export {url, nav2, isLogged, setLogged, loginLink, logoutLink};
