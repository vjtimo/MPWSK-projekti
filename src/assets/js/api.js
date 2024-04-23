import {url} from './variables.js';

//posts user into database
const registerUser = async (regForm) => {
  const bodyContent = {
    tunnus: new FormData(regForm).get('uname'),
    salasana: new FormData(regForm).get('pass'),
  };
  console.log(bodyContent);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyContent),
  };
  const response = await fetch(url + 'api/users/register', fetchOptions);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
};
export {registerUser};
