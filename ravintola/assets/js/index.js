import {fetchData} from './api.js';
import {url} from './variables.js';
var slideIndex = 0;
var slides = document.getElementsByClassName('mySlides');
var timer = null;

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
        window.location.href = 'menu.html';
      });
      kebabDiv.append(link);
    });
  } catch (e) {
    console.log(e);
  }
};
displayItems();
showSlides();
