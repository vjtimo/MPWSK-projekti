'use strict';
import {fetchData} from './api.js';
import {addItemToCart} from './shoppingCart.js';
import {isLogged, setLogged} from './variables.js';
import {checkSession} from './auth.js';

const displayItems = async (admin) => {
  try {
    const data = await fetchData('pizzas');
    const pizzaDiv = document.querySelector('#pizzat');
    const kebabDiv = document.querySelector('#kebabit');
    const juomaDiv = document.querySelector('#juomat');

    data.forEach((item) => {
      const name = item.name;
      const description = item.ingredients;
      const price = item.price;

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
      </figure>`;
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
      if (admin) {
        console.log('yolo');
        const DeleteButton = document.createElement('button');
        DeleteButton.innerText = 'delete product';
        DeleteButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          link.remove();
        });
        link.append(DeleteButton);
      }
    });
    if (admin) {
      const addProduct = document.createElement('button');
      addProduct.innerText = 'add product';
      addProduct.addEventListener('click', (e) => {
        e.preventDefault();
        addProductmodal();
      });
      pizzaDiv.append(addProduct);
      kebabDiv.append(addProduct);
      juomaDiv.append(addProduct);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addProductmodal = async () => {
  const ingredients = await fetchData('pizzas/ingredients');
  console.log(ingredients);
  const modalDrop = document.querySelector('.modalBackdrop');
  const modal = document.querySelector('#pizza-modal');
  const ingredientsCheckboxes = ingredients
    .map(
      (ingredient, index) => `
  <label for="ingredient${index}">${ingredient.nimi_fi}</label>
  <input type="checkbox" id="ingredient${index}" value="${ingredient.nimi_fi}" name="ingredient${index}"><br>
`
    )
    .join('');
  modal.innerHTML = `<div id ="modal-content">
  <span class="close-button">&times;</span>
    <h2>Lisää tuote</h2>
    <form id="add-product-form">
    <label for="name">Nimi</label>
    <input type="text" id="name" name="name" required>
    ${ingredientsCheckboxes}
    <label for="price">Hinta</label>
    <input type="number" id="price" name="price" required>
    <label for="category">Kategoria</label>
    <select id="category" name="category" required>
    <option value="1">Pizza</option>
    <option value="2">Kebab</option>
    <option value="3">Juoma</option>
    </select>
    <label for="description">Kuvaus</label>
    <input type="text" id="description" name="description" required>
    <button type="submit">Lisää tuote</button>
    </form>`;
  const form = document.querySelector('#add-product-form');
  console.log(form);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const price = formData.get('price');
    const category = formData.get('category');
    const ingredients2 = [];
    const description = formData.get('description');
    form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (checkbox.checked) {
        ingredients2.push(checkbox.value);
      }
    });

    console.log(ingredients2);
    const newProduct = {
      name: name,
      hinta: price,
      category_name: category,
      ingredient_names: ingredients2,
      description: description,
    };
    console.log(newProduct);
  });
  modalDrop.classList.add('visible');
  modal.classList.add('visible');
  const close = document.querySelector('.close-button');
  close.addEventListener('click', closeModal);
  modalDrop.addEventListener('click', closeModal);

  modal.style.display = 'flex';
};

const createModal = (data) => {
  const modalDrop = document.querySelector('.modalBackdrop');
  const {nimi, ainekset, hinta} = data;
  const modal = document.querySelector('#pizza-modal');
  modal.innerHTML = `<div id ="modal-content">
  <img src="pictures/pizza.jpg" alt="image of pizza"></img>

  <div id="modal-tayte">
  <span class="close-button">&times;</span>
    <h2>${nimi}</h2>
    <p>${ainekset}</p>
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
  close.addEventListener('click', closeModal);
  modalDrop.addEventListener('click', closeModal);

  modal.style.display = 'flex';
};
const closeModal = (e) => {
  const modalDrop = document.querySelector('.modalBackdrop');
  const modal = document.querySelector('#pizza-modal');
  const close = document.querySelector('.close-button');
  modalDrop.removeEventListener('click', closeModal);
  close.removeEventListener('click', closeModal);
  modal.style.display = 'none';
  modalDrop.classList.remove('visible');
};

(async () => {
  const {valid, role} = await checkSession();
  console.log(role);
  if (valid && role === 'admin') {
    displayItems(true);
  } else {
    displayItems(false);
  }
  console.log(valid);
  setLogged(valid);
})();
