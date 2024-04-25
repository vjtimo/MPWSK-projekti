import {fetchData} from './api.js';
const displayItems = async () => {
  try {
    const data = await fetchData('api/pizzas');
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const name = data[i].nimi;
      const description = data[i].kuvaus_fi;
      const price = data[i].hinta;
      const div = document.querySelector('#pizzat');

      const html = `
      <a href="menu.html" class="link">
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
      </figure>
    </a>
    `;

      div.innerHTML += html;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export {displayItems};
