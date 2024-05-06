import {getPizzasByIds, addItemsToCart, postOrder} from './api.js';
import {fetchData} from './api.js';
const productsDiv = document.querySelector('#confTuotteet');
const products = JSON.parse(localStorage.getItem('STORED_ORDERS'));
const orderForm = document.querySelector('#orderForm');
const updateCart = async () => {
  addItemsToCart(products);
};
updateCart();
if (products) {
  const productIds = products.map((item) => item.id);
  const cartItems = await getPizzasByIds(productIds);
  const combinedCart = products.map((cartItem) => {
    const matchingItem = cartItems.find((item) => item.id === cartItem.id);

    return {
      ...cartItem,
      ...matchingItem,
    };
  });
  const addRestaurants = async () => {
    const restSelect = document.querySelector('#restaurantSelect');
    const restaurants = await fetchData('restaurant');
    restaurants.forEach(
      (restaurant) =>
        (restSelect.innerHTML += `<option value='${restaurant.id}'>${restaurant.nimi}</option>`)
    );
  };
  addRestaurants();
  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const orderData = new FormData(orderForm);
    await postOrder(orderData);
    window.location.href = '/src/index.html';
  });
  combinedCart.forEach((item) => {
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
