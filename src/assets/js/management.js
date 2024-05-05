import {fetchData, updateOrderStatus, getOrderById} from './api.js';

const createButton = (id, status) => {
  const button = document.createElement('button');
  button.innerText = status === 1 ? 'Vastaanota' : 'Toimita';
  console.log(status);
  button.addEventListener(
    'click',
    async (e) => {
      e.preventDefault();
      await updateOrderStatus(id, status);

      await renderOrderById(id, e.target);
      showToast('Tilaus otettu onnistuneesti vastaan');
    },
    {once: true}
  );
  return button;
};
const renderOrders = async () => {
  const orderList = document.querySelector('#orderList');

  const orderData = await fetchData('order');
  const ordersToDo = orderData.filter((item) => item.statusId < 3);
  const ordersToDeliver = orderData.filter((item) => item.statusId > 2);
  console.log(ordersToDo);
  console.log(ordersToDeliver);
  if (ordersToDo.length > 0) {
    orderData.forEach((order) => {
      if (order.statusId < 3) {
        const dateObj = new Date(order.tilausaika);
        const time = dateObj.toTimeString().split(' ')[0];

        const listItem = document.createElement('li');
        listItem.id = `id${order.id}`;
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';

        const idSpan = document.createElement('span');
        idSpan.innerText = `ID: ${order.id}`;

        const statusDiv = document.createElement('div');
        statusDiv.className = 'status';

        const statusDot = document.createElement('span');

        statusDot.className = order.statusId === 1 ? 'redDot' : 'yellowDot';

        const statusHeading = document.createElement('h4');
        statusHeading.innerText = `${order.statusText}`;

        const timeParagraph = document.createElement('p');
        timeParagraph.innerText = time;

        const customerInfoDiv = document.createElement('div');
        customerInfoDiv.className = 'customerInfo';
        customerInfoDiv.innerHTML = `${order.tuotteet}`;

        statusDiv.append(statusDot, statusHeading, timeParagraph);
        orderDiv.append(idSpan, statusDiv, customerInfoDiv);
        listItem.append(orderDiv);

        const button = createButton(order.id, order.statusId);
        listItem.append(button);

        orderList.append(listItem);
      }
    });
  } else {
    orderList.innerHTML = '<H3>EI TILAUKSIA</H3>';
  }
};
const renderOrderById = async (id, button) => {
  const [order] = await getOrderById(id);

  console.log(order);

  const listItem = document.querySelector(`#id${id}`);
  if (order.statusId > 2) {
    listItem.remove();
    const orderList = document.querySelector('#orderList');
    console.log('TESTTT', orderList.hasChildNodes());
    if (!orderList.hasChildNodes()) {
      orderList.innerHTML = '<H3>EI TILAUKSIA</H3>';
      return;
    }
    return;
  }

  const statusDot = listItem.querySelector('.status span');
  statusDot.className = 'yellowDot';
  const statusText = listItem.querySelector('.status h4');
  statusText.innerText = order.statusText;
  button.innerText = 'Toimita';
  button.addEventListener(
    'click',
    async (e) => {
      e.preventDefault();
      await updateOrderStatus(id, order.statusId);
      showToast('Tilaus lähetettu toimitukseen');
      renderOrderById(id, e.target);
    },
    {once: true}
  );
};
const showToast = (message) => {
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  toast.style.color = 'white';
  toast.style.padding = '10px';
  toast.style.borderRadius = '5px';
  toast.style.marginBottom = '10px';
  toast.style.fontSize = '20px';
  toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';

  const toastContainer = document.querySelector('#toastContainer');
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};
renderOrders();

/* SQL FOR TEsTING
UPDATE tilaus
SET tilaId = 1;*/
