import {fetchData} from './api.js';
import {addItemToCart, getOrderList} from './variables.js';

const createModal = (data) => {
  const modalDrop = document.querySelector('.modalBackdrop');
  const {nimi, kuvaus_fi, hinta} = data;
  const modal = document.querySelector('#pizza-modal');
  modal.innerHTML = `<div id ="modal-content">
  <img src="pictures/pizza.jpg" alt="image of pizza"></img>

  <div id="modal-tayte">
  <span class="close-button">&times;</span>
    <h2>${nimi}</h2>
    <p>${kuvaus_fi}</p>
    <h3>${hinta}<h3>
      <button class="addToCart">Lisää ostoskoriin</button>
  </div>`;
  let addToCartbtn = document.querySelector('.addToCart');
  addToCartbtn.addEventListener('click', (e) => {
    e.preventDefault();
    addItemToCart(data);
  });
  modalDrop.classList.add('visible');
  modal.classList.add('visible');
  const close = document.querySelector('.close-button');

  close.addEventListener('click', (e) => {
    modal.style.display = 'none';
    modalDrop.classList.remove('visible');
  });
  modal.style.display = 'flex';
};
const createCart = (modal) => {
  console.log(modal);
  const cart = document.createElement('aside');
  cart.className = 'cartContent';
  const cartItems = JSON.parse(getOrderList());

  cart.innerHTML = '<h2>Shopping Cart</h2>';
  cartItems.forEach((item) => {
    cart.innerHTML += `
    <p>${item.nimi}</p>
    <p>${item.hinta}</p>`;
  });

  modal.append(cart);
};
export {createCart, createModal};
