'use strict';
import {fetchData} from './api.js';
import {addItemToCart} from './shoppingCart.js';
import {isLogged, setLogged} from './variables.js';
import {checkSession} from './auth.js';

const displayItems = async () => {
  try {
    const data = await fetchData('pizzas');
    const pizzaDiv = document.querySelector('#pizzat');
    const kebabDiv = document.querySelector('#kebabit');
    const juomaDiv = document.querySelector('#juomat');

    data.forEach((item) => {
      const name = item.nimi;
      const description = item.kuvaus_fi;
      const price = item.hinta;

      const link = document.createElement('a');
      link.className = 'link';

      link.innerHTML = `
      <figure>
        <img src="pictures/pizza.jpg" alt="Pizza" />

        <figcaption>
          <div class="figure-header">
            <h3>${name}</h3>
            <p>${price}€</p>
          </div>
          <p>
            ${description}
          </p>
        </figcaption>
      </figure>
    </a>`;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        createModal(item);
      });
      if (item.kategoria_id === 1) {
        pizzaDiv.appendChild(link);
      }
      if (item.kategoria_id === 2) {
        kebabDiv.appendChild(link);
      }
      if (item.kategoria_id === 3) {
        juomaDiv.appendChild(link);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
displayItems();

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
    isLogged() ? addItemToCart(data) : alert('kirjaudu sisään');
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
(async () => {
  setLogged(await checkSession());
})();
