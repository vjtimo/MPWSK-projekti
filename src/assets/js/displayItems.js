async function displayItems() {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/pizzas');
    if (!response.ok) throw new Error('Invalid input!');
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const name = data[i].nimi;
      const description = data[i].kuvaus_fi;

      /*document.querySelector('h3').innerText = name;
    document.querySelector('figcaption').innerText = description;*/
      const div = document.querySelector('#pizzat');

      const html = `
      <a href="menu.html" class="link">
        <figure>
          <img src="https://placehold.co/300x200" alt="Pizza" />
          <h3>${name}</h3>
          <figcaption>
            <p>${description}</p>
          </figcaption>
        </figure>
      </a>
    `;

      div.innerHTML += html;
    }
  } catch (error) {
    console.log(error.message);
  }
}

displayItems();
