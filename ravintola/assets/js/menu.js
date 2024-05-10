'use strict';
import {fetchData, postOrder, postProduct, deletePizzaById} from './api.js';
import {addItemToCart} from './shoppingCart.js';
import {isLogged, setLogged} from './variables.js';
import {checkSession} from './auth.js';
const url = 'http://10.120.32.99/app';
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
      const imgUrl = url + item.imageUrl;
      const link = document.createElement('a');
      link.className = 'link';

      link.innerHTML = `
      <figure>
        <img src="${imgUrl}" alt="Pizza" />

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
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'delete product';
        deleteButton.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const token = sessionStorage.getItem('token');
          deletePizzaById(item.id, token);
          delete link.remove();
        });
        link.append(deleteButton);
      }
    });
    if (admin) {
      const addProduct = document.createElement('button');
      addProduct.id = 'add-product-btn';
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
  const categories = await fetchData('pizzas/categories');

  const modalDrop = document.querySelector('.modalBackdrop');
  const modal = document.querySelector('#addProduct');

  modal.innerHTML = '';

  const addModalContent = document.createElement('div');
  addModalContent.id = 'addModalContent';

  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.textContent = '\u00D7';
  addModalContent.appendChild(closeButton);

  const heading = document.createElement('h2');
  heading.textContent = 'Lisää tuote';
  addModalContent.appendChild(heading);

  const form = document.createElement('form');
  form.id = 'add-product-form';

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Nimi';
  form.appendChild(nameLabel);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  nameInput.required = true;
  form.appendChild(nameInput);

  const checkboxContainer = document.createElement('div');
  checkboxContainer.id = 'add-product-checkbox';

  ingredients.forEach((ingredient, index) => {
    const checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'checkbox-group';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `ingredient${index}`;
    checkbox.value = ingredient.nimi_fi;
    checkbox.name = `ingredient${index}`;

    const label = document.createElement('label');
    label.setAttribute('for', `ingredient${index}`);
    label.textContent = ingredient.nimi_fi;

    checkboxGroup.appendChild(checkbox);
    checkboxGroup.appendChild(label);

    checkboxContainer.appendChild(checkboxGroup);
  });

  form.appendChild(checkboxContainer);

  const categoryLabel = document.createElement('label');
  categoryLabel.setAttribute('for', 'category');
  categoryLabel.textContent = 'Kategoria';
  form.appendChild(categoryLabel);

  const selectElement = document.createElement('select');
  selectElement.id = 'category';
  selectElement.name = 'category';
  selectElement.required = true;

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.kategoria;
    option.textContent = category.kategoria;
    selectElement.appendChild(option);
  });

  form.appendChild(selectElement);

  const priceLabel = document.createElement('label');
  priceLabel.setAttribute('for', 'price');
  priceLabel.textContent = 'Hinta'; //
  form.appendChild(priceLabel);

  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.id = 'price';
  priceInput.name = 'price';
  priceInput.required = true;
  form.appendChild(priceInput);

  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'description');
  descriptionLabel.textContent = 'Kuvaus';
  form.appendChild(descriptionLabel);

  const descriptionTextarea = document.createElement('textarea');
  descriptionTextarea.id = 'description';
  descriptionTextarea.name = 'description';
  descriptionTextarea.placeholder =
    'Describe the product (used for image generation)';
  form.appendChild(descriptionTextarea);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Lisää tuote';
  form.appendChild(submitButton);

  addModalContent.appendChild(form);
  modal.appendChild(addModalContent);

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

    const newProduct = {
      name: name,
      hinta: price,
      category_name: category,
      ingredient_names: ingredients2,
      description: description,
    };
    console.log(newProduct);
    const token = sessionStorage.getItem('token');
    postProduct(newProduct, token);
    closeModal();
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
  const {name, ingredients, price, imageUrl} = data;
  const img = url + imageUrl;
  const modal = document.querySelector('#pizza-modal');
  modal.innerHTML = `<div id ="modal-content">
  <img src=${img} alt="image of pizza"></img>
  <div id="modal-tayte">
  <span class="close-button">&times;</span>
    <h2>${name}</h2>
    <p>${ingredients}</p>
    <h3>${price}€<h3>
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
  const modal2 = document.querySelector('#addProduct');
  const close = document.querySelector('.close-button');
  modalDrop.removeEventListener('click', closeModal);
  close.removeEventListener('click', closeModal);
  modal2.style.display = 'none';
  modal.style.display = 'none';
  modalDrop.classList.remove('visible');
};

(async () => {
  const {valid, role} = await checkSession();

  if (valid && role === 'admin') {
    displayItems(true);
  } else {
    displayItems(false);
  }

  setLogged(valid);
})();
