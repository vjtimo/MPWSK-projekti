import {fetchData} from './api.js';
import {url} from './variables.js';
var slideIndex = 0;
var slides = document.getElementsByClassName('mySlides');
var timer = null;
document.addEventListener('DOMContentLoaded', function () {
  const toastMessage = localStorage.getItem('toastMessage');
  if (toastMessage) {
    showToast(toastMessage);
    localStorage.removeItem('toastMessage');
  }
});
const showSlides = () => {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'block';
  timer = setTimeout(showSlides, 3000);
};

const displayItems = async (admin) => {
  try {
    const data = await fetchData('pizzas/popular');
    const kebabDiv = document.querySelector('#kebabit');
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
        localStorage.setItem('clicked-item', JSON.stringify(item));
        window.location.href = 'menu.html';
      });
      kebabDiv.append(link);
    });
  } catch (e) {
    console.log(e);
  }
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
  toastContainer.style.right = '50dvw';
  toastContainer.style.top = '5rem';

  setTimeout(() => {
    toast.remove();
  }, 4000);
};
displayItems();
showSlides();
