const url = 'https://10.120.32.99/app/';
const nav2 = document.querySelector('.nav2');
let logged = false;
const profileLink = document.querySelector('#profile');

const loginLink = document.querySelector('#login');
const isLogged = () => logged;

const setLogged = (status) => {
  if (typeof status === 'boolean') {
    logged = status;
  } else {
    return;
  }
};

export {url, nav2, isLogged, setLogged, loginLink, profileLink};
