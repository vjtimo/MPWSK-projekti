import {setLogged, url} from './variables.js';

async function fetchData(route, options) {
  try {
    const response = await fetch(url + route, options);
    console.log(response);
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
    const result = await fetchData('users/register', fetchOptions);
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
  const response = await fetch(url + 'auth/login', fetchOptions);
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
async function getPizzasByIds(ids) {
  console.log('IDS: ', ids);
  const route = `pizzas/${ids.join(',')}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const pizzas = await fetchData(route, options);

    console.log('Fetched pizzas:', pizzas);
    return pizzas;
  } catch (error) {
    console.error('Error fetching pizzas by IDs:', error);
  }
}
export {registerUser, login, fetchData, getPizzasByIds};
