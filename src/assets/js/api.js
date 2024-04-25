import {setLogged, url} from './variables.js';

async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log('Promise resolved and HTTP status is successful');
      const jsonData = await response.json();
      return jsonData;
    } else {
      if (response.status === 404) throw new Error('404, Not found');
      if (response.status === 500)
        throw new Error('500, internal server error');
      throw new Error(response.status);
    }
  } catch (error) {
    console.error('Fetch', error);
  }
}

const registerUser = async (regForm) => {
  const bodyContent = {
    tunnus: new FormData(regForm).get('uname'),
    salasana: new FormData(regForm).get('pass'),
  };
  console.log(bodyContent);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyContent),
  };
  try {
    const result = await fetchData(url + 'api/users/register', fetchOptions);
    console.log('User registered:', result);
    return result;
  } catch (error) {
    console.error('Registration error:', error.message);
  }
};

const login = async (loginForm) => {
  const bodyContent = {
    tunnus: new FormData(loginForm).get('uname'),
    salasana: new FormData(loginForm).get('pass'),
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyContent),
  };
  const response = await fetch(url + 'api/auth/login', fetchOptions);
  const json = await response.json();
  console.log(json.user);
  if (!json.user) {
    alert(json.error.message);
  } else {
    // save token and user
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    setLogged(true);
    return JSON.parse(sessionStorage.getItem('user'));
  }
};

export {registerUser, login};
