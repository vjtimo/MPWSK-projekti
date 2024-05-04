import {fetchData} from './api.js';

const renderOrders = async () => {
  const orderList = document.querySelector('#orderList');
  const orderData = await fetchData('order');
  console.log(orderData);
  console.log(orderList);
  orderData.forEach((order) => {
    orderList.innerHTML += `<li>
    <div class="order">
      <span>ID: 5</span>
      <div class="status">
        <span class="dot"></span>
        <h4>${order.status}</h3>
        <p>13:37</p>
      </div>
      <div class="customerInfo">
          ${order.tuotteet}
      </div>
      <button>Vastaanota</button>
    </div>
  </li>`;
  });
};

renderOrders();
