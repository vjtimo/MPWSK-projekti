const url = 'http://127.0.0.1:3000/';
const nav2 = document.querySelector('.nav2');
let logged = false;
const logoutLink = document.querySelector('#logout');
console.log(logoutLink);
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
