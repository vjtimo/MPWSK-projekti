import { getRestaurants } from "./api.js";
const displayRestaurants = async () => {
  try {
    const data = await getRestaurants();
    const div = document.querySelector('#restaurants');
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      const name = data[i].nimi;
      const puhelinnumero = data[i].puhelinnumero;
      const katuosoite = data[i].katuosoite;
      const postitoimipaikka = data[i].postitoimipaikka;
      div.innerHTML += `
      <li>
      <a href="#">
        <h2>${name}</h2>
        <span>${katuosoite}</span>
        <span>${puhelinnumero}</span>
      </a>
    </li>
    `;

    }
  } catch (error) {
    console.log(error.message);
  }
};
const createModal = (data) => {
  const modalDrop = document.querySelector('.modalBackdrop');
  const {nimi, kuvaus_fi, hinta} = data;
  const modal = document.querySelector('#restaurant-modal');
  modal.innerHTML = `<div id ="modal-content">
  <div id="modal-tayte">
  <span class="close-button">&times;</span>
    <h2>${nimi}</h2>
    <p>${kuvaus_fi}</p>
    <h3>${hinta}<h3>
  </div>`;
  modalDrop.style.display = 'block';
  const close = document.querySelector('.close-button');

  close.addEventListener('click', (e) => {
    modal.style.display = 'none';
    modalDrop.style.display = 'none';
  });
  modal.style.display = 'flex';
};

/*    <div id="pizza-modal" style="display: none;">
      <div id ="modal-content">
      <img src="pictures/pizza.jpg" alt="image of pizza"></img>

      <div id="modal-tayte">
        <h2>Pizzan nimi</h2>
        <p>Kinkku,Ananas,Herkkusieni</p>
        <h3>10,40€<h3>
          <button>Lisää ostoskoriin</button>
      </div>
    </div>
*/
export {displayRestaurants};
