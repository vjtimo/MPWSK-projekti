const cartModal = document.querySelector('#cart-modal');
const cart = document.querySelector('#products');
const shoppingCart = document.querySelector('#cart');
const backDrop = document.querySelector('.modalBackdrop');

const createCart = () => {
  console.log(cartModal);
  cart.innerHTML = '';
  const cartItems = getOrderList();

  console.log(cartItems);

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      const product = document.createElement('div');
      const removeBtn = document.createElement('button');
      removeBtn.className = 'removeBtn';
      product.className = 'product';
      product.innerHTML = `
    <p>${item.nimi} ${item.quantity ? ' x ' + item.quantity : ''} </p>
    <button data-id=${item.id})>+</button>
    <p>${item.hinta}</p>`;
      removeBtn.setAttribute('data-id', item.id);
      removeBtn.innerText = '-';
      removeBtn.addEventListener('click', (e) =>
        removeItemCart(e, removeBtn.getAttribute('data-id'))
      );

      product.append(removeBtn);
      cart.append(product);
    });
  } else {
    console.log('test');
    console.log('test2');
    const emptyDiv = document.createElement('div');
    emptyDiv.innerHTML = '<h3>Ostoskori on tyhjä</h3>';
    cart.append(emptyDiv);
    console.log('test2');
  }
};
const renderCartProducts = () => {};
const getOrderList = () => {
  if (!localStorage.getItem('STORED_ORDERS')) {
    localStorage.setItem('STORED_ORDERS', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('STORED_ORDERS'));
};
const addItemToCart = (data) => {
  let cart = getOrderList();
  const existingItem = cart.find((item) => item.id === data.id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    const newItem = {...data, quantity: 1};
    cart.push(newItem);
  }

  localStorage.setItem('STORED_ORDERS', JSON.stringify(cart));
};
const removeItemCart = (e, id) => {
  e.preventDefault();
  console.log(id);

  let cart = getOrderList();
  let product = cart.find((item) => String(item.id) === String(id));
  console.log(product);

  if (product.quantity > 1) {
    product.quantity--;
  } else {
    const index = cart.findIndex((item) => String(item.id) === String(id));
    if (index !== -1) {
      cart.splice(index, 1);
    }
  }
  localStorage.setItem('STORED_ORDERS', JSON.stringify(cart));
  createCart();
};

const toggleCart = () => {
  cartModal.classList.toggle('active');
  shoppingCart.style.pointerEvents = 'none';
  console.log('test');
  if (cartModal.classList.contains('active')) {
    createCart();
    backDrop.classList.add('visible');
    backDrop.addEventListener('click', toggleCart, {once: true});
  } else {
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
export {createCart, addItemToCart, toggleCart};
