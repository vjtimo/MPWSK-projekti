import {getOrderList} from './shoppingCart.js';
const productsDiv = document.querySelector('#confTuotteet');
const products = getOrderList();
if (products) {
  products.forEach((item) => {
    productsDiv.innerHTML += `

    <div class="testi">
      <img src="pictures/pizza.jpg" alt="pizzat" />
      <div class="tuoteTiedot">
        <p>${item.nimi} x ${item.quantity}</p>
        <p>${item.hinta}</p>
      </div>
    </div>`;
  });
}
