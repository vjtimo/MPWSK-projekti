import {setLogged, url} from './variables.js';

async function fetchData(route, options) {
  try {
    const response = await fetch(url + route, options);

    if (response.ok) {
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
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyContent),
  };
  try {
    const result = await fetchData('users/register', fetchOptions);
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
  const route = `pizzas/${ids.join(',')}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const pizzas = await fetchData(route, options);

    return pizzas;
  } catch (error) {
    console.error('Error fetching pizzas by IDs:', error);
  }
}
const getCart = async (id) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url + `cart/${id}`, fetchOptions);
  const json = await response.json();
  if (!json) {
    alert(json.error.message);
  } else {
    localStorage.setItem('STORED_ORDERS', JSON.stringify(json.STORED_ORDERS));
  }
  console.log(json);
  sessionStorage.setItem('cartId', JSON.stringify(json.id));
};
const addItemsToCart = async () => {
  const items = JSON.parse(localStorage.getItem('STORED_ORDERS'));
  const cartId = sessionStorage.getItem('cartId');
  const body = {
    cart_id: cartId,
    items: items,
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url + `cart`, fetchOptions);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error?.message || 'Failed to add items to cart');
  }
};
const postOrder = async (orderForm) => {
  const ostoskoriId = sessionStorage.getItem('cartId');
  console.log(ostoskoriId);
  const body = {
    ostoskori: ostoskoriId,
    ravintola: orderForm.get('restaurants'),
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url + `order`, fetchOptions);
  const json = await response.json();
  console.log(json);
  sessionStorage.setItem('cartId', json.cartId);
  localStorage.setItem('STORED_ORDERS', JSON.stringify([]));
  console.log(response);
  if (!response.ok) {
    throw new Error(json.error?.message || 'Tilausta ei voitu viedä loppuun');
  }
};

const updateOrderStatus = async (id, status) => {
  const body = {
    id: id,
    status: status,
  };
  const fetchOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url + `order/status`, fetchOptions);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error?.message || 'Failed to update status');
  }
};
const getOrderById = async (id) => {
  const route = `order/${id}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const result = await fetchData(route, options);

    return result;
  } catch (error) {
    console.error('Error fetching pizzas by IDs:', error);
  }
};
export {
  registerUser,
  login,
  fetchData,
  getPizzasByIds,
  getCart,
  addItemsToCart,
  postOrder,
  updateOrderStatus,
  getOrderById,
};
