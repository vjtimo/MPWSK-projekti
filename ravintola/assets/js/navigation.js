import {toggleCart} from './shoppingCart.js';
import {logout, checkSession} from './auth.js';
import {fetchData, getUserInfo} from './api.js';
import {setLogged} from './variables.js';
const shoppingCart = document.querySelector('#cart');
const logoutLink = document.querySelector('#logout');
const profileLink = document.querySelector('#profile');
const asiakastiedotLink = document.querySelector('#asiakasLink');
const profileName = document.querySelector('#userName');
const dropdown = document.querySelector('.dropdown-content');
const user = JSON.parse(sessionStorage.getItem('user'));
if (user) {
  profileName.innerText = user.tunnus;
}

profileLink.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (dropdown.classList.contains('show')) {
    dropdown.classList.toggle('show');
  } else {
    dropdown.classList.toggle('show');
  }
});

const createCustomerInfoModal = async () => {
  const modal = document.querySelector('#customerInfoModal');
  const modalDrop = document.querySelector('.modalBackdrop');
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');
  const data = await getUserInfo(user.id, token);

  modal.style.display = 'flex';
  modal.innerHTML = `<div id="yhteystiedot">
      <a class="yhteystieto-field">
        <h4>Nimi</h4>
        <p>${data.etunimi} ${data.sukunimi}</p>
      </a>
      <a class="yhteystieto-field">
        <h4>Puhelinnumero</h4>
        <p>${data.puhelin}</p>
      </a>
      <a class="yhteystieto-field">
        <h4>Sähköpostiosoite</h4>
        <p>${data.email}</p>
      </a>
      <a class="yhteystieto-field">
        <h4>Katuosoite</h4>
        <p>${data.katuosoite}</p>
      </a>
    </div>`;
  const yhteystietoLink = document.querySelectorAll('.yhteystieto-field');
  yhteystietoLink.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      alert('Customerinfo Editing Coming Soon!™');
    });
  });
  modalDrop.classList.add('visible');

  modalDrop.addEventListener('click', closeModal);
};
const closeModal = (e) => {
  const modalDrop = document.querySelector('.modalBackdrop');
  const modal = document.querySelector('#customerInfoModal');
  modalDrop.removeEventListener('click', closeModal);
  modal.style.display = 'none';
  modalDrop.classList.remove('visible');
};
logoutLink.addEventListener('click', (e) => {
  e.preventDefault();
  logout();
});
asiakastiedotLink.addEventListener('click', (e) => {
  e.preventDefault();
  createCustomerInfoModal();
  dropdown.classList.toggle('show');
});
document.addEventListener('click', (event) => {
  if (event.target !== profileLink) {
    dropdown.classList.remove('show');
  }
});
shoppingCart.addEventListener('click', toggleCart);

const addDropDownElems = () => {
  const dropDown = document.querySelector('.dropdown-content');
  const orderManagement = document.createElement('a');
  orderManagement.innerText = 'Tilaustenhallinta';
  orderManagement.href = 'management.html';
  dropDown.prepend(orderManagement);
};
(async () => {
  const {valid, role} = await checkSession();

  if (valid && role === 'admin') {
    addDropDownElems();
  } else {
  }

  setLogged(valid);
})();
