export const BASE_URL = 'http://localhost:3000'; /* 'https://auth.nomoreparties.co' */

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return res;
  });
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .then((data) => data);
};
