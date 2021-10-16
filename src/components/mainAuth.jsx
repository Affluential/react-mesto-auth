export const BASE_URL = 'http://localhost:3000'; /* 'https://auth.nomoreparties.co' */

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    /*  console.log(respons);
      try {
        if (respons.status === 201) {
          return respons.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      console.log(res); */
    return res;
  });
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /* credentials: 'include', */
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      /* localStorage.setItem('token', data.token); */
      return data;
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      /* Authorization: `Bearer ${token}`, */
      credentials: 'include',
    },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .then((data) => data);
};
