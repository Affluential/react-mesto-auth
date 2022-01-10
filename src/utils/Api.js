import { apiConfig } from './constants.js';
class Api {
  constructor(apiConfig) {
    this._url = apiConfig.baseUrl;
    this._headers = apiConfig.headers;
  }
  _obtainData(way, method) {
    return fetch(`${this._url}${way}`, method).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getUserInfo() {
    return this._obtainData('/users/me', { headers: this._headers, credentials: 'include' });
  }
  getInitialCards() {
    return this._obtainData('/cards', { headers: this._headers, credentials: 'include' });
  }
  setUserInfo(userInfo) {
    return this._obtainData('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
      credentials: 'include',
    });
  }
  addCard(newCard) {
    return this._obtainData('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
      credentials: 'include',
    });
  }
  deleteCard(cardId) {
    return this._obtainData(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });
  }
  changeAvatar(avatarUrl) {
    return this._obtainData(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(avatarUrl),
    });
  }
  changeLikeCardStatus(cardId, isLiked) {
    return this._obtainData(`/cards/${cardId}/likes/`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }
  logout() {
    return this._obtainData('/users/logout', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });
  }
}
const api = new Api(apiConfig);
export default api;
