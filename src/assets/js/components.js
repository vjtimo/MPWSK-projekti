import {fetchData} from './api.js';
const displayItems = async () => {
  try {
    const data = await fetchData('api/pizzas');
    const pizzaDiv = document.querySelector('#pizzat');
    const kebabDiv = document.querySelector('#kebabit');
    const juomaDiv = document.querySelector('#juomat');
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const name = data[i].nimi;
      const description = data[i].kuvaus_fi;
      const price = data[i].hinta;

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
    </a>
    `;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        createModal(data[i]);
      });
      if (data[i].kategoria_id === 1) {
        pizzaDiv.appendChild(link);
      }
      if (data[i].kategoria_id === 2) {
        kebabDiv.appendChild(link);
      }
      if (data[i].kategoria_id === 3) {
        juomaDiv.appendChild(link);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
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
      <button>Lisää ostoskoriin</button>
  </div>`;
  modalDrop.style.display = 'block';
  const close = document.querySelector('.close-button');

  close.addEventListener('click', (e) => {
    modal.style.display = 'none';
    modalDrop.style.display = 'none';
  });
  modal.style.display = 'flex';
};
const createCart = (modal) => {
  console.log(modal);
  const cart = document.createElement('aside');

  cart.innerHTML = '<h2>Shopping Cart</h2>';
  modal.append(cart);
};
export {displayItems, createCart};
