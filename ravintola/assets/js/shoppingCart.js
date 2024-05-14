import {fetchData, getPizzasByIds, addItemsToCart} from './api.js';
const getOrderList = () => {
  return JSON.parse(localStorage.getItem('STORED_ORDERS'));
};
const cartModal = document.querySelector('#cart-modal');
const cart = document.querySelector('#products');
const shoppingCart = document.querySelector('#cart');
const backDrop = document.querySelector('.modalBackdrop');

const productCache = {};

const getCachedProductData = async (productId) => {
  if (productCache[productId]) {
    return productCache[productId];
  }

  const productData = await getPizzasByIds([productId]);
  productCache[productId] = productData[0];

  return productCache[productId];
};
const fetchCombinedCart = async () => {
  const cartData = getOrderList();
  if (!cartData || cartData.length === 0) {
    return null;
  }

  const productIds = cartData.map((item) => item.id);

  const cartItems = await Promise.all(
    productIds.map(async (productId) => {
      return await getCachedProductData(productId);
    })
  );
  return cartData.map((cartItem) => {
    const matchingItem = cartItems.find((item) => item.id === cartItem.id);
    return {...cartItem, ...matchingItem};
  });
};

const renderCartItem = (item) => {
  const product = document.createElement('div');
  product.className = 'product';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'removeBtn';
  removeBtn.innerText = '-';
  removeBtn.setAttribute('data-id', item.id);
  removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeItemCart(e, item.id);
  });

  const addBtn = document.createElement('button');
  addBtn.className = 'addBtn';
  addBtn.innerText = '+';
  addBtn.setAttribute('data-id', item.id);
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addOne(item.id);
  });

  product.innerHTML = `<p>${item.nimi} x ${item.quantity || 1}</p>`;
  product.append(addBtn);
  product.append(removeBtn);

  return product;
};

const createCart = async () => {
  clearCart();

  const combinedCart = await fetchCombinedCart();

  if (combinedCart) {
    combinedCart.forEach((item) => {
      const productElement = renderCartItem(item);
      cart.append(productElement);
    });

    const total = calculateTotal(combinedCart);
    cart.append(total);

    cart.insertAdjacentHTML(
      'beforeend',
      "<a id='orderLink' href='order.html'>Tilaa</a>"
    );
  } else {
    renderEmptyCart();
  }
};

const calculateTotal = (cartItems) => {
  const totalCost = cartItems.reduce(
    (acc, item) => acc + (item.hinta || 0) * (item.quantity || 1),
    0
  );

  const totalElement = document.createElement('p');
  totalElement.innerText = `Kokonaishinta: ${totalCost.toFixed(2)}`;
  localStorage.setItem('totalPrice', totalCost);
  return totalElement;
};

function clearCart() {
  cart.innerHTML = '';
}

const renderEmptyCart = () => {
  const emptyDiv = document.createElement('div');
  emptyDiv.innerHTML = '<h3>Ostoskori on tyhjä</h3>';
  cart.append(emptyDiv);
};

const addItemToCart = (data) => {
  const cart = getOrderList() || [];
  const existingItem = cart.find((item) => item.id === data.id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 0) + 1;
  } else {
    cart.push({id: data.id, quantity: 1});
  }

  localStorage.setItem('STORED_ORDERS', JSON.stringify(cart));
};

const removeItemCart = (event, id) => {
  event.preventDefault();
  const cart = getOrderList();

  const item = cart.find((item) => item.id === id);

  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart.splice(cart.indexOf(item), 1);
    }

    localStorage.setItem('STORED_ORDERS', JSON.stringify(cart));
  }

  createCart();
};

const addOne = (id) => {
  const cart = getOrderList();
  const item = cart.find((item) => item.id === id);

  if (item) {
    item.quantity++;
    localStorage.setItem('STORED_ORDERS', JSON.stringify(cart));
  }

  createCart();
};

const toggleCart = () => {
  cartModal.classList.toggle('active');

  shoppingCart.style.pointerEvents = 'none';

  if (cartModal.classList.contains('active')) {
    createCart();

    backDrop.classList.add('visible');
    backDrop.addEventListener('click', toggleCart, {once: true});
  } else {
    addItemsToCart();
    cartModal.addEventListener(
      'transitionend',
      () => {
        cart.innerHTML = '';
        shoppingCart.style.pointerEvents = 'auto';
      },
      {once: true}
    );

    backDrop.classList.remove('visible');
  }
};

export {createCart, addItemToCart, toggleCart, getOrderList};
