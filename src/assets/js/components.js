import {fetchData} from './api.js';
const displayItems = async () => {
  try {
    const data = await fetchData('api/pizzas');
    const div = document.querySelector('#pizzat');
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
      div.appendChild(link);
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
const cart = () => {};
export {displayItems};
